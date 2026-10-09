import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { paths } from './src/consts';

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

export { paths, pathToPascalCase };
