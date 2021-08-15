const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const prettier = require("prettier");
const fs = require('fs');

module.exports = function (eleventyConfig) {
  fs.readdirSync("./plugins").forEach(filename => {
    if (filename.endsWith(".filter.js")) {
      const name = filename.slice(0, -10);

      eleventyConfig.addFilter(
        filename.slice(0, -10),
        require('./plugins/' + filename)
      );

      console.log(`[plugins] ${name} added (filter).`);
    } else if (filename.endsWith(".global.js")) {
      const name = filename.slice(0, -10);

      eleventyConfig.addNunjucksGlobal(
        name,
        require('./plugins/' + filename)
      );

      console.log(`[plugins] ${name} added (njk global).`);
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