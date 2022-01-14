// @ts-nocheck
/* eslint-disable */
export default function (xml) {
  const reg = /(>)\s*(<)(\/*)/g;
  const wsexp = / *(.*) +\n/g;
  const contexp = /(<.+>)(.+\n)/g;
  xml = xml
    .replace(reg, '$1\n$2$3')
    .replace(wsexp, '$1\n')
    .replace(contexp, '$1\n$2');
  let formatted = '';
  const lines = xml.split('\n');
  let indent = 0;
  let lastType = 'other';
  const transitions = {
    'single->single': 0,
    'single->closing': -1,
    'single->opening': 0,
    'single->other': 0,
    'closing->single': 0,
    'closing->closing': -1,
    'closing->opening': 0,
    'closing->other': 0,
    'opening->single': 1,
    'opening->closing': 0,
    'opening->opening': 1,
    'opening->other': 1,
    'other->single': 0,
    'other->closing': -1,
    'other->opening': 0,
    'other->other': 0,
  };

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];

    if (ln.match(/\s*<\?xml/)) {
      formatted += `${ln}\n`;
      continue;
    }
    const x = typeof transitions;
    const single = Boolean(ln.match(/<.+\/>/));
    const closing = Boolean(ln.match(/<\/.+>/));
    const opening = Boolean(ln.match(/<[^!].*>/));
    const type = single
      ? 'single'
      : closing
        ? 'closing'
        : opening
          ? 'opening'
          : 'other';
    const fromTo = `${lastType}->${type}`;
    lastType = type;
    let padding = '';

    indent += transitions[fromTo];
    for (let j = 0; j < indent; j++) {
      padding += '\t';
    }
    if (fromTo == 'opening->closing') formatted = `${formatted.substr(0, formatted.length - 1) + ln}\n`;
    else formatted += `${padding + ln}\n`;
  }

  return formatted;
}
