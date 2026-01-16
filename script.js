/* ===== STARS ===== */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
let stars = [];
let pointer = { x: null, y: null };

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.3 + 0.4,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15
  });
}

window.addEventListener("mousemove", e => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});

window.addEventListener("touchmove", e => {
  pointer.x = e.touches[0].clientX;
  pointer.y = e.touches[0].clientY;
});

window.addEventListener("touchend", () => {
  pointer.x = null;
  pointer.y = null;
});

function animate() {
  ctx.clearRect(0, 0, w, h);

  stars.forEach(s => {
    if (pointer.x !== null) {
      let dx = s.x - pointer.x;
      let dy = s.y - pointer.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        s.x += dx * 0.03;
        s.y += dy * 0.03;
      }
    }

    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0) s.x = w;
    if (s.x > w) s.x = 0;
    if (s.y < 0) s.y = h;
    if (s.y > h) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

/* ===== PASSWORD ===== */
const unlockBtn = document.getElementById("unlockBtn");

if (unlockBtn) {
  unlockBtn.onclick = () => {
    const pass = document.getElementById("secretPassword").value;
    const lock = document.getElementById("lockIcon");
    const title = document.getElementById("secretTitle");
    const error = document.getElementById("errorMsg");

    if (pass === "laddoo") {
      lock.textContent = "🔓";
      title.classList.add("unlocked");
      error.textContent = "Unlocked 💙";

      setTimeout(() => {
        window.location.href = "final.html";
      }, 1200);
    } else {
      error.textContent = "SUSRII KI TANNEY PASSWORD NA BERA 😡";
      title.classList.add("shake");
      setTimeout(() => title.classList.remove("shake"), 400);
    }
  };
}
