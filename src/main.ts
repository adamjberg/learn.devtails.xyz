import fs from "fs";
import path from "path";
import { marked } from "marked";

traverseDirectory("_posts", "public");

function traverseDirectory(directory: string, outputDirectory: string) {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  const postDirents = fs.readdirSync(directory, { withFileTypes: true });
  for (const dirent of postDirents) {
    if (dirent.isDirectory()) {
      const newOutputDirectory = `${outputDirectory}/${dirent.name}`;
      traverseDirectory(`${directory}/${dirent.name}`, newOutputDirectory);
      continue;
    }

    const parsedFilename = path.parse(dirent.name);
    const fileContentsBuffer = fs.readFileSync(
      `${directory}/${parsedFilename.base}`
    );
    const htmlContent = marked(String(fileContentsBuffer));

    const outputFilename = `${parsedFilename.name}.html`;
    fs.writeFileSync(`${outputDirectory}/${outputFilename}`, htmlContent);
  }
}