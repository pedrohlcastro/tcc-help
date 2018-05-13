import fs from 'fs';
import path from 'path';
import async from 'async';
import scissors from 'scissors';
import { spawn } from 'child_process';
import pdfUtil from 'pdf-to-text';
/* eslint-disable */
import Nodehun from 'nodehun';
/* eslint-enable */
import db from '../config/db';


class TccController {
  constructor() {
    this.Tcc = db().models.Tcc;
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
}

export default new TccController();
