
(function () {
  // The order here = the order the links appear.
  var pages = [
    { href: 'index.html',     label: 'Home' },
    { href: 'projects.html',  label: 'Projects' },
    { href: 'paintings.html', label: 'Paintings' }
    
  ];

  function buildNav() {
   
    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    var nav = document.createElement('nav');
    nav.className = 'bz-nav';
    nav.setAttribute('aria-label', 'Primary');

    pages.forEach(function (p, i) {
      if (i > 0) {
        var sep = document.createElement('span');
        sep.className = 'sep';
        sep.textContent = '|';
        nav.appendChild(sep);
      }
      var a = document.createElement('a');
      a.href = p.href;
      a.textContent = p.label;
      if (p.href.toUpperCase() === current) a.classList.add('active');
      nav.appendChild(a);
    });
    return nav;
  }

  function inject() {
    // Find the first nav container present on this page (web preferred, mobile fallback).
    // Filling only one prevents the nav from rendering twice on old pages that still have both empty divs.
    var host = document.getElementById('port-nav-web') || document.getElementById('port-nav-mobile');
    if (!host) return;
    host.innerHTML = '';
    host.appendChild(buildNav());

    // Hide the other one if it exists (so older pages don't show an empty gap).
    var other = (host.id === 'port-nav-web')
      ? document.getElementById('port-nav-mobile')
      : document.getElementById('port-nav-web');
    if (other) other.style.display = 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
