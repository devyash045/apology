/**
 * ==============================================================================
 * 💌 APOLOGY WEBSITE CONFIGURATION
 * 
 * Customize the names, memories, images, reasons, and messages below!
 * Everything is automatically plugged into the website flow.
 * ==============================================================================
 */

const CONFIG = {
  // ---------------------------------------------------------------------------
  // 1. PERSONAL DETAILS
  // ---------------------------------------------------------------------------
  // The name or affectionate nickname of the person you are apologizing to:
  recipientName: "To My Wiffee Ji ❤️", // Custom affectionate title

  // Your name or how you wish to sign off:
  senderName: "Hamesha sirf aur sirf aapka ❤️", // Love sign-off

  // ---------------------------------------------------------------------------
  // 2. MEMORY GALLERY (Section 4)
  // ---------------------------------------------------------------------------
  // You can leave 'image' as "" (empty string) to show beautiful aesthetic art,
  // or put a path / URL to a real photo (e.g. "images/photo1.jpg" or "https://...")
  memories: [
    {
      tag: "Memory #1",
      caption: "Jab hum first time mile the… wo meri zindagi ka sabse khoobsurat din tha. Pehli baar tumhe apni aankhon ke saamne dekhna, tumhara haath thaam kar wo pehla ehsaas mehsoos karna… meri favorite memory hai. Us pal ne meri duniya badal di thi. Please humare us pyaar ke liye apna gussa chhod do na meri jaan… ❤️🥺",
      image: "" // Add your photo path here if you have one
    },
    {
      tag: "Memory #2",
      caption: "Jab tum bina ruke apni saari baatein mujhe batati ho, wo baatein sunna mujhe duniya me sabse zyada sukoon deta hai. Tumhara har baat mujhse share karna aur jab tum meri baat pyaar se maan leti ho na… toh dil khushi se jhoom uthta hai ✨💖",
      image: "" // Add your photo path here if you have one
    },
    {
      tag: "Memory #3",
      caption: "Humari wo hasi aur be-parwah lamhe… jab hum bina kisi baat ke ghanton haste rehte the. Tumhari wo pyaari si muskaan aur shararatein meri zindagi ki sabse badi daulat hain 😂❤️",
      image: "" // Add your photo path here if you have one
    },
    {
      tag: "Memory #4",
      caption: "Humara wo pehla hug… jise main kabhi nahi bhool sakta. Wo sukoon, wo pal mere liye kisi vardaan se kam nahi tha. Tumhari baahon me jo sukoon hai wo poori duniya me kahin nahi hai… I love you so much, please mujhe maaf kar do na 🫂❤️",
      image: "" // Add your photo path here if you have one
    }
  ],

  // ---------------------------------------------------------------------------
  // 3. REASONS WHY YOU ARE SPECIAL (Section 9)
  // ---------------------------------------------------------------------------
  // Each click on "Give me a reason ❤️" picks a unique message from this list!
  // At least 15 heartfelt messages are included here; feel free to add more!
  reasons: [
    "Because you make ordinary moments feel special.",
    "Because your smile genuinely changes my mood.",
    "Because you understand parts of me that others don't.",
    "Because you somehow make even boring conversations memorable.",
    "Because I care about you more than I sometimes know how to say.",
    "Because you’re you. And that’s enough.",
    "Because the kindness you show to people inspires me to be better.",
    "Because your laugh is honestly my favorite sound in the world.",
    "Because when something good happens, you're the first person I want to tell.",
    "Because you notice the little details about me that everyone else misses.",
    "Because even in complete silence, being around you feels peaceful.",
    "Because you have the biggest, most generous heart.",
    "Because you make me feel safe enough to be completely myself.",
    "Because our memories together are some of the happiest chapters of my life.",
    "Because losing you would leave a space no one else could ever fill.",
    "Because your hugs feel like coming home after a long journey.",
    "Because you believe in me even during the moments I doubt myself.",
    "Because your perspective always opens my eyes to something better.",
    "Because you deserve all the gentleness, honesty, and love in the world.",
    "Because I would choose you over being 'right' every single time."
  ],

  // ---------------------------------------------------------------------------
  // 4. PERSONAL APOLOGY MESSAGE (Section 8 Reveal)
  // ---------------------------------------------------------------------------
  finalLetter: [
    "Mujhe pata hai aap sab kuch turant nahi bhool sakti...",
    "Par bas itna jaan lo ki main dil se sharminda hoon aur aapse be-inteha pyaar karta hoon.",
    "Aur agar aap chahein...",
    "Toh main aapko khone ke bajaye humare rishte ko hamesha ke liye sambhalna chahta hoon ❤️"
  ]
};


/**
 * ==============================================================================
 * APPLICATION ENGINE
 * Particles, Audio Synthesizer, Story Animations & Interactions
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Personalization from CONFIG
  initPersonalization();

  // Initialize Ambient Canvas Particles (Hearts & Sparkles)
  initAmbientBackground();

  // Initialize Confetti Canvas
  initConfettiEngine();

  // Initialize Audio Synthesizer (Zero-dependency Web Audio API)
  initSoundEngine();

  // Initialize Section 1 Typing & Intro Flow
  initSectionOpening();

  // Initialize Scroll Reveals (Intersection Observer)
  initScrollReveals();

  // Initialize Section 3 Interactive Cards
  initUnderstandCards();

  // Initialize Section 4 Memories Gallery
  initMemoriesGallery();

  // Initialize Section 5 Test Buttons
  initHonestyTest();

  // Initialize Section 8 Climax Apology Button
  initFinalApology();

  // Initialize Section 9 Reason Generator
  initReasonGenerator();

  // Initialize Love Letter Wax Seal Interaction
  initLoveLetterInteractions();
});

/**
 * -----------------------------------------------------------------------------
 * 1. Personalization Initialization
 * -----------------------------------------------------------------------------
 */
function initPersonalization() {
  const navRecipient = document.getElementById("nav-recipient");
  if (navRecipient && CONFIG.recipientName) {
    navRecipient.textContent = CONFIG.recipientName;
  }

  const finalSender = document.getElementById("final-sender-name");
  if (finalSender && CONFIG.senderName) {
    finalSender.textContent = CONFIG.senderName;
  }

  // Populate custom final letter lines if customized
  if (CONFIG.finalLetter && CONFIG.finalLetter.length >= 4) {
    const p1 = document.getElementById("fl-p1");
    const p2 = document.getElementById("fl-p2");
    const p3 = document.getElementById("fl-p3");
    const p4 = document.getElementById("fl-p4");
    if (p1) p1.textContent = CONFIG.finalLetter[0];
    if (p2) p2.textContent = CONFIG.finalLetter[1];
    if (p3) p3.textContent = CONFIG.finalLetter[2];
    if (p4) p4.textContent = CONFIG.finalLetter[3];
  }
}

/**
 * -----------------------------------------------------------------------------
 * 2. Web Audio API Ambient Sound Synthesizer
 * -----------------------------------------------------------------------------
 */
let audioCtx = null;
let isAudioEnabled = false;

function initSoundEngine() {
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  if (!soundToggleBtn) return;

  const iconOff = soundToggleBtn.querySelector(".sound-off");
  const iconOn = soundToggleBtn.querySelector(".sound-on");

  soundToggleBtn.addEventListener("click", () => {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }

    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isAudioEnabled = !isAudioEnabled;

    if (isAudioEnabled) {
      if (iconOff) iconOff.style.display = "none";
      if (iconOn) iconOn.style.display = "block";
      soundToggleBtn.setAttribute("title", "Mute ambient sounds");
      // Play a gentle welcome chord
      playGentleChime([523.25, 659.25, 783.99, 1046.50]); // C5, E5, G5, C6
    } else {
      if (iconOff) iconOff.style.display = "block";
      if (iconOn) iconOn.style.display = "none";
      soundToggleBtn.setAttribute("title", "Enable ambient sounds");
    }
  });
}

function playSoftTone(freq = 440, duration = 0.8, type = "sine") {
  if (!isAudioEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context safely ignored if blocked
  }
}

function playGentleChime(frequencies = [587.33, 739.99, 880]) {
  if (!isAudioEnabled || !audioCtx) return;
  frequencies.forEach((freq, idx) => {
    setTimeout(() => {
      playSoftTone(freq, 1.2, "sine");
    }, idx * 120);
  });
}

/**
 * -----------------------------------------------------------------------------
 * 3. Ambient Particle Background (Drifting Hearts & Bokeh Sparkles)
 * -----------------------------------------------------------------------------
 */
function initAmbientBackground() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 20000), 55);

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 7 + 4;
      this.speedY = Math.random() * 0.45 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.isHeart = Math.random() > 0.45; // 55% hearts, 45% soft bokeh
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.angle) * 0.2;
      this.angle += this.spinSpeed;

      // Gentle interactive drift near mouse
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        this.x -= (dx / dist) * 0.6;
        this.y -= (dy / dist) * 0.6;
      }

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * 0.3);
      ctx.globalAlpha = this.opacity;

      if (this.isHeart) {
        // Draw delicate heart
        ctx.fillStyle = "rgba(244, 114, 182, 0.75)";
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(
          -this.size / 2,
          (this.size + topCurveHeight) / 2,
          0,
          (this.size + topCurveHeight) / 1.4,
          0,
          this.size
        );
        ctx.bezierCurveTo(
          0,
          (this.size + topCurveHeight) / 1.4,
          this.size / 2,
          (this.size + topCurveHeight) / 2,
          this.size / 2,
          topCurveHeight
        );
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
      } else {
        // Soft glowing circular bokeh
        ctx.fillStyle = "rgba(253, 164, 175, 0.4)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(244, 114, 182, 0.5)";
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });
}

/**
 * -----------------------------------------------------------------------------
 * 4. Confetti Engine (Petal & Heart Celebratory Burst)
 * -----------------------------------------------------------------------------
 */
let spawnConfettiBurst = () => {};

function initConfettiEngine() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const confettiPieces = [];
  const colors = [
    "rgba(244, 114, 182, 0.9)", // Pink
    "rgba(251, 113, 133, 0.9)", // Rose
    "rgba(244, 63, 94, 0.9)",   // Vibrant rose
    "rgba(255, 228, 230, 0.95)", // Pale rose
    "rgba(255, 255, 255, 0.95)"  // Pure white
  ];

  class ConfettiPiece {
    constructor(startX, startY) {
      this.x = startX;
      this.y = startY;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 12 + 6;
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity - 4; // bias upward
      this.gravity = 0.22;
      this.friction = 0.97;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 8;
      this.size = Math.random() * 12 + 8;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = 1;
      this.isHeart = Math.random() > 0.35;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.opacity -= 0.009;
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;

      if (this.isHeart) {
        ctx.beginPath();
        const s = this.size * 0.7;
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s * 0.3);
        ctx.bezierCurveTo(-s / 2, s * 0.8, 0, s * 1.1, 0, s * 1.3);
        ctx.bezierCurveTo(0, s * 1.1, s / 2, s * 0.8, s / 2, s * 0.3);
        ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, s * 0.3);
        ctx.fill();
      } else {
        // Petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.5, this.size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  let activeLoop = false;

  function runConfettiLoop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.update();
      p.draw();
      if (p.opacity <= 0 || p.y > height + 50) {
        confettiPieces.splice(i, 1);
      }
    }

    if (confettiPieces.length > 0) {
      requestAnimationFrame(runConfettiLoop);
    } else {
      activeLoop = false;
      ctx.clearRect(0, 0, width, height);
    }
  }

  spawnConfettiBurst = (originX = width / 2, originY = height / 2, count = 90) => {
    for (let i = 0; i < count; i++) {
      confettiPieces.push(new ConfettiPiece(originX, originY));
    }
    if (!activeLoop) {
      activeLoop = true;
      runConfettiLoop();
    }
  };
}

/**
 * -----------------------------------------------------------------------------
 * 5. SECTION 1 — The Opening Cinematic Animation
 * -----------------------------------------------------------------------------
 */
function initSectionOpening() {
  const line1 = document.getElementById("type-line-1");
  const line2 = document.getElementById("type-line-2");
  const line3 = document.getElementById("type-line-3");
  const ctaWrap = document.getElementById("opening-cta-wrap");
  const btnGive30s = document.getElementById("btn-give-30s");

  if (!line1 || !line2 || !line3 || !ctaWrap || !btnGive30s) return;

  const text1 = "“I know you're angry…”";
  const text2 = "“And honestly… you have every right to be.”";
  const text3 = "“But before you decide anything…”";

  // Typing helper with natural rhythmic cadence
  function typeText(element, text, speed = 42) {
    return new Promise((resolve) => {
      let index = 0;
      element.classList.add("visible");
      const interval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  // Sequence the three lines
  setTimeout(async () => {
    await typeText(line1, text1, 45);
    await new Promise((r) => setTimeout(r, 600));
    await typeText(line2, text2, 40);
    await new Promise((r) => setTimeout(r, 650));
    await typeText(line3, text3, 38);
    await new Promise((r) => setTimeout(r, 450));
    ctaWrap.classList.add("visible");
  }, 400);

  // Button interaction: animate, spawn gentle hearts, smooth scroll to Section 2
  btnGive30s.addEventListener("click", (e) => {
    playGentleChime([523.25, 659.25, 783.99]); // C5, E5, G5

    // Button animation feedback
    btnGive30s.style.transform = "scale(0.96)";
    setTimeout(() => {
      btnGive30s.style.transform = "";
    }, 180);

    // Mini heart burst at button position
    const rect = btnGive30s.getBoundingClientRect();
    spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);

    // Smooth scroll to Section 2
    const section2 = document.getElementById("section-2");
    if (section2) {
      setTimeout(() => {
        section2.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  });
}

/**
 * -----------------------------------------------------------------------------
 * 6. Scroll Reveal Observer (Cinematic Sequential Line Reveals)
 * -----------------------------------------------------------------------------
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute("data-delay") || 100;
          setTimeout(() => {
            el.classList.add("revealed");
          }, parseInt(delay, 10));
          // Once revealed, unobserve to keep performance optimal
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * -----------------------------------------------------------------------------
 * 7. SECTION 3 — What I Should Have Understood Cards
 * -----------------------------------------------------------------------------
 */
function initUnderstandCards() {
  const cards = document.querySelectorAll(".interactive-card");

  cards.forEach((card) => {
    // 3D Tilt on Mouse Move
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 768) return; // Skip on mobile for performance
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    // Tap / Click to Expand Details
    const toggleExpand = () => {
      const willExpand = !card.classList.contains("expanded");

      // Close all other cards first so only the selected one expands
      cards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains("expanded")) {
          otherCard.classList.remove("expanded");
          otherCard.setAttribute("aria-expanded", "false");
          const otherBadge = otherCard.querySelector(".card-expand-badge");
          if (otherBadge) otherBadge.textContent = "Tap to expand";
        }
      });

      // Toggle this card
      card.classList.toggle("expanded", willExpand);
      card.setAttribute("aria-expanded", willExpand);

      const badge = card.querySelector(".card-expand-badge");
      if (badge) {
        badge.textContent = willExpand ? "Close" : "Tap to expand";
      }

      playSoftTone(willExpand ? 587.33 : 440, 0.4);
    };

    card.addEventListener("click", toggleExpand);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleExpand();
      }
    });
  });
}

/**
 * -----------------------------------------------------------------------------
 * 8. SECTION 4 — Polaroid Memories Gallery
 * -----------------------------------------------------------------------------
 */
function initMemoriesGallery() {
  const memories = CONFIG.memories;
  if (!memories) return;

  memories.forEach((mem, index) => {
    const num = index + 1;
    const textEl = document.getElementById(`memory-text-${num}`);
    if (textEl && mem.caption && !mem.caption.includes("Replace this")) {
      textEl.textContent = mem.caption;
    }

    // If an image URL is specified, replace the vector placeholder
    if (mem.image && mem.image.trim() !== "") {
      const container = document.getElementById(`polaroid-img-${num}`);
      if (container) {
        const img = document.createElement("img");
        img.src = mem.image;
        img.alt = mem.tag || `Memory #${num}`;
        img.loading = "lazy";
        img.onerror = () => {
          // Keep default art if image fails to load
          img.remove();
        };
        img.onload = () => {
          container.innerHTML = "";
          container.appendChild(img);
        };
      }
    }
  });

  // Sound and elevation on clicking polaroids
  const polaroids = document.querySelectorAll(".polaroid-frame");
  polaroids.forEach((frame) => {
    frame.addEventListener("click", () => {
      playSoftTone(659.25, 0.5); // E5
      const rect = frame.getBoundingClientRect();
      spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
    });
  });
}

/**
 * -----------------------------------------------------------------------------
 * 9. SECTION 5 — A Little Test (Honesty & Emotional Resonance)
 * -----------------------------------------------------------------------------
 */
function initHonestyTest() {
  const btnYes = document.getElementById("btn-test-yes");
  const btnMaybe = document.getElementById("btn-test-maybe");
  const btnNo = document.getElementById("btn-test-no");
  const feedbackPrimary = document.getElementById("feedback-primary");
  const feedbackSecondary = document.getElementById("feedback-secondary");
  const buttons = [btnYes, btnMaybe, btnNo];

  if (!btnYes || !btnMaybe || !btnNo || !feedbackPrimary || !feedbackSecondary) return;

  let yesTimeout = null;

  function clearActive() {
    buttons.forEach((btn) => btn.classList.remove("active"));
    if (yesTimeout) clearTimeout(yesTimeout);
  }

  // YES Clicked
  btnYes.addEventListener("click", () => {
    clearActive();
    btnYes.classList.add("active");
    playSoftTone(349.23, 0.5); // F4

    feedbackPrimary.style.opacity = "0";
    feedbackSecondary.classList.remove("visible");

    setTimeout(() => {
      feedbackPrimary.textContent = "“Okay… fair enough 😭”";
      feedbackPrimary.style.opacity = "1";
    }, 150);

    yesTimeout = setTimeout(() => {
      feedbackSecondary.textContent = "“But can I try once more?”";
      feedbackSecondary.classList.add("visible");
      playGentleChime([440, 554.37]);
    }, 1200);
  });

  // MAYBE Clicked
  btnMaybe.addEventListener("click", () => {
    clearActive();
    btnMaybe.classList.add("active");
    playSoftTone(440, 0.5); // A4

    feedbackPrimary.style.opacity = "0";
    feedbackSecondary.classList.remove("visible");

    setTimeout(() => {
      feedbackPrimary.textContent = "“So there’s still hope? 👀❤️”";
      feedbackPrimary.style.opacity = "1";
    }, 150);
  });

  // NOT ANYMORE Clicked
  btnNo.addEventListener("click", () => {
    clearActive();
    btnNo.classList.add("active");
    playGentleChime([523.25, 659.25, 783.99, 1046.50]);

    // Soft heart burst
    const rect = btnNo.getBoundingClientRect();
    spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);

    feedbackPrimary.style.opacity = "0";
    feedbackSecondary.classList.remove("visible");

    setTimeout(() => {
      feedbackPrimary.textContent = "“I knew you had a soft heart. 🥹❤️”";
      feedbackPrimary.style.opacity = "1";
    }, 150);
  });
}

/**
 * -----------------------------------------------------------------------------
 * 10. SECTION 8 — The Final Climax Apology Button
 * -----------------------------------------------------------------------------
 */
function initFinalApology() {
  const btnLastChance = document.getElementById("btn-last-chance");
  const stage1 = document.getElementById("apology-pre-click");
  const stage2 = document.getElementById("apology-post-click");
  const paragraphs = document.querySelectorAll(".final-letter-p");

  if (!btnLastChance || !stage1 || !stage2) return;

  btnLastChance.addEventListener("click", () => {
    // 1. Play grand emotional chord
    playGentleChime([392, 523.25, 659.25, 783.99, 1046.50]); // G4, C5, E5, G5, C6

    // 2. Spawn full celebratory heart/confetti explosion
    const rect = btnLastChance.getBoundingClientRect();
    spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 110);

    // 3. Slowly brighten background to warm romantic sunrise
    document.body.classList.add("warm-sunrise-glow");

    // 4. Smoothly transition to the heartfelt letter
    stage1.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    stage1.style.opacity = "0";
    stage1.style.transform = "translateY(-15px)";

    setTimeout(() => {
      stage1.style.display = "none";
      stage2.style.display = "block";
      stage2.style.opacity = "0";
      stage2.style.transform = "translateY(15px)";

      requestAnimationFrame(() => {
        stage2.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        stage2.style.opacity = "1";
        stage2.style.transform = "translateY(0)";

        // Stagger paragraphs reveal
        paragraphs.forEach((p, idx) => {
          setTimeout(() => {
            p.classList.add("visible");
          }, 350 + idx * 450);
        });
      });
    }, 600);
  });
}

/**
 * -----------------------------------------------------------------------------
 * 11. SECTION 9 — Interactive Reason Generator
 * -----------------------------------------------------------------------------
 */
function initReasonGenerator() {
  const btnReason = document.getElementById("btn-next-reason");
  const reasonText = document.getElementById("reason-text");
  const reasonCounter = document.getElementById("reason-counter");
  const reasonCard = document.getElementById("reason-display-card");

  if (!btnReason || !reasonText || !reasonCounter || !reasonCard) return;

  const reasons = CONFIG.reasons && CONFIG.reasons.length > 0 ? CONFIG.reasons : [
    "Because you make ordinary moments feel special.",
    "Because your smile genuinely changes my mood.",
    "Because you understand parts of me that others don't."
  ];

  let unvisitedIndices = [];
  let shownCount = 1;

  function refreshIndices() {
    unvisitedIndices = Array.from({ length: reasons.length }, (_, i) => i);
    // Shuffle indices for unpredictable, delightful order
    for (let i = unvisitedIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unvisitedIndices[i], unvisitedIndices[j]] = [unvisitedIndices[j], unvisitedIndices[i]];
    }
  }

  refreshIndices();
  // Remove 0 since it is displayed initially
  unvisitedIndices = unvisitedIndices.filter((idx) => idx !== 0);

  btnReason.addEventListener("click", () => {
    if (unvisitedIndices.length === 0) {
      refreshIndices();
    }

    const nextIndex = unvisitedIndices.pop();
    shownCount++;

    playSoftTone(587.33 + (shownCount % 5) * 50, 0.45); // Melodic stepping tone

    // Card micro-animation
    reasonCard.classList.add("animating");
    reasonText.classList.add("fade-out");

    setTimeout(() => {
      reasonCounter.textContent = `Reason #${shownCount}`;
      reasonText.textContent = reasons[nextIndex];
      reasonText.classList.remove("fade-out");
      reasonCard.classList.remove("animating");
    }, 280);

    // Micro sparkles
    const rect = btnReason.getBoundingClientRect();
    spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
  });
}

/**
 * -----------------------------------------------------------------------------
 * 12. Special Love Letter (Teaser -> Top-Scrolled Unfold Flow & Animations)
 * -----------------------------------------------------------------------------
 */
function initLoveLetterInteractions() {
  const btnOpen = document.getElementById("btn-open-letter");
  const teaserCard = document.getElementById("letter-teaser-card");
  const letterCard = document.getElementById("love-letter-card");
  const waxSeal = document.getElementById("love-letter-wax-seal");

  if (!btnOpen || !teaserCard || !letterCard) return;

  // Function to smoothly scroll directly to the VERY TOP of the letter card
  const scrollToLetterBeginning = () => {
    const topNav = document.getElementById("top-nav");
    const navHeight = topNav ? topNav.offsetHeight : 60;
    const letterRect = letterCard.getBoundingClientRect();
    const letterAbsoluteTop = letterRect.top + window.pageYOffset;

    // Generous breathing space (55px) above the letter's wax seal so the entire seal and card header are completely visible
    const targetScroll = Math.max(0, letterAbsoluteTop - navHeight - 55);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  btnOpen.addEventListener("click", () => {
    // 1. Play heartfelt romantic chord progression
    playGentleChime([440.00, 554.37, 659.25, 880.00]); // A major chord
    setTimeout(() => {
      playGentleChime([523.25, 659.25, 783.99, 1046.50]); // C major chord
    }, 240);

    // 2. Confetti & Heart burst right at the button location
    const btnRect = btnOpen.getBoundingClientRect();
    spawnConfettiBurst(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 45);

    // 3. Smooth exit animation for the teaser card
    teaserCard.classList.add("teaser-fading-out");
    teaserCard.style.transition = "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    teaserCard.style.opacity = "0";
    teaserCard.style.transform = "scale(0.92) translateY(-12px)";
    teaserCard.style.pointerEvents = "none";

    // 4. Reveal the Love Letter and smoothly scroll to the VERY TOP of the letter
    setTimeout(() => {
      teaserCard.style.display = "none";
      letterCard.style.display = "block";
      letterCard.classList.add("letter-unfold-entrance");

      // Hide all reveal items initially so they unfold sequentially from top to bottom
      const revealItems = letterCard.querySelectorAll(".reveal-item");
      revealItems.forEach((item) => {
        item.classList.remove("revealed");
        item.style.opacity = "0";
        item.style.transform = "translateY(24px)";
        item.style.transition = "opacity 0.75s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)";
      });

      // CRITICAL: Scroll smoothly to the VERY START of the letter (not the middle or bottom!)
      scrollToLetterBeginning();

      // Checkpoint after layout paint/reflow to guarantee the top is aligned
      setTimeout(scrollToLetterBeginning, 180);

      // 5. Sequential Staggered reveal of paragraphs from top to bottom
      revealItems.forEach((item, index) => {
        // First item (header with "To My Wiffee Ji ❤️") shows at 260ms
        const delay = 260 + (index * 320);
        setTimeout(() => {
          item.classList.add("revealed");
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, delay);
      });

      // 6. Celebratory subtle heart shower once the whole letter has unfolded
      const totalRevealTime = 260 + (revealItems.length * 320) + 150;
      setTimeout(() => {
        if (waxSeal) {
          const sRect = waxSeal.getBoundingClientRect();
          spawnConfettiBurst(sRect.left + sRect.width / 2, sRect.top + sRect.height / 2, 30);
        }
      }, totalRevealTime);

    }, 380);
  });

  // Wax Seal tap interaction (can be tapped anytime for sweet feedback)
  if (waxSeal) {
    waxSeal.addEventListener("click", () => {
      playGentleChime([523.25, 659.25, 783.99, 1046.50]); // C5, E5, G5, C6
      const rect = waxSeal.getBoundingClientRect();
      spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);

      waxSeal.style.transform = "translateX(-50%) scale(1.25)";
      setTimeout(() => {
        waxSeal.style.transform = "";
      }, 250);
    });
  }
}


