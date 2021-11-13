const path = require('path');
const fs = require('fs');
const faker = require('faker');

const flags = ['--outdir', '--maxchildren', '--maxcomponents', '--nfiles', '--depth'];
const args = {};
for (let i = 0; i < process.argv.length; i++) {
  const arg = process.argv[i];

  if (flags.indexOf(arg) !== -1 && i < process.argv.length - 1) {
    if (process.argv[i+1].startsWith('--')) {
      args[arg.replace('--', '')] = true;
      continue;
    }

    args[arg.replace('--', '')] = process.argv[i+1];
    i++;
  }
}

if (!args.outdir) {
  console.log('Must specify `--outdir X`');
  process.exit(1);
}

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

  const elements = ['div', 'span', 'p', ...customComponents];

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

function generateComponent(name, toExport = false, customChildren = [], maxChildren = 20) {
  const tree = generateHTML(customChildren, maxChildren);
  const body = renderHTML(tree, '    ');
  return `${toExport ? 'export ' : ''}function ${name}() {\n  return (\n${body}\n  );\n}`;
}

function generateFile(directory, maxComponents, maxChildren) {
  maxComponents = maxChildren || 20;
  maxChildren = maxChildren || 20;

  const [rootComponent, ...components] = [...Array(maxComponents).keys()].map(name => randomWords(2, 5).map(capitalize).join(''));
  const deps = components.map((c) => generateComponent(c, false, [], maxChildren));
  const root = generateComponent(rootComponent, true, components, maxChildren);

  const imports = ['import React from "react";'].join('\n');

  fs.mkdir(directory, { recursive: true }, () => {});
  fs.writeFileSync(path.join(directory, rootComponent + '.jsx'), [imports, ...deps, root].join('\n\n'));

  return rootComponent;
}

function generateIndex(directory, components) {
  const imports = ['import React from "react";'];
  const justTheNames = components.map(function addImport(c) {
    let directory = ".";
    let file = c;
    if (c.directory) {
      directory = c.directory;
      file = c.file;
      c = c.import;
    }
    imports.push(`import { ${c} } from '${directory}/${file}.jsx';`);
    return c;
  });

  const exportName = randomWords(1, 3).map(capitalize).join('');
  const root = generateComponent(exportName, true, justTheNames, justTheNames.length);

  fs.writeFileSync(path.join(directory, 'index.jsx'), [imports.join('\n'), root].join('\n\n'));
  return exportName;
}

function generateDirectory(directory, depth, nFiles) {
  const components = [];
  for (let i = 0; i < (nFiles || 1); i++) {
    const component = generateFile(directory, +args.maxcomponents, +args.maxchildren);
    components.push(component);
  }

  if (depth > 0) {
    const subdir = randomWords(1, 1)
    const root = generateDirectory(directory + "/" + subdir, depth-1, nFiles);
    components.push({
      directory: "./" + subdir,
      import: root,
      file: 'index',
    });
  }

  return generateIndex(directory, components);
}

generateDirectory(args.outdir, +args.depth || 0, +args.nfiles || 20);
