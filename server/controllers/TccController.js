import fs from 'fs';
import path from 'path';
import async from 'async';
import scissors from 'scissors';
import pdfUtil from 'pdf-to-text';
/* eslint-disable */
import Nodehun from 'nodehun';
/* eslint-enable */
import db from '../config/db';
import RuleController from '../controllers/RuleController';


class TccController {
  constructor() {
    this.Tcc = db().models.Tcc;
    this.StudentProfessor = db().models.StudentProfessor;
    this.CheckRule = db().models.CheckRule;
    this.CheckSpelling = db().models.CheckSpelling;
  }

  /**
   * Funcao que trasforma as parada do pdf em txt
   * @param {string} filePath : endereco absoluto do pdf
   * @returns {[]sting}: onde array[i] é a pagina i+1, ou seja, array[0] é pagina 1
   */
  pdf2Txt(filePath) {
    return new Promise((resolve, reject) => {
      const pdf = scissors(filePath);
      pdf.getNumPages()
        .then(async (pdfSize) => {
          const aux = Array.from(Array(parseInt(pdfSize, 10)).keys());
          const result = new Array(pdfSize);
          async.forEach(aux, (i, cb) => {
            pdfUtil.pdfToText(filePath, { from: i, to: i }, (err, data) => {
              if (err) cb(err);
              else {
                result[i] = data;
                cb();
              }
            });
          }, async (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
    });
  }

  async getFile(res, next, tccId) {
    try {
      const tcc = await this.Tcc.findOne({ where: { id: tccId } });
      res.download(path.join(__dirname, `../upload/${tcc.file_path}`));
    } catch (err) {
      next(next({ err, msg: 'Error ao atualizar regra', status: 500 }));
    }
  }

  runProfessorRules(tccId, studentId) {
    const queryParams = {
      where: {
        id: tccId,
        '$TccStudentProfessor.student_id$': studentId,
        '$TccStudentProfessor.activate$': 1,
      },
      include: [{
        model: this.StudentProfessor,
        as: 'TccStudentProfessor',
        attributes: ['professor_id', 'activate'],
      }],
    };
    return new Promise(async (resolve, reject) => {
      try {
        const tcc = await this.Tcc.findOne(queryParams);
        let professorId;
        if (tcc.TccStudentProfessor.professor_id) {
          professorId = tcc.TccStudentProfessor.professor_id;
        } else {
          reject(new Error('Relation Not Found Tcc - StudentProfessor'));
        }
        const rules = await RuleController.get(professorId);
        const pages = await this.pdf2Txt(path.join(__dirname, `../upload/${tcc.file_path}`));
        // PECORRE CADA REGEX
        async.forEach(rules, (rule, nextRegex) => {
          const regex = new RegExp(rule.regex, 'g');
          pages.splice(0, 1); // remove page 0
          // PECORRE PAGINAS
          async.forEach(pages, (page, nextPage) => {
            const matches = page.match(regex);
            if (matches) {
              // CREATE checkRule
              async.forEach(matches, async (match, nextMatch) => {
                const checkRule = {
                  rule_id: rule.id,
                  tcc_id: tcc.id,
                  accept: 0,
                  word: match,
                  page: parseInt(pages.indexOf(page), 10) + 1,
                };
                this.CheckRule.create(checkRule)
                  .then(() => nextMatch())
                  .catch(checkRuleErr => nextMatch(checkRuleErr));
              }, (err) => {
                // FINALLY de CREATE checkRule
                if (err) reject(err);
                else nextPage();
              });
            } else {
              nextPage();
            }
          }, (err) => {
            // FINALLY de PECORRE PAGINAS
            if (err) reject(err);
            else nextRegex();
          });
        }, (err) => {
          // PECORRE CADA REGEX
          if (err) reject(err);
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  update(id, data) {
    return new Promise((resolve, reject) => {
      this.Tcc.update(data, { where: { id } })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  createDictionary(firstLanguage) {
    const dictionaryDirectory = path.join(__dirname, '../config/dictionaries');
    const affbuf = fs.readFileSync(`${dictionaryDirectory}/${firstLanguage}.aff`);
    const dictbuf = fs.readFileSync(`${dictionaryDirectory}/${firstLanguage}.dic`);
    const dict = new Nodehun(affbuf, dictbuf);

    return new Promise((resolve, reject) => {
      try {
        resolve(dict);
      } catch (err) {
        reject(err);
      }
    });
  }

  appendDictionary(dict, language) {
    const dictionaryDirectory = path.join(__dirname, '../config/dictionaries');
    const dictbuf = fs.readFileSync(`${dictionaryDirectory}/${language}.dic`);
    return new Promise((resolve, reject) => {
      try {
        dict.addDictionary(dictbuf, (err) => {
          if (!err) {
            resolve(dict);
          } else {
            reject(err);
          }
        });
      } catch (catchErr) {
        reject(catchErr);
      }
    });
  }

  checkSpelling() {
    const firstLanguage = 'pt_BR';
    const secondLanguage = 'en_US';
    // const thirdLanguage = 'es_SP';

    const word = 'Errad';
    return new Promise(async (resolve, reject) => {
      try {
        let dict = await this.createDictionary(firstLanguage);
        dict = await this.appendDictionary(dict, secondLanguage);
        dict.spellSuggestions(word, (errSpell, correct, suggestions, origWord) => {
          if (errSpell) {
            reject(errSpell);
          } else {
            resolve({ status: correct, sug: suggestions, w: origWord });
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

//   runSpelling(tccId, studentId) {
//     const queryParams = {
//       where: {
//         id: tccId,
//         '$TccStudentProfessor.student_id$': studentId,
//         '$TccStudentProfessor.activate$': 1,
//       },
//       include: [{
//         model: this.StudentProfessor,
//         as: 'TccStudentProfessor',
//         attributes: ['professor_id', 'activate'],
//       }],
//     };

//     const firstLanguage = 'pt_BR';
//     const secondLanguage = 'en_US';
//     const thirdLanguage = 'es_SP';
//     const dictionaryDirectory = path.join(__dirname, '../config/dictionaries');
//     const affbuf = fs.readFileSync(`${dictionaryDirectory}/${firstLanguage}.aff`);
//     const dictbufPTBr = fs.readFileSync(`${dictionaryDirectory}/${firstLanguage}.dic`);
//     const dictbufEnUs = [];
//     dictbufEnUs[0] = fs.readFileSync(`${dictionaryDirectory}/${secondLanguage}.dic`);
//     dictbufEnUs[1] = fs.readFileSync(`${dictionaryDirectory}/${thirdLanguage}.dic`);
//     const dict = new Nodehun(affbuf, dictbufPTBr);

//     return new Promise(async (resolve, reject) => {
//       try {
//         const tcc = await this.Tcc.findOne(queryParams);
//         if (!tcc.TccStudentProfessor.professor_id) {
//           reject(new Error('Relation Not Found Tcc - StudentProfessor'));
//         }
//         const pages = await this.pdf2Txt(path.join(__dirname, `../upload/${tcc.file_path}`));
//         // pages.splice(0, 1); // remove page 0
//         for (let i = 0; i < dictbufEnUs.length; i++) {
//           //console.log(`i: ${i}`);
//           dict.addDictionary(dictbufEnUs[i], (errDict) => {
//             if (errDict) { reject(errDict); } else {
//               // PERCORRE PAGINAS
//               // if(i == dictbufEnUs.length - 1){}
//               async.forEach(pages, (page, nextPage) => {
                  /* eslint-disable */
//                 const words = page.toString().replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, ' ').replace(/\s\s+/g, ' ').trim()
//                   .split(' ');
                  /* eslint-enable */
//                 async.forEach(words, (word, nextWord) => {
//                   // nextWord();

//                   dict.spellSuggestions(word, (errSpell, correct, suggestions, origWord) => {
//                     if (!correct) {
//                       const checkSpelling = {
//                         tcc_id: tcc.id,
//                         accept: 0,
//                         word: origWord,
//                         suggestions: suggestions.toString(),
//                         page: parseInt(pages.indexOf(page), 10) + 1,
//                       };
//                       if (i == dictbufEnUs.length) {
//                         this.CheckSpelling.create(checkSpelling)
//                           .then(() => nextWord())
//                           .catch(checkSpellingErr => nextWord(checkSpellingErr));
//                       } else {
//                         nextWord();
//                       }
//                     } else {
//                       nextWord();
//                     }
//                   });
//                 }, (err) => {
//                   // FINALLY WORDS
//                   if (err) reject(err);
//                   else nextPage();
//                 });
//               }, (err) => {
//                 // PECORRE CADA PAGE
//                 if (err) reject(err);
//                 resolve();
//               });
//             }
//           });
//         }
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }
}

export default new TccController();
