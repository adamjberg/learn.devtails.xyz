# Notes App

```diff
index 5774544..eca97f8 100644
--- a/src/main.ts
+++ b/src/main.ts
@@ -1,6 +1,20 @@
 import fs from "fs";
 import path from "path";
 import { marked } from "marked";
+const prism = require("prismjs");
+
+require("prismjs/components/prism-javascript");
+require("prismjs/components/prism-diff");
+
+marked.setOptions({
+  highlight: (code, lang) => {
+    if (prism.languages[lang]) {
+      return prism.highlight(code, prism.languages[lang], lang);
+    } else {
+      return code;
+    }
+  },
+});
 
 traverseDirectory("_posts", "public");
 
@@ -33,6 +47,7 @@ function traverseDirectory(directory: string, outputDirectory: string) {
     <head>
       <title>${parsedFilename.name}</title>
       <link rel="stylesheet" href="/static/css/styles.css"/>
+      <link rel="stylesheet" href="/static/css/prism.css"/>
     </head>
     <body>
       <a href="/">home</a>${breadCrumbLinks.join("/")}
```