function injectComments() {
  const comments = document.getElementById("comments");
  const script = document.createElement("script");
  const theme = getTheme() === "dark" ? "dark-blue" : "github-light";

  script.async = true;
  script.setAttribute("src", "https://utteranc.es/client.js");
  script.setAttribute("repo", "gokberkakdeniz/akdeniz.dev-blog-comments");
  script.setAttribute("issue-term", "title");
  script.setAttribute("label", "comment");
  script.setAttribute("theme", theme);
  script.setAttribute("crossorigin", "anonymous");

  while (comments.firstChild) {
    comments.firstChild.remove();
  }

  comments.appendChild(script);
}

function injectPrismStyle() {
  const themeName = getTheme() === "dark" ? "prism-okaidia" : "prism";
  const href = "https://unpkg.com/prismjs@1.24.1/themes/" + themeName + ".css";
  document.querySelector("link#prism").setAttribute("href", href);
}

function setupPost() {
  const root = document.documentElement;
  
  function setup() {
    injectPrismStyle();
    injectComments();
  }

  if (window && window.MutationObserver) {
    const observer = new window.MutationObserver(setup);
  
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false
    });
  }

  setup();
}