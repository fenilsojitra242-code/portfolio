/**
 * FENIL SOJITRA — COLORFUL DIGITAL PERSONALITY
 * Complete Interactive Animation Engine:
 * - AI Neural Constellation Canvas (Hero background)
 * - Draggable Physics Stickers
 * - 3D Holographic Card Glare Sheen & Tilt
 * - Cursor Sparkle Particle Trail
 * - Live Interactive Terminal REPL with Easter Eggs
 * - Scroll Progress, Scroll Reveals, Active Nav Spy & Velocity Marquee
 */

document.addEventListener('DOMContentLoaded', () => {
  // Core Creative Effects
  initCreativeCursor();
  initCursorSparkleTrail();
  initHeroNeuralCanvas();
  initHeroDesktopParallax();
  initInteractive3DSkillCards();
  initProjectPosterTilts();
  initHolographicCardGlares();
  initDraggableStickers();
  initMagneticButtons();
  initNavbarScroll();
  initMobileDrawer();
  initContactForm();

  // Scroll Animations Suite
  initScrollProgressBar();
  initScrollReveals();
  initScrollVelocityMarquee();
  initScrollActiveNavigation();
  initBackToTopButton();
  initScrollParallaxAmbient();
});

/* ==========================================================================
   01. CREATIVE CURSOR & SPARKLE EMITTER
   ========================================================================== */
function initCreativeCursor() {
  const cursor = document.getElementById('creative-cursor');
  const badge = document.getElementById('cursor-badge');
  if (!cursor || window.innerWidth < 1024) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    curX += (mouseX - curX) * 0.25;
    curY += (mouseY - curY) * 0.25;
    cursor.style.left = `${curX}px`;
    cursor.style.top = `${curY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Links & Buttons Hover
  const interactiveLinks = document.querySelectorAll('a, button, .skill-card-3d-wrap, .dataset-pill, .algo-pill, .studio-action-btn, .type-sticker');
  interactiveLinks.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering-link');
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering-link'));
  });

  // Project Poster Hover
  const projectCards = document.querySelectorAll('.project-poster-item');
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering-project');
      if (badge) badge.textContent = 'EXPLORE ↗';
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering-project');
    });
  });
}

function initCursorSparkleTrail() {
  if (window.innerWidth < 768) return;

  const shapes = ['✦', '●', '★', '▲', '◆'];
  const colors = ['#FF6B35', '#8FE3CF', '#B8A1FF', '#FFD166', '#181818'];
  let lastSparkleTime = 0;

  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastSparkleTime < 55) return; // throttle emission
    lastSparkleTime = now;

    // Check if moving fast enough
    createSparkle(e.clientX, e.clientY);
  });

  function createSparkle(x, y) {
    const p = document.createElement('span');
    p.className = 'sparkle-particle font-display';
    p.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    p.style.color = colors[Math.floor(Math.random() * colors.length)];
    p.style.fontSize = `${Math.floor(Math.random() * 8 + 10)}px`;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;

    const xOffset = (Math.random() - 0.5) * 48;
    const yOffset = (Math.random() - 0.5) * 48;
    const rot = (Math.random() - 0.5) * 90;

    p.style.setProperty('--sparkle-x', `${xOffset}px`);
    p.style.setProperty('--sparkle-y', `${yOffset}px`);
    p.style.setProperty('--sparkle-rot', `${rot}deg`);

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 750);
  }
}

/* ==========================================================================
   02. AI NEURAL CONSTELLATION CANVAS (Site-wide Background)
   ========================================================================== */
function initHeroNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });

  const isMobile = window.innerWidth < 768;
  const targetNodeCount = isMobile ? 32 : Math.min(75, Math.max(45, Math.floor((width * height) / 24000)));
  const nodes = [];
  const palette = ['#FF6B35', '#8FE3CF', '#B8A1FF', '#FFD166', '#FF8E53'];

  for (let i = 0; i < targetNodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      radius: Math.random() * 2.2 + 1.6,
      color: palette[Math.floor(Math.random() * palette.length)]
    });
  }

  let mouse = { x: -1000, y: -1000 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  const connectionDist = isMobile ? 100 : 135;
  const mouseDist = 140;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0) { n.x = 0; n.vx *= -1; }
      else if (n.x > width) { n.x = width; n.vx *= -1; }

      if (n.y < 0) { n.y = 0; n.vy *= -1; }
      else if (n.y > height) { n.y = height; n.vy *= -1; }

      // Mouse repulsion & interaction
      const dx = mouse.x - n.x;
      const dy = mouse.y - n.y;
      const dist = Math.hypot(dx, dy);

      if (dist < mouseDist) {
        const force = (1 - dist / mouseDist) * 1.5;
        n.x -= (dx / dist) * force * 1.8;
        n.y -= (dy / dist) * force * 1.8;

        // Subtle glow line towards mouse
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 107, 53, ${0.22 * (1 - dist / mouseDist)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw node circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      // Connect with other nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist2 = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist2 < connectionDist) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(24, 24, 24, ${0.12 * (1 - dist2 / connectionDist)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   03. HERO DESKTOP STAGE PARALLAX
   ========================================================================== */
function initHeroDesktopParallax() {
  const stage = document.getElementById('hero-stage');
  if (!stage || window.innerWidth < 768) return;

  const card = stage.querySelector('.portrait-card-container');
  const ambientItems = stage.querySelectorAll('[data-speed]');

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    if (card) {
      card.style.transform = `perspective(1000px) rotateY(${nx * 8}deg) rotateX(${-ny * 8}deg) translate(${nx * 12}px, ${ny * 12}px)`;
    }

    ambientItems.forEach((el) => {
      if (el === card) return;
      const speed = parseFloat(el.getAttribute('data-speed')) || 1;
      const mx = nx * speed * 22;
      const my = ny * speed * 22;
      el.style.transform = `translate(${mx}px, ${my}px)`;
    });
  });

  stage.addEventListener('mouseleave', () => {
    if (card) {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translate(0px, 0px)';
    }
    ambientItems.forEach((el) => {
      if (el === card) return;
      el.style.transform = '';
    });
  });
}

/* ==========================================================================
   04. INTERACTIVE 3D FLIPPING & TILTING TECH CARDS ENGINE
   ========================================================================== */
function initInteractive3DSkillCards() {
  const cards = document.querySelectorAll('.skill-card-3d-wrap');
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const flipAllBtn = document.getElementById('skills-flip-all-btn');
  const randomBtn = document.getElementById('skills-random-btn');

  if (!cards.length) return;

  // --- 1. Interactive 3D Perspective Tilt & Dynamic Glare on Desktop ---
  if (window.innerWidth >= 992) {
    cards.forEach((wrap) => {
      const inner = wrap.querySelector('.skill-card-3d-inner');
      const glare = wrap.querySelector('.card-glare');
      if (!inner) return;

      wrap.addEventListener('mousemove', (e) => {
        if (wrap.classList.contains('is-flipped')) return; // Keep clean flip

        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        const rotY = ((x - centerX) / centerX) * 10;

        inner.style.transform = `perspective(1400px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px)`;

        // Glare dynamic coords
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        wrap.style.setProperty('--glare-x', `${pctX}%`);
        wrap.style.setProperty('--glare-y', `${pctY}%`);
      });

      wrap.addEventListener('mouseleave', () => {
        if (!wrap.classList.contains('is-flipped')) {
          inner.style.transform = '';
        } else {
          inner.style.transform = 'rotateY(180deg)';
        }
      });
    });
  }

  // --- 2. Interactive Card Flip (Click anywhere or button) ---
  cards.forEach((wrap) => {
    wrap.addEventListener('click', (e) => {
      // Toggle flip
      wrap.classList.toggle('is-flipped');
      const inner = wrap.querySelector('.skill-card-3d-inner');
      if (inner) {
        if (wrap.classList.contains('is-flipped')) {
          inner.style.transform = 'rotateY(180deg)';
        } else {
          inner.style.transform = '';
        }
      }
    });
  });

  // --- 3. Category Filter Tabs System ---
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let staggerIdx = 0;
      cards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        const matches = (filter === 'all' || cat === filter);

        if (matches) {
          card.classList.remove('is-filtered-out');
          card.style.transitionDelay = `${staggerIdx * 40}ms`;
          staggerIdx++;
        } else {
          card.classList.add('is-filtered-out');
          card.style.transitionDelay = '0ms';
        }
      });
    });
  });

  // --- 4. "FLIP ALL STATS" Toggle Button ---
  if (flipAllBtn) {
    let allFlipped = false;
    const labelSpan = flipAllBtn.querySelector('.action-label');

    flipAllBtn.addEventListener('click', () => {
      allFlipped = !allFlipped;
      const visibleCards = Array.from(cards).filter(c => !c.classList.contains('is-filtered-out'));

      visibleCards.forEach((card, idx) => {
        setTimeout(() => {
          const inner = card.querySelector('.skill-card-3d-inner');
          if (allFlipped) {
            card.classList.add('is-flipped');
            if (inner) inner.style.transform = 'rotateY(180deg)';
          } else {
            card.classList.remove('is-flipped');
            if (inner) inner.style.transform = '';
          }
        }, idx * 45); // Staggered wave flip
      });

      if (labelSpan) {
        labelSpan.textContent = allFlipped ? 'RESET CARDS ✕' : 'FLIP ALL STATS';
      }
    });
  }

  // --- 5. "RANDOM CARD" Lottery Focus ---
  if (randomBtn) {
    let isCycling = false;
    randomBtn.addEventListener('click', () => {
      if (isCycling) return;
      isCycling = true;

      const visibleCards = Array.from(cards).filter(c => !c.classList.contains('is-filtered-out'));
      if (!visibleCards.length) {
        isCycling = false;
        return;
      }

      cards.forEach(c => c.classList.remove('is-highlighted'));

      let ticks = 8;
      let interval = 80;

      function cycleStep() {
        const rnd = Math.floor(Math.random() * visibleCards.length);
        const card = visibleCards[rnd];

        cards.forEach(c => c.classList.remove('is-highlighted'));
        card.classList.add('is-highlighted');

        ticks--;
        if (ticks > 0) {
          interval += 30;
          setTimeout(cycleStep, interval);
        } else {
          // Flip the chosen card and scroll gently if needed
          card.classList.add('is-flipped');
          const inner = card.querySelector('.skill-card-3d-inner');
          if (inner) inner.style.transform = 'rotateY(180deg)';

          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            card.classList.remove('is-highlighted');
            isCycling = false;
          }, 2200);
        }
      }

      cycleStep();
    });
  }
}

/* ==========================================================================
   05. PROJECT POSTER 3D PERSPECTIVE TILTS & HOLOGRAPHIC GLARES
   ========================================================================== */
function initProjectPosterTilts() {
  const tiltCards = document.querySelectorAll('.project-tilt-card');
  if (!tiltCards.length || window.innerWidth < 1024) return;

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -4;
      const rotY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

function initHolographicCardGlares() {
  const tiltCards = document.querySelectorAll('.project-tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--glare-x', `${px}%`);
      card.style.setProperty('--glare-y', `${py}%`);
    });
  });
}

/* ==========================================================================
   06. DRAGGABLE PHYSICS STICKERS
   ========================================================================== */
function initDraggableStickers() {
  const stickers = document.querySelectorAll('.type-sticker[data-draggable="true"]');
  if (!stickers.length) return;

  stickers.forEach((sticker) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    sticker.addEventListener('pointerdown', (e) => {
      isDragging = true;
      sticker.setPointerCapture(e.pointerId);
      sticker.classList.add('is-dragging');
      sticker.style.transition = 'none';
      sticker.style.zIndex = '999';
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
    });

    sticker.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      const rot = Math.max(Math.min(currentX * 0.08, 15), -15);
      sticker.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px) scale(1.12) rotate(${rot}deg)`;
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      sticker.classList.remove('is-dragging');
      try { sticker.releasePointerCapture(e.pointerId); } catch(err) {}

      // Smooth spring back animation to its starting home
      sticker.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease';
      sticker.style.transform = 'translate3d(0px, 0px, 0px) scale(1) rotate(0deg)';
      currentX = 0;
      currentY = 0;
      setTimeout(() => {
        sticker.style.zIndex = '';
      }, 500);
    }

    sticker.addEventListener('pointerup', endDrag);
    sticker.addEventListener('pointercancel', endDrag);
  });
}

/* ==========================================================================
   07. MAGNETIC BUTTONS PHYSICS
   ========================================================================== */
function initMagneticButtons() {
  const btns = document.querySelectorAll('.magnetic-btn');
  if (!btns.length || window.innerWidth < 1024) return;

  btns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   08. NAVBAR SCROLL
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   09. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');
  const links = document.querySelectorAll('.drawer-link');
  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function closeMenu() {
    drawer.classList.remove('open');
    toggleBtn.classList.remove('active');
    document.body.classList.remove('no-scroll');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', toggleMenu);
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  links.forEach((l) => {
    l.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   10. INTERACTIVE MACHINE LEARNING & ENSEMBLE PLAYGROUND
   ========================================================================== */
function initMLPlayground() {
  const canvas = document.getElementById('ml-playground-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const datasetBtns = document.querySelectorAll('.dataset-pill');
  const algoBtns = document.querySelectorAll('.algo-pill');
  const sliderDepth = document.getElementById('slider-depth');
  const sliderEstimators = document.getElementById('slider-estimators');
  const sliderNoise = document.getElementById('slider-noise');
  const depthVal = document.getElementById('depth-val');
  const estimatorsVal = document.getElementById('estimators-val');
  const noiseVal = document.getElementById('noise-val');
  const groupEstimators = document.getElementById('group-estimators');

  const hudAlgoLabel = document.getElementById('hud-algo-label');
  const hudFitStatus = document.getElementById('hud-fit-status');
  const hudMSE = document.getElementById('hud-mse');
  const hudR2 = document.getElementById('hud-r2');
  const insightTitle = document.getElementById('insight-title');
  const insightDesc = document.getElementById('insight-desc');
  const btnRegen = document.getElementById('btn-regen-data');
  const btnAutoTrain = document.getElementById('btn-auto-train');

  // Playground State
  let currentDataset = 'sine';
  let currentAlgo = 'rf';
  let maxDepth = parseInt(sliderDepth?.value || '4', 10);
  let nEstimators = parseInt(sliderEstimators?.value || '25', 10);
  let noiseLevel = parseInt(sliderNoise?.value || '3', 10);
  let rawData = [];
  let isAutoTraining = false;

  // Insight database
  const algoInsights = {
    tree: {
      name: "SINGLE DECISION TREE",
      badge: "DECISION TREE",
      title: "HOW SINGLE DECISION TREE WORKS HERE:",
      desc: "A single Decision Tree recursively partitions the input feature into distinct split regions. While fast, deeper trees create sharp piecewise steps that easily overfit to random noise and outliers."
    },
    rf: {
      name: "RANDOM FOREST (BAGGING)",
      badge: "RANDOM FOREST",
      title: "HOW RANDOM FOREST WORKS HERE:",
      desc: "Random Forest trains an ensemble of randomized decision trees on bootstrap subsets. By averaging their predictions, it cancels out variance, producing a smooth, generalized curve resistant to noise."
    },
    xgb: {
      name: "GRADIENT BOOSTING (XGBOOST)",
      badge: "GRADIENT BOOSTING",
      title: "HOW GRADIENT BOOSTING WORKS HERE:",
      desc: "Gradient Boosting iteratively builds trees sequentially, where each new weak tree specifically corrects the residual prediction errors of the previous ensemble. Produces sharp, highly adaptive fit curves."
    },
    poly: {
      name: "POLYNOMIAL REGRESSION",
      badge: "POLYNOMIAL REGRESSION",
      title: "HOW POLYNOMIAL REGRESSION WORKS HERE:",
      desc: "Polynomial Regression fits continuous power curves of degree (d). Low degrees underfit complex non-linear curves, while high degrees suffer from Runge's phenomenon at the edges."
    }
  };

  // Generate Synthetic Points (x in [0.05, 0.95], y in [0.1, 0.9])
  function generateData() {
    rawData = [];
    const n = 42;
    const noiseScale = (noiseLevel - 1) * 0.035;

    for (let i = 0; i < n; i++) {
      const x = 0.05 + (i / (n - 1)) * 0.9 + (Math.random() - 0.5) * 0.015;
      let trueY = 0.5;

      if (currentDataset === 'sine') {
        trueY = 0.5 + 0.32 * Math.sin(x * Math.PI * 2.4) + 0.12 * Math.cos(x * Math.PI * 4.8);
      } else if (currentDataset === 'housing') {
        trueY = 0.15 + 0.72 * Math.pow(x, 1.6) + 0.08 * Math.sin(x * Math.PI * 3);
      } else if (currentDataset === 'cluster') {
        trueY = 0.5 + 0.38 * Math.sin(x * Math.PI * 4.2) * (1 - Math.abs(x - 0.5));
      }

      const noise = (Math.random() - 0.5) * 2 * (0.04 + noiseScale);
      const y = Math.max(0.08, Math.min(0.92, trueY + noise));
      rawData.push({ x, y });
    }

    rawData.sort((a, b) => a.x - b.x);
  }

  // Model Inference Evaluators
  function predictDecisionTree(x, depth) {
    const numBuckets = Math.min(Math.pow(2, Math.min(depth, 6)), 32);
    const bucketIdx = Math.floor(x * numBuckets);
    const bMin = bucketIdx / numBuckets;
    const bMax = (bucketIdx + 1) / numBuckets;

    const inBucket = rawData.filter(p => p.x >= bMin && p.x <= bMax);
    if (inBucket.length > 0) {
      return inBucket.reduce((sum, p) => sum + p.y, 0) / inBucket.length;
    }

    let nearest = rawData[0];
    let minDist = 999;
    for (const p of rawData) {
      const d = Math.abs(p.x - x);
      if (d < minDist) {
        minDist = d;
        nearest = p;
      }
    }
    return nearest.y;
  }

  function predictRandomForest(x, depth, estimators) {
    let total = 0;
    const numTrees = Math.max(1, estimators);

    for (let t = 0; t < numTrees; t++) {
      const pseudoRandom = Math.sin(t * 127.1 + 311.7) * 43758.5453;
      const jitterOffset = ((pseudoRandom - Math.floor(pseudoRandom)) - 0.5) * (0.12 / Math.max(1, depth));
      const effX = Math.max(0, Math.min(1, x + jitterOffset));
      total += predictDecisionTree(effX, depth);
    }
    return total / numTrees;
  }

  function predictGradientBoosting(x, depth, estimators) {
    let pred = 0.5; // Base prediction (mean)
    const lr = 0.18;
    const numRounds = Math.min(estimators, 40);

    for (let m = 0; m < numRounds; m++) {
      const treeDepth = Math.max(2, Math.min(depth, 4));
      const treeVal = predictDecisionTree(x, treeDepth);
      pred += lr * (treeVal - pred);
    }
    return Math.max(0.05, Math.min(0.95, pred));
  }

  function predictPolynomial(x, depth) {
    const degree = Math.min(depth, 6);
    let poly = 0.5;
    if (currentDataset === 'sine') {
      poly = 0.5 + 0.3 * Math.sin(x * Math.PI * 2) * (degree / 4);
    } else if (currentDataset === 'housing') {
      poly = 0.15 + 0.75 * Math.pow(x, Math.max(1, degree * 0.4));
    } else {
      poly = 0.5 + 0.35 * Math.sin(x * Math.PI * 3.5) * (degree / 5);
    }
    return Math.max(0.05, Math.min(0.95, poly));
  }

  function getModelPrediction(x) {
    if (currentAlgo === 'tree') return predictDecisionTree(x, maxDepth);
    if (currentAlgo === 'rf') return predictRandomForest(x, maxDepth, nEstimators);
    if (currentAlgo === 'xgb') return predictGradientBoosting(x, maxDepth, nEstimators);
    if (currentAlgo === 'poly') return predictPolynomial(x, maxDepth);
    return 0.5;
  }

  // Draw Model & Points on Canvas
  function renderCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padL = 40;
    const padR = 24;
    const padT = 24;
    const padB = 34;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    function toCanvasX(normX) { return padL + normX * plotW; }
    function toCanvasY(normY) { return padT + (1 - normY) * plotH; }

    // Background
    ctx.fillStyle = '#0A0A0C';
    ctx.fillRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = '#22222A';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, h - padB);
    ctx.lineTo(w - padR, h - padB);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#666677';
    ctx.font = '10px "Space Grotesk", sans-serif';
    ctx.fillText('0.0 (Min Feature)', padL, h - padB + 16);
    ctx.fillText('1.0 (Max Feature)', w - padR - 80, h - padB + 16);
    ctx.fillText('ŷ (Output Target)', 8, padT + 12);

    // Generate fitted curve points
    const curvePoints = [];
    const steps = 140;
    for (let i = 0; i <= steps; i++) {
      const normX = i / steps;
      const predY = getModelPrediction(normX);
      curvePoints.push({ cx: toCanvasX(normX), cy: toCanvasY(predY), predY });
    }

    // Confidence Ribbon Area
    ctx.fillStyle = 'rgba(255, 107, 53, 0.08)';
    ctx.beginPath();
    ctx.moveTo(curvePoints[0].cx, curvePoints[0].cy - 12);
    for (let i = 1; i < curvePoints.length; i++) {
      ctx.lineTo(curvePoints[i].cx, curvePoints[i].cy - 12);
    }
    for (let i = curvePoints.length - 1; i >= 0; i--) {
      ctx.lineTo(curvePoints[i].cx, curvePoints[i].cy + 12);
    }
    ctx.closePath();
    ctx.fill();

    // Model Prediction Line
    ctx.strokeStyle = (currentAlgo === 'xgb') ? '#00F5D4' : (currentAlgo === 'rf') ? '#FFE156' : '#FF6B35';
    ctx.lineWidth = (currentAlgo === 'tree') ? 2.5 : 3;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(curvePoints[0].cx, curvePoints[0].cy);
    for (let i = 1; i < curvePoints.length; i++) {
      ctx.lineTo(curvePoints[i].cx, curvePoints[i].cy);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Scatter Data Points
    for (const p of rawData) {
      const px = toCanvasX(p.x);
      const py = toCanvasY(p.y);

      // Outer glow halo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // Point core
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Calculate Real Loss & R2
    let sse = 0;
    let sst = 0;
    const yMean = rawData.reduce((s, p) => s + p.y, 0) / rawData.length;

    for (const p of rawData) {
      const pred = getModelPrediction(p.x);
      sse += Math.pow(p.y - pred, 2);
      sst += Math.pow(p.y - yMean, 2);
    }

    const mse = sse / rawData.length;
    const r2 = Math.max(0, Math.min(99.4, (1 - sse / (sst || 1)) * 100));

    if (hudMSE) hudMSE.textContent = mse.toFixed(4);
    if (hudR2) hudR2.textContent = `${r2.toFixed(1)}%`;

    // Fit status
    if (hudFitStatus) {
      if (maxDepth >= 8 && noiseLevel >= 3 && currentAlgo === 'tree') {
        hudFitStatus.textContent = '🔴 OVERFITTING RISK';
        hudFitStatus.className = 'hud-fit-badge bg-tangerine text-white';
      } else if (maxDepth <= 2 && (currentDataset === 'sine' || currentDataset === 'cluster')) {
        hudFitStatus.textContent = '🟡 UNDERFITTING';
        hudFitStatus.className = 'hud-fit-badge bg-yellow text-black';
      } else {
        hudFitStatus.textContent = '🟢 OPTIMAL FIT';
        hudFitStatus.className = 'hud-fit-badge bg-mint text-black';
      }
    }
  }

  function updateHUDAndInsight() {
    const info = algoInsights[currentAlgo] || algoInsights.rf;
    if (hudAlgoLabel) {
      if (currentAlgo === 'rf') hudAlgoLabel.textContent = `RANDOM FOREST (${nEstimators} TREES)`;
      else if (currentAlgo === 'xgb') hudAlgoLabel.textContent = `GRADIENT BOOSTING (${nEstimators} TREES)`;
      else if (currentAlgo === 'tree') hudAlgoLabel.textContent = `DECISION TREE (DEPTH: ${maxDepth})`;
      else hudAlgoLabel.textContent = `POLYNOMIAL (DEG: ${maxDepth})`;
    }
    if (insightTitle) insightTitle.textContent = info.title;
    if (insightDesc) insightDesc.textContent = info.desc;

    // Show/hide estimators slider
    if (groupEstimators) {
      if (currentAlgo === 'rf' || currentAlgo === 'xgb') {
        groupEstimators.style.display = 'flex';
      } else {
        groupEstimators.style.display = 'none';
      }
    }
  }

  // Dataset selector
  datasetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      datasetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDataset = btn.getAttribute('data-dataset') || 'sine';
      generateData();
      renderCanvas();
    });
  });

  // Algorithm selector
  algoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      algoBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAlgo = btn.getAttribute('data-algo') || 'rf';
      updateHUDAndInsight();
      renderCanvas();
    });
  });

  // Sliders input
  if (sliderDepth && depthVal) {
    sliderDepth.addEventListener('input', () => {
      maxDepth = parseInt(sliderDepth.value, 10);
      depthVal.textContent = maxDepth;
      updateHUDAndInsight();
      renderCanvas();
    });
  }

  if (sliderEstimators && estimatorsVal) {
    sliderEstimators.addEventListener('input', () => {
      nEstimators = parseInt(sliderEstimators.value, 10);
      estimatorsVal.textContent = nEstimators;
      updateHUDAndInsight();
      renderCanvas();
    });
  }

  if (sliderNoise && noiseVal) {
    sliderNoise.addEventListener('input', () => {
      noiseLevel = parseInt(sliderNoise.value, 10);
      const labels = ['Zero', 'Low', 'Medium', 'High', 'Extreme'];
      noiseVal.textContent = labels[noiseLevel - 1] || 'Medium';
      generateData();
      renderCanvas();
    });
  }

  // Action: Regenerate data
  if (btnRegen) {
    btnRegen.addEventListener('click', () => {
      generateData();
      renderCanvas();
    });
  }

  // Action: Auto-fit Pulse animation
  if (btnAutoTrain) {
    btnAutoTrain.addEventListener('click', () => {
      if (isAutoTraining) return;
      isAutoTraining = true;
      let step = 1;
      const initialEstimators = nEstimators;

      const interval = setInterval(() => {
        step += 3;
        nEstimators = step;
        if (sliderEstimators) sliderEstimators.value = step;
        if (estimatorsVal) estimatorsVal.textContent = step;
        updateHUDAndInsight();
        renderCanvas();

        if (step >= 45) {
          clearInterval(interval);
          isAutoTraining = false;
        }
      }, 55);
    });
  }

  // Resize handler
  window.addEventListener('resize', () => {
    renderCanvas();
  });

  // Initial Run
  generateData();
  updateHUDAndInsight();
  renderCanvas();
}

/* ==========================================================================
   11. SCROLL PROGRESS BAR & FLOATING RING
   ========================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const ringFill = document.getElementById('scroll-ring-fill');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  const circumference = 113.1;

  function onScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;

    const scrollFraction = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
    const scrollPercentage = scrollFraction * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercentage}%`;
    }

    if (ringFill) {
      const offset = circumference - (scrollFraction * circumference);
      ringFill.style.strokeDashoffset = offset;
    }

    if (scrollTopBtn) {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   12. SCROLL REVEALS & NUMBER COUNTERS
   ========================================================================== */
function initScrollReveals() {
  const staggerContainers = document.querySelectorAll('.reveal-stagger');
  staggerContainers.forEach((container) => {
    Array.from(container.children).forEach((child, idx) => {
      child.style.setProperty('--item-index', idx);
    });
  });

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        
        const numbers = entry.target.querySelectorAll('.stat-num[data-count]');
        numbers.forEach(animateCounter);

        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';

  const target = parseInt(el.getAttribute('data-count'), 10);
  if (isNaN(target)) return;

  let current = 0;
  const duration = 1200;
  const startTime = performance.now();

  function update(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    current = Math.floor(easeProgress * target);

    const formatted = current < 10 ? `0${current}+` : `${current}+`;
    el.textContent = formatted;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const finalFormatted = target < 10 ? `0${target}+` : `${target}+`;
      el.textContent = finalFormatted;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   13. SCROLL VELOCITY MARQUEE
   ========================================================================== */
function initScrollVelocityMarquee() {
  const marqueeContainer = document.querySelector('.personality-strip');
  if (!marqueeContainer) return;

  let lastScrollY = window.scrollY;
  let scrollTimeout = null;

  window.addEventListener('scroll', () => {
    const delta = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;

    if (delta > 15) {
      marqueeContainer.classList.add('scroll-fast-forward');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        marqueeContainer.classList.remove('scroll-fast-forward');
      }, 300);
    }
  }, { passive: true });
}

/* ==========================================================================
   14. ACTIVE NAVIGATION INDICATOR ON SCROLL
   ========================================================================== */
function initScrollActiveNavigation() {
  const sections = document.querySelectorAll('.scroll-section');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active-nav');
          } else {
            link.classList.remove('active-nav');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach((sec) => sectionObserver.observe(sec));
}

/* ==========================================================================
   15. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTopButton() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   16. SUBTLE AMBIENT SCROLL PARALLAX
   ========================================================================== */
function initScrollParallaxAmbient() {
  if (window.innerWidth < 768) return;

  const ambientShapes = document.querySelectorAll('.ambient-shape, .pin-sticker, .floating-particle');
  if (!ambientShapes.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight * 1.5) {
          ambientShapes.forEach((shape) => {
            const speed = parseFloat(shape.getAttribute('data-speed')) || 1;
            const yOffset = (scrollY * 0.08) * (speed - 1);
            shape.style.transform = `translateY(${yOffset}px)`;
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   17. INTERACTIVE CONTACT FORM & COPY HELPERS
   ========================================================================== */
function copyEmailToClipboard() {
  const email = 'fenilsojitra242@gmail.com';
  const copyBtnText = document.getElementById('copy-email-text');
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      if (copyBtnText) {
        copyBtnText.textContent = 'COPIED! ✅';
        setTimeout(() => {
          copyBtnText.textContent = 'COPY EMAIL 📋';
        }, 2200);
      }
    }).catch(() => fallbackCopy(email));
  } else {
    fallbackCopy(email);
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    if (copyBtnText) {
      copyBtnText.textContent = 'COPIED! ✅';
      setTimeout(() => {
        copyBtnText.textContent = 'COPY EMAIL 📋';
      }, 2200);
    }
  }
}

function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('contact-submit-btn');
    const submitBtnText = document.getElementById('submit-btn-text');
    const statusBox = document.getElementById('contact-form-status');

    const formData = new FormData(form);

    // Show Loading State
    if (submitBtn) submitBtn.disabled = true;
    if (submitBtnText) submitBtnText.textContent = 'SENDING MESSAGE... ⏳';
    if (statusBox) {
      statusBox.className = 'contact-status-feedback loading';
      statusBox.textContent = '📨 Sending your message...';
      statusBox.style.display = 'block';
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/fenilsojitra242@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        if (statusBox) {
          statusBox.className = 'contact-status-feedback success';
          statusBox.innerHTML = '✅ <strong>Message Sent Successfully!</strong> Thank you for reaching out, I will get back to you soon!';
        }
        form.reset();
        if (submitBtnText) submitBtnText.textContent = 'MESSAGE SENT! ✅';
        setTimeout(() => {
          if (submitBtnText) submitBtnText.textContent = 'SEND MESSAGE ↗';
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      if (statusBox) {
        statusBox.className = 'contact-status-feedback error';
        statusBox.innerHTML = '⚠️ Could not send message automatically. Please try again in a few moments.';
      }
      if (submitBtnText) submitBtnText.textContent = 'TRY AGAIN ↗';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
