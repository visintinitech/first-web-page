// ============================================================
//  PORTFOLIO DE SOFÍA VISINTINI PLAZA — TODAS LAS FUNCIONES
// ============================================================

// ---------- 1. AÑO DINÁMICO EN FOOTER ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- 2. MENÚ HAMBURGUESA ----------
const burger = document.getElementById('burger');
const menu   = document.getElementById('nav-menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => menu.classList.remove('open'))
);

// ---------- 3. SCROLL REVEAL (animación de entrada) ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---------- 4. CONTADOR DE VISITAS (localStorage) ----------
let visits = localStorage.getItem('portfolioVisits');
if (visits === null) {
  visits = 1;
} else {
  visits = parseInt(visits) + 1;
}
localStorage.setItem('portfolioVisits', visits);
const visitSpan = document.getElementById('visit-count');
if (visitSpan) visitSpan.textContent = visits;

// ---------- 5. RELOJ EN TIEMPO REAL ----------
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
updateClock();
setInterval(updateClock, 1000);

// ---------- 6. BOTÓN VOLVER ARRIBA ----------
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- 7. MODO OSCURO / CLARO ----------
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Cargar preferencia guardada
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.textContent = '☀️';
} else {
  themeIcon.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ---------- 8. EFECTO DE ESCRITURA CON CURSOR PARPADEANTE ----------
const heroName = document.querySelector('.hero-name');
if (heroName) {
  const originalHTML = heroName.innerHTML;
  // Guardamos el texto plano (sin etiquetas <br>)
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = originalHTML;
  const textContent = tempDiv.textContent || tempDiv.innerText;
  const cleanText = textContent.replace(/\s+/g, ' ').trim();

  // Limpiamos el contenido y ponemos un span para el efecto
  heroName.innerHTML = `<span class="typewriter"></span>`;
  const typewriterSpan = heroName.querySelector('.typewriter');

  let index = 0;
  function typeEffect() {
    if (index < cleanText.length) {
      typewriterSpan.textContent += cleanText.charAt(index);
      index++;
      setTimeout(typeEffect, 90);
    } else {
      // Al terminar, restauramos el HTML original pero manteniendo el cursor (se oculta al terminar)
      // Para que el cursor no moleste, lo quitamos después de un tiempo
      setTimeout(() => {
        heroName.innerHTML = originalHTML;
        // Añadimos un pequeño cursor estático (opcional)
        // O simplemente dejamos el texto sin cursor
      }, 300);
    }
  }
  typeEffect();
}

// ---------- 9. VALIDACIÓN DE EMAIL EN TIEMPO REAL ----------
const emailInput = document.getElementById('email');
const emailHelp = document.getElementById('emailHelp');
if (emailInput && emailHelp) {
  emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (value === '') {
      emailHelp.textContent = '✏️ Escribe tu correo';
      emailHelp.className = '';
    } else if (isValid) {
      emailHelp.textContent = '✅ Correo válido';
      emailHelp.className = 'valid';
    } else {
      emailHelp.textContent = '❌ Correo inválido';
      emailHelp.className = 'invalid';
    }
  });
}

// ---------- 10. CONTADOR DE CARACTERES EN EL MENSAJE ----------
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
if (messageInput && charCount) {
  const maxChars = 500;
  messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    charCount.textContent = `(${length}/${maxChars})`;
    charCount.className = '';
    if (length > maxChars * 0.8) {
      charCount.classList.add('warning');
    }
    if (length >= maxChars) {
      charCount.classList.add('danger');
    }
  });
}

// ---------- 11. MENÚ ACTIVO AL HACER SCROLL (resaltar sección actual) ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--gold)';
    }
  });
});

// ---------- 12. FORMULARIO CON FORMSPREE ----------
const form  = document.getElementById('contact-form');
const btn   = document.getElementById('form-btn');
const msgEl = document.getElementById('form-msg');

// 🔴 CAMBIA ESTE ID POR EL TUYO (crea una cuenta gratis en formspree.io)
const FORMSPREE_ID = 'tu-id-aqui';

form.addEventListener('submit', async e => {
  e.preventDefault();
  const name  = form.name.value.trim();
  const email = form.email.value.trim();
  const msg   = form.message.value.trim();

  if (!name || !email || !msg) { showMsg('Por favor completa todos los campos.', false); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showMsg('Ingresa un correo electrónico válido.', false); return; }

  btn.disabled = true;
  btn.textContent = 'Enviando…';

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, message: msg })
    });
    if (response.ok) {
      showMsg('¡Mensaje enviado! Te responderé a la brevedad.', true);
      form.reset();
      // Reseteamos contador y validación
      if (charCount) charCount.textContent = '(0/500)';
      if (emailHelp) { emailHelp.textContent = '✏️ Escribe tu correo'; emailHelp.className = ''; }
    } else {
      showMsg('Hubo un error al enviar el mensaje. Intenta de nuevo.', false);
    }
  } catch (error) {
    showMsg('Hubo un error de conexión. Intenta de nuevo.', false);
  }

  btn.disabled = false;
  btn.textContent = 'Enviar mensaje';
});

function showMsg(text, ok) {
  msgEl.textContent = text;
  msgEl.className = 'form-msg visible' + (ok ? ' success' : '');
  setTimeout(() => msgEl.classList.remove('visible'), 5000);
}
