import fs from "fs";
import path from "path";
import { marked } from "marked";

let htmlLinksToPosts = [];

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

    const cleanedTitle = parsedFilename.name
      .replace(/\d{1,}-/g, "")
      .replace("-", " ");
    const url = `${outputDirectory.replace("public", "")}/${parsedFilename.name}`
    const htmlLinkForPost = `<div><a href="${url}">${cleanedTitle}</a></div>`;
    htmlLinksToPosts.push(htmlLinkForPost);
  }
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
fs.writeFileSync(`public/index.html`, indexHtml);
