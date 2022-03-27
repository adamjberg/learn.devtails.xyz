import fs from "fs";
import path from "path";
import { marked } from "marked";

const inputDirectory = "_posts";
const outputDirectory = "public";

let htmlLinksToPosts = [];

const postDirents = fs.readdirSync(inputDirectory, { withFileTypes: true });
for (const dirent of postDirents) {
  if (dirent.isDirectory()) {
    continue;
  }

  const parsedFilename = path.parse(dirent.name);
  const fileContentsBuffer = fs.readFileSync(`${inputDirectory}/${parsedFilename.base}`);
  const htmlContent = marked(String(fileContentsBuffer));

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }
  const outputFilename = `${parsedFilename.name}.html`;
  fs.writeFileSync(`${outputDirectory}/${outputFilename}`, htmlContent);

  const cleanedTitle = parsedFilename.name
    .replace(/\d{1,}-/g, "")
    .replace("-", " ");
  const htmlLinkForPost = `<div><a href="${parsedFilename.name}">${cleanedTitle}</a></div>`;
  htmlLinksToPosts.push(htmlLinkForPost);
}

const indexHtml = `
<html lang="en">
<head>
  <title>Learn | DevTails</title>
</head>
<body>
  ${htmlLinksToPosts.join("\n")}
</body>
</html>
`;
fs.writeFileSync(`${outputDirectory}/index.html`, indexHtml);
