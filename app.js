
const LOCKED = document.getElementById('locked');
const UNLOCKED = document.getElementById('unlocked');
const UNLOCK_BTN = document.getElementById('unlockBtn');
const CODE = document.getElementById('code');
const TIMELEFT = document.getElementById('timeLeft');
const END_NOW = document.getElementById('endNow');

const DURATION_MS = 15 * 60 * 1000; // 15 minutes
let countdown = null;
let browsingWindow = null;

function fmt(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return String(m).padStart(2,'0') + ':' + String(r).padStart(2,'0');
}

CODE.addEventListener('input', () => {
  UNLOCK_BTN.disabled = CODE.value.trim().length < 4;
});

UNLOCK_BTN.addEventListener('click', () => {
  const code = CODE.value.trim();
  if (code.length < 4) return;
  startSession();
});

function startSession() {
  // Try to open the browsing window
  let child = null;
  try {
    child = window.open('https://www.google.com', '_blank'); // or your start page
    if (child) child.focus();
  } catch (_) {}

  // Show unlocked UI + timer
  LOCKED.classList.add('hidden');
  UNLOCKED.classList.remove('hidden');

  // If the popup was blocked, show a big “Open Browser Now” button
  if (!child || child.closed) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Open Browser Now';
    btn.onclick = () => {
      browsingWindow = window.open('https://www.google.com', '_blank');
      if (browsingWindow) browsingWindow.focus();
      btn.remove();
    };
    document.querySelector('.actions').prepend(btn);
  } else {
    browsingWindow = child;
  }

  // Start the 15-min timer
  const end = Date.now() + DURATION_MS;
  countdown = setInterval(() => {
    const left = end - Date.now();
    TIMELEFT.textContent = fmt(left);
    if (left <= 0) {
      clearInterval(countdown);
      tryCloseBrowser();
      location.reload();
    }
  }, 1000);
}


function tryCloseBrowser() {
  // You can close a window you opened, even if cross-origin
  try {
    if (browsingWindow && !browsingWindow.closed) browsingWindow.close();
  } catch (e) {
    // ignore
  }
}

END_NOW.addEventListener('click', () => {
  if (confirm('End session now?')) {
    clearInterval(countdown);
    tryCloseBrowser();
    location.reload();
  }
});
