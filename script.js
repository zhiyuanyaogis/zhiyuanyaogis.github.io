const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
const publicationButton = document.querySelector('.filter-button');
const publicationList = document.querySelector('.publication-list');

document.querySelector('#year').textContent = new Date().getFullYear();
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12), { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

publicationButton.addEventListener('click', () => {
  const open = publicationButton.getAttribute('aria-expanded') === 'true';
  publicationButton.setAttribute('aria-expanded', String(!open));
  publicationButton.firstChild.textContent = open ? 'View all publications ' : 'Show selected publications ';
  publicationList.classList.toggle('show-all', !open);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
