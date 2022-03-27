import fs from "fs";
import path from "path";
import { marked } from "marked";

const inputDirectory = "_posts";
const outputDirectory = "public";

let htmlLinksToPosts = [];

const postFileNames = fs.readdirSync(inputDirectory);
for (const filename of postFileNames) {
  const parsedFilename = path.parse(filename);
  const fileContentsBuffer = fs.readFileSync(`${inputDirectory}/${filename}`);
  const htmlContent = marked(String(fileContentsBuffer));

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }
  const outputFilename = `${parsedFilename.name}.html`;
  fs.writeFileSync(`${outputDirectory}/${outputFilename}`, htmlContent);

  const cleanedTitle = parsedFilename.name
    .replace(/\d{1,}-/g, "")
    .replace("-", " ");
  const htmlLinkForPost = `<a href="${filename}">${cleanedTitle}</a>`;
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
