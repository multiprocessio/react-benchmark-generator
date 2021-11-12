const fs = require('fs');
const faker = require('faker');

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.substring(1);
}

function randomInt(low, high) {
  return Math.max(Math.floor(Math.random() * (high - low + 1) + low), 0);
}

function randomWords(low, high, sep) {
  const words = faker.lorem.words(randomInt(low, high)).split(' ');
  if (sep) {
    return words.join(sep);
  }

  return words;
}

const PROPS = {
  className: () => randomWords(1, 5, '-'),
  id: () => randomWords(1, 5, '-'),
  title: () => randomWords(1, 5, ' '),
};

function generateHTML(customComponents, maxChildren) {
  if (maxChildren === 0) {
    return;
  }

  const elements = ['div', 'span', ...customComponents];

  const tag = elements[randomInt(0, elements.length - 1)];

  const props = [];
  const nProps = randomInt(0, Object.keys(PROPS).length);
  while (props.length < nProps) {
    const prop = Object.keys(PROPS)[props.length];
    props.push({
      prop,
      value: PROPS[prop](),
    });
  }

  const html = {
    tag,
    props,
    children: [],
  };

  const nChildren = randomInt(1, maxChildren);
  let tries = 0;
  while (tries < nChildren) {
    let children = '';
    if (Math.random() < .75) {
      children = generateHTML(customComponents, randomInt(0, Math.floor(maxChildren / 2)));
      if (!children) {
	continue;
      }
    } else {
      children = faker.lorem.paragraph(randomInt(3, 20));
    }

    html.children.push(children);
    tries++;
  }

  return html;
}

function renderHTML(tree, indent) {
  if (typeof tree === 'string') {
    return tree;
  }

  const children = tree.children.length ? tree.children.map(c => renderHTML(c, indent + '  ')) : [];
  let props = tree.props.map(p => `${p.prop}="${p.value}"`).join(' ');
  if (props) {
    props = ' ' + props;
  }
  return `${indent}<${tree.tag}${props}>\n${children.join('\n')}${(children.length ? '\n' : '') + indent}</${tree.tag}>`;
}

function generateComponent(name, customChildren = [], nChildren = 20) {
  const tree = generateHTML(customChildren, nChildren);
  const body = renderHTML(tree, '    ');
  return `function ${name}() {\n  return (\n${body}\n  );\n}`;
}

const [rootComponent, ...components] = [...Array(20).keys()].map(name => randomWords(2, 5).map(capitalize).join(''));
const deps = components.map((c) => generateComponent(c));
const root = generateComponent(rootComponent, components);
fs.writeFileSync(rootComponent + '.jsx', [deps, root].join('\n'));
