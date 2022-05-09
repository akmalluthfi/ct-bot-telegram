const pdf = require('pdf-creator-node');
const fs = require('fs');

const file = fs.readFileSync('./data/my.html', 'utf-8');

const option = {
  format: 'A4',
  orientation: 'potrait',
  border: '10mm',
};

const document = {
  html: file,
  data: { test: 'akmal' },
  path: './data/output.pdf',
  type: '',
};

pdf
  .create(document, option)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
