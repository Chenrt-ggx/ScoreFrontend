export function readAsBlob(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      resolve(event.target.result);
    };
  });
}

export function readAsText(file, encoding) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(file, encoding);
    reader.onload = (event) => {
      resolve(event.target.result);
    };
  });
}

export async function getEncoding(file) {
  const lib = require('jschardet');
  const blob = await readAsBlob(file);
  return lib.detect(blob).encoding;
}

export async function readJsonFile(file, hook) {
  try {
    let encoding = await getEncoding(file);
    encoding = encoding === 'UTF-8' ? encoding : 'GBK';
    const data = await readAsText(file, encoding);
    return JSON.parse(data.toString());
  } catch (exception) {
    hook(false, '错误：JSON 未成功解析');
    return false;
  }
}
