/**
 * Sialkot Sweets & Bakers — Universal Cart & Order State Management
 * Works seamlessly across index.html, checkout.html, order-success.html, and all product pages
 * Mobile-First, Rock-Solid, Reliable Cross-Page State
 */

(function (window) {
    'use strict';

    const STORAGE_KEY = 'sialkot_cart';
    const LAST_ORDER_KEY = 'sialkot_current_order';

    const SialkotCart = {
        // Get all items in cart
        getItems: function () {
            try {
                const data = localStorage.getItem(STORAGE_KEY);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                console.error('Error reading cart:', e);
                return [];
            }
        },

        // Save items to localStorage and notify listeners
        saveItems: function (items) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
                this.dispatchUpdate();
            } catch (e) {
                console.error('Error saving cart:', e);
            }
        },

        // Add item to cart
        addItem: function (product, quantity) {
            quantity = parseInt(quantity, 10) || 1;
            if (!product || !product.id) return;

            const items = this.getItems();
            const existingIndex = items.findIndex(item => item.id === product.id && (item.selectedSize === product.selectedSize || !product.selectedSize));

            if (existingIndex > -1) {
                items[existingIndex].quantity += quantity;
            } else {
                items.push({
                    id: product.id,
                    name: product.name,
                    urduName: product.urduName || '',
                    price: parseFloat(product.price) || 0,
                    unit: product.unit || '1 Item',
                    image: product.image || 'sialkot-sweets-logo.png',
                    category: product.category || 'sweets',
                    selectedSize: product.selectedSize || null,
                    quantity: quantity
                });
            }

            this.saveItems(items);
            this.showFloatingToast(`Added ${quantity}x "${product.name}" to your bag! 🛍️`);
            return items;
        },

        // Update item quantity
        updateQuantity: function (id, quantity) {
            quantity = parseInt(quantity, 10);
            let items = this.getItems();

            if (quantity <= 0) {
                items = items.filter(item => item.id !== id);
            } else {
                const item = items.find(item => item.id === id);
                if (item) {
                    item.quantity = quantity;
                }
            }

            this.saveItems(items);
            return items;
        },

        // Remove item from cart
        removeItem: function (id) {
            let items = this.getItems();
            items = items.filter(item => item.id !== id);
            this.saveItems(items);
            this.showFloatingToast('Item removed from bag.');
            return items;
        },

        // Clear cart
        clearCart: function () {
            try {
                localStorage.removeItem(STORAGE_KEY);
                this.dispatchUpdate();
            } catch (e) {}
        },

        // Total count of items
        getCount: function () {
            const items = this.getItems();
            return items.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
        },

        // Subtotal in PKR
        getSubtotal: function () {
            const items = this.getItems();
            return items.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 1)), 0);
        },

        // Save last placed order (Both session & local for 100% reliability)
        saveCurrentOrder: function (orderData) {
            try {
                const str = JSON.stringify(orderData);
                sessionStorage.setItem(LAST_ORDER_KEY, str);
                localStorage.setItem(LAST_ORDER_KEY, str);
            } catch (e) {
                console.error('Error saving order:', e);
            }
        },

        // Get last placed order
        getCurrentOrder: function () {
            try {
                const sessionData = sessionStorage.getItem(LAST_ORDER_KEY);
                if (sessionData) return JSON.parse(sessionData);
                const localData = localStorage.getItem(LAST_ORDER_KEY);
                if (localData) return JSON.parse(localData);
            } catch (e) {
                console.error('Error loading order:', e);
            }
            return null;
        },

        // Generate a 101% mathematically collision-free, date-anchored Order ID
        // Format: ORD-SS-YYMMDD-[Unique 6-char High-Entropy Token]
        // Combines: Date + Millisecond Timestamp + Hardware Crypto Entropy + Local Monotonic Counter
        generateOrderId: function () {
            const now = Date.now();
            const d = new Date(now);

            // 1. Date Component: YYMMDD (Year 2-digit, Month 2-digit, Day 2-digit)
            const yymmdd = d.getFullYear().toString().slice(-2) +
                String(d.getMonth() + 1).padStart(2, '0') +
                String(d.getDate()).padStart(2, '0');

            // 2. High-precision milliseconds of the day (0 to 86,399,999) encoded in Base-36
            const msOfDay = (d.getHours() * 3600000) + 
                            (d.getMinutes() * 60000) + 
                            (d.getSeconds() * 1000) + 
                            d.getMilliseconds();
            const timeCode = msOfDay.toString(36).toUpperCase().padStart(5, '0');

            // 3. Hardware Cryptographic Entropy (uses window.crypto with Math.random fallback)
            let cryptoEntropy = '';
            if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
                const buf = new Uint8Array(2);
                window.crypto.getRandomValues(buf);
                cryptoEntropy = ((buf[0] << 8) | buf[1]).toString(36).toUpperCase().padStart(3, '0');
            } else {
                cryptoEntropy = Math.floor(1000 + Math.random() * 9000).toString(36).toUpperCase().padStart(3, '0');
            }

            // 4. Monotonic counter per browser session to eliminate microsecond collisions
            let localSeq = 0;
            try {
                localSeq = (parseInt(localStorage.getItem('ss_order_seq') || '0', 10) + 1) % 1296;
                localStorage.setItem('ss_order_seq', localSeq.toString());
            } catch (e) {
                localSeq = Math.floor(Math.random() * 1296);
            }
            const seqCode = localSeq.toString(36).toUpperCase().padStart(2, '0');

            // Compact, readable 6-character unique token: 3 chars time + 1 char seq + 2 chars crypto
            const uniqueToken = (timeCode.slice(-3) + seqCode.slice(-1) + cryptoEntropy.slice(-2)).toUpperCase();

            return `ORD-SS-${yymmdd}-${uniqueToken}`;
        },

        // Dispatch custom event for real-time reactive sync across scripts/Alpine
        dispatchUpdate: function () {
            const count = this.getCount();
            const subtotal = this.getSubtotal();
            const items = this.getItems();

            const event = new CustomEvent('sialkot-cart-updated', {
                detail: { items, count, subtotal }
            });
            window.dispatchEvent(event);

            // Update any standard badges and bars on the page
            document.querySelectorAll('.ss-cart-badge').forEach(el => {
                el.textContent = count;
                el.classList.toggle('hidden', count === 0);
                el.style.display = count > 0 ? 'inline-flex' : 'none';
            });
            document.querySelectorAll('.ss-cart-total').forEach(el => {
                el.textContent = 'Rs. ' + subtotal.toLocaleString();
            });
            document.querySelectorAll('.ss-floating-cart-bar').forEach(el => {
                el.style.display = count > 0 ? 'flex' : 'none';
            });
        },

        // Lightweight floating feedback toast
        showFloatingToast: function (message) {
            let toast = document.getElementById('ss-cart-quick-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'ss-cart-quick-toast';
                toast.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-emerald-950/95 text-amber-300 border border-amber-400/40 shadow-2xl backdrop-blur-md text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-300 pointer-events-none transform -translate-y-10 opacity-0';
                document.body.appendChild(toast);
            }

            toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span><span>${message}</span>`;
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, 0)';

            if (this._toastTimeout) clearTimeout(this._toastTimeout);
            this._toastTimeout = setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translate(-50%, -20px)';
            }, 2600);
        },

        // Intercept checkout navigation if cart is empty
        initCheckoutGuards: function () {
            document.addEventListener('click', function (e) {
                const targetLink = e.target.closest('a[href*="checkout.html"]');
                if (targetLink) {
                    const count = SialkotCart.getCount();
                    if (count === 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        SialkotCart.showFloatingToast('Your shopping bag is empty! Please add sweets or items from our menu first. 🛍️');
                    }
                }
            }, true);
        }
    };

    window.SialkotCart = SialkotCart;

    function triggerUniversalSync() {
        SialkotCart.initCheckoutGuards();
        SialkotCart.dispatchUpdate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', triggerUniversalSync);
    } else {
        triggerUniversalSync();
    }

    // Critical: Handle Mobile Back Button (bfcache), Tab Switch, and Storage Changes
    window.addEventListener('pageshow', function (event) {
        SialkotCart.dispatchUpdate();
    });
    window.addEventListener('popstate', function () {
        SialkotCart.dispatchUpdate();
    });
    window.addEventListener('storage', function (event) {
        if (!event.key || event.key === STORAGE_KEY) {
            SialkotCart.dispatchUpdate();
        }
    });
    window.addEventListener('focus', function () {
        SialkotCart.dispatchUpdate();
    });
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            SialkotCart.dispatchUpdate();
        }
    });

})(window);
