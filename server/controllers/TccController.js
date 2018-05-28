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

  checkSpelling(params) {
    const dictionaryDirectory = path.join(__dirname, '../config/dictionaries');
    const affbuf = fs.readFileSync(`${dictionaryDirectory}/${params.language}.aff`);
    const dictbuf = fs.readFileSync(`${dictionaryDirectory}/${params.language}.dic`);
    const dict = new Nodehun(affbuf, dictbuf);

    return new Promise((resolve, reject) => {
      dict.spellSuggestions('computdor', (err, correct, suggestions, origWord) => {
        if (err) { reject(err); }
        resolve({ status: correct, suggestion: suggestions, word: origWord });
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
}

export default new TccController();
