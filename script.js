// Mobilmeny
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Kontaktformulär -> öppnar förifyllt mejl till miljosanering@telia.com
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Förfrågan: ${service} (${name})`);
    const body = encodeURIComponent(
      `Namn / Företag: ${name}\nTelefon: ${phone}\nTjänst: ${service}\n\nMeddelande:\n${message}`
    );

    window.location.href = `mailto:miljosanering@telia.com?subject=${subject}&body=${body}`;
  });
}
