import fs from 'fs';
import crypto from 'crypto';
import File from '../../answer.json';
import api from '../services/api';

class DecodeController {
  async index(req, res) {
    const response = await api.get();

    const answer = response.data;
    const answerJson = JSON.stringify(answer, null, 2);

    fs.writeFile('answer.json', answerJson, (err) => {
      if (err) throw err;
      console.log('saved');
    });

    return res.json({ answer });
  }

  async store(req, res) {
    const alfabeto = ['a','b','c','d','e', 'f','g','h','i','j','k','l','m','n','o','p','q', 'r', 's', 't', 'u','v','w', 'x','y','z',];   //eslint-disable-line
    const alfabetoTamanho = alfabeto.length;

    // consultando answer.json
    const file = File;

    const numero = file.numero_casas;
    const cifra = file.cifrado.toLowerCase();
    const cifraTamanho = cifra.length;
    let { decifrado } = file;
    const textoDecifrado = [];

    for (let i = 0; i < cifraTamanho; i++) {
      if (cifra[i] !== '.') {
        for (let j = 0; j < alfabetoTamanho; j++) {
          if (cifra[i] == alfabeto[j]) {
            textoDecifrado[i] = alfabeto[(j - numero) % alfabetoTamanho];

            break;
          }
          textoDecifrado[i] = ' ';
        }
      } else {
        textoDecifrado[i] = '.';
      }
    }

    decifrado = textoDecifrado.join('');
    const hash = crypto.createHash('sha1');
    const data = hash.update(decifrado);
    const gen_hash = data.digest('hex');

    const answerJson = JSON.parse(fs.readFileSync('answer.json', 'utf8'));

    answerJson.decifrado = decifrado;
    answerJson.resumo_criptografico = gen_hash;

    fs.writeFileSync('answer.json', JSON.stringify(answerJson, null, 2));

    return res.json({ file });
  }
}

export default new DecodeController();
