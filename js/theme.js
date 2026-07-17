(function () {
  var KEY = 'ptk_theme';

  function systemTheme() {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
  }

  function current() {
    return document.documentElement.getAttribute('data-theme') || localStorage.getItem(KEY) || systemTheme();
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f6fb' : '#0b0d12');
  }

  function toggle() {
    var next = current() === 'light' ? 'dark' : 'light';
    localStorage.setItem(KEY, next);
    apply(next);
  }

  function init() {
    apply(current());
    var btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  // Keep other open tabs in sync when the theme is toggled in one of them.
  window.addEventListener('storage', function (e) {
    if (e.key === KEY && e.newValue) apply(e.newValue);
  });

  window.PtkTheme = { init: init, toggle: toggle, current: current };
  document.addEventListener('DOMContentLoaded', init);
})();
