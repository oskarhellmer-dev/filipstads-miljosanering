// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Interactive Dispatch Selector
const DISPATCH_CASES = {
  stopp: {
    title: 'Högtrycksspolning & hetvattenspolning',
    desc: 'Vid akuta stopp i avlopp, ledningar, stuprör eller vägtrummor spolar vi rent med högt tryck eller hetvatten som löser upp fettproppar och is. Vid behov utför vi även rotskärning.',
    bullets: [
      'Avloppsstopp i villa, BRF och industri',
      'Hetvattenspolning och rotskärning',
      'Vägtrummor och dagvattenledningar',
    ],
    serviceValue: 'Högtrycksspolning / Avloppsstopp',
  },
  filmning: {
    title: 'Ledningsfilmning & felsökning',
    desc: 'Återkommande stopp beror ofta på sättningar, sprickor eller rötter. Vi filmar insidan av avloppsledningen och lokaliserar problemet exakt innan någon börjar gräva.',
    bullets: [
      'Kamerainspektion av avloppsledningar',
      'Felsökning vid återkommande stopp',
      'Tydligt underlag inför åtgärd',
    ],
    serviceValue: 'Ledningsfilmning & felsökning',
  },
  sugning: {
    title: 'Slamsugning & torrsugning',
    desc: 'Vi tömmer slambrunnar och avskiljare eller torrsuger spån, lösull, kolstybb, singel och sand – smidigt även i trånga källare, grunder och vindar.',
    bullets: [
      'Slamsugning av brunnar & avskiljare',
      'Torrsugning av sågspån, lösull & kolstybb',
      'Sugning av singel och sand',
    ],
    serviceValue: 'Slamsugning / Torrsugning',
  },
  container: {
    title: 'Uthyrning av containers (2–35 m³)',
    desc: 'Oavsett om du ska röja garaget, byta tak eller hantera byggavfall har vi containers från 2 till 35 m³ samt lastväxlarflak med smidig utkörning och hämtning.',
    bullets: [
      '2–8 m³ för villa, trädgård & tunga massor',
      '10–15 m³ för större renoveringar & dödsbon',
      '20–35 m³ för bygg, industri & skrymmande avfall',
    ],
    serviceValue: 'Container (2–35 m³) / Flak',
  },
  grus: {
    title: 'Grustransporter & lastväxlarflak',
    desc: 'Vi kör ut grus, singel och sand till uppfarter och byggprojekt samt ombesörjer bortforsling med lastväxlarflak i Filipstad med omnejd.',
    bullets: [
      'Leverans av grus, singel och sand',
      'Lastväxlarflak för tyngre material',
      'Flexibel körning i Filipstad & omnejd',
    ],
    serviceValue: 'Grustransport',
  },
};

const dispatchTabs = document.querySelectorAll('.dispatch-tab');
const dpTitle = document.getElementById('dpTitle');
const dpDesc = document.getElementById('dpDesc');
const dpBullets = document.getElementById('dpBullets');
const dpPrefillBtn = document.getElementById('dpPrefillBtn');
const serviceSelect = document.getElementById('service');

dispatchTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.case;
    const item = DISPATCH_CASES[key];
    if (!item) return;

    dispatchTabs.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    dpTitle.textContent = item.title;
    dpDesc.textContent = item.desc;
    dpBullets.innerHTML = item.bullets.map((b) => `<li>${b}</li>`).join('');
    dpPrefillBtn.dataset.service = item.serviceValue;
  });
});

if (dpPrefillBtn && serviceSelect) {
  dpPrefillBtn.addEventListener('click', () => {
    serviceSelect.value = dpPrefillBtn.dataset.service;
    document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('name').focus({ preventScroll: true });
  });
}

// Container Size Selector
const CONTAINER_SIZES = {
  small: {
    title: '2–8 m³ — Smidig för villa & trånga ytor',
    desc: 'Perfekt vid mindre renoveringar, badrum, garage- och förrådsrensning eller tyngre massor som jord, tegel och betong där en mindre container är lättast att placera.',
  },
  medium: {
    title: '10–15 m³ — Allround för renovering & röjning',
    desc: 'Vanligaste storleken vid större hemma-projekt, takbyte, altanbygge eller när ett helt förråd eller dödsbo ska tömmas i ett svep.',
  },
  large: {
    title: '20–35 m³ — Bygg, industri & skrymmande avfall',
    desc: 'För byggarbetsplatser, industrier och större mängder lättare men skrymmande material som trä, emballage och blandat byggavfall.',
  },
  flak: {
    title: 'Lastväxlarflak & Grustransporter',
    desc: 'För tyngre schaktmassor, maskiner eller leverans av grus, sand och singel direkt till arbetsplatsen eller uppfarten.',
  },
};

const sizeButtons = document.querySelectorAll('.size-btn');
const sdTitle = document.getElementById('sdTitle');
const sdDesc = document.getElementById('sdDesc');

sizeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const info = CONTAINER_SIZES[btn.dataset.size];
    if (!info) return;
    sizeButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    sdTitle.textContent = info.title;
    sdDesc.textContent = info.desc;
  });
});

// Booking form validation + mailto
const contactForm = document.getElementById('contactForm');
const formError = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !message) {
      formError.textContent = 'Fyll i namn/företag, telefonnummer och en kort beskrivning innan du skickar.';
      formError.hidden = false;
      return;
    }

    formError.hidden = true;
    const subject = encodeURIComponent(`Förfrågan: ${service} (${name})`);
    const body = encodeURIComponent(
      `Namn / Företag: ${name}\nTelefon: ${phone}\nÄrende: ${service}\n\nBeskrivning:\n${message}`
    );
    window.location.href = `mailto:miljosanering@telia.com?subject=${subject}&body=${body}`;
  });
}
