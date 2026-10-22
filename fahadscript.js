const header = document.querySelector("header");

/* Sticky header kapag nag-scroll pababa */
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 120);
});

const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector('.navlist');
const menuIcon = menu.querySelector('i');
let menuOpenedAt = 0;

/* Buksan / isara ang menu (phone at tablet) */
function setMenu(open) {
    navlist.classList.toggle('active', open);
    menuIcon.className = open ? 'ri-close-line' : 'ri-menu-line';
    menu.setAttribute('aria-expanded', String(open));
    if (open) menuOpenedAt = window.scrollY;
}

menu.addEventListener('click', function () {
    setMenu(!navlist.classList.contains('active'));
});

/* Isara ang menu kapag pumili ng link */
navlist.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
});

/* Isara ang menu kapag talagang nag-scroll (hindi na magsasara kapag lumiit lang ang address bar ng phone) */
window.addEventListener("scroll", function () {
    if (navlist.classList.contains('active') && Math.abs(window.scrollY - menuOpenedAt) > 60) {
        setMenu(false);
    }
});

/* ===== CONTACT FORM -> DIREKTA SA INBOX MO (FormSubmit) =====
   Kapag pinindot ang Send Message, direktang dadating sa email mo ang:
   pangalan, email, phone at message ng bisita. Hindi na kailangan ng Gmail ng bisita.
   Nananatili ang bisita sa page at may lalabas na "Thank you" na mensahe. */
const CONTACT_EMAIL = 'fsumandar.3903@umak.edu.ph';

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

function setStatus(type, text) {
    formStatus.className = 'form-note' + (type ? ' ' + type : '');
    formStatus.textContent = text;
}

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const button = contactForm.querySelector('.send-btn');
        const oldLabel = button.value;
        const data = Object.fromEntries(new FormData(contactForm));

        button.disabled = true;
        button.value = 'Sending...';
        setStatus('', 'Sending your message...');

        try {
            const response = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.ok && (result.success === true || result.success === 'true')) {
                setStatus('success', 'Thank you! Your message was sent. I will contact you soon.');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Not sent');
            }
        } catch (error) {
            setStatus('error', 'Sorry, your message was not sent. ' +
                (error.message && error.message !== 'Not sent' && error.message !== 'Failed to fetch' ? error.message + ' ' : '') +
                'Please try again or email me directly at ' + CONTACT_EMAIL + '.');
        }

        button.disabled = false;
        button.value = oldLabel;
    });
}

/* ===== DARK / LIGHT MODE =====
   Pinipindot ang switch sa header. Light ang default; natatandaan ng browser ang napili mo. */
const themeButtons = document.querySelectorAll('.theme-toggle');

function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function updateThemeButtons() {
    const isDark = currentTheme() === 'dark';

    themeButtons.forEach(function (btn) {
        const icon = btn.querySelector('i');
        const label = btn.querySelector('span');
        if (icon) icon.className = isDark ? 'ri-moon-fill' : 'ri-sun-fill';
        if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', isDark ? '#0a110a' : '#2a8a1c');
}

themeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        updateThemeButtons();
    });
});

updateThemeButtons();