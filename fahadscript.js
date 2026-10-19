const header = document.querySelector("header");

/* Sticky header kapag nag-scroll pababa */
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 120);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector('.navlist');

/* Buksan / isara ang menu (phone at tablet) */
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('active');
};

/* Isara ang menu kapag nag-scroll
   FIXED: dati "menu.remove.toggle(...)" kaya nagka-error sa bawat scroll */
window.addEventListener("scroll", () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
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
   Pinipindot ang buwan/araw na button sa header. Natatandaan ng browser ang napili mo. */
const themeButtons = document.querySelectorAll('.theme-toggle');

function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function updateThemeButtons() {
    const isLight = currentTheme() === 'light';

    themeButtons.forEach(function (btn) {
        const icon = btn.querySelector('i');
        const label = btn.querySelector('span');
        if (icon) icon.className = isLight ? 'ri-moon-line' : 'ri-sun-line';
        if (label) label.textContent = isLight ? 'Dark mode' : 'Light mode';
        btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    });

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', isLight ? '#f4f7fb' : '#1b1f24');
}

themeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        const next = currentTheme() === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        updateThemeButtons();
    });
});

updateThemeButtons();