/**
 * Sialkot Sweets & Bakers — Universal Product & Flavour Page Ordering System
 * Handles:
 * 1. Top Header Cart Button (Always visible on mobile & desktop)
 * 2. Mobile Floating Cart Button / Bar (Always visible on mobile screens)
 * 3. Multi-flavour & size fast food pages (Pizza 10 flavours, Sandwiches 5 flavours, Burgers, Wraps, Shawarma, Rolls, Fries)
 * 4. Single sweet/bakery item pages (Gulab Jamun, Baklava, Barfi, Halwa, etc.)
 */

(function (window, document) {
    'use strict';

    function initProductOrdering() {
        if (!window.SialkotCart) return;

        // 1. Inject Cart button into Header
        injectHeaderCart();

        // 2. Inject Mobile Floating Cart Pill at bottom
        injectMobileFloatingCart();

        // 3. Handle Multi-Flavour & Size Pages
        const sizeBoxes = document.querySelectorAll('.size-box');
        if (sizeBoxes.length > 0) {
            setupMultiFlavourOrdering(sizeBoxes);
        } else {
            // 4. Handle Single Item Pages
            setupSingleItemOrdering();
        }

        // Initial sync of counts & badges
        window.SialkotCart.dispatchUpdate();
    }

    // 1. Header Cart Button (Mobile & Desktop)
    function injectHeaderCart() {
        if (document.querySelector('.ss-header-cart-btn')) return;

        const headerContainer = document.querySelector('header .max-w-7xl, header .max-w-6xl, header > div');
        if (!headerContainer) return;

        const backBtn = headerContainer.querySelector('a[href*="menu"], .action-link');

        // Create Container for actions on right if needed
        const cartBtn = document.createElement('a');
        cartBtn.href = '../checkout.html';
        cartBtn.className = 'ss-header-cart-btn inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/40 text-amber-300 relative shadow-md transition active:scale-95 shrink-0 ml-auto sm:ml-0';
        cartBtn.setAttribute('aria-label', 'View Shopping Bag');
        cartBtn.innerHTML = `
            <i class="fa-solid fa-cart-shopping text-sm sm:text-base text-amber-300"></i>
            <span class="hidden sm:inline text-xs font-bold text-white">Cart</span>
            <span class="ss-cart-badge bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-[10px] font-black min-w-[19px] h-[19px] rounded-full flex items-center justify-center shadow-md border border-emerald-950 px-1 hidden">0</span>
        `;

        if (backBtn && backBtn.parentNode) {
            backBtn.parentNode.insertBefore(cartBtn, backBtn);
        } else {
            headerContainer.appendChild(cartBtn);
        }
    }

    // 2. Mobile Floating Sticky Cart Pill (Always Visible on Mobile)
    function injectMobileFloatingCart() {
        if (document.querySelector('.ss-mobile-floating-pill')) return;

        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'ss-mobile-floating-pill md:hidden fixed bottom-4 right-3.5 z-50 transition-all duration-300';
        floatingContainer.innerHTML = `
            <a href="../checkout.html" class="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-950/95 text-white border-2 border-amber-400/80 shadow-2xl backdrop-blur-xl active:scale-95 transition">
                <div class="relative">
                    <i class="fa-solid fa-cart-shopping text-base text-amber-300"></i>
                    <span class="ss-cart-badge absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center border border-emerald-950 px-1 hidden">0</span>
                </div>
                <div class="text-left">
                    <div class="text-[11px] font-bold text-amber-300 leading-tight">Bag</div>
                    <div class="ss-cart-total text-[10px] font-extrabold text-white leading-tight">Rs. 0</div>
                </div>
                <i class="fa-solid fa-chevron-right text-[10px] text-amber-400/70 ml-1"></i>
            </a>
        `;

        document.body.appendChild(floatingContainer);

        // Sync immediately
        const count = window.SialkotCart.getCount();
        const total = window.SialkotCart.getSubtotal();
        const badges = floatingContainer.querySelectorAll('.ss-cart-badge');
        const totals = floatingContainer.querySelectorAll('.ss-cart-total');

        badges.forEach(b => {
            b.textContent = count;
            b.classList.toggle('hidden', count === 0);
            b.style.display = count > 0 ? 'flex' : 'none';
        });
        totals.forEach(t => {
            t.textContent = 'Rs. ' + total.toLocaleString();
        });
    }

    // 3. Multi-Flavour & Size Pages (Pizza, Burgers, Sandwiches, Wraps, Shawarma, Fries)
    function setupMultiFlavourOrdering(sizeBoxes) {
        const photoEl = document.querySelector('.product-photo img, article img, main img');
        let fallbackImg = 'sialkot-sweets-logo.png';
        if (photoEl && photoEl.getAttribute('src')) {
            fallbackImg = photoEl.getAttribute('src').replace(/^\.\.\//, '');
        }

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
            addBtn.className = 'ss-size-add-btn mt-1.5 w-full py-1 px-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-extrabold text-[9.5px] sm:text-[10px] flex items-center justify-center gap-1 shadow-xs transition active:scale-95 cursor-pointer';
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
            };

            addBtn.addEventListener('click', triggerAdd);
            box.addEventListener('click', triggerAdd);
        });
    }

    // 4. Single Item Pages (Mithai, Bakery, Halwa, etc.)
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
                    <button type="button" class="ss-minus-btn w-10 h-11 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-extrabold text-base select-none">-</button>
                    <input type="number" value="1" min="1" max="99" class="ss-qty-val w-12 text-center font-extrabold text-emerald-950 text-sm focus:outline-none bg-transparent" readonly>
                    <button type="button" class="ss-plus-btn w-10 h-11 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-extrabold text-base select-none">+</button>
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
            <p class="text-[10.5px] text-stone-500 text-center mt-2">Prepared daily with pure desi ghee & fresh ingredients.</p>
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductOrdering);
    } else {
        initProductOrdering();
    }

})(window, document);
