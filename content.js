/* =====================================================
   LEARNING JOURNAL + TESTIMONIALS
   Dito mo lang ine-edit ang mga post at testimonial.
   Ginagamit ng index.html at journal.html
   ===================================================== */

/* -----------------------------------------------------
   PARA MAGDAGDAG NG BAGONG JOURNAL POST:
   Kopyahin ang isang buong { ... } block sa ibaba at ilagay sa PINAKAUNA
   ng listahan (ang pinakabago ay nasa unahan). Palitan ang laman.
     id      - maikling pangalan na walang space (halimbawa: 'java-loops')
     title   - pamagat
     date    - petsa na gusto mong ipakita
     tag     - HTML, CSS, JavaScript, Java, atbp.
     excerpt - 1-2 pangungusap na lalabas sa Home
     body    - listahan ng mga talata (paragraph) na lalabas sa Journal page
   Ang mga post sa ibaba ay panimulang halimbawa lang. I-edit o palitan ayon sa natutunan mo.
   ----------------------------------------------------- */
const JOURNAL_POSTS = [
  {
    id: 'dark-mode-css-variables',
    title: 'Dark mode using CSS variables',
    date: 'October 2026',
    tag: 'CSS',
    excerpt: 'I learned how to switch my whole website between dark and light by changing a few CSS variables.',
    body: [
      'Instead of changing every color one by one, I saved my main colors as CSS variables such as the background, text, and main color.',
      'When the theme changes, I only replace the values of those variables, and the whole page updates. A small JavaScript button changes the theme and saves my choice in the browser, so the website remembers it the next time I visit.',
      'Next step: make sure every card, button, and form still has enough contrast to read in both themes.'
    ]
  },
  {
    id: 'contact-form-formsubmit',
    title: 'Sending contact form messages to my email',
    date: 'October 2026',
    tag: 'JavaScript',
    excerpt: 'My contact form now sends messages straight to my inbox using FormSubmit and fetch().',
    body: [
      'A website made only of HTML, CSS, and JavaScript cannot send emails by itself, so I used a free form service called FormSubmit.',
      'The form sends the name, email, phone, and message using fetch(), and the page shows a thank-you message without reloading. I also learned that the first message needs to be activated through an email, and that the page must be opened from a web server, not as a plain file on the computer.'
    ]
  },
  {
    id: 'portfolio-folders-pagination',
    title: 'Organizing my portfolio with folders and pagination',
    date: 'October 2026',
    tag: 'JavaScript',
    excerpt: 'I stopped copying 39 cards in HTML and used one list of data to create folders and pages.',
    body: [
      'My portfolio was a very long page because every activity was copied by hand in HTML. I changed it so the activities live in one JavaScript list, and the page builds the cards from that list.',
      'For pagination, I only show 6 activities at a time by slicing the list, then create the Prev, Next, and number buttons. I also learned how to read the folder name from the page link using URLSearchParams.'
    ]
  },
  {
    id: 'responsive-layout-clamp-grid',
    title: 'Making my layout fit phones, tablets, and laptops',
    date: 'October 2026',
    tag: 'CSS',
    excerpt: 'Fixed pixel widths caused my page to overflow on phones. Fluid sizes fixed it.',
    body: [
      'I learned that a page needs the viewport meta tag, and that fixed widths such as 600px or 530px break on small screens.',
      'The fixes that helped most were clamp() for font sizes, a grid with auto-fit and minmax() so the cards change columns by themselves, and media queries only for the bigger layout changes like the menu.'
    ]
  }
];

/* -----------------------------------------------------
   PARA MAGDAGDAG NG TESTIMONIAL (mula sa classmate o instructor):
   Isulat lang ang tunay na sinabi nila at may pahintulot nila.
   Ilagay sa loob ng [ ... ] sa ibaba, halimbawa:

     { name: 'Juan Dela Cruz', role: 'Classmate, CCIS', text: 'Ang sinabi niya tungkol sa trabaho mo.' },
     { name: 'Prof. Maria Santos', role: 'Instructor', text: 'Ang sinabi niya.' },
   ----------------------------------------------------- */
const TESTIMONIALS = [
];

/* =====================================================
   LOGIC (hindi mo na kailangang galawin)
   ===================================================== */

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Home: pinakabagong 3 post */
function renderLatestPosts(container, count) {
  if (!JOURNAL_POSTS.length) {
    container.innerHTML = '<p class="empty-note">New journal posts are coming soon.</p>';
    return;
  }
  container.innerHTML = JOURNAL_POSTS.slice(0, count).map(function (p) {
    return '' +
      '<article class="post-card">' +
        '<span class="post-tag">' + esc(p.tag) + '</span>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p class="post-date">' + esc(p.date) + '</p>' +
        '<p class="post-excerpt">' + esc(p.excerpt) + '</p>' +
        '<a class="post-link" href="journal.html#' + encodeURIComponent(p.id) + '">Read more <i class="ri-arrow-right-line"></i></a>' +
      '</article>';
  }).join('');
}

/* Journal page: lahat ng post */
function renderAllPosts(container) {
  if (!JOURNAL_POSTS.length) {
    container.innerHTML = '<p class="empty-note">New journal posts are coming soon.</p>';
    return;
  }
  container.innerHTML = JOURNAL_POSTS.map(function (p) {
    return '' +
      '<article class="post" id="' + esc(p.id) + '">' +
        '<div class="post-meta"><span class="post-tag">' + esc(p.tag) + '</span>' +
        '<span class="post-date">' + esc(p.date) + '</span></div>' +
        '<h2>' + esc(p.title) + '</h2>' +
        p.body.map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('') +
      '</article>';
  }).join('');

  /* Kapag may #post-id sa link, pumunta sa post na iyon */
  if (window.location.hash) {
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
}

/* Testimonials */
function renderTestimonials(container) {
  if (!TESTIMONIALS.length) {
    container.innerHTML = '<p class="empty-note">Testimonials from my classmates and instructors will be posted here soon.</p>';
    return;
  }
  container.innerHTML = TESTIMONIALS.map(function (t) {
    return '' +
      '<figure class="testimonial">' +
        '<i class="ri-double-quotes-l quote-icon"></i>' +
        '<blockquote>' + esc(t.text) + '</blockquote>' +
        '<figcaption>' +
          '<span class="avatar">' + esc(t.name.charAt(0).toUpperCase()) + '</span>' +
          '<span><strong>' + esc(t.name) + '</strong><small>' + esc(t.role) + '</small></span>' +
        '</figcaption>' +
      '</figure>';
  }).join('');
}

(function () {
  const latest = document.getElementById('journal-latest');
  if (latest) renderLatestPosts(latest, 3);

  const all = document.getElementById('journal-all');
  if (all) renderAllPosts(all);

  const testimonials = document.getElementById('testimonial-list');
  if (testimonials) renderTestimonials(testimonials);
})();