const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const numParticles = 80;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5,
  });
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.46)"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ea580c"; 
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animate);
}

animate();



const themeButton = document.getElementById('theme-toggle');
const body = document.body;

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDark && !body.classList.contains('light-theme')) {
    body.classList.add('light-theme');
    themeButton.innerHTML = '☀️';
} else if (!prefersDark && body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    themeButton.innerHTML = ' 🌙';
} else {
    themeButton.innerHTML = body.classList.contains('light-theme') ? ' ' : ' ';
}

themeButton.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    themeButton.innerHTML = body.classList.contains('light-theme') 
        ? '☀️' 
        : '🌙';
});

const logo = document.querySelector('#logo');
const modal = document.querySelector('#imageModal');
const close = document.querySelector('#closeModal');

logo?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
});

close?.addEventListener('click', () => modal.classList.remove('active'));

modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

const typed = new Typed('.animations', {
    strings: ["I'm ", "Undergraduate ", "Computer Science Student", "at University of Gondar"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1200,
    loop: true
});

const phone = document.getElementById('phoneInput');
const phoneErr = document.getElementById('phoneError');

phone?.addEventListener('input', () => {
    let v = phone.value.replace(/[^0-9+]/g, '');
    if (v[0] === '+') v = '+' + v.slice(1).replace(/[^0-9]/g, '');
    else v = v.replace(/[^0-9]/g, '');
    phone.value = v;
    const digits = v.replace(/[^0-9]/g, '');
    if (digits.length === 10) {
        phoneErr.textContent = '';
        phone.style.borderColor = '';
    } else {
        phoneErr.textContent = 'Enter 10 digits';
        phone.style.borderColor = 'red';
    }
});

const form = document.getElementById('contactForm');
const email = document.getElementById('emailInput');
const successMsg = document.getElementById('successMessage');

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        alert('Enter a valid email');
        email.style.borderColor = 'red';
        ok = false;
    } else {
        email.style.borderColor = '';
    }

    const digits = phone.value.replace(/[^0-9]/g, '');
    if (digits.length !== 10) {
        phoneErr.textContent = '10 digits required';
        phone.style.borderColor = 'red';
        ok = false;
    } else {
        phoneErr.textContent = '';
        phone.style.borderColor = '';
    }

    if (ok) {
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
        alert("Form submitted successfully!");
        form.reset();
    }
});