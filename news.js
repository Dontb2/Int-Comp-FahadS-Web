/* =====================================================
   NEWS & UPDATES
   Dito mo lang ine-edit ang mga balita. Ginagamit ng index.html
   ===================================================== */

/* -----------------------------------------------------
   PARA MAGDAGDAG NG BAGONG BALITA:
   Kopyahin ang isang buong { ... } block sa ibaba at ilagay sa PINAKAUNA
   ng listahan (ang pinakabago ay nasa unahan). Palitan ang laman.
     id    - maikling pangalan na walang space (halimbawa: 'java-contest')
     title - pamagat ng balita
     date  - petsa na gusto mong ipakita (puwedeng iwanang '' kung wala)
     tag   - maikling label (Achievement, Drafting, Event, atbp.)
     img   - pangalan ng picture na nasa parehong folder ng website
     text  - maikling paliwanag (puwedeng iwanang '' kung wala).
             Para sa 2 o higit pang talata, gawing listahan: text: ['Unang talata.', 'Pangalawang talata.']
     points - (opsyonal) listahan ng mga bullet na may check, halimbawa:
             points: ['Unang punto', 'Pangalawang punto']
   Ang buong picture ay makikita kapag pinindot ang card.
   ----------------------------------------------------- */
const NEWS_ITEMS = [
  {
    id: 'ncii-passer',
    title: 'NCII Passer',
    date: 'March 31, 2026',
    tag: 'Achievement',
    img: 'achievement.jpg',
    text: 'Issued on March 31, 2026. Valid until March 30, 2031.'
  },
  /* Ang text sa ibaba ay panimulang draft lang. I-edit ayon sa totoong ginawa mo. */
  {
    id: 'technical-drafting',
    title: 'Technical Drafting',
    date: '',
    tag: 'Technical Drafting',
    img: 'sketch.jpg',
    text: 'Sketches and technical drawings from my technical drafting lessons. I enjoy sketching, and drafting lets me practice clean lines, accurate measurements, and careful work.',
    points: [
      'Hand sketching and line work',
      'Accurate measurements',
      'Neat and organized drawings'
    ]
  },
  {
    id: 'autocad',
    title: 'AutoCAD',
    date: '',
    tag: 'AutoCAD',
    img: 'autocad.jpg',
    text: 'Drawings I made using AutoCAD. Working digitally helps me turn measurements and ideas into clear and precise plans.',
    points: [
      'Digital 2D drawing',
      'Precise measurements',
      'Organizing drawing files and projects'
    ]
  },
  {
    id: 'family',
    title: 'Family',
    date: '',
    tag: 'Family',
    img: 'familytree.png',
    text: 'My family is my biggest support. Together with my friends and teachers, they have helped me with knowledge, skills, and encouragement as I work toward my goals and dreams.'
  }
];

/* =====================================================
   LOGIC (hindi mo na kailangang galawin)
   ===================================================== */

function newsEsc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderNews(container) {
  if (!NEWS_ITEMS.length) {
    container.innerHTML = '<p class="empty-note">No news yet. Updates will be posted here soon.</p>';
    return;
  }

  container.innerHTML = NEWS_ITEMS.map(function (n) {
    const date = n.date ? '<span class="news-date">' + newsEsc(n.date) + '</span>' : '';
    const paragraphs = Array.isArray(n.text) ? n.text : (n.text ? [n.text] : []);
    const text = paragraphs.map(function (p) { return '<p>' + newsEsc(p) + '</p>'; }).join('');
    const points = (n.points && n.points.length)
      ? '<ul class="news-points">' + n.points.map(function (li) { return '<li>' + newsEsc(li) + '</li>'; }).join('') + '</ul>'
      : '';
    return '' +
      '<article class="news-card" id="news-' + newsEsc(n.id) + '">' +
        '<button type="button" class="news-img" data-full="' + newsEsc(n.img) + '" data-title="' + newsEsc(n.title) + '" aria-label="View full image: ' + newsEsc(n.title) + '">' +
          '<img src="./' + newsEsc(n.img) + '" alt="' + newsEsc(n.title) + '" loading="lazy" decoding="async">' +
        '</button>' +
        '<div class="news-body">' +
          '<div class="news-meta"><span class="news-tag">' + newsEsc(n.tag) + '</span>' + date + '</div>' +
          '<h3>' + newsEsc(n.title) + '</h3>' +
          text +
          points +
        '</div>' +
      '</article>';
  }).join('');
}

/* Lightbox: ipinapakita ang BUONG picture (hindi naputol) */
function initLightbox(container) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
    '<img alt="">' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(box);

  const img = box.querySelector('img');
  const caption = box.querySelector('.lightbox-caption');

  function open(src, title) {
    img.src = './' + src;
    img.alt = title;
    caption.textContent = title;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.hidden = true;
    img.removeAttribute('src');
    document.body.style.overflow = '';
  }

  container.addEventListener('click', function (e) {
    const btn = e.target.closest('.news-img');
    if (btn) open(btn.getAttribute('data-full'), btn.getAttribute('data-title'));
  });

  box.addEventListener('click', function (e) {
    if (e.target !== img) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !box.hidden) close();
  });
}

(function () {
  const list = document.getElementById('news-list');
  if (!list) return;
  renderNews(list);
  initLightbox(list);
})();