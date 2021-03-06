import fs from "fs";
import path from "path";
import { marked } from "marked";
const prism = require("prismjs");

require("prismjs/components/prism-javascript");
require("prismjs/components/prism-diff");

marked.setOptions({
  highlight: (code, lang) => {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  },
});

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

    const directoryWithoutPublic = outputDirectory.replace("public", "");
    const breadcrumbs = directoryWithoutPublic.split("/");
    const breadCrumbLinks = breadcrumbs.map((crumbName) => {
      return `<a href="${directoryWithoutPublic}">${crumbName}</a>`;
    });

    const htmlContent = `
    <html lang="en">
    <head>
      <title>${parsedFilename.name}</title>
      <link rel="stylesheet" href="/static/css/styles.css"/>
      <link rel="stylesheet" href="/static/css/prism.css"/>
    </head>
    <body>
      <a href="/">home</a>${breadCrumbLinks.join("/")}
      ${marked(String(fileContentsBuffer))}
    </body>
    </html>
    `;

    const outputFilename = `${parsedFilename.name}.html`;
    fs.writeFileSync(`${outputDirectory}/${outputFilename}`, htmlContent);
  }
}
