/* STARS */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1 + 0.3,
  vx: (Math.random() - 0.5) * 0.15,
  vy: (Math.random() - 0.5) * 0.15,
  ox: 0,
  oy: 0
}));

const pointer = { x: -9999, y: -9999 };

addEventListener("mousemove", e => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});
addEventListener("touchmove", e => {
  pointer.x = e.touches[0].clientX;
  pointer.y = e.touches[0].clientY;
});

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0) s.x = canvas.width;
    if (s.x > canvas.width) s.x = 0;
    if (s.y < 0) s.y = canvas.height;
    if (s.y > canvas.height) s.y = 0;

    const dx = s.x - pointer.x;
    const dy = s.y - pointer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 120) {
      s.ox += dx / dist;
      s.oy += dy / dist;
    }

    s.ox *= 0.9;
    s.oy *= 0.9;

    ctx.beginPath();
    ctx.arc(s.x + s.ox, s.y + s.oy, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}
animateStars();

/* NAVIGATION */
const navBtn = document.getElementById("navigateBtn");
if (navBtn) navBtn.onclick = () => location.href = "about.html";

/* SCROLL */
const scrollBtn = document.getElementById("scrollBtn");
const pass = document.getElementById("password-section");
if (scrollBtn && pass) {
  scrollBtn.onclick = () =>
    pass.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* FADE */
const fades = document.querySelectorAll(".fade-section");
const observer = new IntersectionObserver(entries =>
  entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"))
);
fades.forEach(f => observer.observe(f));

/* PASSWORD */
const unlockBtn = document.getElementById("unlockBtn");
if (unlockBtn) {
  unlockBtn.onclick = () => {
    const input = document.getElementById("secretPassword");
    const lock = document.getElementById("lockIcon");

    if (input.value === "laddoo") {
      lock.classList.add("unlocking");
      setTimeout(() => {
        lock.textContent = "🔓";
        location.href = "secret.html";
      }, 700);
    } else {
      alert("SUSRII KI TANNEY PASSWORD NA BERA 😡");
    }
  };
}
