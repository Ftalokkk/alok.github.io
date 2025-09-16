// script.js
(function () {
	const root = document.documentElement;
	const toggle = document.querySelector('.mode-toggle');
	const navToggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');
	const yearEl = document.getElementById('year');

	// Persisted theme
	const stored = localStorage.getItem('pref-theme');
	const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
	if (stored === 'light' || (!stored && prefersLight)) root.classList.add('light');

	function setTheme(mode) {
		if (mode === 'light') root.classList.add('light');
		else root.classList.remove('light');
		localStorage.setItem('pref-theme', mode);
	}

	toggle.addEventListener('click', () => {
		const isLight = root.classList.toggle('light');
		localStorage.setItem('pref-theme', isLight ? 'light' : 'dark');
	});

	// Mobile nav toggle
	if (navToggle) {
		navToggle.addEventListener('click', () => {
			const shown = navLinks.classList.toggle('show');
			navToggle.setAttribute('aria-expanded', String(shown));
		});
		navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
			navLinks.classList.remove('show');
			navToggle.setAttribute('aria-expanded', 'false');
		}));
	}

	// Scroll reveal
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		}
	}, { threshold: 0.15 });

	document.querySelectorAll('.section-observe').forEach(el => observer.observe(el));

	// Staggered animation for skills
	document.querySelectorAll('.skill-card').forEach(card => {
		const delay = Number(card.getAttribute('data-delay') || 0);
		card.style.animationDelay = `${delay}ms`;
	});

	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', (e) => {
			const id = link.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector(id);
			if (target) {
				e.preventDefault();
				window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' });
				history.pushState(null, '', id);
			}
		});
	});

	// Footer year
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	// Demo form handler (prevent real submit)
	const form = document.querySelector('.contact-form');
	if (form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const name = form.querySelector('#name')?.value || 'there';
			alert(`Thanks, ${name}! Your message has been noted. For faster response, email: mail4alokk@gmail.com`);
			form.reset();
		});
	}
})();