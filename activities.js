/* =====================================================
   ACTIVITIES DATA + PAGINATION
   Ginagamit ng index.html (folders) at activities.html (pages)
   ===================================================== */

/* Ilang activity ang makikita sa bawat page */
const ITEMS_PER_PAGE = 6;

/* -----------------------------------------------------
   PARA MAGDAGDAG NG BAGONG ACTIVITY:
   1. Hanapin ang folder sa ibaba (halimbawa "Computer Programming").
   2. Sa loob ng items: [ ... ], magdagdag ng bagong linya:
        { img: 'java-activity1.png', title: 'Java Act 1 - Title here' },
   3. Para sa bagong folder, kopyahin ang isang buong { id: ... } block
      at ilagay sa loob ng folders: [ ... ] ng tamang group.

   ORDER: Ang unang group sa listahan ang unang lalabas sa website.
   Sa pagitan ng mga group ay may guhit (hr) na kusang nilalagay.
   ----------------------------------------------------- */

const ACTIVITY_GROUPS = [

  /* ================= COLLEGE (pinakabago) ================= */
  {
    id: 'college',
    title: 'College',
    note: 'University of Makati &bull; Latest Activities',
    folders: [
      {
        id: 'intro-computer',
        title: 'Introduction to Computer',
        subtitle: 'HTML &amp; CSS Activities',
        cover: 'html.png',
        items: [
          /* Halimbawa:
          { img: 'itc-activity1.png', title: 'ITC Act 1 - Title here' },
          */
        ]
      },
      {
        id: 'computer-programming',
        title: 'Computer Programming',
        subtitle: 'Java Programming Activities',
        cover: 'java1.png',
        items: [
          /* Halimbawa:
          { img: 'java-activity1.png', title: 'Java Act 1 - Title here' },
          */
        ]
      }
    ]
  },

  /* ================= SENIOR HIGH (mas luma) ================= */
  {
    id: 'senior-high',
    title: 'Senior High School',
    note: 'Earlier Activities',
    folders: [

      {
        id: 'html',
        title: 'HTML Activities',
        cover: 'activity1.jpg',
        items: [
          { img: 'activity1.jpg',  title: 'Introduction' },
          { img: 'activity2.jpg',  title: 'About me' },
          { img: 'activity3.jpg',  title: 'Highlight the Important' },
          { img: 'activity4.jpg',  title: 'Class Schedule' },
          { img: 'activity5.png',  title: 'Log in Form 1' },
          { img: 'activity6.png',  title: 'Log in Form 2' },
          { img: 'activity7.png',  title: 'Log in Form 3' },
          { img: 'activity8.png',  title: 'Log in Form 4' },
          { img: 'activity9.png',  title: 'Frameset' },
          { img: 'activity10.jpg', title: 'Q<sup>2</sup> Adding Video &amp; Music' },
          { img: 'activity11.jpg', title: 'Q<sup>2</sup> Border Line' },
          { img: 'activity12.jpg', title: 'Q<sup>2</sup> Portfolio Web Page' },
          { img: 'activity13.png', title: 'Q<sup>2</sup> My Family' }
        ]
      },
      {
        id: 'css',
        title: 'CSS Activities',
        cover: 'activity14.png',
        items: [
          { img: 'activity14.png', title: 'Q<sup>2</sup> Css use of Span' },
          { img: 'activity15.png', title: 'Q<sup>2</sup> Css use of Span 2' },
          { img: 'activity16.png', title: 'Q<sup>2</sup> Css use of Sticky' },
          { img: 'activity17.png', title: 'Q<sup>2</sup> Css use of different Button style' },
          { img: 'activity18.png', title: 'Q<sup>2</sup> Css Horizontal and Vertical Button' },
          { img: 'activity19.png', title: 'Q<sup>2</sup> Css Applying the use of Button' },
          { img: 'activity20.png', title: 'Q<sup>2</sup> Css Pagination Blog Post' },
          { img: 'activity21.png', title: 'Q<sup>2</sup> Css E-commerce Product' },
          { img: 'activity22.png', title: 'Q<sup>2</sup> Css Image Gallery' }
        ]
      },
      {
        id: 'js-basics',
        title: 'JavaScript Basics',
        cover: 'activity23.png',
        items: [
          { img: 'activity23.png', title: 'Q<sup>2</sup> Act 1 JavaScript Internal Multiple-choice' },
          { img: 'activity24.png', title: 'Q<sup>2</sup> Act 1 JavaScript External Multiple-choice' },
          { img: 'activity25.png', title: 'Q<sup>2</sup> Act 1 JavaScript Rectangle Calculator' },
          { img: 'activity26.png', title: 'Q<sup>2</sup> Act 2 JavaScript Simple Interest Calculator' },
          { img: 'activity27.png', title: 'Q<sup>2</sup> Act 3 JavaScript Temperature Conversion (C to F)' },
          { img: 'activity28.png', title: 'Q<sup>2</sup> Act 4 JavaScript Average Scores' },
          { img: 'activity29.png', title: 'Q<sup>2</sup> Act 5 JavaScript Addition and Multiplication Function' }
        ]
      },
      {
        id: 'js-calculations',
        title: 'JavaScript Calculations',
        cover: 'activity30.png',
        items: [
          { img: 'activity30.png', title: 'Q<sup>2</sup> Act 1 Java2Script Simple Calculator' },
          { img: 'activity31.png', title: 'Q<sup>2</sup> Act 2 Shopping Cart Total' },
          { img: 'activity32.png', title: 'Q<sup>2</sup> Act 3 Monthly Saving Calculator' },
          { img: 'activity33.png', title: 'Q<sup>2</sup> Act 4 Discounted Price' },
          { img: 'activity34.png', title: 'Q<sup>2</sup> Act 5 Average Grade Calculator' }
        ]
      },
      {
        id: 'js-conditions',
        title: 'JavaScript Conditions',
        cover: 'activity35.png',
        items: [
          { img: 'activity35.png', title: 'Q<sup>2</sup> Act 1 Age Checker' },
          { img: 'activity36.png', title: 'Q<sup>2</sup> Act 2 Discount Qualification' },
          { img: 'activity37.png', title: 'Q<sup>2</sup> Act 3 Temperature Status' },
          { img: 'activity38.png', title: 'Q<sup>2</sup> Act 4 Exam Grading System' },
          { img: 'activity39.png', title: 'Q<sup>2</sup> Act 5 Simple Login Validator' }
        ]
      }
    ]
  }
];

/* Flat list ng lahat ng folder (ginagamit ng activities.html) */
const ACTIVITY_FOLDERS = ACTIVITY_GROUPS.reduce(function (all, g) {
  return all.concat(g.folders);
}, []);

/* =====================================================
   LOGIC (hindi mo na kailangang galawin ito)
   ===================================================== */

function stripTags(text) {
  return text.replace(/<[^>]*>/g, '');
}

/* ---------- index.html: ipakita ang mga group at folder ---------- */
function folderCard(f) {
  const n = f.items.length;
  const label = n ? n + (n === 1 ? ' ACTIVITY' : ' ACTIVITIES') : 'COMING SOON';
  const sub = f.subtitle ? '<p class="folder-sub">' + f.subtitle + '</p>' : '';
  return '' +
    '<a class="row folder-card" href="activities.html?folder=' + encodeURIComponent(f.id) + '">' +
      '<img src="./' + f.cover + '" alt="' + stripTags(f.title) + '">' +
      '<div class="main-row">' +
        '<div class="row-text"><h5>' + f.title + '</h5></div>' +
        '<div class="row-icon"><i class="ri-folder-open-fill"></i></div>' +
      '</div>' +
      sub +
      '<h4>' + label + '</h4>' +
    '</a>';
}

function renderGroups(container) {
  container.innerHTML = ACTIVITY_GROUPS.map(function (g, i) {
    /* Guhit (hr) sa pagitan ng mga group */
    const divider = i > 0 ? '<hr class="group-divider">' : '';
    return divider +
      '<div class="portfolio-group">' +
        '<div class="group-head">' +
          '<h3 class="group-title"><span>' + g.title + '</span></h3>' +
          '<p class="group-note">' + g.note + '</p>' +
        '</div>' +
        '<div class="Portfolio-content">' + g.folders.map(folderCard).join('') + '</div>' +
      '</div>';
  }).join('');
}

/* ---------- activities.html: pagination ---------- */
function initActivityPage() {
  const list = document.getElementById('activity-list');
  const pagination = document.getElementById('pagination');
  const pageInfo = document.getElementById('page-info');
  const titleEl = document.getElementById('folder-title');

  const params = new URLSearchParams(window.location.search);
  const folder = ACTIVITY_FOLDERS.find(function (f) { return f.id === params.get('folder'); });

  /* Kapag walang tamang folder, balik sa portfolio */
  if (!folder) {
    window.location.replace('index.html#portfolio');
    return;
  }

  document.title = stripTags(folder.title) + ' | Portfolio';
  titleEl.innerHTML = '<span>' + folder.title + '</span>';

  const levelEl = document.getElementById('folder-level');
  if (levelEl) {
    const group = ACTIVITY_GROUPS.find(function (g) { return g.folders.indexOf(folder) !== -1; });
    const parts = [];
    if (group) parts.push(group.title);
    if (folder.subtitle) parts.push(folder.subtitle);
    levelEl.innerHTML = parts.join(' &bull; ');
  }

  const totalItems = folder.items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  function getPageFromUrl() {
    const p = parseInt(new URLSearchParams(window.location.search).get('page'), 10);
    return isNaN(p) ? 1 : p;
  }

  function render(page, pushState) {
    page = Math.min(Math.max(page, 1), totalPages);

    /* Walang laman ang folder */
    if (totalItems === 0) {
      list.innerHTML = '<p class="empty-folder">Wala pang activities sa folder na ito. Coming soon!</p>';
      pagination.innerHTML = '';
      pageInfo.textContent = '';
      return;
    }

    const start = (page - 1) * ITEMS_PER_PAGE;
    const slice = folder.items.slice(start, start + ITEMS_PER_PAGE);

    list.innerHTML = slice.map(function (item) {
      const icon = item.link
        ? '<a href="' + item.link + '" target="_blank" rel="noopener"><i class="ri-github-fill"></i></a>'
        : '<i class="ri-github-fill"></i>';
      return '' +
        '<div class="row">' +
          '<img src="./' + item.img + '" alt="' + stripTags(item.title) + '">' +
          '<div class="main-row">' +
            '<div class="row-text"><h5>' + item.title + '</h5></div>' +
            '<div class="row-icon">' + icon + '</div>' +
          '</div>' +
          '<h4>ACTIVITY</h4>' +
        '</div>';
    }).join('');

    /* Pagination buttons */
    if (totalPages > 1) {
      let html = '<button type="button" data-page="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') + '>&laquo; Prev</button>';
      for (let i = 1; i <= totalPages; i++) {
        html += '<button type="button" data-page="' + i + '"' + (i === page ? ' class="active" aria-current="page"' : '') + '>' + i + '</button>';
      }
      html += '<button type="button" data-page="' + (page + 1) + '"' + (page === totalPages ? ' disabled' : '') + '>Next &raquo;</button>';
      pagination.innerHTML = html;
    } else {
      pagination.innerHTML = '';
    }

    pageInfo.textContent = 'Page ' + page + ' of ' + totalPages +
      ' \u2022 Showing ' + (start + 1) + '-' + (start + slice.length) + ' of ' + totalItems;

    if (pushState) {
      const url = 'activities.html?folder=' + encodeURIComponent(folder.id) + '&page=' + page;
      window.history.pushState({ page: page }, '', url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  pagination.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-page]');
    if (!btn || btn.disabled) return;
    render(parseInt(btn.getAttribute('data-page'), 10), true);
  });

  /* Gumagana ang Back/Forward button ng browser */
  window.addEventListener('popstate', function () {
    render(getPageFromUrl(), false);
  });

  render(getPageFromUrl(), false);
}

(function () {
  const groups = document.getElementById('folder-groups');
  if (groups) renderGroups(groups);
  if (document.getElementById('activity-list')) initActivityPage();
})();