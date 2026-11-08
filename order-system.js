/**
 * Sialkot Sweets & Bakers - Simple WhatsApp Ordering System
 * Handles WhatsApp order generation and persistent order bag across all product pages.
 */
(function() {
    'use strict';

    const WHATSAPP_PHONE = '923253922121';
    const CART_KEY = 'sialkot_cart';

    // Helper to get cart from localStorage
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    // Helper to save cart
    function saveCart(cart) {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            updateFloatingCartBar();
        } catch (e) {}
    }

    // Helper to add item to cart
    function addToCart(item) {
        const cart = getCart();
        const cartId = item.id + (item.sizeName ? '-' + item.sizeName : '');
        const existing = cart.find(c => c.cartId === cartId);
        if (existing) {
            existing.qty += item.qty;
        } else {
            cart.push(item);
        }
        saveCart(cart);
        showOrderToast(`Added ${item.name} to your order bag!`);
    }

    // Clean toast notification
    function showOrderToast(msg) {
        let toast = document.getElementById('sialkot-order-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'sialkot-order-toast';
            toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;background:#2b1722;color:#ffffff;padding:12px 20px;border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,0.3);border:1px solid rgba(245,158,11,0.4);font-family:Inter,sans-serif;font-size:13px;display:flex;align-items:center;gap:10px;transition:opacity 0.3s ease,transform 0.3s ease;';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span style="color:#25D366;font-size:16px;">✓</span> <span>${msg}</span>`;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(toast.timer);
        toast.timer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(10px)';
        }, 3000);
    }

    // Render / update floating bottom order indicator
    function updateFloatingCartBar() {
        const cart = getCart();
        let bar = document.getElementById('sialkot-subpage-cart-bar');
        
        const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        if (totalCount === 0) {
            if (bar) bar.style.display = 'none';
            return;
        }

        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'sialkot-subpage-cart-bar';
            bar.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:9000;background:#2b1722;color:#ffffff;border-radius:16px;box-shadow:0 14px 40px rgba(0,0,0,0.35);border:1px solid rgba(245,158,11,0.45);padding:10px 14px;display:flex;align-items:center;gap:10px;font-family:Inter,sans-serif;font-size:12px;backdrop-filter:blur(8px);';
            document.body.appendChild(bar);
        }

        bar.style.display = 'flex';
        bar.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:32px;height:32px;border-radius:10px;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;">
                    <i class="fa-brands fa-whatsapp"></i>
                </div>
                <div>
                    <div style="font-weight:700;color:#fde047;font-size:11px;">${totalCount} item${totalCount > 1 ? 's' : ''} in Bag</div>
                    <div style="font-weight:800;color:#ffffff;font-size:13px;">Rs. ${totalPrice.toLocaleString('en-PK')}</div>
                </div>
            </div>
            <a href="../?section=menu&cart=open" style="background:linear-gradient(135deg,#fde047,#f59e0b);color:#1c1917;font-weight:800;font-size:11px;padding:7px 12px;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;margin-left:4px;">
                <span>View &amp; Order</span>
                <i class="fa-solid fa-arrow-right" style="font-size:10px;"></i>
            </a>
        `;
    }

    // Direct WhatsApp single item order
    function orderViaWhatsAppDirect(productName, price, qty, unitOrSize) {
        const total = price * qty;
        const details = unitOrSize ? ` (${unitOrSize})` : '';
        let msg = `Assalam-o-Alaikum Sialkot Sweets & Bakers!\n`;
        msg += `I would like to place an order:\n\n`;
        msg += `*Item:* ${productName}${details}\n`;
        msg += `*Quantity:* ${qty}\n`;
        msg += `*Price:* Rs. ${total.toLocaleString('en-PK')} (Rs. ${price.toLocaleString('en-PK')} each)\n\n`;
        msg += `Please confirm availability and delivery time. Thank you!`;

        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    // Enhance traditional product detail pages
    function initSingleProductPage() {
        const titleEl = document.querySelector('article.product-panel h1') || document.querySelector('h1.font-playfair');
        if (!titleEl) return;

        const productName = titleEl.textContent.trim();
        const urduEl = document.querySelector('article.product-panel .font-urdu') || document.querySelector('.font-urdu');
        const urduName = urduEl ? urduEl.textContent.trim() : '';

        // Extract price from price section
        let unitPrice = 0;
        let unitText = '1 Kg';
        const priceMatches = document.body.innerText.match(/Rs\.\s*([\d,]+)/i);
        if (priceMatches && priceMatches[1]) {
            unitPrice = parseInt(priceMatches[1].replace(/,/g, ''), 10) || 0;
        }

        const unitMatches = document.body.innerText.match(/\/ ([\w\s"-]+)/i);
        if (unitMatches && unitMatches[1]) {
            unitText = unitMatches[1].trim();
        }

        // Find action section near Explore Full Menu
        const menuLink = document.querySelector('a[href*="?section=menu"]');
        if (!menuLink || !menuLink.parentElement) return;

        const actionWrap = menuLink.parentElement;
        let qty = 1;

        const orderBox = document.createElement('div');
        orderBox.className = 'w-full mb-3 p-3.5 rounded-xl border border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3';
        orderBox.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-xs font-bold text-emerald-950 uppercase tracking-wider">Quantity:</span>
                <div class="inline-flex items-center rounded-lg border border-stone-300 bg-white overflow-hidden shadow-2xs">
                    <button type="button" id="ss-qty-minus" class="w-8 h-8 text-stone-700 hover:bg-stone-100 font-bold text-base transition flex items-center justify-center">-</button>
                    <span id="ss-qty-display" class="w-8 text-center text-xs font-bold text-emerald-950">1</span>
                    <button type="button" id="ss-qty-plus" class="w-8 h-8 text-stone-700 hover:bg-stone-100 font-bold text-base transition flex items-center justify-center">+</button>
                </div>
                <div class="text-xs">
                    <span class="text-stone-400 block text-[10px]">Total</span>
                    <span id="ss-total-display" class="font-bold text-amber-800 text-sm">Rs. ${unitPrice.toLocaleString('en-PK')}</span>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" id="ss-whatsapp-order-btn" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-4 py-2 text-xs shadow-md transition hover:scale-105 active:scale-95 cursor-pointer">
                    <i class="fa-brands fa-whatsapp text-base"></i>
                    <span>Order on WhatsApp</span>
                </button>
                <button type="button" id="ss-add-bag-btn" class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-bold px-3 py-2 text-xs border border-amber-400/30 transition active:scale-95 cursor-pointer" title="Add to Order Bag">
                    <i class="fa-solid fa-cart-plus"></i>
                    <span>+ Bag</span>
                </button>
            </div>
        `;

        actionWrap.insertBefore(orderBox, menuLink);

        const minusBtn = document.getElementById('ss-qty-minus');
        const plusBtn = document.getElementById('ss-qty-plus');
        const qtyDisplay = document.getElementById('ss-qty-display');
        const totalDisplay = document.getElementById('ss-total-display');
        const waBtn = document.getElementById('ss-whatsapp-order-btn');
        const bagBtn = document.getElementById('ss-add-bag-btn');

        function updateTotals() {
            qtyDisplay.textContent = qty;
            totalDisplay.textContent = 'Rs. ' + (unitPrice * qty).toLocaleString('en-PK');
        }

        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                if (qty > 1) {
                    qty--;
                    updateTotals();
                }
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                qty++;
                updateTotals();
            });
        }

        if (waBtn) {
            waBtn.addEventListener('click', () => {
                orderViaWhatsAppDirect(productName, unitPrice, qty, unitText);
            });
        }

        if (bagBtn) {
            bagBtn.addEventListener('click', () => {
                const img = document.querySelector('article.product-panel img');
                addToCart({
                    cartId: 'item-' + encodeURIComponent(productName.toLowerCase()),
                    id: 'item-' + encodeURIComponent(productName.toLowerCase()),
                    name: productName,
                    urduName: urduName,
                    unit: unitText,
                    sizeName: '',
                    price: unitPrice,
                    image: img ? img.getAttribute('src') : '',
                    qty: qty
                });
            });
        }
    }

    // Enhance multi-flavour fast-food & pizza pages
    function initMultiFlavourPage() {
        // Enhance left sticky card if present
        const stickyTel = document.querySelector('.lg\\:sticky a[href^="tel:"]');
        if (stickyTel && !document.querySelector('.ss-sticky-wa-btn')) {
            const headingEl = document.querySelector('.lg\\:sticky h2') || document.querySelector('h1, h2');
            const mainTitle = headingEl ? headingEl.textContent.trim() : 'Fast Food / Pizza';
            const waWrap = document.createElement('div');
            waWrap.className = 'mt-2.5 pt-2 border-t border-stone-100 ss-sticky-wa-btn';
            waWrap.innerHTML = `
                <a href="https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Assalam-o-Alaikum Sialkot Sweets! I would like to order ' + mainTitle + '. Please confirm availability.')}" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-3 py-2 text-xs shadow-sm transition hover:scale-[1.02] active:scale-95">
                    <i class="fa-brands fa-whatsapp text-sm"></i>
                    <span>Order on WhatsApp</span>
                </a>
            `;
            if (stickyTel.parentElement && stickyTel.parentElement.parentElement) {
                stickyTel.parentElement.parentElement.appendChild(waWrap);
            }
        }

        const flavourArticles = document.querySelectorAll('article.bg-white.rounded-xl, article.pizza-flavour-card');
        if (!flavourArticles.length) return;

        flavourArticles.forEach(article => {
            const heading = article.querySelector('h2, h3');
            if (!heading) return;
            const flavourName = heading.textContent.trim().replace(/^\d+\.\s*/, '');

            const sizeBoxes = article.querySelectorAll('.size-box, .pizza-size-row');
            if (sizeBoxes.length) {
                sizeBoxes.forEach(box => {
                    const textContent = box.textContent;
                    const priceMatch = textContent.match(/Rs\.\s*([\d,]+)/i);
                    const sizeMatch = textContent.match(/([A-Za-z0-9\s"()-]+)/i);
                    const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;
                    const sizeName = sizeMatch ? sizeMatch[1].trim() : 'Standard';

                    // Add order badge button on size box hover/click
                    box.style.cursor = 'pointer';
                    box.title = `Click to order ${flavourName} (${sizeName}) on WhatsApp`;
                    box.classList.add('hover:border-[#25D366]', 'hover:bg-emerald-50/60', 'transition');

                    box.addEventListener('click', (e) => {
                        e.stopPropagation();
                        orderViaWhatsAppDirect(flavourName, price, 1, sizeName);
                    });
                });
            }

            // Add WhatsApp Order Button to Flavour Article if not present
            if (!article.querySelector('.ss-flavour-wa-btn')) {
                const btnWrap = document.createElement('div');
                btnWrap.className = 'mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2';
                btnWrap.innerHTML = `
                    <span class="text-[10px] text-stone-400 font-medium">Instant Order:</span>
                    <button type="button" class="ss-flavour-wa-btn inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-2.5 py-1 rounded-lg transition active:scale-95 cursor-pointer">
                        <i class="fa-brands fa-whatsapp text-xs"></i>
                        <span>Order via WhatsApp</span>
                    </button>
                `;

                const firstSizeBox = article.querySelector('.size-box, .pizza-size-row');
                let defaultPrice = 0;
                let defaultSize = '';
                if (firstSizeBox) {
                    const pMatch = firstSizeBox.textContent.match(/Rs\.\s*([\d,]+)/i);
                    defaultPrice = pMatch ? parseInt(pMatch[1].replace(/,/g, ''), 10) : 0;
                    const sMatch = firstSizeBox.textContent.match(/([A-Za-z0-9\s"()-]+)/i);
                    defaultSize = sMatch ? sMatch[1].trim() : '';
                }

                btnWrap.querySelector('button').addEventListener('click', (e) => {
                    e.stopPropagation();
                    orderViaWhatsAppDirect(flavourName, defaultPrice, 1, defaultSize);
                });

                article.appendChild(btnWrap);
            }
        });
    }

    // Run on document load
    document.addEventListener('DOMContentLoaded', () => {
        initSingleProductPage();
        initMultiFlavourPage();
        updateFloatingCartBar();

        window.addEventListener('storage', () => {
            updateFloatingCartBar();
        });
    });
})();
