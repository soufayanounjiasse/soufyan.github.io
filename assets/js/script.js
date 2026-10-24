/* Portfolio statique - Mongbet Njiasse Soufiane */
const CONTACT_EMAIL = "mongbetnjiassesoufiane@gmail.com";

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
    // Année du pied de page
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Barres de progression animées quand la section compétences est visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.progress-bar').forEach(bar => {
                        setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, 200);
                    });
                }
            });
        }, { threshold: 0.3 });
        barObserver.observe(skillsSection);
    }

    // Apparition progressive des éléments
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        fadeObserver.observe(el);
    });

    // Barre de navigation : effet au scroll + lien actif
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        let currentId = '';
        const pos = window.scrollY + 120;
        sections.forEach(s => {
            if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) currentId = s.id;
        });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + currentId));
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    const navbarCollapse = document.getElementById('navbarNav');
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
        }
    }));

    // Formulaire de contact : ouvre le client mail du visiteur avec le message pré-rempli
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            const d = new FormData(form);
            const body = d.get('message') + '\n\n---\nDe : ' + d.get('name') + ' <' + d.get('email') + '>';
            window.location.href = 'mailto:' + CONTACT_EMAIL +
                '?subject=' + encodeURIComponent(d.get('subject')) +
                '&body=' + encodeURIComponent(body);
            const box = document.getElementById('formAlert');
            document.getElementById('formAlertText').textContent =
                "Votre application de messagerie s'ouvre pour envoyer le message.";
            box.style.display = 'block';
            setTimeout(() => { box.style.display = 'none'; }, 6000);
        });
    }
});
