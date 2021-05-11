const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const prettier = require("prettier");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({ "public": "/" });

  eleventyConfig.addLayoutAlias("default", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("generative", "layouts/generative.njk");

  eleventyConfig.addFilter(
    'dateFormat',
    require('./plugins/dateFormat.js')
  );

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return prettier.format(content, { parser: "html", printWidth: Infinity });
    } else {
      return content;
    }
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