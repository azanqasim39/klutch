/**
 * Sialkot Sweets & Bakers — Universal Product & Flavour Page Ordering System
 * Handles:
 * 1. Single sweet/bakery item pages (Gulab Jamun, Baklava, Barfi, Halwa, etc.)
 * 2. Multi-flavour pages (Pizza 10 flavours, Sandwiches 5 flavours, Burgers, Wraps, Shawarma, Rolls, Fries)
 * 3. Header Cart Icon with real-time counter
 * 4. Mobile Floating Cart Bar
 */

(function (window, document) {
    'use strict';

    function initProductOrdering() {
        if (!window.SialkotCart) return;

        // 1. Inject Cart link into the top header
        injectHeaderCart();

        // 2. Handle Multi-Flavour & Size Pages (Pizza, Sandwiches, Burgers, Wraps, Rolls, Fries)
        const sizeBoxes = document.querySelectorAll('.size-box');
        if (sizeBoxes.length > 0) {
            setupMultiFlavourOrdering(sizeBoxes);
        } else {
            // 3. Handle Single Item Pages (Mithai, Bakery, Halwa, etc.)
            setupSingleItemOrdering();
        }

        // 4. Inject Mobile Floating Cart Bar
        injectMobileFloatingBar();

        // Sync state
        window.SialkotCart.dispatchUpdate();
    }

    // 1. Header Cart Button
    function injectHeaderCart() {
        if (document.querySelector('.ss-header-cart-link')) return;

        const headerContainer = document.querySelector('header .max-w-7xl, header .max-w-6xl, header > div');
        if (!headerContainer) return;

        const backBtn = headerContainer.querySelector('a[href*="menu"], .action-link');

        const cartLink = document.createElement('a');
        cartLink.href = '../checkout.html';
        cartLink.className = 'ss-header-cart-link inline-flex items-center gap-1.5 rounded-lg bg-emerald-950/90 hover:bg-emerald-900 border border-amber-400/40 text-amber-300 font-extrabold px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs shadow-md whitespace-nowrap transition ml-auto sm:ml-0';
        cartLink.innerHTML = `
            <i class="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
            <span class="ss-cart-badge bg-amber-500 text-emerald-950 text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1 hidden">0</span>
        `;

        if (backBtn && backBtn.parentNode) {
            backBtn.parentNode.insertBefore(cartLink, backBtn);
        } else {
            headerContainer.appendChild(cartLink);
        }
    }

    // 2. Multi-Flavour & Size Pages (Pizza, Burgers, Sandwiches, Wraps, Shawarma, Fries)
    function setupMultiFlavourOrdering(sizeBoxes) {
        // Find photo on page
        const photoEl = document.querySelector('.product-photo img, article img, main img');
        let fallbackImg = 'sialkot-sweets-logo.png';
        if (photoEl && photoEl.getAttribute('src')) {
            fallbackImg = photoEl.getAttribute('src').replace(/^\.\.\//, '');
        }

        sizeBoxes.forEach(function (box) {
            if (box.querySelector('.ss-size-add-btn')) return;

            // Extract Size and Price
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

            // Extract Parent Flavour Name
            const article = box.closest('article');
            let flavourName = 'House Special';
            if (article) {
                const h3 = article.querySelector('h3, h2, .font-bold');
                if (h3) {
                    flavourName = h3.textContent.replace(/^\d+[\.\s]*/, '').trim();
                }
            }

            // Make box interactive styling
            box.classList.add('hover:border-amber-500', 'transition', 'cursor-pointer', 'flex', 'flex-col', 'justify-between');

            // Add Add-to-Bag Button inside size box
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.className = 'ss-size-add-btn mt-1.5 w-full py-1 px-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-extrabold text-[9.5px] sm:text-[10px] flex items-center justify-center gap-1 shadow-xs transition active:scale-95 cursor-pointer';
            addBtn.innerHTML = `<i class="fa-solid fa-plus text-[8px]"></i><span>Add</span>`;

            box.appendChild(addBtn);

            // Click Handler
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

    // 3. Single Item Pages (Mithai, Bakery, Halwa, etc.)
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
                <!-- Quantity Controls -->
                <div class="flex items-center border-2 border-stone-200 rounded-xl bg-white overflow-hidden shadow-sm w-full sm:w-auto justify-between">
                    <button type="button" class="ss-minus-btn w-10 h-11 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-extrabold text-base select-none">-</button>
                    <input type="number" value="1" min="1" max="99" class="ss-qty-val w-12 text-center font-extrabold text-emerald-950 text-sm focus:outline-none bg-transparent" readonly>
                    <button type="button" class="ss-plus-btn w-10 h-11 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-extrabold text-base select-none">+</button>
                </div>

                <!-- Add to Cart Button -->
                <button type="button" class="ss-btn-add-cart flex-1 w-full py-3 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-extrabold text-xs sm:text-sm border border-amber-400/50 shadow flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer">
                    <i class="fa-solid fa-cart-plus"></i>
                    <span>Add to Bag</span>
                </button>

                <!-- Order / Checkout Now Button -->
                <button type="button" class="ss-btn-order-now flex-1 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition hover:brightness-105 active:scale-[0.98] cursor-pointer">
                    <i class="fa-solid fa-bolt"></i>
                    <span>Order Now</span>
                </button>
            </div>
            <p class="text-[10.5px] text-stone-500 text-center mt-2">Prepared daily with 100% pure desi ghee & fresh ingredients.</p>
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

    // 4. Mobile Floating Sticky Cart Bar
    function injectMobileFloatingBar() {
        if (document.querySelector('.ss-floating-cart-bar')) return;

        const bar = document.createElement('div');
        bar.className = 'ss-floating-cart-bar md:hidden fixed bottom-4 left-3 right-3 z-50 bg-emerald-950 text-white p-3 rounded-2xl shadow-2xl border-2 border-amber-400/80 items-center justify-between gap-3 backdrop-blur-xl transition-all duration-300';
        bar.style.display = 'none';
        bar.innerHTML = `
            <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-sm shrink-0 shadow">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div class="min-w-0">
                    <div class="text-xs font-bold text-white flex items-center gap-1.5">
                        <span class="ss-cart-count-text">0 items</span>
                        <span class="text-amber-400">•</span>
                        <span class="ss-cart-total text-amber-300 font-extrabold">Rs. 0</span>
                    </div>
                    <div class="text-[10px] text-stone-300 truncate">Delivery in Gujranwala</div>
                </div>
            </div>

            <a href="../checkout.html" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-black text-xs shrink-0 flex items-center gap-1.5 shadow-lg active:scale-95 transition">
                <span>Checkout</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
        `;

        document.body.appendChild(bar);

        window.addEventListener('sialkot-cart-updated', function (e) {
            const count = e.detail.count || 0;
            const subtotal = e.detail.subtotal || 0;
            const countText = bar.querySelector('.ss-cart-count-text');
            if (countText) countText.textContent = count + (count === 1 ? ' item' : ' items');
            bar.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductOrdering);
    } else {
        initProductOrdering();
    }

})(window, document);
