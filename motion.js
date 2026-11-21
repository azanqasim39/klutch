/**
 * Sialkot Sweets & Bakers — Lightweight Motion & Micro-Interaction Engine
 * Optimized for 60fps Silk-Smooth Scrolling, Instant Responsiveness & Low CPU
 * Established 1951, Gujranwala
 */
(function initLightweightMotionEngine() {
    'use strict';

    if (window.__ssUltraMotionLoaded) return;
    window.__ssUltraMotionLoaded = true;

    // Remove any lingering cursor elements defensively
    try {
        var oldDot = document.querySelector('.ss-cursor-dot');
        if (oldDot) oldDot.remove();
        var oldRing = document.querySelector('.ss-cursor-ring');
        if (oldRing) oldRing.remove();
        document.body.classList.remove('ss-cursor-hover');
    } catch (e) {}

    // 0. Performance & Reduced Motion Guardrail
    var isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
        document.documentElement.classList.add('ss-motion-ready');
        return;
    }

    // 1. Lightweight Scroll Reveal Observer (Unobserves instantly once revealed)
    function initChoreographedReveals() {
        var revealElements = document.querySelectorAll(
            '.ss-reveal, .ss-reveal-left, .ss-reveal-right, .ss-reveal-scale'
        );
        if (!revealElements.length) {
            document.documentElement.classList.add('ss-motion-ready');
            return;
        }

        // Instantly reveal all elements in/above viewport
        var vh = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || 800;
        revealElements.forEach(function(el) {
            if (el.classList.contains('is-revealed')) return;
            var rect = el.getBoundingClientRect();
            if (rect.top < vh + 150) {
                el.classList.add('is-revealed');
            }
        });

        document.documentElement.classList.add('ss-motion-ready');

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(function(el) {
                el.classList.add('is-revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var target = entry.target;
                    target.classList.add('is-revealed');
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px 80px 0px'
        });

        revealElements.forEach(function(el) {
            if (!el.classList.contains('is-revealed')) {
                observer.observe(el);
            }
        });

        // Safety fallback: reveal any remaining elements after 2.5s
        setTimeout(function() {
            revealElements.forEach(function(el) {
                if (!el.classList.contains('is-revealed')) {
                    el.classList.add('is-revealed');
                }
            });
        }, 2500);
    }

    // 2. Hero Search Focus & Animated Stat Counters (Run once then unobserve)
    function initHeroInteractions() {
        var hero = document.getElementById('home-section');
        if (!hero) return;

        // Hero Search Bar Focus Glow
        var searchInput = hero.querySelector('input[type="text"]');
        if (searchInput) {
            var searchWrapper = searchInput.closest('.relative') || searchInput.parentElement;
            searchInput.addEventListener('focus', function() {
                if (searchWrapper) searchWrapper.classList.add('ss-search-focused');
            }, { passive: true });
            searchInput.addEventListener('blur', function() {
                if (searchWrapper) searchWrapper.classList.remove('ss-search-focused');
            }, { passive: true });
        }

        // Lightweight Animated Counters (IntersectionObserver, triggers once)
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
                        var duration = 1200;
                        function step(time) {
                            if (!startTime) startTime = time;
                            var progress = Math.min((time - startTime) / duration, 1);
                            var ease = 1 - Math.pow(1 - progress, 3);
                            var currentVal = Math.floor(ease * target);
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

    // 3. Header Scroll Intelligence & Logo Shrink (Passive listener, zero lag)
    function initHeaderScrollIntelligence() {
        var header = document.querySelector('header');
        var logo = document.querySelector('header img') || document.querySelector('header .w-14');
        if (!header) return;

        var heroEl = document.getElementById('home-section');
        var heroThreshold = heroEl ? 280 : 80;
        var isScrolled = false;

        window.addEventListener('scroll', function() {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > heroThreshold && !isScrolled) {
                isScrolled = true;
                header.classList.add('header-scrolled-deep');
                if (logo) logo.classList.add('ss-logo-shrink');
            } else if (scrollY <= heroThreshold && isScrolled) {
                isScrolled = false;
                header.classList.remove('header-scrolled-deep');
                if (logo) logo.classList.remove('ss-logo-shrink');
            }
        }, { passive: true });
    }

    // 4. Hamburger Morph & Mobile Drawer Stagger
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
                            item.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, idx * 40);
                    });
                }
            }
        });
    }

    // 5. Add-To-Cart & Cart Badge Micro-Feedback
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

    // 6. Quantity Control Elastic Feedback
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

    // 7. Mobile Back Button (bfcache) & History Recovery Guard (Prevents White Screen)
    function initBFCacheGuard() {
        function restorePage() {
            document.body.classList.remove('ss-page-exit');
            document.documentElement.classList.remove('ss-page-exit');
            document.documentElement.classList.add('ss-motion-ready');
            var revealElements = document.querySelectorAll(
                '.ss-reveal, .ss-reveal-left, .ss-reveal-right, .ss-reveal-scale'
            );
            revealElements.forEach(function(el) {
                el.classList.add('is-revealed');
                el.style.filter = 'none';
            });
        }
        window.addEventListener('pageshow', restorePage);
        window.addEventListener('popstate', restorePage);
    }


    // 8. Infinite Slider with Motion Primitives speedOnHover={20}
    function initInfiniteSlider() {
        var wrapper = document.querySelector('.ss-infinite-slider-wrapper');
        var track = document.querySelector('.ss-infinite-slider-track');
        if (!wrapper || !track) return;

        try {
            function getAnim() {
                if (typeof track.getAnimations === 'function') {
                    var anims = track.getAnimations();
                    for (var i = 0; i < anims.length; i++) {
                        if (anims[i].animationName === 'ssInfiniteSliderSlide') return anims[i];
                    }
                    return anims[0] || null;
                }
                return null;
            }

            wrapper.addEventListener('mouseenter', function() {
                var anim = getAnim();
                if (anim) {
                    anim.playbackRate = 0.2; // 20% speed on hover matching speedOnHover={20}
                    track.style.animationPlayState = 'running';
                }
            });

            wrapper.addEventListener('mouseleave', function() {
                var anim = getAnim();
                if (anim) anim.playbackRate = 1.0;
            });

            wrapper.addEventListener('touchstart', function() {
                var anim = getAnim();
                if (anim) anim.playbackRate = 0.2;
            }, { passive: true });

            wrapper.addEventListener('touchend', function() {
                var anim = getAnim();
                if (anim) anim.playbackRate = 1.0;
            }, { passive: true });
        } catch (e) {
            // CSS fallback active
        }
    }

    // Boot Everything on DOM Ready
    function start() {
        initChoreographedReveals();
        initHeroInteractions();
        initHeaderScrollIntelligence();
        initHamburgerMorph();
        initCartFeedback();
        initQuantityFeedback();
        initBFCacheGuard();
        initInfiniteSlider();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
