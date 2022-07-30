const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const prettier = require("prettier");
const Nunjucks = require("nunjucks");
const fs = require('fs');

module.exports = function (eleventyConfig) {
  const nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes")
  );

  eleventyConfig.addNunjucksFilter("render", function (input) {
    return nunjucksEnvironment.renderString(input, this.getVariables())
  });

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
  
  fs.readdirSync("./plugins").forEach(filename => {
    const path = './plugins/' + filename;
    // delete require.cache[require.resolve(path)];

    if (filename.endsWith(".filter.js")) {
      const name = filename.slice(0, -10);

      eleventyConfig.addFilter(name, require(path));

      console.log(`[plugins] ${name} added (filter).`);
    } else if (filename.endsWith(".global.js")) {
      const name = filename.slice(0, -10);

      eleventyConfig.addNunjucksGlobal(name, require(path));

      console.log(`[plugins] ${name} added (njk global).`);
    }
  });

  fs.readdirSync("./shortcodes").forEach(filename => {
    if (filename.endsWith(".js")) {
      const path = './shortcodes/' + filename;
      // delete require.cache[require.resolve(path)];

      const fileName = filename.slice(0, -3);
      const { 
        callback, 
        name = fileName, 
        isAsync = false, 
        isPaired = false 
      } = require(path);
      const method = "add" + (isAsync ? "Async" : "") + (isPaired ? "Paired" : "") + "Shortcode";

      eleventyConfig[method](name, callback);

      console.log(`[shortcodes] ${name} added (paired: ${isPaired}, async: ${isAsync}).`);  
    }  
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({ "public": "/" });

  eleventyConfig.addLayoutAlias("default", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("generative", "layouts/generative.njk");

  eleventyConfig.addTransform("prettier", function (content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      return prettier.format(content, { parser: "html", printWidth: Infinity });
    }

    return content || "\u200C";
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    },
    passthroughCopy: true,
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};