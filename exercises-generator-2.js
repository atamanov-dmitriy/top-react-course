import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { paths, pathToPascalCase } from './src/consts.js';

const baseDir = join(process.cwd(), 'output');

// Шаблоны компонентов
const componentTemplate = (filename, prefix) =>
  `function ${filename}() {\n  return <div>${prefix}. ${filename}</div>;\n}\nexport default ${filename};`;

// 1. Генерация Файлов с упражнениями
async function generateExercises(paths, pathToPascalCase) {
  try {
    for (const { path, title, chapter, number } of paths) {
      const index = String(number).padStart(3, '0');
      const fileName = `${index}-${pathToPascalCase(path)}`;
      const itemFolder = join(baseDir, fileName);

      await mkdir(itemFolder, { recursive: true });
      await writeFile(
        join(itemFolder, `${fileName}.tsx`),
        componentTemplate(pathToPascalCase(path), index),
        'utf8',
      );

      console.log(
        `✅ Создана папка и файл: output/${fileName}/${fileName}.tsx`,
      );
    }
    console.log('\n🎉 Все персональные папки и файлы успешно созданы!');
  } catch (error) {
    console.error('❌ Произошла ошибка при генерации упражнений:', error);
  }
}

// 2. Генерация Индексного файла
async function createIndexFile(pathsList, pathToPascalCase) {
  const indexFilePath = join(baseDir, 'PathsList.tsx');

  try {
    await mkdir(baseDir, { recursive: true });

    // Предварительно готовим данные, чтобы не вызывать функции трансформации по много раз
    const preparedPaths = pathsList.map(({ path, number }) => {
      const index = String(number).padStart(3, '0');
      const fileName = `${index}-${pathToPascalCase(path)}`;
      return {
        path,
        fileName: pathToPascalCase(path),
        importStr: `import ${pathToPascalCase(path)} from './exercises/${fileName}/${fileName}';`,
      };
    });

    const routeImport = `import { Routes, Route } from 'react-router';`;
    const imports = preparedPaths.map((p) => p.importStr).join('\n');

    const routes = preparedPaths
      .map(
        (path) =>
          `      <Route path={'${path.path}'} element={<${path.fileName} />} />`,
      )
      .join('\n');

    const component = `function PathsList() {\n  return (\n    <Routes>\n${routes}\n    </Routes>\n  );\n}\nexport default PathsList;`;
    const fullContent = `${routeImport}\n\n${imports}\n\n${component}`;

    await writeFile(indexFilePath, fullContent, 'utf8');
    console.log(`✅ Создан общий файл со списком путей: output/PathsList.tsx`);
  } catch (error) {
    console.error('❌ Ошибка при создании файла со списком:', error);
  }
}

// Главная функция управления сборкой
async function main() {
  await generateExercises(paths, pathToPascalCase);
  await createIndexFile(paths, pathToPascalCase);
}

main();
