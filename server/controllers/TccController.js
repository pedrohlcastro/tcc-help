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

  runProfessorRules(tcc, professorId, pages) {
    return new Promise(async (resolve, reject) => {
      try {
        const rules = await RuleController.get(professorId);
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

  checkSpelling(word, arrayLanguages) {
    const dictionaryDirectory = path.join(__dirname, '../config/dictionaries');
    // const word = 'extraño';
    // let arrayLanguages = [];
    // arrayLanguages [0] = 'pt_BR';
    // arrayLanguages [1] = 'en_US';
    // arrayLanguages [2] = 'es_SP';
    // if(arrayLanguages.length === 3){
    //   arrayLanguages.splice(0, 1);
    //   arrayLanguages[0] = 'EN_PT';
    // }
    let dictbuf = '';
    if (arrayLanguages.length === 2) { dictbuf = fs.readFileSync(`${dictionaryDirectory}/${arrayLanguages[1]}.dic`); }
    return new Promise(async (resolve, reject) => {
      try {
        const dict = await this.createDictionary(arrayLanguages[0]);
        if (arrayLanguages.length === 2) {
          dict.addDictionary(dictbuf, (err) => {
            if (!err) {
              dict.spellSuggestions(word, (errSpell, correct, suggestion, origWord) => {
                if (errSpell) {
                  reject(errSpell);
                } else {
                  resolve({ status: correct, suggestions: suggestion, originalWord: origWord });
                }
              });
            } else {
              reject(err);
            }
          });
        } else {
          dict.spellSuggestions(word, (errSpell, correct, suggestion, origWord) => {
            if (errSpell) {
              reject(errSpell);
            } else {
              resolve({ status: correct, suggestions: suggestion, originalWord: origWord });
            }
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  runSpellingOneLanguage(tcc, pages, language) {
    return new Promise(async (resolve, reject) => {
      try {
        let dict = await this.createDictionary(language[0].value);
        // PERCORRE PAGINAS
        async.forEach(pages, (page, nextPage) => {
          /* eslint-disable */
          const words = page.toString().replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, ' ')
            .replace(/\s\s+/g, ' ').trim().split(' ');
          /* eslint-enable */
          async.forEach(words, (word, nextWord) => {
            dict.spellSuggestions(word, (errSpell, correct, suggestions, origWord) => {
              if (errSpell) {
                nextWord(errSpell);
              } else if (!correct) {
                const checkSpelling = {
                  tcc_id: tcc.id,
                  accept: 0,
                  word: origWord,
                  suggestions: suggestions.toString(),
                  justification: null,
                  page: parseInt(pages.indexOf(page), 10) + 1,
                };
                this.CheckSpelling.create(checkSpelling)
                  .then(() => nextWord())
                  .catch(checkSpellingErr => nextWord(checkSpellingErr));
              } else {
                nextWord();
              }
            });
          }, (err) => {
            // FINALLY WORDS
            if (err) reject(err);
            else nextPage();
          });
        }, (err) => {
          // PECORRE CADA PAGE
          if (err) reject(err);
          dict = null;
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  runSpellingTwoLanguages(tcc, pages, languages) {
    const dictionaryDirectory = path.join(__dirname, '../config/dictionaries');
    const dictbuf = fs.readFileSync(`${dictionaryDirectory}/${languages[1].value}.dic`);
    return new Promise(async (resolve, reject) => {
      try {
        let dict = await this.createDictionary(languages[0].value);
        dict.addDictionary(dictbuf, (errDictionary) => {
          if (!errDictionary) {
            // PERCORRE PAGINAS
            async.forEach(pages, (page, nextPage) => {
              /* eslint-disable */
              const words = page.toString().replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, ' ')
                .replace(/\s\s+/g, ' ').trim().split(' ');
              /* eslint-enable */
              async.forEach(words, (word, nextWord) => {
                dict.spellSuggestions(word, (errSpell, correct, suggestions, origWord) => {
                  if (errSpell) {
                    nextWord(errSpell);
                  } else if (!correct) {
                    const checkSpelling = {
                      tcc_id: tcc.id,
                      accept: 0,
                      word: origWord,
                      suggestions: suggestions.toString(),
                      justification: null,
                      page: parseInt(pages.indexOf(page), 10) + 1,
                    };
                    this.CheckSpelling.create(checkSpelling)
                      .then(() => nextWord())
                      .catch(checkSpellingErr => nextWord(checkSpellingErr));
                  } else {
                    nextWord();
                  }
                });
              }, (err) => {
                // FINALLY WORDS
                if (err) reject(err);
                else nextPage();
              });
            }, (err) => {
              // PECORRE CADA PAGE
              if (err) reject(err);
              dict = null;
              resolve();
            });
          } else {
            reject(errDictionary);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  runSpelling(tcc, languages, pages) {
    let arrLanguages = languages;
    if (arrLanguages.length === 3) {
      arrLanguages.splice(0, 1);
      arrLanguages[0].value = 'EN_PT';
    }

    return new Promise(async (resolve, reject) => {
      try {
        if (arrLanguages.length === 1) {
          this.runSpellingOneLanguage(tcc, pages, arrLanguages)
            .then(() => resolve({ msg: 'Success', status: 200 }))
            .catch(err => reject(err));
        } else {
          this.runSpellingTwoLanguages(tcc, pages, arrLanguages)
            .then(() => resolve({ msg: 'Success', status: 200 }))
            .catch(err => reject(err));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  runAnalisys(tccId, studentId, languages) {
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
        const pages = await this.pdf2Txt(path.join(__dirname, `../upload/${tcc.file_path}`));
        this.runSpelling(tcc, languages, pages)
          .then(() => {
            this.runProfessorRules(tcc, professorId, pages)
              .then(() => {
                resolve({ msg: 'Success', status: 200 });
              })
              .catch(errCheckRules => reject(errCheckRules));
          })
          .catch(errSpelling => reject(errSpelling));
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new TccController();
