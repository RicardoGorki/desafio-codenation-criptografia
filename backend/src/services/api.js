import axios from 'axios';
import 'dotenv/config';
import FormData from 'form-data';
import fs from 'fs';

const form = new FormData();
form.append('file', fs.createReadStream(`answer.json`), {
  filename: 'answer.json',
});

const api = axios
  .create(
    {
      method: 'get',
      baseURL: `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${process.env.SEU_TOKEN}`,
    },
    {
      headers: form.getHeaders(),
    }
  )
  .post(
    `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${process.env.SEU_TOKEN}`,
    form
  )
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    if (error.response) {
      console.log(error.response);
    }
    console.log(error.message);
  });

export default api;
