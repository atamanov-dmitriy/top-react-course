import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const paths = [
  '/basis/intro',
  '/basis/install',
  '/basis/devtools',
  '/basis/component-way',
  '/basis/site-layout',
  '/basis/component-result',
  '/jsx/intro',
  '/jsx/returning/nested',
  '/jsx/returning/down',
  '/jsx/returning/several',
  '/jsx/returning/unclosed',
  '/jsx/returning/empty',
  '/jsx/variables/inserting',
  '/jsx/variables/nuances',
  '/jsx/variables/arrays',
  '/jsx/variables/objects',
  '/jsx/variables/attributes',
  '/jsx/tags/intro',
  '/jsx/tags/several',
  '/jsx/tags/multi-line',
  '/jsx/tags/return',
  '/jsx/tags/closing',
  '/jsx/tags/correctness',
  '/jsx/running-code',
  '/conditions/intro',
  '/conditions/show',
  '/conditions/return',
  '/conditions/ternary',
  '/conditions/logical-and',
  '/conditions/inverting',
  '/functions/intro',
  '/functions/tags-calling',
  '/functions/handlers',
  '/functions/handlers-params',
  '/functions/event-object',
  '/functions/event-object-params',
  '/forming/tags-array',
  '/forming/loop-tags-array',
  '/forming/tags-array-data',
  '/forming/array-keys',
  '/forming/array-of-objects',
  '/forming/unique-keys-id',
  '/forming/table',
  '/id/intro',
  '/id/problem',
  '/id/random-strings',
  '/id/generation',
  '/id/function',
  '/id/function-using',
  '/id/function-wrong-using',
  '/states/intro',
  '/states/using',
  '/states/reactivity',
  '/states/boolean-value',
  '/states/counter',
  '/forms/input/intro',
  '/forms/input/output',
  '/forms/input/function',
  '/forms/input/several',
  '/forms/data',
  '/forms/textarea',
  '/forms/checkbox/intro',
  '/forms/checkbox/conditional-rendering',
  '/forms/select/intro',
  '/forms/select/array',
  '/forms/select/value',
  '/forms/select/array-value',
  '/forms/radio',
  '/forms/default-values',
  '/forms/array-inputs-binding',
  '/forms/object-inputs-binding',
  '/data/intro',
  '/data/array-adding',
  '/data/array-operations',
  '/data/objects-array-adding',
  '/data/objects-array-operations',
  '/data/showing',
  '/components/intro',
  '/components/using',
  '/components/multiple-instances',
  '/components/props',
  '/components/child',
  '/components/child-array',
  '/components/child-loop',
  '/components/passing-states',
  '/components/passing-id',
  '/components/changing-parent-state',
  '/components/editing-parent-state',
  '/components/editing-grandparent-state',
  '/components/modes-via-states',
  '/concepts/intro',
  '/concepts/data',
  '/concepts/components-types',
  '/concepts/data-flow',
  '/concepts/lifting-state-up',
  '/concepts/truth-one-source',
  '/styling/intro',
  '/styling/global-css',
  '/styling/object-to-style',
  '/styling/common-file-to-style',
  '/styling/styles-in-style',
  '/styling/variables-to-style',
  '/styling/styled-components',
  '/styling/styled-components-props',
  '/styling/styled-components-conditional',
  '/styling/styled-components-extending',
  '/styling/css-modules-start',
  '/styling/css-modules-finish',
  '/styling/css-modules-composes-styles',
  '/styling/css-modules-composes-files',
  '/project/checklist',
  '/project/notepad',
];

const pathToPascalCase = (path) => {
  let result = '';

  for (let i = 0; i < path.length; i++) {
    let char = path[i];

    if (char === '/' || char === '-') {
      continue;
    }

    if (i === 0 || path[i - 1] === '/' || path[i - 1] === '-') {
      result += char.toUpperCase();
      continue;
    }

    result += char;
  }

  return result;
};

const componentTemplate = (filename, prefix) => {
  return `function ${filename}() {
  return <div>${prefix}. ${filename}</div>;
}

export default ${filename};`;
};

async function createStructures(filesToCreate) {
  const baseDir = join(process.cwd(), 'output');

  try {
    const creationPromises = filesToCreate.map(async (name, index) => {
      const number = String(index + 1).padStart(3, '0');
      const fileName = `${number}-${name}`;

      const itemFolder = join(baseDir, fileName);
      const filePath = join(itemFolder, `${fileName}.jsx`);
      const content = componentTemplate(name, index + 1);

      await mkdir(itemFolder, { recursive: true });

      await writeFile(filePath, content, 'utf8');
      console.log(
        `✅ Создана папка и файл: output/${fileName}/${fileName}.jsx`,
      );
    });

    await Promise.all(creationPromises);
    console.log('\n🎉 Все персональные папки и файлы успешно созданы!');
  } catch (error) {
    console.error('❌ Произошла ошибка:', error);
  }
}

const importTemplate = (filename, prefix) => {
  return `import ${filename} from './exercises/${prefix + filename}/${prefix + filename}';`;
};

async function createIndexFile(paths, pathToPascalCase) {
  const baseDir = join(process.cwd(), 'output');
  const indexFilePath = join(baseDir, 'PathsList.jsx');

  try {
    await mkdir(baseDir, { recursive: true });

    const routeImport = `import { Routes, Route } from 'react-router';`;
    const imports = paths
      .map((path, index) => {
        const filename = pathToPascalCase(path);
        return importTemplate(
          filename,
          `${String(index + 1).padStart(3, '0')}-`,
        );
      })
      .join('\n');

    const component = `function PathsList() {
  return (
    <Routes>\n${paths
      .map((path, index) => {
        const filename = pathToPascalCase(path);
        return `${' '.repeat(6)}<Route path={'${path}'} element={<${filename} />} />`;
      })
      .join('\n')}
    </Routes>
  );
}

export default PathsList;`;

    const fullContent = `${routeImport}\n\n${imports}\n\n${component}`;

    await writeFile(indexFilePath, fullContent, 'utf8');
    console.log(`✅ Создан общий файл со списком путей: output/paths-list.js`);
  } catch (error) {
    console.error('❌ Ошибка при создании файла со списком:', error);
  }
}

async function createLinksFile(paths, pathToPascalCase) {
  const baseDir = join(process.cwd(), 'output');
  const indexFilePath = join(baseDir, 'Links.jsx');

  try {
    await mkdir(baseDir, { recursive: true });

    const routeImport = /* HTML */ `import { Link } from 'react-router';`;

    const component = /* HTML */ `function Links() { return (
      <div>
        ${paths
          .map((path, index) => {
            return `${' '.repeat(6)}<Link to={'${path}'}>${index + 1}</Link>{' '}`;
          })
          .join('\n')}
      </div>
      ); } export default Links;`;

    const fullContent = `${routeImport}\n\n${component}`;

    await writeFile(indexFilePath, fullContent, 'utf8');
    console.log(`✅ Создан общий файл со списком путей: output/links.js`);
  } catch (error) {
    console.error('❌ Ошибка при создании файла со списком:', error);
  }
}

// Корректный запуск обеих операций последовательно
async function main() {
  const pascalCaseNames = paths.map(pathToPascalCase);

  // await createStructures(pascalCaseNames);
  // await createIndexFile(paths, pathToPascalCase);
  await createLinksFile(paths, pathToPascalCase);
}

main();
