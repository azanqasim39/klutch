/**
 * Sialkot Sweets & Bakers — Universal Motion UI/UX Engine
 * High-Performance Smooth Animation & Micro-Interaction Controller
 * Established 1951, Gujranwala
 */
(function initUltraMotionEngine() {
    'use strict';

    if (window.__ssUltraMotionLoaded) return;
    window.__ssUltraMotionLoaded = true;

    // 0. Performance & Reduced Motion Guardrail
    var isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var isMobile = window.innerWidth < 768;

    window.addEventListener('resize', function() {
        isMobile = window.innerWidth < 768;
    }, { passive: true });

    if (isReducedMotion) {
        document.documentElement.classList.add('ss-motion-ready');
        return;
    }

    // 1. Upgraded Scroll Reveal Observer with Section Choreography
    function initChoreographedReveals() {
        if (!('IntersectionObserver' in window)) return;

        var revealElements = document.querySelectorAll(
            '.ss-reveal, .ss-reveal-left, .ss-reveal-right, .ss-reveal-scale'
        );
        if (!revealElements.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var target = entry.target;

                    // Section Choreography: Check if part of a section with children
                    var choreographyParent = target.closest('[data-choreography]');
                    if (choreographyParent && !choreographyParent.__choreographed) {
                        choreographyParent.__choreographed = true;
                        var orderedItems = choreographyParent.querySelectorAll(
                            '.section-eyebrow, h2, p.section-desc, .ss-stagger, .menu-card, .branch-feature, .premium-card'
                        );
                        orderedItems.forEach(function(item, idx) {
                            setTimeout(function() {
                                item.classList.add('is-revealed');
                                item.style.filter = 'blur(0px)';
                            }, idx * 120);
                        });
                    }

                    target.classList.add('is-revealed');
                    target.style.filter = 'blur(0px)';
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(function(el) {
            if (!el.classList.contains('is-revealed')) {
                observer.observe(el);
            }
        });

        document.documentElement.classList.add('ss-motion-ready');
    }

    // 2. High-Precision 3D Card Tilt with Cursor Lighting (Desktop Only)
    function init3DCardTilt() {
        if (!isFinePointer || isReducedMotion) return;

        function applyTilt(card) {
            if (!card || card.__ultraTiltAttached) return;
            card.__ultraTiltAttached = true;

            var rafId = null;
            var rect = null;
            var targetX = 0, targetY = 0;
            var curX = 0, curY = 0;
            var isHovering = false;

            function onEnter() {
                rect = card.getBoundingClientRect();
                isHovering = true;
                startLoop();
            }

            function onMove(e) {
                if (!rect) rect = card.getBoundingClientRect();
                var relX = (e.clientX - rect.left) / rect.width;
                var relY = (e.clientY - rect.top) / rect.height;
                targetX = (relY - 0.5) * -8; // max 4 deg
                targetY = (relX - 0.5) * 8;
                card.style.setProperty('--cursor-x', (relX * 100).toFixed(1) + '%');
                card.style.setProperty('--cursor-y', (relY * 100).toFixed(1) + '%');
            }

            function onLeave() {
                isHovering = false;
                targetX = 0;
                targetY = 0;
            }

            function loop() {
                curX += (targetX - curX) * 0.15;
                curY += (targetY - curY) * 0.15;

                if (isHovering || Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
                    card.style.transform = 'perspective(800px) rotateX(' + curX.toFixed(2) + 'deg) rotateY(' + curY.toFixed(2) + 'deg) translateY(' + (isHovering ? '-7px' : '0') + ')';
                    rafId = requestAnimationFrame(loop);
                } else {
                    card.style.transform = '';
                    rafId = null;
                }
            }

            function startLoop() {
                if (!rafId) rafId = requestAnimationFrame(loop);
            }

            card.addEventListener('mouseenter', onEnter, { passive: true });
            card.addEventListener('mousemove', onMove, { passive: true });
            card.addEventListener('mouseleave', onLeave, { passive: true });
        }

        document.querySelectorAll('.menu-card, .pizza-flavour-card, .product-panel').forEach(applyTilt);

        // Dynamic mutation observer for filtered menu items
        var menuGrid = document.querySelector('#menu-section') || document.querySelector('#menu-grid');
        if (menuGrid) {
            var mo = new MutationObserver(function() {
                menuGrid.querySelectorAll('.menu-card').forEach(applyTilt);
            });
            mo.observe(menuGrid, { childList: true, subtree: true });
        }
    }

    // 3. Parallax Effects for Gradient Orbs & Section Decor
    function initParallaxMotion() {
        if (isReducedMotion || isMobile) return;

        var orbs = document.querySelectorAll('.hero-orb, .ss-orb-breathe, .ss-parallax-orb');
        var decors = document.querySelectorAll('.ss-about-deco-line, .ss-divider');
        if (!orbs.length && !decors.length) return;

        var isTicking = false;
        function updateParallax() {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            orbs.forEach(function(orb, idx) {
                var factor = (idx % 2 === 0 ? 0.25 : -0.25);
                orb.style.transform = 'translate3d(0, ' + (scrollY * factor).toFixed(1) + 'px, 0)';
            });
            decors.forEach(function(decor) {
                decor.style.transform = 'translate3d(0, ' + (scrollY * 0.08).toFixed(1) + 'px, 0)';
            });
            isTicking = false;
        }

        window.addEventListener('scroll', function() {
            if (!isTicking) {
                requestAnimationFrame(updateParallax);
                isTicking = true;
            }
        }, { passive: true });
    }

    // 4. Hero Mouse-Tracking Parallax Drift & Search Focus Glow
    function initHeroInteractions() {
        var hero = document.getElementById('home-section');
        if (!hero) return;

        // Mouse-tracking on hero carousel slides (desktop only)
        if (isFinePointer) {
            var carousel = hero.querySelector('.hero-carousel, .hero-frame');
            if (carousel) {
                var activeSlideRaf = null;
                hero.addEventListener('mousemove', function(e) {
                    if (activeSlideRaf) return;
                    activeSlideRaf = requestAnimationFrame(function() {
                        var activeSlide = carousel.querySelector('.hero-slide.is-active') || carousel.querySelector('.hero-showcase-img');
                        if (activeSlide) {
                            var rect = hero.getBoundingClientRect();
                            var deltaX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
                            var deltaY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
                            activeSlide.style.transform = 'scale(1.06) translate3d(' + (deltaX * 12).toFixed(1) + 'px, ' + (deltaY * 8).toFixed(1) + 'px, 0)';
                        }
                        activeSlideRaf = null;
                    });
                }, { passive: true });

                hero.addEventListener('mouseleave', function() {
                    var activeSlide = carousel.querySelector('.hero-slide.is-active') || carousel.querySelector('.hero-showcase-img');
                    if (activeSlide) activeSlide.style.transform = '';
                });
            }
        }

        // Hero Search Bar Focus Glow & Expansion
        var searchInput = hero.querySelector('input[type="text"]');
        if (searchInput) {
            var searchWrapper = searchInput.closest('.relative') || searchInput.parentElement;
            searchInput.addEventListener('focus', function() {
                if (searchWrapper) searchWrapper.classList.add('ss-search-focused');
            });
            searchInput.addEventListener('blur', function() {
                if (searchWrapper) searchWrapper.classList.remove('ss-search-focused');
            });
        }

        // Animated Spring Counters
        var counterEls = document.querySelectorAll('[data-target-number], .ss-stat-number');
        if (counterEls.length && 'IntersectionObserver' in window) {
            var counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting && !entry.target.__counted) {
                        entry.target.__counted = true;
                        var el = entry.target;
                        var text = el.textContent.trim();
                        var target = parseInt(el.getAttribute('data-target-number') || text.replace(/[^0-9]/g, ''), 10);
                        var suffix = text.replace(/[0-9]/g, '');
                        if (isNaN(target)) return;

                        var startTime = null;
                        var duration = 2000;
                        function easeOutElastic(t) {
                            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.cos((t * 10 - 0.75) * ((2 * Math.PI) / 3));
                        }
                        function step(time) {
                            if (!startTime) startTime = time;
                            var progress = Math.min((time - startTime) / duration, 1);
                            var currentVal = Math.floor(easeOutElastic(progress) * target);
                            el.textContent = currentVal + suffix;
                            if (progress < 1) {
                                requestAnimationFrame(step);
                            } else {
                                el.textContent = target + suffix;
                            }
                        }
                        requestAnimationFrame(step);
                        counterObserver.unobserve(el);
                    }
                });
            }, { threshold: 0.2 });
            counterEls.forEach(function(el) { counterObserver.observe(el); });
        }
    }

    // 5. Luxury Custom Cursor (Desktop Fine Pointer Only)
    function initCustomCursor() {
        if (!isFinePointer || isReducedMotion || isMobile) return;

        var dot = document.querySelector('.ss-cursor-dot');
        var ring = document.querySelector('.ss-cursor-ring');

        // Dynamically inject if not already present in DOM
        if (!dot) {
            dot = document.createElement('div');
            dot.className = 'ss-cursor-dot';
            document.body.appendChild(dot);
        }
        if (!ring) {
            ring = document.createElement('div');
            ring.className = 'ss-cursor-ring';
            document.body.appendChild(ring);
        }

        var mouseX = -100, mouseY = -100;
        var ringX = -100, ringY = -100;
        var isCursorTicking = false;

        window.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0) translate(-50%, -50%)';

            if (!isCursorTicking) {
                isCursorTicking = true;
                requestAnimationFrame(function updateRing() {
                    ringX += (mouseX - ringX) * 0.18;
                    ringY += (mouseY - ringY) * 0.18;
                    ring.style.transform = 'translate3d(' + ringX.toFixed(1) + 'px, ' + ringY.toFixed(1) + 'px, 0) translate(-50%, -50%)';
                    if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
                        requestAnimationFrame(updateRing);
                    } else {
                        isCursorTicking = false;
                    }
                });
            }
        }, { passive: true });

        // Hover scale on interactive elements
        function addHoverEvents() {
            var interactives = document.querySelectorAll('a, button, input, select, textarea, .menu-card, .size-box, [role="button"]');
            interactives.forEach(function(el) {
                if (el.__cursorBound) return;
                el.__cursorBound = true;
                el.addEventListener('mouseenter', function() {
                    document.body.classList.add('ss-cursor-hover');
                }, { passive: true });
                el.addEventListener('mouseleave', function() {
                    document.body.classList.remove('ss-cursor-hover');
                }, { passive: true });
            });
        }
        addHoverEvents();
        setTimeout(addHoverEvents, 1200);
    }

    // 6. Header Scroll Intelligence & Logo Shrink
    function initHeaderScrollIntelligence() {
        var header = document.querySelector('header');
        var logo = document.querySelector('header img') || document.querySelector('header .w-14');
        if (!header) return;

        var heroEl = document.getElementById('home-section');
        var heroThreshold = heroEl ? 280 : 80;

        window.addEventListener('scroll', function() {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > heroThreshold) {
                header.classList.add('header-scrolled-deep');
                if (logo) logo.classList.add('ss-logo-shrink');
            } else {
                header.classList.remove('header-scrolled-deep');
                if (logo) logo.classList.remove('ss-logo-shrink');
            }
        }, { passive: true });
    }

    // 7. Hamburger Morph & Mobile Drawer Stagger
    function initHamburgerMorph() {
        var menuBtn = document.getElementById('mobile-menu-btn') || document.querySelector('button[aria-label*="menu" i]');
        var mobileDrawer = document.getElementById('mobile-menu') || document.querySelector('.mobile-menu-drawer');
        if (!menuBtn) return;

        var lines = menuBtn.querySelectorAll('span, div.h-0\\.5');
        lines.forEach(function(l) { l.classList.add('ss-hamburger-line'); });

        menuBtn.addEventListener('click', function() {
            var isOpen = menuBtn.classList.toggle('ss-hamburger-open');
            if (mobileDrawer) {
                if (isOpen) {
                    var items = mobileDrawer.querySelectorAll('a, button');
                    items.forEach(function(item, idx) {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(24px)';
                        setTimeout(function() {
                            item.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, idx * 60);
                    });
                }
            }
        });
    }

    // 8. Add-To-Cart & Cart Badge Micro-Feedback
    function initCartFeedback() {
        document.addEventListener('click', function(e) {
            var btn = e.target.closest('button, .ss-size-add-btn, .size-box');
            if (!btn) return;
            var text = (btn.textContent || '').toLowerCase();
            if (text.includes('add') || text.includes('bag') || btn.classList.contains('ss-btn-add-cart') || btn.classList.contains('size-box')) {
                btn.classList.add('ss-cart-success');
                setTimeout(function() {
                    btn.classList.remove('ss-cart-success');
                }, 800);

                var badge = document.getElementById('cart-count') || document.querySelector('.cart-badge');
                if (badge) {
                    badge.classList.remove('ss-badge-bump');
                    void badge.offsetWidth;
                    badge.classList.add('ss-badge-bump');
                }
            }
        }, { passive: true });
    }

    // 9. Quantity Control Elastic Feedback
    function initQuantityFeedback() {
        document.addEventListener('click', function(e) {
            var btn = e.target.closest('button');
            if (!btn) return;
            var t = (btn.textContent || '').trim();
            if (t === '+' || t === '-' || btn.getAttribute('aria-label') === 'Increase' || btn.getAttribute('aria-label') === 'Decrease') {
                var parent = btn.parentElement;
                if (parent) {
                    var num = parent.querySelector('span, input[type="number"], .qty-display');
                    if (num) {
                        num.classList.remove('ss-qty-bump');
                        void num.offsetWidth;
                        num.classList.add('ss-qty-bump');
                        setTimeout(function() {
                            num.classList.remove('ss-qty-bump');
                        }, 400);
                    }
                }
            }
        }, { passive: true });
    }

    // 10. Smooth Page Exit Transition (Same-Origin)
    function initPageTransitions() {
        if (window.location.protocol === 'file:') return;
        document.addEventListener('click', function(e) {
            var link = e.target.closest('a');
            if (!link || !link.href) return;
            if (link.target === '_blank' || link.href.startsWith('mailto:') || link.href.startsWith('tel:') || link.href.startsWith('https://wa.me')) return;
            if (link.origin === window.location.origin && !link.hash && link.pathname !== window.location.pathname) {
                e.preventDefault();
                document.body.classList.add('ss-page-exit');
                setTimeout(function() {
                    window.location.href = link.href;
                }, 200);
            }
        });
    }

    // Boot Everything on DOM Ready
    function start() {
        initChoreographedReveals();
        init3DCardTilt();
        initParallaxMotion();
        initHeroInteractions();
        initCustomCursor();
        initHeaderScrollIntelligence();
        initHamburgerMorph();
        initCartFeedback();
        initQuantityFeedback();
        initPageTransitions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
