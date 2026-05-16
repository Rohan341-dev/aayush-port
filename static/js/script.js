// Desktop cursor animation copied from index2.html
      const cursorGlow = document.getElementById("cursorGlow");
      const customCursor = document.getElementById("customCursor");
      const canUseCustomCursor = window.matchMedia("(min-width: 681px) and (hover: hover) and (pointer: fine)").matches;

      let cursorX = -999;
      let cursorY = -999;
      let cursorCurrentX = -999;
      let cursorCurrentY = -999;
      let glowCurrentX = -999;
      let glowCurrentY = -999;
      let cursorLoopStarted = false;
      let cursorRAF = null;

      if (canUseCustomCursor && cursorGlow && customCursor) {
        function moveCursorLoop() {
          // Premium smooth follow with auto-idle, so the cursor stays smooth without wasting frames.
          cursorCurrentX += (cursorX - cursorCurrentX) * 0.18;
          cursorCurrentY += (cursorY - cursorCurrentY) * 0.18;
          glowCurrentX += (cursorX - glowCurrentX) * 0.075;
          glowCurrentY += (cursorY - glowCurrentY) * 0.075;

          cursorGlow.style.opacity = "0.72";
          cursorGlow.style.transform = `translate3d(${glowCurrentX - 224}px, ${glowCurrentY - 224}px, 0)`;
          customCursor.style.opacity = "1";
          customCursor.style.transform = `translate3d(${cursorCurrentX - 10}px, ${cursorCurrentY - 10}px, 0)`;

          const cursorDone = Math.abs(cursorX - cursorCurrentX) < 0.12 && Math.abs(cursorY - cursorCurrentY) < 0.12;
          const glowDone = Math.abs(cursorX - glowCurrentX) < 0.35 && Math.abs(cursorY - glowCurrentY) < 0.35;

          if (cursorDone && glowDone) {
            cursorCurrentX = cursorX;
            cursorCurrentY = cursorY;
            glowCurrentX = cursorX;
            glowCurrentY = cursorY;
            cursorRAF = null;
            return;
          }

          cursorRAF = requestAnimationFrame(moveCursorLoop);
        }

        function startCursorLoop() {
          if (!cursorRAF) cursorRAF = requestAnimationFrame(moveCursorLoop);
        }

        window.addEventListener(
          "pointermove",
          (event) => {
            cursorX = event.clientX;
            cursorY = event.clientY;

            if (!cursorLoopStarted) {
              cursorLoopStarted = true;
              cursorCurrentX = cursorX;
              cursorCurrentY = cursorY;
              glowCurrentX = cursorX;
              glowCurrentY = cursorY;
            }

            startCursorLoop();
          },
          { passive: true },
        );

        window.addEventListener(
          "pointerleave",
          () => {
            cursorGlow.style.opacity = "0";
            customCursor.style.opacity = "0";
          },
          { passive: true },
        );

        window.addEventListener(
          "pointerenter",
          () => {
            cursorGlow.style.opacity = "1";
            customCursor.style.opacity = "1";
          },
          { passive: true },
        );

        document.querySelectorAll("a, button, .btn-main, .btn-secondary, .slider-range").forEach((el) => {
          el.addEventListener("mouseenter", () => customCursor.classList.add("cursor-hover"));
          el.addEventListener("mouseleave", () => customCursor.classList.remove("cursor-hover"));
        });
      }

      // Hero ambient parallax
      const hero = document.getElementById("home");
      const heroAmbient = document.querySelector(".hero-ambient");
      if (hero && heroAmbient && canUseCustomCursor) {
        let heroTargetX = 0;
        let heroTargetY = 0;
        let heroCurrentX = 0;
        let heroCurrentY = 0;
        let heroRAF = null;

        const runHeroAmbient = () => {
          heroCurrentX += (heroTargetX - heroCurrentX) * 0.08;
          heroCurrentY += (heroTargetY - heroCurrentY) * 0.08;
          heroAmbient.style.transform = `translate3d(${heroCurrentX}px, ${heroCurrentY}px, 0)`;

          if (Math.abs(heroTargetX - heroCurrentX) > 0.05 || Math.abs(heroTargetY - heroCurrentY) > 0.05) {
            heroRAF = requestAnimationFrame(runHeroAmbient);
          } else {
            heroAmbient.style.transform = `translate3d(${heroTargetX}px, ${heroTargetY}px, 0)`;
            heroRAF = null;
          }
        };

        hero.addEventListener(
          "pointermove",
          (event) => {
            const rect = hero.getBoundingClientRect();
            const offsetX = event.clientX - (rect.left + rect.width / 2);
            const offsetY = event.clientY - (rect.top + rect.height / 2);
            heroTargetX = offsetX * 0.015;
            heroTargetY = offsetY * 0.015;
            if (!heroRAF) heroRAF = requestAnimationFrame(runHeroAmbient);
          },
          { passive: true },
        );

        hero.addEventListener(
          "pointerleave",
          () => {
            heroTargetX = 0;
            heroTargetY = 0;
            if (!heroRAF) heroRAF = requestAnimationFrame(runHeroAmbient);
          },
          { passive: true },
        );
      }

      // Desktop Nav Highlight Logic
      const mainNav = document.getElementById("mainNav");
      const navHighlight = mainNav.querySelector(".nav-highlight");
      const desktopLinks = mainNav.querySelectorAll("a");

      function updateNavHighlight(link) {
        if (!link || window.innerWidth <= 680) {
          navHighlight.style.opacity = "0";
          return;
        }
        const rect = link.getBoundingClientRect();
        const navRect = mainNav.getBoundingClientRect();

        navHighlight.style.width = `${rect.width}px`;
        navHighlight.style.left = `${rect.left - navRect.left}px`;
        navHighlight.style.opacity = "1";
      }

      desktopLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => updateNavHighlight(link));
      });

      mainNav.addEventListener("mouseleave", () => {
        const activeLink = mainNav.querySelector("a.active");
        if (activeLink) updateNavHighlight(activeLink);
        else navHighlight.style.opacity = "0";
      });

      // Mobile Menu Logic
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
      const mobileMenuSheet = mobileMenuOverlay.querySelector(".mobile-menu-sheet");
      const mobileMenuClose = document.getElementById("mobileMenuClose");
      const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a, .mobile-menu-cta");
      let mobileMenuScrollY = 0;

      function toggleMobileMenu(show) {
        if (!mobileMenuBtn || !mobileMenuOverlay) return;

        if (show) {
          mobileMenuScrollY = window.scrollY || document.documentElement.scrollTop;
          mobileMenuOverlay.classList.add("active");
          mobileMenuOverlay.setAttribute("aria-hidden", "false");
          mobileMenuBtn.setAttribute("aria-expanded", "true");
          mobileMenuBtn.classList.add("hide-when-open");
          document.body.classList.add("mobile-menu-open");
          document.body.style.position = "fixed";
          document.body.style.top = `-${mobileMenuScrollY}px`;
          document.body.style.left = "0";
          document.body.style.right = "0";
          window.setTimeout(() => mobileMenuClose && mobileMenuClose.focus({ preventScroll: true }), 120);
        } else {
          mobileMenuOverlay.classList.remove("active");
          mobileMenuOverlay.setAttribute("aria-hidden", "true");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          mobileMenuBtn.classList.remove("hide-when-open");
          document.body.classList.remove("mobile-menu-open");
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.left = "";
          document.body.style.right = "";
          window.scrollTo(0, mobileMenuScrollY);
        }
      }

      if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", () => toggleMobileMenu(true));
      if (mobileMenuClose) mobileMenuClose.addEventListener("click", () => toggleMobileMenu(false));

      mobileMenuOverlay.addEventListener("click", (e) => {
        if (e.target === mobileMenuOverlay) toggleMobileMenu(false);
      });

      mobileMenuSheet.addEventListener("click", (e) => e.stopPropagation());

      // Mobile nav links are closed inside the main anchor-click handler so the saved scroll position stays correct.

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenuOverlay.classList.contains("active")) {
          toggleMobileMenu(false);
        }
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 680 && mobileMenuOverlay.classList.contains("active")) {
          toggleMobileMenu(false);
        }
      });

      // Initial highlight position
      window.addEventListener("load", () => {
        const activeLink = mainNav.querySelector("a.active");
        if (activeLink) updateNavHighlight(activeLink);
      });

      // Nav active state
      const sections = document.querySelectorAll("section[id]");
      function updateActiveNav() {
        let currentId = "home";
        const offset = window.innerHeight * 0.4;
        sections.forEach((s) => {
          const rect = s.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) currentId = s.id;
        });

        // Desktop Update
        if (window.innerWidth > 680) {
          desktopLinks.forEach((l) => {
            const isActive = l.getAttribute("href") === "#" + currentId;
            l.classList.toggle("active", isActive);
            if (isActive && !mainNav.querySelector("a:hover")) {
              updateNavHighlight(l);
            }
          });
        }

        // Mobile links update
        mobileMenuLinks.forEach((l) => {
          l.classList.toggle("active", l.getAttribute("href") === "#" + currentId);
        });
      }

      // Butter-smooth scroll — desktop only. Mobile stays native for best touch performance.
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canUsePremiumSmoothScroll = false;

      if (canUsePremiumSmoothScroll) {
        document.documentElement.classList.add("premium-smooth-scroll");
        document.body.classList.add("premium-smooth-scroll-ready");

        let smoothCurrentY = window.scrollY || document.documentElement.scrollTop;
        let smoothTargetY = smoothCurrentY;
        let smoothScrollRAF = null;
        let isProgramScroll = false;

        const getMaxScrollY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const clampScrollY = (value) => Math.max(0, Math.min(getMaxScrollY(), value));
        const normalizeWheelDelta = (event) => {
          let delta = event.deltaY;
          if (event.deltaMode === 1) delta *= 16;
          if (event.deltaMode === 2) delta *= window.innerHeight;
          return Math.max(-220, Math.min(220, delta)) * 0.9;
        };

        function runPremiumSmoothScroll() {
          smoothTargetY = clampScrollY(smoothTargetY);
          const distance = smoothTargetY - smoothCurrentY;

          // Fast enough to avoid lag, soft enough to feel buttery.
          smoothCurrentY += distance * 0.22;

          if (Math.abs(distance) < 0.35) {
            smoothCurrentY = smoothTargetY;
            smoothScrollRAF = null;
            isProgramScroll = true;
            window.scrollTo(0, smoothCurrentY);
            requestAnimationFrame(() => {
              isProgramScroll = false;
            });
            return;
          }

          isProgramScroll = true;
          window.scrollTo(0, smoothCurrentY);
          smoothScrollRAF = requestAnimationFrame(runPremiumSmoothScroll);
        }

        function startPremiumSmoothScroll() {
          if (!smoothScrollRAF) smoothScrollRAF = requestAnimationFrame(runPremiumSmoothScroll);
        }

        window.addEventListener(
          "wheel",
          (event) => {
            if (event.ctrlKey || event.metaKey) return;

            const activeTag = document.activeElement?.tagName?.toLowerCase();
            if (activeTag === "textarea" || activeTag === "input" || activeTag === "select") return;

            event.preventDefault();
            smoothTargetY = clampScrollY(smoothTargetY + normalizeWheelDelta(event));
            startPremiumSmoothScroll();
          },
          { passive: false },
        );

        window.addEventListener(
          "scroll",
          () => {
            if (isProgramScroll) return;
            smoothCurrentY = window.scrollY || document.documentElement.scrollTop;
            smoothTargetY = smoothCurrentY;
          },
          { passive: true },
        );

        window.addEventListener(
          "resize",
          () => {
            smoothTargetY = clampScrollY(smoothTargetY);
            smoothCurrentY = clampScrollY(window.scrollY || document.documentElement.scrollTop);
          },
          { passive: true },
        );

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", (event) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;

            const targetEl = document.querySelector(href);
            if (!targetEl) return;

            event.preventDefault();
            const navOffset = window.innerWidth > 680 ? 118 : 84;
            smoothTargetY = clampScrollY(targetEl.getBoundingClientRect().top + window.scrollY - navOffset);
            smoothCurrentY = window.scrollY || document.documentElement.scrollTop;
            startPremiumSmoothScroll();
          });
        });
      }

      // Premium navigation scroll: smooth section jump with fixed-nav offset, no wheel hijack.
      let navScrollLock = false;
      let navScrollRAF = null;

      function getNavOffset() {
        const desktopNav = document.getElementById("mainNav");
        const mobileTopbar = document.querySelector(".mobile-topbar");
        if (window.innerWidth <= 680 && mobileTopbar) return Math.ceil(mobileTopbar.offsetHeight + 26);
        if (desktopNav) return Math.ceil(desktopNav.offsetHeight + 42);
        return window.innerWidth > 680 ? 118 : 84;
      }

      function getTargetScrollTop(targetEl) {
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const rawTop = targetEl.getBoundingClientRect().top + window.pageYOffset - getNavOffset();
        return Math.max(0, Math.min(maxScroll, Math.round(rawTop)));
      }

      function setActiveNavById(sectionId) {
        document.querySelectorAll('#mainNav a, .mobile-menu-links a, .mobile-menu-cta').forEach((link) => {
          const isActive = link.getAttribute("href") === `#${sectionId}`;
          link.classList.toggle("active", isActive);
          if (isActive && window.innerWidth > 680 && link.closest("#mainNav")) updateNavHighlight(link);
        });
      }

      function prepareSectionReveal(targetEl) {
        if (!targetEl) return;
        const revealItems = Array.from(targetEl.querySelectorAll(".reveal"));
        revealItems.forEach((el) => {
          if (typeof revealObserver !== "undefined" && revealObserver) revealObserver.unobserve(el);
          el.classList.add("replay-reset");
          el.classList.remove("active");
          el.style.transitionDelay = "0ms";
        });
        // Force browser to register the reset so the same section can animate every nav click.
        if (revealItems.length) void targetEl.offsetHeight;
      }

      function revealSectionAgain(targetEl) {
        if (!targetEl) return;
        const revealItems = Array.from(targetEl.querySelectorAll(".reveal"));
        revealItems.forEach((el, index) => {
          if (typeof revealObserver !== "undefined" && revealObserver) revealObserver.unobserve(el);
          const workCards = Array.from(targetEl.querySelectorAll(".work-card.reveal"));
          if (targetEl.id === "work" && el.classList.contains("work-card")) {
            const cardIndex = Math.max(0, workCards.indexOf(el));
            el.style.transitionDelay = `${Math.min(cardIndex * 70, 490)}ms`;
          } else {
            el.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
          }
          requestAnimationFrame(() => {
            el.classList.remove("replay-reset");
            requestAnimationFrame(() => el.classList.add("active"));
          });
        });
      }

      function animateScrollTo(targetY, done) {
        if (navScrollRAF) cancelAnimationFrame(navScrollRAF);

        if (prefersReducedMotion) {
          window.scrollTo(0, targetY);
          if (typeof done === "function") done();
          return;
        }

        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const distance = targetY - startY;
        if (Math.abs(distance) < 4) {
          window.scrollTo(0, targetY);
          requestAnimationFrame(() => { if (typeof done === "function") done(); });
          return;
        }
        const duration = Math.min(760, Math.max(360, Math.abs(distance) * 0.3));
        const startTime = performance.now();
        navScrollLock = true;

        // Smooth glide with a clean stop, without the slow crawl feeling near the end.
        const glideEase = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const step = (now) => {
          const progress = Math.min(1, (now - startTime) / duration);
          const eased = glideEase(progress);
          window.scrollTo(0, Math.round(startY + distance * eased));

          if (progress < 1) {
            navScrollRAF = requestAnimationFrame(step);
          } else {
            window.scrollTo(0, targetY);
            navScrollRAF = null;
            navScrollLock = false;
            if (typeof done === "function") done();
          }
        };

        navScrollRAF = requestAnimationFrame(step);
      }

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
          const href = anchor.getAttribute("href");
          if (!href || href === "#") return;

          const targetEl = document.querySelector(href);
          if (!targetEl) return;

          event.preventDefault();
          const sectionId = href.slice(1);
          setActiveNavById(sectionId);

          if (mobileMenuOverlay && mobileMenuOverlay.classList.contains("active")) {
            toggleMobileMenu(false);
          }

          window.history.pushState(null, "", href);
          prepareSectionReveal(targetEl);

          requestAnimationFrame(() => {
            const targetY = getTargetScrollTop(targetEl);
            animateScrollTo(targetY, () => {
              revealSectionAgain(targetEl);
              updateActiveNav();
              updateScrollProgress();
            });
          });
        });
      });

      window.addEventListener("load", () => {
        if (window.location.hash) {
          const targetEl = document.querySelector(window.location.hash);
          if (targetEl) {
            requestAnimationFrame(() => window.scrollTo(0, getTargetScrollTop(targetEl)));
          }
        }
      });

      // Scroll progress
      const scrollProgress = document.getElementById("scrollProgress");
      function updateScrollProgress() {
        if (!scrollProgress) return;
        const h = document.documentElement;
        const st = window.pageYOffset || h.scrollTop;
        const sh = h.scrollHeight || document.body.scrollHeight;
        const maxScrollable = Math.max(1, sh - h.clientHeight);
        const progress = st / maxScrollable;
        scrollProgress.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
      }

      window.addEventListener(
        "scroll",
        () => {
          requestAnimationFrame(() => {
            if (!navScrollLock) updateActiveNav();
            updateScrollProgress();
          });
        },
        { passive: true },
      );

      // Reliable reveal animation: runs on every .reveal element and starts before images finish loading
      const revealElements = Array.from(document.querySelectorAll(".reveal"));
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
      );

      function activateVisibleReveals() {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        revealElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
            el.classList.add("active");
          }
        });
      }

      function initRevealAnimations() {
        revealElements.forEach((el, index) => {
          if (!el.style.transitionDelay && el.classList.contains("work-card")) {
            el.style.transitionDelay = `${Math.min((index % 6) * 70, 350)}ms`;
          }
          revealObserver.observe(el);
        });

        requestAnimationFrame(() => {
          document.querySelectorAll("#home .reveal").forEach((el) => el.classList.add("active"));
          activateVisibleReveals();
        });
      }

      document.addEventListener("DOMContentLoaded", initRevealAnimations);
      window.addEventListener("load", activateVisibleReveals, { once: true });
      window.addEventListener("resize", activateVisibleReveals, { passive: true });

      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // FAQ Accordion
      document.querySelectorAll(".faq-trigger").forEach((t) => {
        t.addEventListener("click", () => {
          const item = t.closest(".faq-item");
          const isActive = item.classList.contains("active");
          document.querySelectorAll(".faq-item").forEach((f) => f.classList.remove("active"));
          if (!isActive) item.classList.add("active");
        });
      });

      // Work thumbnails: no popup / no fullscreen preview on click
      document.querySelectorAll(".work-card").forEach((card) => {
        card.addEventListener("click", (event) => {
          if (!event.target.classList.contains("slider-range")) {
            event.preventDefault();
          }
        });
      });

      // Image Slider logic — balanced for smooth scrolling + responsive manual drag
      function clampSliderValue(val) {
        return Math.max(0, Math.min(100, Number(val)));
      }

      function updateSlider(container, val, options = {}) {
        if (!container) return;
        const target = clampSliderValue(val);
        const input = container.querySelector(".slider-range");
        if (input) input.value = target;

        // During real dragging, render instantly so it follows the finger/mouse.
        // For intro/keyboard/range changes, use a soft RAF glide.
        if (options.instant) {
          container.dataset.sliderCurrent = String(target);
          container.dataset.sliderTarget = String(target);
          renderSlider(container, target);
          return;
        }

        container.dataset.sliderTarget = String(target);
        container.dataset.sliderSpeed = String(
          options.speed || (container.classList.contains("dragging") ? 0.38 : 0.18),
        );
        if (!container.dataset.sliderCurrent) container.dataset.sliderCurrent = String(target);
        if (!container.dataset.sliderRunning) {
          container.dataset.sliderRunning = "true";
          requestAnimationFrame(() => animateSlider(container));
        }
      }

      function renderSlider(container, val) {
        const safeValue = clampSliderValue(val);
        const beforeImg = container.querySelector(".image-before");
        const handle = container.querySelector(".slider-handle");
        if (beforeImg) beforeImg.style.clipPath = `polygon(0 0, ${safeValue}% 0, ${safeValue}% 100%, 0 100%)`;
        if (handle) handle.style.left = `${safeValue}%`;
      }

      function animateSlider(container) {
        const current = Number(container.dataset.sliderCurrent || 50);
        const target = Number(container.dataset.sliderTarget || 50);
        const speed = Number(container.dataset.sliderSpeed || 0.18);
        const next = current + (target - current) * speed;
        container.dataset.sliderCurrent = String(next);
        renderSlider(container, next);

        if (Math.abs(target - next) > 0.04) {
          requestAnimationFrame(() => animateSlider(container));
        } else {
          container.dataset.sliderCurrent = String(target);
          renderSlider(container, target);
          delete container.dataset.sliderRunning;
        }
      }

      document.querySelectorAll(".image-slider .slider-range").forEach((slider) => {
        const card = slider.parentElement;

        const startDrag = () => {
          card.classList.add("touched", "dragging");
        };

        const endDrag = () => {
          card.classList.remove("dragging");
        };

        slider.addEventListener("input", (e) => {
          startDrag();
          updateSlider(card, e.target.value, { speed: 0.32 });
        });

        slider.addEventListener("pointerdown", startDrag, { passive: true });
        window.addEventListener("pointerup", endDrag, { passive: true });
        slider.addEventListener("touchstart", startDrag, { passive: true });
        window.addEventListener("touchend", endDrag, { passive: true });
      });

      document.querySelectorAll(".image-slider").forEach((card) => {
        renderSlider(card, Number(card.querySelector(".slider-range")?.value || 50));
      });

      // Mobile before/after slider fix:
      // Vertical movement scrolls the page. Horizontal movement controls the slider.
      const coarsePointer = window.matchMedia("(pointer: coarse)");
      document.querySelectorAll(".image-slider").forEach((card) => {
        let startX = 0;
        let startY = 0;
        let tracking = false;
        let draggingSlider = false;

        const getSliderValue = (clientX) => {
          const rect = card.getBoundingClientRect();
          return ((clientX - rect.left) / rect.width) * 100;
        };

        const stopMobileSlider = () => {
          tracking = false;
          draggingSlider = false;
          card.classList.remove("dragging");
        };

        card.addEventListener(
          "pointerdown",
          (event) => {
            if (!coarsePointer.matches) return;
            tracking = true;
            draggingSlider = false;
            startX = event.clientX;
            startY = event.clientY;
          },
          { passive: true },
        );

        card.addEventListener(
          "pointermove",
          (event) => {
            if (!coarsePointer.matches || !tracking) return;

            const diffX = event.clientX - startX;
            const diffY = event.clientY - startY;

            if (!draggingSlider) {
              const horizontalIntent = Math.abs(diffX) > 18 && Math.abs(diffX) > Math.abs(diffY) * 1.55;
              const verticalIntent = Math.abs(diffY) > 8 && Math.abs(diffY) >= Math.abs(diffX) * 0.72;

              if (verticalIntent) {
                stopMobileSlider();
                return;
              }

              if (!horizontalIntent) return;

              draggingSlider = true;
              card.classList.add("touched", "dragging");
            }

            event.preventDefault();
            updateSlider(card, getSliderValue(event.clientX), { instant: true });
          },
          { passive: false },
        );

        card.addEventListener("pointerup", stopMobileSlider, { passive: true });
        card.addEventListener("pointercancel", stopMobileSlider, { passive: true });
        card.addEventListener("lostpointercapture", stopMobileSlider, { passive: true });
      });

      // Before/After intro animation: auto slides left/right once, then returns to center.
      // Nothing else changes. Manual drag still works after the intro.
      const sliderIntroEase = (t) => 0.5 - Math.cos(Math.PI * t) / 2;

      function setSliderInstant(card, value) {
        const safeValue = Math.max(0, Math.min(100, Number(value)));
        const input = card.querySelector(".slider-range");
        if (input) input.value = safeValue;
        card.dataset.sliderCurrent = String(safeValue);
        card.dataset.sliderTarget = String(safeValue);
        renderSlider(card, safeValue);
      }

      function runBeforeAfterIntro(card) {
        if (!card || card.classList.contains("touched") || card.dataset.introPlayed === "true") return;

        card.dataset.introPlayed = "true";
        delete card.dataset.sliderRunning;

        const duration = 2800;
        const points = [50, 76, 24, 50];
        let startTime = null;

        function animateIntro(now) {
          if (card.classList.contains("touched")) return;
          if (!startTime) startTime = now;

          const progress = Math.min((now - startTime) / duration, 1);
          const segmentCount = points.length - 1;
          const rawSegment = Math.min(Math.floor(progress * segmentCount), segmentCount - 1);
          const segmentStart = rawSegment / segmentCount;
          const segmentProgress = (progress - segmentStart) * segmentCount;
          const eased = sliderIntroEase(Math.max(0, Math.min(1, segmentProgress)));
          const from = points[rawSegment];
          const to = points[rawSegment + 1];
          const value = from + (to - from) * eased;

          setSliderInstant(card, value);

          if (progress < 1) {
            requestAnimationFrame(animateIntro);
          } else {
            setSliderInstant(card, 50);
          }
        }

        setTimeout(() => {
          if (!card.classList.contains("touched")) requestAnimationFrame(animateIntro);
        }, 450);
      }

      const sliderIntroObserver =
        "IntersectionObserver" in window
          ? new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (!entry.isIntersecting) return;
                  runBeforeAfterIntro(entry.target);
                  sliderIntroObserver.unobserve(entry.target);
                });
              },
              { threshold: 0.5 },
            )
          : null;

      document.querySelectorAll(".image-slider").forEach((card) => {
        if (sliderIntroObserver) {
          sliderIntroObserver.observe(card);
        } else {
          runBeforeAfterIntro(card);
        }
      });

      const contactForm = document.getElementById("contactForm");
      if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
          event.preventDefault();

          const submitButton = contactForm.querySelector(".contact-submit");
          const originalButtonText = submitButton ? submitButton.textContent : "Submit";

          if (submitButton) {
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;
          }

          try {
            const response = await fetch(contactForm.action, {
              method: "POST",
              body: new FormData(contactForm),
              headers: { Accept: "application/json" },
            });

            if (!response.ok) throw new Error("Form submit failed");

            contactForm.reset();
            if (submitButton) {
              submitButton.textContent = "Thank you!";
            }
          } catch (error) {
            if (submitButton) {
              submitButton.textContent = "Try again";
              submitButton.disabled = false;
              setTimeout(() => {
                submitButton.textContent = originalButtonText;
              }, 1800);
            }
          }
        });
      }

      // Number counters
      const countElements = document.querySelectorAll(".count");
      function animateCounter(counter) {
        const target = Number(counter.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

          counter.textContent = Math.floor(eased * target);

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        }
        requestAnimationFrame(update);
      }
      const counterObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            countElements.forEach(animateCounter);
            counterObserver.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      const proofRow = document.querySelector(".proof-row");
      if (proofRow) counterObserver.observe(proofRow);