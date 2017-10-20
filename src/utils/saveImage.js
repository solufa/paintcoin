const { saveAs } = require('file-saver');
const platform = require('platform');

export default function (blob, name) {
  if (platform.name === 'Safari') {
    const form = new FormData();
    form.append('file', blob);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', './download');
    xhr.onload = (e) => {
      const json = JSON.parse(e.target.response);
      location.href = `./download/${json.tmp_name}/${name}`;
    };
    xhr.send(form);
  } else saveAs(blob, name);
}
