// theme toggle + persist
const toggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
if (saved === 'light' || (!saved && !prefersDark)) document.documentElement.classList.add('light');
toggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
  toggle.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
});
toggle.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';

// mobile nav
const burger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
burger?.addEventListener('click', () => {
  const open = mobileNav.hasAttribute('hidden') ? false : true;
  if (open) { mobileNav.setAttribute('hidden',''); burger.setAttribute('aria-expanded','false'); }
  else { mobileNav.removeAttribute('hidden'); burger.setAttribute('aria-expanded','true'); }
});

// intersection observer for reveal animations
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// year
document.getElementById('year').textContent = new Date().getFullYear();
