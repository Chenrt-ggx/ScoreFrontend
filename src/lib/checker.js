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

export function tableCheck(data, hook) {
  if (!(data instanceof Array)) {
    hook(false, '错误：表格内容转换失败');
    return false;
  } else {
    const base = [
      { from: '课程名称', to: 'name', transform: (i) => i },
      { from: '课程成绩', to: 'score', transform: (i) => parseFloat(i) },
      { from: '课程学分', to: 'credits', transform: (i) => parseFloat(i) },
      { from: '一般专业', to: 'optional', transform: (i) => (i === '是' ? true : i === '否' ? false : undefined) }
    ];
    data.forEach((i) => {
      base.forEach((j) => {
        if (i[j.from]) {
          i[j.to] = j.transform(i[j.from]);
          delete i[j.from];
        }
      });
    });
    return true;
  }
}

export function formatCheck(data, hook) {
  const checkItem = (item) => {
    return (
      isString(item['name']) &&
      inRange(item['name'].length, 1, 80) &&
      inRange(item['score'], 60, 100) &&
      inRange(item['credits'], 0.5, 10) &&
      isBool(item['optional'])
    );
  };
  const unique = new Set();
  for (let i = 0; i < data.length; ++i) {
    if (!checkItem(data[i])) {
      hook(false, '错误：第 ' + i + ' 项格式错误');
      return false;
    } else if (unique.has(data[i]['name'])) {
      hook(false, '错误：存在重复的' + data[i]['name']);
      return false;
    }
    unique.add(data[i]['name']);
  }
  return true;
}
