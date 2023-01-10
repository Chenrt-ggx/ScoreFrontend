export const readAsBlob = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      resolve(event.target.result);
    };
  });
};

export const readAsText = (file, encoding) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(file, encoding);
    reader.onload = (event) => {
      resolve(event.target.result);
    };
  });
};

export const getEncoding = async (file) => {
  const lib = require('jschardet');
  const blob = await readAsBlob(file);
  return lib.detect(blob).encoding;
};

export const readJsonFile = async (file, hook) => {
  try {
    let encoding = await getEncoding(file);
    encoding = encoding === 'UTF-8' ? encoding : 'GBK';
    const data = await readAsText(file, encoding);
    return JSON.parse(data.toString());
  } catch (exception) {
    hook(false, '错误：JSON 未成功解析');
    return false;
  }
};

export const readTableFile = async (file, hook) => {
  const lib = require('xlsx');
  const blob = await readAsBlob(file);
  const table = lib.read(blob, { type: 'binary' });
  if (table['Strings'] === undefined) {
    hook(false, '错误：表格文件未成功解析');
    return false;
  } else if (table.SheetNames.length !== 1) {
    hook(false, '错误：工作表不唯一');
    return false;
  }
  return lib.utils.sheet_to_json(table.Sheets[table.SheetNames[table.SheetNames.length - 1]]);
};
