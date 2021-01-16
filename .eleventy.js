const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

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