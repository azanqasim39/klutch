/**
 * Sialkot Sweets & Bakers — Universal Mobile & Desktop Product Ordering Engine
 * Established 1951, Gujranwala
 * 
 * Features:
 * 1. Perfectly CENTERED Luxury Mobile Floating Bag Bar (100% responsive, never off-screen)
 * 2. Header Cart Button on all pages with real-time count badges
 * 3. Multi-Flavour & Size Pages (Pizza 10 flavours, Sandwiches, Burgers, Wraps, Rolls, Shawarma, Fries)
 * 4. Single Item Mithai & Bakery Pages (Gulab Jamun, Sohan Halwa, Biscuits, Baklava, etc.)
 * 5. Real-time reactive sync with SialkotCart and checkout guards
 */

(function (window, document) {
    'use strict';

    // Inject Critical CSS once for absolute centering & mobile styling
    function injectStyles() {
        if (document.getElementById('ss-ordering-styles')) return;

        const style = document.createElement('style');
        style.id = 'ss-ordering-styles';
        style.textContent = `
            /* Centered Floating Cart Bar on Mobile */
            .ss-mobile-floating-bar-wrap {
                position: fixed !important;
                bottom: calc(14px + env(safe-area-inset-bottom, 0px)) !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: calc(100% - 24px) !important;
                max-width: 440px !important;
                z-index: 99999 !important;
                display: flex !important;
                justify-content: center !important;
                box-sizing: border-box !important;
                pointer-events: auto !important;
                margin: 0 !important;
                transition: transform 0.25s ease, opacity 0.25s ease;
            }

            @media (min-width: 768px) {
                .ss-mobile-floating-bar-wrap {
                    display: none !important;
                }
            }

            /* Size button hover & active states */
            .ss-size-add-btn {
                transition: all 0.15s ease-in-out !important;
            }
            .ss-size-add-btn:active {
                transform: scale(0.95) !important;
            }
            .ss-size-add-btn.ss-added {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
                color: #ffffff !important;
                border-color: #34d399 !important;
            }

            /* Header Cart Button */
            .ss-header-cart-btn {
                transition: transform 0.15s ease, background-color 0.2s ease;
            }
            .ss-header-cart-btn:active {
                transform: scale(0.94);
            }

            /* Pulse animation for bag when item added */
            @keyframes ss-bag-bounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.08); }
            }
            .ss-pulse-bounce {
                animation: ss-bag-bounce 0.4s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    // 1. Inject Cart button into Header Navigation (Mobile & Desktop)
    function injectHeaderCart() {
        if (document.querySelector('.ss-header-cart-btn')) return;

        const headerContainer = document.querySelector('header .max-w-7xl, header .max-w-6xl, header > div');
        if (!headerContainer) return;

        const backBtn = headerContainer.querySelector('a[href*="menu"], .action-link');

        const cartBtn = document.createElement('a');
        cartBtn.href = '../checkout.html';
        cartBtn.className = 'ss-header-cart-btn inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/40 text-amber-300 relative shadow-md shrink-0';
        cartBtn.setAttribute('aria-label', 'View Shopping Bag');
        cartBtn.innerHTML = `
            <i class="fa-solid fa-cart-shopping text-xs sm:text-sm text-amber-300"></i>
            <span class="hidden sm:inline text-xs font-bold text-white">Bag</span>
            <span class="ss-cart-badge bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow border border-emerald-950 px-1 hidden">0</span>
        `;

        if (backBtn && backBtn.parentNode) {
            backBtn.parentNode.insertBefore(cartBtn, backBtn);
        } else {
            headerContainer.appendChild(cartBtn);
        }
    }

    // 2. Inject Perfectly Centered Mobile Floating Cart Bar
    function injectMobileFloatingCart() {
        if (document.getElementById('ss-mobile-floating-bar-wrap')) return;

        const wrap = document.createElement('div');
        wrap.id = 'ss-mobile-floating-bar-wrap';
        wrap.className = 'ss-mobile-floating-bar-wrap';

        wrap.innerHTML = `
            <a href="../checkout.html" id="ss-mobile-floating-cart-anchor" class="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#2b1722] via-[#3b202f] to-[#2b1722] text-white border-2 border-amber-400 shadow-2xl backdrop-blur-xl transition active:scale-[0.98]">
                <!-- Left: Bag Icon & Counter -->
                <div class="flex items-center gap-2.5 min-w-0">
                    <div id="ss-floating-bag-icon-box" class="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-950 flex items-center justify-center font-bold text-sm shrink-0 shadow">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="ss-cart-badge absolute -top-1.5 -right-1.5 bg-[#2b1722] text-amber-300 text-[9.5px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-amber-400 px-1 hidden">0</span>
                    </div>
                    <div class="min-w-0 text-left">
                        <div class="text-xs font-bold text-white flex items-center gap-1.5 leading-tight">
                            <span class="text-amber-200">Bag</span>
                            <span class="text-amber-400/80">•</span>
                            <span class="ss-cart-total text-amber-300 font-extrabold">Rs. 0</span>
                        </div>
                        <div class="ss-cart-sublabel text-[10px] text-stone-300 truncate">Tap to review &amp; checkout</div>
                    </div>
                </div>

                <!-- Right: Action CTA -->
                <div class="ss-floating-cta-pill px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-black text-xs shrink-0 flex items-center gap-1 shadow hover:brightness-105 transition">
                    <span class="ss-cta-text">View Bag</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </div>
            </a>
        `;

        document.body.appendChild(wrap);
        syncCartUI();
    }

    // Synchronize all UI elements across the page with current cart state
    function syncCartUI() {
        if (!window.SialkotCart) return;

        const count = window.SialkotCart.getCount();
        const total = window.SialkotCart.getSubtotal();

        // 1. Badges
        document.querySelectorAll('.ss-cart-badge').forEach(b => {
            b.textContent = count;
            b.classList.toggle('hidden', count === 0);
            b.style.display = count > 0 ? 'flex' : 'none';
        });

        // 2. Totals
        document.querySelectorAll('.ss-cart-total').forEach(t => {
            t.textContent = 'Rs. ' + total.toLocaleString();
        });

        // 3. Floating Bar Sublabel & CTA Text
        const sublabel = document.querySelector('.ss-cart-sublabel');
        const ctaText = document.querySelector('.ss-cta-text');
        const bagBox = document.getElementById('ss-floating-bag-icon-box');

        if (sublabel && ctaText) {
            if (count > 0) {
                sublabel.textContent = `${count} item${count > 1 ? 's' : ''} in bag • Tap to order`;
                ctaText.textContent = 'Checkout';
            } else {
                sublabel.textContent = 'Tap to review & checkout';
                ctaText.textContent = 'View Bag';
            }
        }

        // Pulse effect
        if (bagBox && count > 0) {
            bagBox.classList.remove('ss-pulse-bounce');
            void bagBox.offsetWidth; // trigger reflow
            bagBox.classList.add('ss-pulse-bounce');
        }
    }

    // 3. Multi-Flavour & Fast Food Ordering System (Pizza, Sandwiches, Burgers, Wraps, Rolls, Fries)
    function setupMultiFlavourOrdering(sizeBoxes) {
        const photoEl = document.querySelector('.product-photo img, article img, main img');
        let fallbackImg = 'sialkot-sweets-logo.png';
        if (photoEl && photoEl.getAttribute('src')) {
            fallbackImg = photoEl.getAttribute('src').replace(/^\.\.\//, '');
        }

        // Inject Fast Food Order Info Banner if not present
        injectFastFoodOrderBanner();

        sizeBoxes.forEach(function (box) {
            if (box.querySelector('.ss-size-add-btn')) return;

            const spans = box.querySelectorAll('span');
            let sizeName = 'Standard';
            let price = 500;

            if (spans.length >= 2) {
                sizeName = spans[0].textContent.trim();
                const priceMatch = spans[1].textContent.match(/[\d,]+/);
                if (priceMatch) {
                    price = parseFloat(priceMatch[0].replace(/,/g, '')) || 500;
                }
            } else {
                const boxText = box.innerText;
                const match = boxText.match(/Rs\.?\s*([\d,]+)/i);
                if (match) price = parseFloat(match[1].replace(/,/g, '')) || 500;
            }

            const article = box.closest('article');
            let flavourName = 'House Special';
            if (article) {
                const h3 = article.querySelector('h3, h2, .font-bold');
                if (h3) {
                    flavourName = h3.textContent.replace(/^\d+[\.\s]*/, '').trim();
                }
            }

            box.classList.add('hover:border-amber-500', 'transition', 'cursor-pointer', 'flex', 'flex-col', 'justify-between');

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.className = 'ss-size-add-btn mt-1.5 w-full py-1 px-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-extrabold text-[9.5px] sm:text-[10px] flex items-center justify-center gap-1 shadow-xs transition active:scale-95 cursor-pointer border border-amber-400/30';
            addBtn.innerHTML = `<i class="fa-solid fa-plus text-[8px]"></i><span>Add</span>`;

            box.appendChild(addBtn);

            const itemFullName = sizeName && sizeName !== 'Standard Serving' && !flavourName.includes(sizeName)
                ? `${flavourName} (${sizeName})`
                : flavourName;

            const itemData = {
                id: 'ff_' + itemFullName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                name: itemFullName,
                price: price,
                unit: sizeName || '1 Serving',
                image: fallbackImg,
                category: 'fastfood'
            };

            const triggerAdd = function (e) {
                e.preventDefault();
                e.stopPropagation();

                window.SialkotCart.addItem(itemData, 1);

                // Button visual feedback
                addBtn.classList.add('ss-added');
                addBtn.innerHTML = `<i class="fa-solid fa-check text-[8px]"></i><span>Added</span>`;
                setTimeout(() => {
                    addBtn.classList.remove('ss-added');
                    addBtn.innerHTML = `<i class="fa-solid fa-plus text-[8px]"></i><span>Add</span>`;
                }, 1200);
            };

            addBtn.addEventListener('click', triggerAdd);
            box.addEventListener('click', triggerAdd);
        });
    }

    // Fast food helper info banner
    function injectFastFoodOrderBanner() {
        if (document.querySelector('.ss-ff-order-banner')) return;

        const mainContent = document.querySelector('main .w-full.lg\\:w-\\[64\\%\\], main .flex-1, main article');
        if (!mainContent) return;

        const banner = document.createElement('div');
        banner.className = 'ss-ff-order-banner mb-3 p-3 rounded-xl border border-amber-300/80 bg-gradient-to-r from-amber-50 via-white to-amber-50/60 shadow-xs flex items-center justify-between gap-2.5';
        banner.innerHTML = `
            <div class="flex items-center gap-2 min-w-0">
                <span class="w-7 h-7 rounded-lg bg-emerald-950 text-amber-300 flex items-center justify-center text-xs shrink-0 shadow-xs">
                    <i class="fa-solid fa-bag-shopping"></i>
                </span>
                <div class="min-w-0">
                    <div class="text-[11px] font-bold text-emerald-950 leading-tight">Order Online for Delivery or Takeaway</div>
                    <div class="text-[9.5px] text-stone-500 leading-tight mt-0.5">Tap <strong class="text-emerald-900">+ Add</strong> on any flavour or size below to build your order!</div>
                </div>
            </div>
            <a href="../checkout.html" class="px-2.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-extrabold text-[10px] shrink-0 flex items-center gap-1 shadow-xs transition">
                <span>Bag</span>
                <span class="ss-cart-badge bg-amber-400 text-emerald-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center hidden">0</span>
            </a>
        `;

        if (mainContent.firstChild) {
            mainContent.insertBefore(banner, mainContent.firstChild);
        } else {
            mainContent.appendChild(banner);
        }
    }

    // 4. Single Item Mithai & Bakery Pages (Gulab Jamun, Sohan Halwa, Biscuits, Baklava, etc.)
    function setupSingleItemOrdering() {
        if (document.querySelector('.ss-product-order-widget')) return;

        const h1 = document.querySelector('h1');
        if (!h1) return;

        const productName = h1.textContent.trim();
        const urduEl = document.querySelector('.font-urdu');
        const urduName = urduEl ? urduEl.textContent.trim() : '';

        const imgEl = document.querySelector('.product-photo img, article img, main img');
        let imageSrc = 'sialkot-sweets-logo.png';
        if (imgEl && imgEl.getAttribute('src')) {
            imageSrc = imgEl.getAttribute('src').replace(/^\.\.\//, '');
        }

        let price = 1200;
        let unit = '1 Kg';

        const match = document.body.innerText.match(/Rs\.?\s*([\d,]+)/i);
        if (match && match[1]) {
            price = parseFloat(match[1].replace(/,/g, '')) || 1200;
        }

        const unitEl = document.querySelector('.text-stone-500');
        if (unitEl && unitEl.textContent.includes('/')) {
            unit = unitEl.textContent.replace('/', '').trim();
        }

        const widget = document.createElement('div');
        widget.className = 'ss-product-order-widget mt-5 p-4 rounded-2xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 shadow-md';
        widget.innerHTML = `
            <div class="flex items-center justify-between pb-2.5 mb-3 border-b border-amber-200/60">
                <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-emerald-950 text-amber-300 flex items-center justify-center text-xs shadow-sm">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </span>
                    <span class="font-serif font-bold text-xs sm:text-sm text-emerald-950">Order Fresh from Bakery</span>
                </div>
                <span class="text-[10px] font-extrabold uppercase bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">Gujranwala Delivery</span>
            </div>

            <div class="flex flex-col sm:flex-row items-center gap-3">
                <div class="flex items-center border-2 border-stone-200 rounded-xl bg-white overflow-hidden shadow-sm w-full sm:w-auto justify-between">
                    <button type="button" class="ss-minus-btn w-10 h-11 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-extrabold text-base select-none cursor-pointer">-</button>
                    <input type="number" value="1" min="1" max="99" class="ss-qty-val w-12 text-center font-extrabold text-emerald-950 text-sm focus:outline-none bg-transparent" readonly>
                    <button type="button" class="ss-plus-btn w-10 h-11 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-extrabold text-base select-none cursor-pointer">+</button>
                </div>

                <button type="button" class="ss-btn-add-cart flex-1 w-full py-3 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-extrabold text-xs sm:text-sm border border-amber-400/50 shadow flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer">
                    <i class="fa-solid fa-cart-plus"></i>
                    <span>Add to Bag</span>
                </button>

                <button type="button" class="ss-btn-order-now flex-1 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition hover:brightness-105 active:scale-[0.98] cursor-pointer">
                    <i class="fa-solid fa-bolt"></i>
                    <span>Order Now</span>
                </button>
            </div>
            <p class="text-[10.5px] text-stone-500 text-center mt-2">Prepared daily with pure desi ghee &amp; fresh ingredients.</p>
        `;

        const minusBtn = widget.querySelector('.ss-minus-btn');
        const plusBtn = widget.querySelector('.ss-plus-btn');
        const qtyVal = widget.querySelector('.ss-qty-val');
        const addBtn = widget.querySelector('.ss-btn-add-cart');
        const orderNowBtn = widget.querySelector('.ss-btn-order-now');

        minusBtn.addEventListener('click', function () {
            let val = parseInt(qtyVal.value, 10) || 1;
            if (val > 1) qtyVal.value = val - 1;
        });

        plusBtn.addEventListener('click', function () {
            let val = parseInt(qtyVal.value, 10) || 1;
            qtyVal.value = val + 1;
        });

        const productData = {
            id: 'prod_' + productName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
            name: productName,
            urduName: urduName,
            price: price,
            unit: unit,
            image: imageSrc,
            category: 'sweets'
        };

        addBtn.addEventListener('click', function () {
            const qty = parseInt(qtyVal.value, 10) || 1;
            window.SialkotCart.addItem(productData, qty);
        });

        orderNowBtn.addEventListener('click', function () {
            const qty = parseInt(qtyVal.value, 10) || 1;
            window.SialkotCart.addItem(productData, qty);
            window.location.href = '../checkout.html';
        });

        const targetParent = h1.closest('article') || h1.parentElement;
        const priceBox = targetParent.querySelector('.rounded-xl.border.border-amber-200, section, .mt-4');
        if (priceBox && priceBox.parentElement) {
            priceBox.parentElement.insertBefore(widget, priceBox.nextSibling);
        } else {
            targetParent.appendChild(widget);
        }
    }

    // Main Init
    function initProductOrdering() {
        injectStyles();

        // 1. Inject Cart button into Header (Mobile & Desktop)
        injectHeaderCart();

        // 2. Inject Mobile Floating Cart Bar (Centered at bottom on mobile)
        injectMobileFloatingCart();

        // 3. Handle Multi-Flavour & Size Pages vs Single Item Pages
        const sizeBoxes = document.querySelectorAll('.size-box');
        if (sizeBoxes.length > 0) {
            setupMultiFlavourOrdering(sizeBoxes);
        } else {
            setupSingleItemOrdering();
        }

        // Listen for reactive cart updates across the window
        window.addEventListener('sialkot-cart-updated', function () {
            syncCartUI();
        });

        // Initial sync of counts & badges
        if (window.SialkotCart) {
            window.SialkotCart.dispatchUpdate();
        }
        syncCartUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductOrdering);
    } else {
        initProductOrdering();
    }

})(window, document);
