function waitSunAndMoon(callback) {
  if (document.querySelector("#sun") === null || document.querySelector("#moon") === null) {
    return requestAnimationFrame(waitSunAndMoon.bind(this, callback));
  }

  return callback();
};

function getTheme() {
  if (window) {
    if (window.localStorage) {
      const theme = localStorage.getItem("theme");

      if (typeof theme === "string" && (theme === "dark" || theme === "light")) {
        return theme;
      }
    }

    if (window.matchMedia) {
      const isDark = matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "dark" : "light"
    }
  }

  return "dark";
}

function setIcon(theme) {
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");

  if (theme === "dark") {
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
  } else {
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
  }
}

function setTheme(theme, persist = true) {
  const root = document.documentElement;

  root.classList.remove(theme === "dark" ? "light" : "dark");
  root.classList.add(theme);

  if (persist) localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(theme);
  setIcon(theme);
}

const theme = getTheme();
setTheme(theme, false);

waitSunAndMoon(function() {
  setIcon(theme);
});