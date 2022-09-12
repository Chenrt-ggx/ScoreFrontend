const isBool = (item) => {
  return item === true || item === false;
};

const isString = (item) => {
  return typeof item === 'string';
};

const inRange = (item, l, r) => {
  return typeof item === 'number' && l <= item && item <= r;
};

export function jsonCheck(data, hook) {
  if (!(data instanceof Array)) {
    hook(false, '错误：JSON 内容非数组');
    return false;
  } else {
    return true;
  }
}

export function formatTable(data, hook) {
  console.log(data);
  console.log(hook);
}

export function formatCheck(data, hook) {
  const checkItem = (item) => {
    return isString(item['name'])
      && inRange(item['score'], 60, 100)
      && inRange(item['credits'], 0.5, 10)
      && isBool(item['optional']);
  };
  for (let i = 0; i < data.length; ++i) {
    if (!checkItem(data[i])) {
      hook(false, '错误：第 ' + i + ' 项格式错误');
      return false;
    }
  }
  return true;
}
