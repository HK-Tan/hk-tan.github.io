/* Nav dropdowns (e.g. CV/Resume): open/close on click or tap, close on outside
   click or Esc. Kept in its own file rather than inline in scripts.html: the
   live site squeezes each HTML page onto one line (_layouts/compress.html), so
   an inline "//" comment would comment out everything after it. */
document.addEventListener('click', function (e) {
  var toggle = e.target.closest('.masthead__menu-item--dropdown > a');
  document.querySelectorAll('.masthead__menu-item--dropdown.open').forEach(function (item) {
    if (!toggle || item !== toggle.parentElement) item.classList.remove('open');
  });
  if (toggle) {
    e.preventDefault();
    toggle.parentElement.classList.toggle('open');
  }
});
document.addEventListener('keydown', function (e) {
  var toggle = e.target.closest && e.target.closest('.masthead__menu-item--dropdown > a');
  if (toggle && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    toggle.parentElement.classList.toggle('open');
  } else if (e.key === 'Escape') {
    document.querySelectorAll('.masthead__menu-item--dropdown.open').forEach(function (item) {
      item.classList.remove('open');
    });
  }
});
