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
import CheckRulesController from './CheckRulesController';
import CheckSpellingController from './CheckSpellingController';

let dictPtBR;
let dictEnUS;

class TccController {
  constructor() {
    this.Tcc = db().models.Tcc;
    this.User = db().models.User;
    this.StudentProfessor = db().models.StudentProfessor;
    this.CheckRule = db().models.CheckRule;
    this.CheckSpelling = db().models.CheckSpelling;
    const arrayLanguages = [];
    arrayLanguages[0] = 'pt_BR';
    arrayLanguages[1] = 'en_US';
    arrayLanguages[2] = 'es_SP';
    global.gc();
    const dictionaryDirectory = path.join(__dirname, '../config/dictionaries');
    // pt_BR
    const affbuf = fs.readFileSync(`${dictionaryDirectory}/${arrayLanguages[0]}.aff`);
    const dictbuf = fs.readFileSync(`${dictionaryDirectory}/${arrayLanguages[0]}.dic`);
    Nodehun.createNewNodehun(affbuf, dictbuf, (err, dict) => {
      if (!err) {
        dictPtBR = dict;
      }
    });
    // en_US
    const affbufEn = fs.readFileSync(`${dictionaryDirectory}/${arrayLanguages[1]}.aff`);
    const dictbufEn = fs.readFileSync(`${dictionaryDirectory}/${arrayLanguages[1]}.dic`);
    Nodehun.createNewNodehun(affbufEn, dictbufEn, (err, dict2) => {
      if (!err) {
        dictEnUS = dict2;
      }
    });
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

  checkSpelling() {
    return new Promise(async (resolve, reject) => {
      try {
        dictPtBR.spellSuggestions('errad', (err, correct, suggestions, origWord) => {
          resolve({ correct, sug: suggestions, word: origWord });
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  runSpellingOneLanguage(tcc, pages, language) {
    return new Promise(async (resolve, reject) => {
      try {
        if (pages.length > 1) {
          pages.splice(0, 1);
        }
        if (language[0].value === 'pt_BR') {
          // PERCORRE PAGINAS
          async.forEach(pages, (page, nextPage) => {
            /* eslint-disable */
            const words = page.toString().replace(/[^A-Za-záàâãéèêíïóôõöúüçñÁÀÂÃÉÈÍÏÓÔÕÖÚÜÇÑ]/g, ' ')
              .replace(/\s\s+/g, ' ').trim().split(' ');
            /* eslint-enable */
            async.forEach(words, (word, nextWord) => {
              if (word !== word.toUpperCase()) {
                dictPtBR.spellSuggestions(word, (errSpell, correct, suggestions, origWord) => {
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
              } else {
                nextWord();
              }
            }, (err) => {
              // FINALLY WORDS
              if (err) reject(err);
              else nextPage();
            });
          }, (err) => {
            // PECORRE CADA PAGE
            if (err) reject(err);
            resolve();
          });
        } else {
          // PERCORRE PAGINAS
          async.forEach(pages, (page, nextPage) => {
            /* eslint-disable */
            const words = page.toString().replace(/[^A-Za-záàâãéèêíïóôõöúüçñÁÀÂÃÉÈÍÏÓÔÕÖÚÜÇÑ]/g, ' ')
              .replace(/\s\s+/g, ' ').trim().split(' ');
            /* eslint-enable */
            async.forEach(words, (word, nextWord) => {
              if (word !== word.toUpperCase()) {
                dictEnUS.spellSuggestions(word, (errSpell, correct, suggestions, origWord) => {
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
              } else {
                nextWord();
              }
            }, (err) => {
              // FINALLY WORDS
              if (err) reject(err);
              else nextPage();
            });
          }, (err) => {
            // PECORRE CADA PAGE
            if (err) reject(err);
            resolve();
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  runSpellingTwoLanguages(tcc, pages) {
    return new Promise(async (resolve, reject) => {
      if (pages.length > 1) {
        pages.splice(0, 1);
      }
      // PERCORRE PAGINAS
      async.forEach(pages, (page, nextPage) => {
        /* eslint-disable */
          const words = page.toString().replace(/[^A-Za-záàâãéèêíïóôõöúüçñÁÀÂÃÉÈÍÏÓÔÕÖÚÜÇÑ]/g, ' ')
            .replace(/\s\s+/g, ' ').trim().split(' ');
          /* eslint-enable */
        async.forEach(words, (word, nextWord) => {
          if (
            parseInt(pages.indexOf(page), 10) + 1 === pages.length
            && parseInt(words.indexOf(word), 10) + 1 === words.length
          ) {
            resolve();
          }
          if (word !== word.toUpperCase()) {
            dictPtBR.spellSuggestions(word, (errSpell, correct, suggestions, origWord) => {
              if (errSpell) {
                nextWord(errSpell);
              } else if (!correct) {
                dictEnUS.spellSuggestions(word, (errSpellEn, correctEn, suggestionsEn) => {
                  if (errSpellEn) {
                    nextWord(errSpellEn);
                  } else if (!correctEn) {
                    const bothSuggestions = [...suggestions, ...suggestionsEn];
                    const checkSpelling = {
                      tcc_id: tcc.id,
                      accept: 0,
                      word: origWord,
                      suggestions: bothSuggestions.toString(),
                      justification: null,
                      page: parseInt(pages.indexOf(page), 10) + 1,
                    };
                    this.CheckSpelling.create(checkSpelling)
                      .then(() => nextWord())
                      .catch(checkSpellingErr => nextWord(checkSpellingErr));
                  }
                });
              } else {
                nextWord();
              }
            });
          } else {
            nextWord();
          }
        }, (err) => {
          // FINALLY WORDS
          if (err) reject(err);
          else nextPage();
        });
      }, (err) => {
        // PECORRE CADA PAGE
        if (err) reject(err);
        resolve();
      });
    });
  }

  runSpelling(tcc, languages, pages) {
    return new Promise(async (resolve, reject) => {
      try {
        if (languages.length === 1) {
          this.runSpellingOneLanguage(tcc, pages, languages)
            .then(() => resolve({ msg: 'Success', status: 200 }))
            .catch(err => reject(err));
        } else {
          this.runSpellingTwoLanguages(tcc, pages)
            .then(() => resolve({ msg: 'Success', status: 200 }))
            .catch(err => reject(err));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  runAnalisys(tccId, studentId, body, selectedProfessorId) {
    let queryParams = {
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
        let professorId = null;
        if (selectedProfessorId) {
          queryParams = {
            where: {
              id: tccId,
            },
            raw: true,
          };
          professorId = selectedProfessorId;
        }
        const tcc = await this.Tcc.findOne(queryParams);
        if (professorId === null) {
          if (tcc.TccStudentProfessor.professor_id) {
            professorId = tcc.TccStudentProfessor.professor_id;
          } else {
            reject(new Error('Relation Not Found Tcc - StudentProfessor'));
          }
        }
        const pages = await this.pdf2Txt(path.join(__dirname, `../upload/${tcc.file_path}`));
        this.runProfessorRules(tcc, professorId, pages)
          .then(() => {
            this.runSpelling(tcc, body.languages, pages)
              .then(() => resolve({ msg: 'Success', status: 200 }))
              .catch(errSpelling => reject(errSpelling));
          })
          .catch(errCheckRules => reject(errCheckRules));
      } catch (err) {
        reject(err);
      }
    });
  }

  getCheckRulesAndSpelling(tccId) {
    let response;
    return new Promise(async (resolve, reject) => {
      try {
        CheckRulesController.getAll(tccId)
          .then((responseCheckRules) => {
            CheckSpellingController.getAll(tccId)
              .then((responseCheckSpelling) => {
                response = {
                  rules: responseCheckRules,
                  spelling: responseCheckSpelling,
                };
                resolve(response);
              })
              .catch(errSpelling => reject(errSpelling));
          })
          .catch(errCheckRules => reject(errCheckRules));
      } catch (err) {
        reject(err);
      }
    });
  }

  getStatistics(tccId) {
    const result = {
      rules: {},
      spelling: {},
    };
    return new Promise(async (resolve, reject) => {
      try {
        result.rules.accepted = await this.getRulesStatistics({ tcc_id: tccId, accept: 1 });
        result.rules.rejected = await this.getRulesStatistics({ tcc_id: tccId, accept: 2 });
        result.rules.ignored = await this.getRulesStatistics({ tcc_id: tccId, accept: 0 });
        result.spelling.accepted = await this.getSpellingStatistics({ tcc_id: tccId, accept: 1 });
        result.spelling.rejected = await this.getSpellingStatistics({ tcc_id: tccId, accept: 2 });
        result.spelling.ignored = await this.getSpellingStatistics({ tcc_id: tccId, accept: 0 });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAllTccFromUserId(studentId) {
    const queryParams = {
      where: {
        '$TccStudentProfessor.student_id$': studentId,
      },
      include: [{
        model: this.StudentProfessor,
        as: 'TccStudentProfessor',
        attributes: ['professor_id', 'activate'],
      }],
      raw: true,
    };
    return new Promise(async (resolve, reject) => {
      try {
        const responseArray = [];
        let response = {};
        let aux;
        const responseTcc = await this.Tcc.findAll(queryParams);
        /* eslint-disable */
        for (aux = 0; aux < responseTcc.length; aux++) {
          response = {};
          response.tcc = responseTcc[aux];
          response.professor = await this.User.findOne({ where: { id: responseTcc[aux]['TccStudentProfessor.professor_id'] }, raw: true });
          responseArray.push(response);
        }
        /* eslint-enable */
        resolve(responseArray);
      } catch (err) {
        reject(err);
      }
    });
  }

  getRulesStatistics(whereParam) {
    const params = {
      col: 'id',
      where: whereParam,
      raw: true,
    };
    return this.CheckRule.count(params);
  }

  getSpellingStatistics(whereParam) {
    const params = {
      col: 'id',
      where: whereParam,
      raw: true,
    };
    return this.CheckSpelling.count(params);
  }

  // async checkAccessRights(tccId, userId) {
  //   try {
  //     const params = {
  //       where: { id: tccId },
  //       include: [{
  //         model: this.StudentProfessor,
  //         as: 'TccStudentProfessor',
  //         attributes: ['professor_id', 'student_id'],
  //       }],
  //       raw: true,
  //     };
  //     const tcc = await this.Tcc.findOne(params);
  //     if (tcc.TccStudentProfessor.student_id == userId) {
  //       new Promise.resolve();
  //     } else if (tcc.TccStudentProfessor.professor_id == userId && tcc.visible_professor == 1) {
  //       new Promise.resolve();
  //     } else {
  //       new Promise.reject(new Error('Acesso Negado'));
  //     }
  //   } catch (err) {
  //     new Promise.reject(new Error('Acesso Negado'));
  //   }
  // }

  getAllTccFromStudentProfessorId(studentProfessorId) {
    return new Promise((resolve, reject) => {
      try {
        this.Tcc.findAll({
          where: {
            student_professor_id: studentProfessorId, visible_professor: 1,
          },
          raw: true,
        })
          .then(res => resolve(res))
          .catch(errTcc => reject(errTcc));
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new TccController();
