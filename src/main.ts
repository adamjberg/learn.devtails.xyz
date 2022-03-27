import fs from "fs";
import path from "path";
import { marked } from "marked";

const inputDirectory = "_posts";
const outputDirectory = "public";

const postFileNames = fs.readdirSync(inputDirectory);
for (const filename of postFileNames) {
  const parsedFilename = path.parse(filename);
  const fileContentsBuffer = fs.readFileSync(`${inputDirectory}/${filename}`);
  const htmlContent = marked(String(fileContentsBuffer));

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }
  fs.writeFileSync(`${outputDirectory}/${parsedFilename.name}.html`, htmlContent);
}
