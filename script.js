// ===== AÑO DINÁMICO EN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== MENÚ HAMBURGUESA =====
const burger = document.getElementById('burger');
const menu   = document.getElementById('nav-menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => menu.classList.remove('open'))
);

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== CONTADOR DE VISITAS (localStorage) =====
let visits = localStorage.getItem('portfolioVisits');
if (visits === null) {
  visits = 1;
} else {
  visits = parseInt(visits) + 1;
}
localStorage.setItem('portfolioVisits', visits);
const visitSpan = document.getElementById('visit-count');
if (visitSpan) {
  visitSpan.textContent = visits;
}

// ===== EFECTO DE ESCRITURA EN EL TÍTULO =====
const heroName = document.querySelector('.hero-name');
if (heroName) {
  const originalHTML = heroName.innerHTML;
  heroName.innerHTML = `<span class="typewriter"></span>`;
  const typewriterSpan = heroName.querySelector('.typewriter');
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = originalHTML;
  const textContent = tempDiv.textContent || tempDiv.innerText;
  const cleanText = textContent.replace(/\s+/g, ' ').trim();
  
  let index = 0;
  function typeEffect() {
    if (index < cleanText.length) {
      typewriterSpan.textContent += cleanText.charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    } else {
      // Restauramos el HTML original con los <br> si los tenía
      if (originalHTML.includes('<br>')) {
        // Reemplazamos el span por el texto original pero con el contenido escrito
        // Para no complicar, al final mostramos el texto completo con el <br> original
        heroName.innerHTML = originalHTML;
        // Aseguramos que el texto esté visible (ya está)
      }
    }
  }
  typeEffect();
}

// ===== FORMULARIO CON FORMSPREE =====
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
