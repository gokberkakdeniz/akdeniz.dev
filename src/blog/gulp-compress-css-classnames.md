---
title: "Compress CSS class names with Gulp"
date: 2022-05-28
description: Compress CSS class names with Gulp and Generatorics
tagz:
  - css
  - gulp
  - class names
  - optimization
---

I was writing a small admin panel that served from [NodeMCU](https://nodemcu.readthedocs.io/en/release/). 
It has 4 MB of flash memory. I used Tailwind and plain HTML/JavaScript to develop the website. 
The build folder was **19.7 Kb** in total after minification, but I wanted to lower it as much as possible.

I found a combinatorics library named [generatorics](https://www.npmjs.com/package/generatorics) to generate a sequence of class names (a, b, c, ...). In the first step I collected all class names from HTML files, replaced them with names, and put them in the lookup table, then I read CSS files and replaced them with the value in the lookup table.

It reduced from **19.7 Kb** to **10.6 Kb**.

```js
const G = require('generatorics');

function withName(name, fn) {
  fn.displayName = name;

  return fn;
}

gulp.task("compress:classnames", async function () {
  const generator = G.baseNAll("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
  const classnames = {};

  function getClassName(classname) {
    if (!classnames[classname]) {
      classnames[classname] = generator.next().value.join('');
    }

    return classnames[classname];
  }

  return gulp.series(
    withName(
      "processHtmlFiles",
      () => gulp.src("../data/*.html")
        .pipe(replace(/class="(.*?)"/g, function handleReplace(match, p1, offset, string) {
          const classes = p1.split(" ").map(cls => getClassName(cls)).join(" ");
          return `class="${classes}"`;
        }))
        .pipe(gulp.dest("../data"))
    ),
    withName(
      "processCSSFiles",
      () => gulp.src("../data/*.css")
        .pipe(replace(/(?<=\.)[a-zA-Z0-9\\_\.-]+(?=\{)/g, function handleReplace(match, p1, offset, string) {
          return classnames[match.replace("\\", "")];
        }))
        .pipe(gulp.dest("../data"))
    ),
  )();
});
```

The full source code of Gulpfile with live server, html/js minification etc. can be found [here](https://github.com/gokberkakdeniz/iztech-ceng424-embedded-computer-systems/blob/master/dev/static/Gulpfile.js).



