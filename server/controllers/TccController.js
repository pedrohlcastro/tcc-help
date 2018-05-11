import fs from 'fs';
import path from 'path';
/* eslint-disable */
import Nodehun from 'nodehun';
/* eslint-enable */
import db from '../config/db';


class TccController {
  constructor() {
    this.Tcc = db().models.Tcc;
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
