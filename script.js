/* Sialkot Sweets & Bakers — theme configuration and site behavior.
   index.html loads the Tailwind CDN first, then this file configures its palette. */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                /* The existing emerald utility names now use a calmer premium wine palette.
                   Keeping the class names means the existing HTML layout and behavior stay intact. */
                emerald: {
                    50: '#fbf7f8',
                    100: '#f2e6ea',
                    200: '#e4d0d8',
                    300: '#c9a9b6',
                    400: '#b88e9d',
                    500: '#9d7182',
                    600: '#85596b',
                    700: '#6e4155',
                    800: '#573043',
                    850: '#472637',
                    900: '#3b202f',
                    950: '#2b1722'
                },
                /* Champagne tones replace the sharper orange-yellow accents. */
                amber: {
                    50: '#fbf8f1',
                    100: '#f5ebdc',
                    200: '#e9d8bc',
                    300: '#e0c79e',
                    400: '#d5b784',
                    450: '#cfad76',
                    500: '#c8a56a',
                    550: '#aa8755',
                    600: '#8b683e',
                    700: '#725234',
                    800: '#5c4330',
                    900: '#3d2c22'
                },
                gold: {
                    300: '#e0c79e',
                    400: '#d5b784',
                    500: '#c8a56a',
                    600: '#8b683e'
                },
                burgundy: {
                    700: '#724052',
                    800: '#573043',
                    900: '#3b202f'
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'sans-serif'],
                urdu: ['Noto Nastaliq Urdu', 'Amiri', 'serif']
            }
        }
    }
};



/* The ten original pizza flavour records are kept here for the single Sialkot Special Pizza page. */
window.SIALKOT_PIZZA_FLAVOURS = [
{
                        id: 'ff1',
                        name: 'Sialkot Special Pizza',
                        urduName: 'سیالکوٹ اسپیشل پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'House Special',
                        image: 'Z.png',
                        description: 'Mozzarella, Danish Cheese, Tomato Sauce, Oregano.',
                        ingredients: 'Mozzarella Cheese, Danish Cheese, Signature Tomato Sauce, Oregano, Fresh Dough.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1950 },
                            { name: 'Large (12")', price: 2450 },
                            { name: 'XL (14")', price: 2700 }
                        ],
                        tags: ['House Special', 'Loaded Cheese', 'Fresh Baked']
                    },
{
                        id: 'ff2',
                        name: 'Chicken Creamy Pizza',
                        urduName: 'چکن کریمی پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Creamy Achari',
                        image: 'https://lh3.googleusercontent.com/grass-cs/ACvplmNtMjlFATt56PZoi3CAs78Qfz6ia-_Gv_tSqb_NvF67oeydAoW-SBeaUcwry52morAQsK00lxTQduzMBiiZoWi1oD05mfIG_nlJGcQenvOaeIg-055i3OZZJIAnR37D0gUY0rVor-x-_BKq=s680-w680-h510-rw',
                        description: 'Capsicum, Sweet Corn, Achari Chicken, Onion, Mozzarella Cheese, Achari Sauce.',
                        ingredients: 'Achari Chicken, Mozzarella Cheese, Capsicum, Sweet Corn, Onion, Creamy Achari Sauce.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Creamy', 'Achari Flavor', 'Sweet Corn']
                    },
{
                        id: 'ff3',
                        name: 'Chicken Malai Boti Pizza',
                        urduName: 'چکن ملائی بوٹی پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Tender Boti',
                        image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
                        description: 'Capsicum, Sweet Corn, Achari Chicken, Onion, Mozzarella Cheese, Achari Sauce.',
                        ingredients: 'Tender Malai Boti Chicken, Mozzarella Cheese, Capsicum, Sweet Corn, Onion.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Malai Boti', 'Mild Spicy', 'Juicy']
                    },
{
                        id: 'ff4',
                        name: 'Chicken Fajita Pizza',
                        urduName: 'چکن فجیتا پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Mexican Flavor',
                        image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
                        description: 'Fajita Chicken, Cheese, Tomato, Pizza Sauce, Capsicum, Onion.',
                        ingredients: 'Marinated Fajita Chicken, Cheese, Fresh Tomatoes, Capsicum, Onion, Red Sauce.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Fajita Spice', 'Classic Favorite']
                    },
{
                        id: 'ff5',
                        name: 'Chicken Bar B.Q Pizza',
                        urduName: 'چکن بار بی کیو پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Smoky BBQ',
                        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
                        description: 'BBQ Chicken, Cheese, Tomato, Jalapeno, Onion, Olives & Pizza Sauce, BBQ Sauce.',
                        ingredients: 'BBQ Chicken, Mozzarella Cheese, Jalapeños, Black Olives, BBQ Drizzle.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Smoky BBQ', 'Jalapeño Kick']
                    },
{
                        id: 'ff6',
                        name: 'Chicken Tandoori Pizza',
                        urduName: 'چکن تندوری پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Desi Spice',
                        image: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
                        description: 'Chicken Tandoori, Onion, Black Olives, Cheese, Sweet Corn & Tandoori Sauce.',
                        ingredients: 'Tandoori Chunks, Black Olives, Mozzarella Cheese, Sweet Corn, Tandoori Sauce.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Tandoori Spice', 'Black Olives']
                    },
{
                        id: 'ff7',
                        name: 'Peri Peri Chicken Pizza',
                        urduName: 'پیری پیری چکن پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Hot & Fiery',
                        image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
                        description: 'Chicken Peri Peri, Onion, Black Olives, Cheese, Sweet Corn & Peri Peri Sauce.',
                        ingredients: 'Peri Peri Chicken, Mozzarella, Black Olives, Sweet Corn, Tangy Peri Peri Sauce.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Peri Peri', 'Spicy Tang']
                    },
{
                        id: 'ff8',
                        name: 'Chicken Grilled Pizza',
                        urduName: 'چکن گرلڈ پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Flame Grilled',
                        image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
                        description: 'Grill Chicken, Cheese, Tomato, Jalapeno, Onions, Olives, Pizza Sauce, BBQ Sauce.',
                        ingredients: 'Char-grilled Chicken, Cheese, Jalapeños, Tomatoes, Olives, BBQ Sauce.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Flame Grilled', 'Jalapeno']
                    },
{
                        id: 'ff9',
                        name: 'Chicken Tikka Pizza',
                        urduName: 'چکن تکہ پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'All-Time Classic',
                        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
                        description: 'Marinated Tikka Chicken, Cheese, Capsicum, Onion, Pizza Sauce.',
                        ingredients: 'Tikka Chunks, Mozzarella Cheese, Capsicum, Sliced Onion, Traditional Pizza Sauce.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Tikka Flavor', 'Classic']
                    },
{
                        id: 'ff10',
                        name: 'Hawain Pizza',
                        urduName: 'ہوائین پیزا',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Mini 6" (Up to XL)',
                        rating: 4.6,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Sweet & Savory',
                        image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
                        description: 'Marinated Tikka Chicken, Cheese, Capsicum, Onion, Pizza Sauce & Pineapple.',
                        ingredients: 'Tikka Chicken, Pineapple Chunks, Mozzarella, Capsicum, Onion.',
                        sizes: [
                            { name: 'Mini (6")', price: 700 },
                            { name: 'Small (8")', price: 1400 },
                            { name: 'Medium (10")', price: 1900 },
                            { name: 'Large (12")', price: 2400 },
                            { name: 'XL (14")', price: 2600 }
                        ],
                        tags: ['Pineapple', 'Sweet & Spicy']
                    }
];

const sectionRoutes = {
            home: 'home-section',
            about: 'about-heritage',
            specialties: 'specialties',
            menu: 'menu-section',
            reviews: 'reviews',
            branches: 'branches',
        };

        function scrollToSectionRoute(route, smooth = false) {
            const targetId = sectionRoutes[route];
            if (!targetId) return;
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
            }
        }

        function setSectionRoute(route, smooth = true, replace = false) {
            if (!sectionRoutes[route]) return;
            const url = new URL(window.location.href);
            url.searchParams.set('section', route);
            url.hash = '';
            if (replace) {
                history.replaceState({ section: route }, '', url);
            } else {
                history.pushState({ section: route }, '', url);
            }
            scrollToSectionRoute(route, smooth);
        }

        function initializeSectionRouting() {
            document.addEventListener('click', (event) => {
                const link = event.target.closest('a[data-section-route]');
                if (!link) return;
                event.preventDefault();
                setSectionRoute(link.dataset.sectionRoute);
            });

            window.addEventListener('popstate', () => {
                const route = new URLSearchParams(window.location.search).get('section');
                if (route) scrollToSectionRoute(route, true);
            });

            const initialParams = new URLSearchParams(window.location.search);
            const initialSection = initialParams.get('section');
            if (initialSection && sectionRoutes[initialSection]) {
                requestAnimationFrame(() => requestAnimationFrame(() => scrollToSectionRoute(initialSection, false)));
            } else if (initialParams.get('category') || initialParams.get('cat')) {
                requestAnimationFrame(() => requestAnimationFrame(() => scrollToSectionRoute('menu', false)));
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeSectionRouting, { once: true });
        } else {
            initializeSectionRouting();
        }

        function sialkotSweetsApp() {
            return {
                searchQuery: '',
                selectedCategory: 'all',
                sortBy: 'popular',
                mobileMenuOpen: false,
                isOpen: true,
                quickViewItem: null,
                faqOpen: 0,
                toastMessage: '',
                toastVisible: false,
                toastTimer: null,

                openQuickView(item) {
                    this.quickViewItem = item;
                    document.body.style.overflow = 'hidden';
                },

                closeQuickView() {
                    this.quickViewItem = null;
                    document.body.style.overflow = '';
                },

                toggleFaq(index) {
                    this.faqOpen = this.faqOpen === index ? null : index;
                },

                showToast(msg) {
                    this.toastMessage = msg;
                    this.toastVisible = true;
                    if (this.toastTimer) clearTimeout(this.toastTimer);
                    this.toastTimer = setTimeout(() => {
                        this.toastVisible = false;
                    }, 3500);
                },

                copyText(text, successMsg) {
                    const fallback = () => {
                        try {
                            const input = document.createElement('input');
                            input.value = text;
                            document.body.appendChild(input);
                            input.select();
                            document.execCommand('copy');
                            document.body.removeChild(input);
                            this.showToast(successMsg || 'Copied to clipboard!');
                        } catch (e) {
                            this.showToast('Copied: ' + text);
                        }
                    };

                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text).then(() => {
                            this.showToast(successMsg || 'Copied to clipboard!');
                        }).catch(() => fallback());
                    } else {
                        fallback();
                    }
                },

                init() {
                    this.updateOpenStatus();
                    window.addEventListener('keydown', (event) => {
                        if (event.key === 'Escape') this.mobileMenuOpen = false;
                    });
                    // Re-check status every 60 seconds
                    setInterval(() => this.updateOpenStatus(), 60000);

                    // Check URL for category routing
                    const params = new URLSearchParams(window.location.search);
                    const catQuery = params.get('category') || params.get('cat');
                    if (catQuery) {
                        const resolved = this.resolveCategorySlug(catQuery);
                        if (resolved) {
                            this.selectedCategory = resolved;
                            requestAnimationFrame(() => {
                                const menuEl = document.getElementById('menu-section');
                                if (menuEl) menuEl.scrollIntoView({ behavior: 'auto', block: 'start' });
                            });
                        }
                    }

                    // Handle browser back and forward navigation
                    window.addEventListener('popstate', () => {
                        const currentParams = new URLSearchParams(window.location.search);
                        const cat = currentParams.get('category') || currentParams.get('cat');
                        if (cat) {
                            const resolved = this.resolveCategorySlug(cat);
                            if (resolved) this.selectedCategory = resolved;
                        } else if (currentParams.get('section') === 'menu') {
                            this.selectedCategory = 'all';
                        }
                    });
                },

                updateOpenStatus() {
                    const now = new Date();
                    const hours = now.getHours(); // 0 to 23
                    // Open from 6:00 AM (06:00) to 1:00 AM (01:00 midnight/early morning)
                    this.isOpen = (hours >= 6 || hours < 1);
                },

                categories: [
                    { id: 'all', slug: 'all-sweets-and-bakery', name: 'All Sweets & Bakery', icon: '🍽️' },
                    { id: 'fastfood', slug: 'fast-food', name: 'Fast Food', icon: '🍔' },
                    { id: 'sweets', slug: 'traditional-sweets', name: 'Traditional Sweets', icon: '🍯' },
                    { id: 'arabian', slug: 'arabian-sweets', name: 'Arabian Sweets', icon: '✨' },
                    { id: 'halwa', slug: 'halwa-jaat', name: 'Halwa Jaat', icon: '🍲' },
                    { id: 'biscuits', slug: 'biscuits', name: 'Biscuits', icon: '🍪' },
                    { id: 'cakerusk', slug: 'cake-rusk', name: 'Cake Rusk', icon: '🥖' }
                ],

                items: [
                    // FAST FOOD SECTION ITEMS
                    {
                        ...window.SIALKOT_PIZZA_FLAVOURS[0],
                        name: 'Sialkot Special Pizza',
                        description: 'Explore all 10 flavours: Sialkot Special, Chicken Creamy, Chicken Malai Boti, Chicken Fajita, Chicken Bar B.Q, Chicken Tandoori, Peri Peri Chicken, Chicken Grilled, Chicken Tikka and Hawain.',
                        ingredients: 'All ten flavour descriptions, ingredients, and size prices are listed on the Sialkot Special Pizza page.',
                        badge: '10 FLAVOURS',
                        highlight: '10 FLAVOURS IN 1 • Mini to XL Sizes',
                        unit: '10 Flavours (Mini–XL)',
                        tags: ['10 Flavours', 'Multiple Sizes', 'House Special']
                    },
                    {
                        id: 'ff11',
                        name: 'Special Chicken Cheese Stick',
                        urduName: 'اسپیشل چکن چیز اسٹک',
                        category: 'fastfood',
                        price: 750,
                        unit: 'Per Serving',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Cheesy Crust',
                        image: 'cheese stick.webp',
                        description: 'Oven-baked garlic dough sticks stuffed with seasoned chicken and gooey melted mozzarella cheese.',
                        ingredients: 'Garlic Dough, Shredded Chicken, Mozzarella, Herbs, Dip Sauce.',
                        tags: ['Extra Cheesy', 'Garlic Dip']
                    },

                    // SANDWICHES & PANINI
                    {
                        id: 'ff12',
                        name: 'Grilled Sandwhich / Panini',
                        urduName: 'گرلڈ سینڈوچ / پینینی',
                        category: 'fastfood',
                        price: 550,
                        unit: '5 Flavours',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: '5 FLAVOURS',
                        highlight: '5 FLAVOURS IN 1 • Toasted Panini',
                        image: 'Sandwhich.webp',
                        description: 'Explore all 5 flavours: Chicken Bar B.Q, Chicken Malai Boti, Grilled Chicken, Chicken Tikka, and Chicken Black Olive Panini.',
                        ingredients: 'Freshly baked panini bread toasted with gourmet chicken fillings, crisp veggies, and signature house dressings.',
                        tags: ['5 Flavours', 'Toasted Panini', 'Sandwich', 'Panini', 'BBQ', 'Malai Boti', 'Tikka', 'Black Olive']
                    },

                    // ROLLS
                    {
                        id: 'ff17',
                        name: 'Speacial Paratha Roll',
                        urduName: 'اسپیشل پراٹھا رول',
                        category: 'fastfood',
                        price: 350,
                        unit: '3 Flavours',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: '3 FLAVOURS',
                        highlight: '3 FLAVOURS IN 1 • Crispy Paratha & Twister',
                        image: 'paratha roll.png',
                        description: 'Explore all 3 handcrafted rolls: Classic Chicken Paratha Roll, Zinger Twister Roll, and Kabab Paratha Roll.',
                        ingredients: 'Hot flaky golden parathas and wraps with BBQ chicken, zinger strips, seekh kababs & garlic mint sauce.',
                        tags: ['3 Flavours', 'Paratha Roll', 'Twister Roll', 'Kabab Roll']
                    },

                    // DIP SAUCE
                    {
                        id: 'ff20',
                        name: 'Dip Sauce',
                        urduName: 'ڈپ ساس',
                        category: 'fastfood',
                        price: 50,
                        unit: 'Per Tub',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Add-On Sauce',
                        image: 'sauces.png',
                        description: 'Choose your favorite dip sauce: Thousand Sauce, Creamy Sauce, Bar B.Q Sauce, or Ranch Sauce.',
                        ingredients: 'Fresh House Recipe Sauces.',
                        tags: ['Thousand', 'Creamy', 'BBQ', 'Ranch']
                    },

                    // BURGERS
                    {
                        id: 'ff21',
                        name: 'Speacial Burgers',
                        urduName: 'اسپیشل برگرز',
                        category: 'fastfood',
                        price: 350,
                        unit: '3 Flavours',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: '3 FLAVOURS',
                        highlight: '3 FLAVOURS IN 1 • Zinger, Patty & Classic',
                        image: 'burger.webp',
                        description: 'Explore all 3 handcrafted burgers: Zinger Burger (Rs. 430), Crispy Patty Burger (Rs. 420), and Classic Chicken Burger (Rs. 350).',
                        ingredients: 'Freshly prepared with 100% chicken breast fillets and seasoned patties on toasted sesame buns with iceberg and mayo.',
                        tags: ['3 Flavours', 'Zinger Burger', 'Crispy Patty', 'Chicken Burger', 'Burgers']
                    },

                    // SHAWARMA
                    {
                        id: 'ff24',
                        name: 'Speacial Shawarma',
                        urduName: 'اسپیشل شوارما',
                        category: 'fastfood',
                        price: 320,
                        unit: '2 Flavours',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: '2 FLAVOURS',
                        highlight: '2 FLAVOURS IN 1 • Zinger & Traditional',
                        image: 'shawarma.webp',
                        description: 'Explore our 2 signature shawarmas: Zinger Shawarma (Rs. 400) and Traditional Chicken Shawarma (Rs. 320).',
                        ingredients: 'Warm fluffy pita bread wrapped around tender chicken, crunchy pickles, and rich garlic mayo sauce.',
                        tags: ['2 Flavours', 'Zinger Shawarma', 'Chicken Shawarma', 'Shawarma', 'Garlic Mayo']
                    },

                    // FRIES
                    {
                        id: 'ff26',
                        name: 'Fries',
                        urduName: 'فرائز',
                        category: 'fastfood',
                        price: 90,
                        unit: '3 Sizes',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: '3 SIZES',
                        highlight: '3 SIZES IN 1 • Small, Large & Family Pack',
                        image: 'fries.webp',
                        description: 'Hot & crispy golden potato fries in 3 sizes: Small (Rs. 90), Large (Rs. 180), and Family Pack (Rs. 300).',
                        ingredients: 'Freshly cut potatoes, light salt seasoning, served hot with tomato ketchup and dips.',
                        tags: ['3 Sizes', 'Small Fries', 'Large Fries', 'Family Pack', 'Crispy Fries']
                    },

                    // HOT SHOTS
                    {
                        id: 'ff29',
                        name: 'Chicken Hot Shots (10 Pcs)',
                        urduName: 'چکن ہاٹ شاٹس',
                        category: 'fastfood',
                        price: 550,
                        unit: '10 Pcs',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Poppable Bite',
                        image: 'Fried chicken.webp',
                        description: '10 pieces of bite-sized spicy fried chicken nuggets cooked to perfection with crispy batter.',
                        ingredients: 'Boneless Chicken Bites, Spicy Batter, Secret Herbs, Dip.',
                        tags: ['10 Pieces', 'Spicy Nuggets']
                    },

                    // PASTA & LOADED
                    {
                        id: 'ff30',
                        name: 'Chicken Cheese Pasta',
                        urduName: 'چکن چیز پاستا',
                        category: 'fastfood',
                        price: 600,
                        unit: 'Per Bowl',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Creamy Baked',
                        image: 'chicken pasta.png',
                        description: 'Macaroni pasta baked in white creamy garlic sauce with tender chicken and melted cheese.',
                        ingredients: 'Macaroni Pasta, White Cream Sauce, Mozzarella Cheese, Seasoned Chicken, Herbs.',
                        tags: ['White Sauce', 'Baked Cheese']
                    },
                    {
                        id: 'ff31',
                        name: 'Loaded Cheese Fries',
                        urduName: 'لوڈڈ چیز فرائز',
                        category: 'fastfood',
                        price: 600,
                        unit: 'Per Serving',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Ultimate Loaded',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOOARx3PS1JoKr_xwGjYXsFagGuFBYuh6_ftlsj0azwQ&s=10',
                        description: 'Golden fries layered with melted cheese sauce, chicken chunks, jalapeños & signature drip.',
                        ingredients: 'Crispy Fries, Melted Cheddar & Mozzarella, Chicken Chunks, Jalapeño Slices.',
                        tags: ['Melted Cheese', 'Jalapeño']
                    },

                    // WRAPS
                    {
                        id: 'ff32',
                        name: 'Speacial Wraps',
                        urduName: 'اسپیشل ریپس',
                        category: 'fastfood',
                        price: 650,
                        unit: '2 Flavours',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: '2 FLAVOURS',
                        highlight: '2 FLAVOURS IN 1 • Tortilla & Zinger Wrap',
                        image: 'Wraps.webp',
                        description: 'Explore our 2 signature wraps: Tortilla Wrap (Rs. 700) and Crispy Zinger Wrap (Rs. 650).',
                        ingredients: 'Large soft tortilla wrapped around succulent grilled chicken or crunchy zinger strips with melted cheese and rich sauces.',
                        tags: ['2 Flavours', 'Tortilla Wrap', 'Zinger Wrap', 'Wraps']
                    },

                    // TRADITIONAL SWEETS
                    {
                        id: 's1',
                        name: 'Gulab Jamun',
                        urduName: 'گلاب جامن',
                        category: 'sweets',
                        price: 1500,
                        unit: '1 Kg',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: '100% Desi Ghee',
                        image: 'gulab jamun.webp',
                        description: 'Warm, soft milk-solid dumplings fried in pure desi ghee, soaked in aromatic cardamom sugar syrup.',
                        ingredients: 'Fresh Khoya, Cottage Cheese, Pure Desi Ghee, Green Cardamom, Rose Water.',
                        tags: ['Warm & Soft', 'Pure Desi Ghee', 'Fresh Daily']
                    },
                    {
                        id: 's2',
                        name: 'Rasgulle',
                        urduName: 'رس گلے',
                        category: 'sweets',
                        price: 1500,
                        unit: '1 Kg',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Spongy Soft',
                        image: 'rasgulle.webp',
                        description: 'Soft and spongy fresh cottage cheese balls simmered in light cardamom sugar syrup.',
                        ingredients: 'Fresh Chenna (Cottage Cheese), Sugar, Kewra Essence, Cardamom.',
                        tags: ['Light & Juicy', 'Fresh Chenna', 'Traditional']
                    },
                    {
                        id: 's3',
                        name: 'Barfi',
                        urduName: 'برفی',
                        category: 'sweets',
                        price: 1500,
                        unit: '1 Kg',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Pure Khoya',
                        image: 'barfi.webp',
                        description: 'Classic rich milk fudge made from pure reduced buffalo milk khoya, silver leaf, and sliced pistachios.',
                        ingredients: 'Pure Milk Khoya, Sugar, Silver Edible Leaf, Pistachios.',
                        tags: ['Rich Milk', 'Classic Fudge', 'Silver Leaf']
                    },
                    {
                        id: 's4',
                        name: 'Motichoor Ladu Bareek Boondi',
                        urduName: 'موتی چور لڈو باریک بوندی',
                        category: 'sweets',
                        price: 1550,
                        unit: '1 Kg',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Event Special',
                        image: 'motichoor ladu barik.webp',
                        description: 'Tiny gram flour pearls fried in pure ghee, bound together with melon seeds and cardamom.',
                        ingredients: 'Besan Pearls, Pure Ghee, Melon Seeds, Cardamom.',
                        tags: ['Melt in Mouth', 'Pure Ghee', 'Fresh']
                    },
                    {
                        id: 's5',
                        name: 'Motichoor Ladu Moti Boondi',
                        urduName: 'موتی چور لڈو موٹی بوندی',
                        category: 'sweets',
                        price: 1700,
                        unit: '1 Kg',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Event Special',
                        image: 'motichoor ladu moti bundi.webp',
                        description: 'Tiny gram flour pearls fried in pure ghee, bound together with melon seeds and cardamom.',
                        ingredients: 'Besan Pearls, Pure Ghee, Melon Seeds, Cardamom.',
                        tags: ['Melt in Mouth', 'Pure Ghee', 'Fresh']
                    },
                    {
                        id: 's6',
                        name: 'Patisa',
                        urduName: 'پتیسہ',
                        category: 'sweets',
                        price: 1700,
                        unit: '1 Kg',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Flaky & Crisp',
                        image: 'patisa.webp',
                        description: 'Crispy, multi-layered flaky sweet made with roasted gram flour, pure ghee, and pistachios.',
                        ingredients: 'Gram Flour (Besan), Fine Flour, Pure Ghee, Sugar, Pistachios.',
                        tags: ['Multi Layered', 'Crispy', 'Desi Ghee']
                    },
                    {
                        id: 's7',
                        name: 'Kalakand',
                        urduName: 'کلاکنڈ',
                        category: 'sweets',
                        price: 1650,
                        unit: '1 Kg',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: false,
                        badge: 'Granular Milk',
                        image: 'kalakand.webp',
                        description: 'Rich, granular milk cake delicacy cooked slowly with fresh khoya, milk solids, and green cardamom.',
                        ingredients: 'Fresh Whole Milk, Paneer, Sugar, Cardamom, Almonds.',
                        tags: ['Soft Texture', 'Granular', 'Rich Cream']
                    },
                    {
                        id: 's8',
                        name: 'Amratti',
                        urduName: 'امرتی',
                        category: 'sweets',
                        price: 1550,
                        unit: '1 Kg',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Crispy Saffron',
                        image: 'amratti.webp',
                        description: 'Deep-fried white lentil flour flower spirals soaked in hot saffron cardamom sugar syrup.',
                        ingredients: 'Urad Dal Flour, Saffron, Sugar Syrup, Pure Ghee.',
                        tags: ['Saffron Syrup', 'Crispy Hot']
                    },
                    {
                        id: 's9',
                        name: 'Chum Chum',
                        urduName: 'چم چم',
                        category: 'sweets',
                        price: 1600,
                        unit: '1 Kg',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Bengali Special',
                        image: 'chum chum.webp',
                        description: 'Oval Bengali sweets coated with dry khoya shavings, coconut flakes, and rose essence.',
                        ingredients: 'Fresh Chenna, Khoya Shavings, Coconut Flakes, Rose Syrup.',
                        tags: ['Khoya Coated', 'Sweet Delight']
                    },
                    {
                        id: 's10',
                        name: 'Special Pista Roll Barfi',
                        urduName: 'پستہ رول برفی',
                        category: 'sweets',
                        price: 1800,
                        unit: '1 Kg',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'Pistachio Rich',
                        image: 'barfi pista roll.webp',
                        description: 'Handcrafted khoya roll filled generously with crushed green pistachios and silver vark.',
                        ingredients: 'Fresh Khoya, Crushed Pistachios, Sugar, Edible Silver Vark.',
                        tags: ['Pistachio Filled', 'Luxury Roll']
                    },
                    {
                        id: 's11',
                        name: 'Sialkoti Guldasta',
                        urduName: 'سیالکوٹی گلدستہ',
                        category: 'sweets',
                        price: 1650,
                        unit: '1 Kg Box',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'Iconic Gift',
                        image: 'guldasta.webp',
                        description: 'Gujranwala’s famed signature platter containing premium Desi Ghee Gulab Jamun, Barfi, Cham Cham & Ladoo.',
                        ingredients: 'Khoya, Pure Desi Ghee, Saffron, Pistachios, Almonds, Cardamom Syrup.',
                        tags: ['Pure Desi Ghee', 'Signature Box', 'Gift Pack']
                    },
                    {
                        id: 's12',
                        name: 'Pheonian',
                        urduName: 'پھینیاں',
                        category: 'sweets',
                        price: 1550,
                        unit: '1 Kg',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Crispy Strands',
                        image: 'pheonian.webp',
                        description: 'Ultra-thin, delicate vermicelli-style crispy sweet strands fried in pure ghee, perfect with hot milk.',
                        ingredients: 'Fine Flour, Pure Ghee, Sugar Syrup, Pistachios.',
                        tags: ['Fine Strands', 'Desi Ghee', 'Traditional']
                    },
                    {
                        id: 's13',
                        name: 'Rasmalai',
                        urduName: 'رس ملائی',
                        category: 'sweets',
                        price: 1650,
                        unit: '1 litre',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Crispy Strands',
                        image: 'ras malai.webp',
                        description: 'Rasmalai is a popular Siakoti dessert consisting of soft, spongy paneer (chhena) patties soaked in a rich, sweet, and cardamom-flavored thickened milk.',
                        ingredients: 'Fine Flour, Pure Ghee, Sugar Syrup, Pistachios.',
                        tags: ['Fine Strands', 'Desi Ghee', 'Traditional']
                    },
                    {
                        id: 's14',
                        name: 'Badana',
                        urduName: 'بدانہ',
                        category: 'sweets',
                        price: 1500,
                        unit: '1 Kg',
                        rating: 4.6,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Golden Pearls',
                        image: 'badana.webp',
                        description: 'Sweet, juicy golden gram flour pearls fried in ghee and soaked in warm cardamom syrup.',
                        ingredients: 'Gram Flour, Pure Ghee, Sugar Syrup, Cardamom.',
                        tags: ['Juicy Pearls', 'Sweet Delicacy']
                    },

                    // ARABIAN SWEETS
                    {
                        id: 'a1',
                        name: 'Baklava',
                        urduName: 'باقلوا',
                        category: 'arabian',
                        price: 2500,
                        unit: '1 Kg',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'Arabian Royal',
                        image: 'baklava.webp',
                        description: 'Layers of paper-thin crispy phyllo pastry filled with finely crushed nuts and sweetened with honey syrup.',
                        ingredients: 'Phyllo Dough, Pistachios, Walnuts, Butter, Honey Syrup.',
                        tags: ['Crispy Layers', 'Honey Syrup', 'Royal Nuts']
                    },
                    {
                        id: 'a2',
                        name: 'Mabroumeh',
                        urduName: 'مبرومہ',
                        category: 'arabian',
                        price: 2500,
                        unit: '1 Kg',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: false,
                        badge: 'Pistachio Roll',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKeqYZz17sDph9ON7XPURfcrfFFhG1ACrlnAILP4j1w&s=10',
                        description: 'Crispy shredded kunafa rolls packed tightly with whole roasted green pistachios and drizzled with sweet syrup.',
                        ingredients: 'Shredded Phyllo, Whole Pistachios, Clarified Butter, Sugar Syrup.',
                        tags: ['Whole Pistachios', 'Kunafa Roll', 'Crunchy']
                    },
                    {
                        id: 'a3',
                        name: 'Osh El Bulbul',
                        urduName: 'عش البلبل',
                        category: 'arabian',
                        price: 2500,
                        unit: '1 Kg',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: "Bird's Nest",
                        image: 'osh el bulbul.webp',
                        description: 'Miniature bird’s nest pastries made of spun kataifi dough filled with roasted pistachios and cashews.',
                        ingredients: 'Kataifi Dough, Pistachios, Cashews, Clarified Butter, Syrup.',
                        tags: ['Bird Nest', 'Bite Size', 'Nutty Delight']
                    },
                    {
                        id: 'a4',
                        name: 'Kunafa',
                        urduName: 'کنافہ',
                        category: 'arabian',
                        price: 2500,
                        unit: '1 Kg',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'Hot Arabian',
                        image: 'kunafa.webp',
                        description: 'Traditional Middle Eastern spun pastry layered with sweet cream and cheese, soaked in orange blossom syrup.',
                        ingredients: 'Spun Pastry (Kataifi), Nabulsi Cheese, Sweet Cream, Rose Water Syrup, Pistachios.',
                        tags: ['Warm & Cheesy', 'Rose Syrup', 'Arabian Classic']
                    },
                    {
                        id: 'a5',
                        name: 'Basbousa',
                        urduName: 'بسبوسہ',
                        category: 'arabian',
                        price: 2500,
                        unit: '1 Kg',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Semolina Cake',
                        image: 'basbousa.webp',
                        description: 'Traditional Arabian semolina cake baked with coconut, soaked in sweet syrup and topped with whole almonds.',
                        ingredients: 'Semolina, Coconut, Yogurt, Butter, Sugar Syrup, Blanched Almonds.',
                        tags: ['Moist Semolina', 'Coconut Flavor', 'Arabian Treat']
                    },

                    // HALWA JAAT
                    {
                        id: 'h1',
                        name: 'Akhrot Halwa',
                        urduName: 'اخروٹ حلوہ',
                        category: 'halwa',
                        price: 1900,
                        unit: '1 Kg',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'Nutty Special',
                        image: 'akhrot halwa.webp',
                        description: 'Slow-cooked sprouted wheat, whole milk khoya, and pure desi ghee generously loaded with roasted walnuts.',
                        ingredients: 'Sprouted Wheat, Pure Khoya, Crushed Walnuts, Desi Ghee, Sugar.',
                        tags: ['Walnut Loaded', 'Desi Ghee', 'Winter Warmth']
                    },
                    {
                        id: 'h2',
                        name: 'Sohan Halwa',
                        urduName: 'سوہن حلوہ',
                        category: 'halwa',
                        price: 1700,
                        unit: '1 Kg',
                        rating: 4.8,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'Multani Legacy',
                        image: 'sohan halwa.webp',
                        description: 'Traditional dense, sweet confection made of wheat germ, milk, sugar, saffron, pistachios, and almonds.',
                        ingredients: 'Wheat Germ (Samnak), Whole Milk, Pure Ghee, Almonds, Pistachios.',
                        tags: ['Rich & Dense', 'Traditional Recipe', 'Saffron Touch']
                    },

                    // BISCUITS
                    {
                        id: 'b1',
                        name: 'Jam Biscotti',
                        urduName: 'جام بسکٹ',
                        category: 'biscuits',
                        price: 2200,
                        unit: '1 Kg Box',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Fruity Delight',
                        image: 'jam biscotti.webp',
                        description: 'Crispy butter shortbread cookies topped with sweet fruit jam centers baked fresh daily.',
                        ingredients: 'Butter, Flour, Mixed Fruit Jam, Sugar, Vanilla.',
                        tags: ['Crispy Shortbread', 'Fruity Jam']
                    },
                    {
                        id: 'b2',
                        name: 'Zeera Biscotti',
                        urduName: 'زیرا بسکٹ',
                        category: 'biscuits',
                        price: 2200,
                        unit: '1 Kg Box',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Tea Favorite',
                        image: 'zeera biscotti.webp',
                        description: 'Slightly sweet and salty buttery cookies infused with aromatic roasted cumin seeds.',
                        ingredients: 'Pure Butter, Flour, Roasted Cumin Seeds (Zeera), Salt, Sugar.',
                        tags: ['Sweet & Salty', 'Roasted Cumin', 'Tea Snack']
                    },
                    {
                        id: 'b3',
                        name: 'Choco Chip Cookies',
                        urduName: 'چاکلیٹ چپ کوکیز',
                        category: 'biscuits',
                        price: 2200,
                        unit: '1 Kg Box',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Kids Favorite',
                        image: 'chocolate chip.webp',
                        description: 'Freshly baked crunchy cookies packed with rich dark chocolate chips in every single bite.',
                        ingredients: 'Butter, Flour, Dark Chocolate Chips, Brown Sugar, Vanilla.',
                        tags: ['Rich Chocolate', 'Fresh Baked']
                    },
                    {
                        id: 'b4',
                        name: 'Badam Khatai',
                        urduName: 'بادام خطائی',
                        category: 'biscuits',
                        price: 2400,
                        unit: '1 Kg Box',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'Bakery Special',
                        image: 'badam khatai.webp',
                        description: 'Traditional crumbly shortbread cookies infused with cardamom and topped with whole roasted almonds.',
                        ingredients: 'Desi Ghee, Flour, Semolina, Cardamom, Whole Almonds.',
                        tags: ['Crumbly & Rich', 'Desi Ghee', 'Almond Topped']
                    },
                    {
                        id: 'b5',
                        name: 'Chana Biscuit',
                        urduName: 'چنا بسکٹ',
                        category: 'biscuits',
                        price: 2200,
                        unit: '1 Kg Box',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Nutty Crunch',
                        image: 'chana biscotti.webp',
                        description: 'Nutritious roasted gram flour crunchy cookies with a rich roasted aroma and balanced sweetness.',
                        ingredients: 'Roasted Chana Flour, Butter, Sugar, Cardamom.',
                        tags: ['Nutritious', 'Roasted Aroma']
                    },
                    {
                        id: 'b6',
                        name: 'Shahi Khatai',
                        urduName: 'شاہی خطائی',
                        category: 'biscuits',
                        price: 2400,
                        unit: '1 Kg Box',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: false,
                        badge: 'Royal Recipe',
                        image: 'shahi khatai.webp',
                        description: 'Royal shortbread cookies prepared with pure desi ghee, crushed pistachios, almonds, and saffron hint.',
                        ingredients: 'Pure Desi Ghee, Wheat Flour, Pistachios, Almonds, Saffron.',
                        tags: ['Royal Desi Ghee', 'Nut Rich']
                    },
                    {
                        id: 'b7',
                        name: 'Badam Biscotti',
                        urduName: 'بادام بسکوٹی',
                        category: 'biscuits',
                        price: 2200,
                        unit: '1 Kg Box',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Double Baked',
                        image: 'almond biscotti.webp',
                        description: 'Double-baked crunchy almond biscotti slices crafted specifically for dipping in hot tea or coffee.',
                        ingredients: 'Whole Almonds, Flour, Eggs, Butter, Sugar, Vanilla.',
                        tags: ['Double Baked', 'Tea Dipping', 'Almond Crunch']
                    },

                    // CAKE RUSK
                    {
                        id: 'cr1',
                        name: 'Cake Rusk',
                        urduName: 'کیک رسک',
                        category: 'cakerusk',
                        price: 2200,
                        unit: '1 Kg Box',
                        rating: 4.9,
                        isHeritage: true,
                        isBestseller: true,
                        badge: 'Teatime Essential',
                        image: 'cake rusk.webp',
                        description: 'Twice-baked golden sponge cake slices, extra crispy and perfectly sweetened for morning & evening tea.',
                        ingredients: 'Fresh Eggs, Butter, Flour, Sugar, Vanilla Extract.',
                        tags: ['Twice Baked', 'Extra Crispy', 'Tea Favorite']
                    }
                    
                ],

                getItemById(id) {
                    return this.items.find(i => i.id === id) || this.items[0];
                },

                get filteredItems() {
                    let result = this.items;

                    // Exclude fast food from 'all' section to keep it strictly separated
                    if (this.selectedCategory === 'all') {
                        result = result.filter(item => item.category !== 'fastfood');
                    } else {
                        result = result.filter(item => item.category === this.selectedCategory);
                    }

                    if (this.searchQuery.trim() !== '') {
                        const q = this.searchQuery.toLowerCase();
                        result = result.filter(item => 
                            item.name.toLowerCase().includes(q) || 
                            (item.urduName && item.urduName.includes(q)) || 
                            item.description.toLowerCase().includes(q) ||
                            (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
                        );
                    }

                    if (this.sortBy === 'price-asc') {
                        result = [...result].sort((a, b) => a.price - b.price);
                    } else if (this.sortBy === 'price-desc') {
                        result = [...result].sort((a, b) => b.price - a.price);
                    } else if (this.sortBy === 'rating') {
                        result = [...result].sort((a, b) => b.rating - a.rating);
                    }

                    return result;
                },

                getCategoryCount(catId) {
                    if (catId === 'all') return this.items.filter(i => i.category !== 'fastfood').length;
                    return this.items.filter(i => i.category === catId).length;
                },

                resolveCategorySlug(slug) {
                    if (!slug) return null;
                    const s = String(slug).toLowerCase().trim().replace(/_/g, '-');
                    const mapping = {
                        'all': 'all',
                        'all-sweets': 'all',
                        'all-sweets-and-bakery': 'all',
                        'all-sweets-bakery': 'all',
                        'bakery': 'all',
                        'fastfood': 'fastfood',
                        'fast-food': 'fastfood',
                        'fast-food-and-pizzas': 'fastfood',
                        'fast-food-pizzas': 'fastfood',
                        'pizzas': 'fastfood',
                        'pizza': 'fastfood',
                        'sweets': 'sweets',
                        'traditional': 'sweets',
                        'traditional-sweets': 'sweets',
                        'mithai': 'sweets',
                        'arabian': 'arabian',
                        'arabian-sweets': 'arabian',
                        'arabian-sweets-and-baklava': 'arabian',
                        'baklava': 'arabian',
                        'halwa': 'halwa',
                        'halwa-jaat': 'halwa',
                        'halwas': 'halwa',
                        'sohan-halwa': 'halwa',
                        'biscuits': 'biscuits',
                        'biscuit': 'biscuits',
                        'fresh-biscuits': 'biscuits',
                        'khatai': 'biscuits',
                        'cakerusk': 'cakerusk',
                        'cake-rusk': 'cakerusk',
                        'rusk': 'cakerusk'
                    };
                    return mapping[s] || (this.categories.some(c => c.id === s) ? s : null);
                },

                getCategoryUrl(catId) {
                    const cat = this.categories.find(c => c.id === catId);
                    const slug = cat ? (cat.slug || cat.id) : catId;
                    return `?section=menu&category=${encodeURIComponent(slug)}`;
                },

                setCategory(catId, smoothScroll = true) {
                    const resolved = this.resolveCategorySlug(catId) || catId;
                    this.selectedCategory = resolved;
                    try {
                        const cat = this.categories.find(c => c.id === resolved);
                        const slug = cat ? (cat.slug || cat.id) : resolved;
                        const url = new URL(window.location.href);
                        url.searchParams.set('section', 'menu');
                        url.searchParams.set('category', slug);
                        window.history.pushState({ section: 'menu', category: slug }, '', url);
                    } catch (e) {}
                    const menuEl = document.getElementById('menu-section');
                    if (menuEl) {
                        menuEl.scrollIntoView({ behavior: smoothScroll ? 'smooth' : 'auto', block: 'start' });
                    }
                },

                setSearch(term) {
                    this.searchQuery = term;
                    const menuEl = document.getElementById('menu-section');
                    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                },

                getProductSlug(item) {
                    if (!item || !item.name) return '';
                    const slugify = (value) => value.toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/&/g, ' and ')
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '');
                    const baseSlug = slugify(item.name);
                    const duplicateCount = this.items.filter(other => slugify(other.name) === baseSlug).length;
                    return duplicateCount > 1 ? `${baseSlug}-${item.id}` : baseSlug;
                },

                getProductUrl(item) {
                    if (!item || !item.name) return '#';
                    // Relative paths keep the routes working on both custom domains and project-site subpaths.
                    return `./${this.getProductSlug(item)}/`;
                }
            }
        }

/* Reliable image-only hero slideshow.
   Five seconds per image: each image slowly zooms, then cross-fades to the next.
   No titles/captions/dots are rendered and hovering never pauses the loop. */
(function initSialkotHeroSlideshow() {
    function setup() {
        const carousel = document.querySelector('[data-hero-carousel]');
        if (!carousel || carousel.dataset.slideshowReady === 'true') return;
        const slides = Array.from(carousel.querySelectorAll('[data-hero-slide]'));
        if (slides.length < 2) return;

        carousel.dataset.slideshowReady = 'true';
        const interval = 5000;
        const fade = 900;
        let current = slides.findIndex(slide => slide.classList.contains('is-active'));
        if (current < 0) current = 0;
        let timer = null;
        let cleanupTimer = null;

        // Normalize initial classes and restart the first 5-second zoom only after setup.
        slides.forEach((slide, index) => {
            slide.classList.remove('is-active', 'is-leaving');
            slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
            slide.alt = slide.alt || 'Sialkot Sweets product photograph';
        });
        void slides[current].offsetWidth;
        slides[current].classList.add('is-active');

        function goToSlide(target) {
            if (target === current || target < 0 || target >= slides.length) return;
            stopTimer();
            const outgoing = slides[current];
            const incoming = slides[target];

            if (cleanupTimer !== null) window.clearTimeout(cleanupTimer);
            outgoing.classList.remove('is-active');
            outgoing.classList.add('is-leaving');
            incoming.classList.remove('is-leaving', 'is-active');
            void incoming.offsetWidth;
            incoming.classList.add('is-active');
            outgoing.setAttribute('aria-hidden', 'true');
            incoming.setAttribute('aria-hidden', 'false');
            current = target;

            cleanupTimer = window.setTimeout(() => {
                outgoing.classList.remove('is-leaving');
                cleanupTimer = null;
            }, fade + 80);

            scheduleNext();
        }

        function showNext() {
            const next = (current + 1) % slides.length;
            const outgoing = slides[current];
            const incoming = slides[next];

            if (cleanupTimer !== null) window.clearTimeout(cleanupTimer);
            outgoing.classList.remove('is-active');
            outgoing.classList.add('is-leaving');
            incoming.classList.remove('is-leaving', 'is-active');
            void incoming.offsetWidth;
            incoming.classList.add('is-active');
            outgoing.setAttribute('aria-hidden', 'true');
            incoming.setAttribute('aria-hidden', 'false');
            current = next;

            cleanupTimer = window.setTimeout(() => {
                outgoing.classList.remove('is-leaving');
                cleanupTimer = null;
            }, fade + 80);
        }

        function scheduleNext() {
            if (timer !== null || document.hidden) return;
            timer = window.setTimeout(() => {
                timer = null;
                showNext();
                scheduleNext();
            }, interval);
        }
        function stopTimer() {
            if (timer !== null) window.clearTimeout(timer);
            timer = null;
        }
        function restartCurrentZoom() {
            const active = slides[current];
            active.classList.remove('is-active');
            void active.offsetWidth;
            active.classList.add('is-active');
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopTimer();
            } else {
                restartCurrentZoom();
                scheduleNext();
            }
        });
        scheduleNext();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup, { once: true });
    } else {
        setup();
    }
})();

/* Subtle reveal of static content cards as they enter the viewport. */
(function initSialkotScrollReveal() {
    function setup() {
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const selector = '.premium-card, #reviews .grid > div, #branches .grid > div';
        const targets = Array.from(new Set(document.querySelectorAll(selector)));
        if (!targets.length) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
        targets.forEach(target => {
            target.classList.add('ss-reveal');
            observer.observe(target);
        });
        document.documentElement.classList.add('ss-motion-ready');
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup, { once: true });
    } else {
        setup();
    }
})();


/* Single Sialkot Special Pizza detail page: render the ten original flavour records. */
(function initSialkotPizzaFlavourPage() {
    function addTextElement(parent, tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        element.textContent = text == null ? '' : String(text);
        parent.appendChild(element);
        return element;
    }

    function render() {
        const container = document.querySelector('[data-pizza-flavours]');
        if (!container || container.dataset.pizzaRendered === 'true') return;
        const flavours = window.SIALKOT_PIZZA_FLAVOURS;
        if (!Array.isArray(flavours) || flavours.length !== 10) {
            container.textContent = 'Pizza flavour details could not be loaded. Please refresh the page or return to the menu.';
            return;
        }

        container.dataset.pizzaRendered = 'true';
        const fragment = document.createDocumentFragment();

        flavours.forEach((flavour, index) => {
            const article = document.createElement('article');
            article.className = 'pizza-flavour-card bg-white rounded-2xl overflow-hidden border border-stone-200 flex flex-col';

            const photoWrap = document.createElement('div');
            photoWrap.className = 'pizza-flavour-photo';
            const photo = document.createElement('img');
            photo.src = flavour.image || '';
            photo.alt = flavour.name || 'Pizza flavour';
            photo.loading = index === 0 ? 'eager' : 'lazy';
            photo.decoding = 'async';
            photo.referrerPolicy = 'no-referrer';
            photo.addEventListener('error', () => {
                photo.classList.add('is-broken');
                photo.alt = (flavour.name || 'Pizza flavour') + ' image unavailable';
            }, { once: true });
            photoWrap.appendChild(photo);
            article.appendChild(photoWrap);

            const content = document.createElement('div');
            content.className = 'pizza-flavour-content';
            const topLine = document.createElement('div');
            topLine.className = 'flex items-start justify-between gap-3';
            const titleWrap = document.createElement('div');
            titleWrap.className = 'min-w-0';
            addTextElement(titleWrap, 'p', 'pizza-flavour-number', 'FLAVOUR ' + String(index + 1).padStart(2, '0'));
            addTextElement(titleWrap, 'h2', 'font-playfair text-xl sm:text-2xl font-bold text-emerald-950 mt-1', flavour.name);
            if (flavour.urduName) {
                const urdu = addTextElement(titleWrap, 'p', 'font-urdu text-lg text-amber-700 mt-1', flavour.urduName);
                urdu.setAttribute('dir', 'rtl');
                urdu.setAttribute('lang', 'ur');
            }
            topLine.appendChild(titleWrap);
            const rating = document.createElement('span');
            rating.className = 'pizza-flavour-rating';
            rating.textContent = '★ ' + (flavour.rating == null ? '—' : flavour.rating);
            rating.setAttribute('aria-label', 'Rating ' + (flavour.rating == null ? 'not provided' : flavour.rating + ' out of 5'));
            topLine.appendChild(rating);
            content.appendChild(topLine);

            addTextElement(content, 'p', 'pizza-flavour-description', flavour.description || 'Details coming soon.');

            const ingredientsSection = document.createElement('section');
            ingredientsSection.className = 'pizza-flavour-ingredients';
            addTextElement(ingredientsSection, 'h3', 'pizza-flavour-section-title', 'Ingredients & notes');
            addTextElement(ingredientsSection, 'p', 'text-sm leading-relaxed text-stone-600', flavour.ingredients || 'Please contact the branch for ingredient details.');
            content.appendChild(ingredientsSection);

            if (Array.isArray(flavour.tags) && flavour.tags.length) {
                const tags = document.createElement('div');
                tags.className = 'flex flex-wrap gap-1.5 mt-4';
                flavour.tags.forEach(tag => addTextElement(tags, 'span', 'pizza-flavour-tag', tag));
                content.appendChild(tags);
            }

            const sizeSection = document.createElement('section');
            sizeSection.className = 'pizza-flavour-sizes';
            addTextElement(sizeSection, 'h3', 'pizza-flavour-section-title', 'Available sizes & prices');
            const sizeGrid = document.createElement('div');
            sizeGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2';
            if (Array.isArray(flavour.sizes) && flavour.sizes.length) {
                flavour.sizes.forEach(size => {
                    const sizeRow = document.createElement('div');
                    sizeRow.className = 'pizza-size-row';
                    addTextElement(sizeRow, 'span', 'text-sm text-stone-700', size.name);
                    addTextElement(sizeRow, 'strong', 'text-sm font-bold text-emerald-950', 'Rs. ' + Number(size.price).toLocaleString('en-PK'));
                    sizeGrid.appendChild(sizeRow);
                });
            } else {
                addTextElement(sizeGrid, 'p', 'text-sm text-stone-500', 'Please contact the branch for sizes and prices.');
            }
            sizeSection.appendChild(sizeGrid);
            content.appendChild(sizeSection);

            const callWrap = document.createElement('div');
            callWrap.className = 'mt-auto pt-5';
            const call = document.createElement('a');
            call.href = 'tel:03253922121';
            call.className = 'pizza-flavour-call';
            call.innerHTML = '<span>Call to confirm availability</span><span aria-hidden="true">↗</span>';
            callWrap.appendChild(call);
            content.appendChild(callWrap);

            article.appendChild(content);
            fragment.appendChild(article);
        });
        if (typeof container.replaceChildren === 'function') {
            container.replaceChildren(fragment);
        } else {
            container.innerHTML = '';
            container.appendChild(fragment);
        }
        const loading = document.querySelector('[data-pizza-loading]');
        if (loading) loading.remove();
        const count = document.querySelector('[data-pizza-flavour-count]');
        if (count) count.textContent = String(flavours.length);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render, { once: true });
    } else {
        render();
    }
})();



/* =========================================================
   CINEMATIC UPGRADE — World-Class JS Features
   Sialkot Sweets & Bakers — Ultra Professional System
   ========================================================= */

(function ssUpgrade() {
    'use strict';

    /* ---- 1. Scroll Progress Bar & Back-to-Top Button ---- */
    let progressBar = null;
    let fabTop = null;
    let ringCircle = null;
    let ringCircumference = 0;

    function initProgressBarAndFab() {
        if (!document.body || progressBar) return;

        progressBar = document.createElement('div');
        progressBar.className = 'ss-progress-bar';
        progressBar.setAttribute('aria-hidden', 'true');
        document.body.prepend(progressBar);

        fabTop = document.createElement('button');
        fabTop.className = 'ss-fab ss-fab-top';
        fabTop.setAttribute('aria-label', 'Scroll back to top');
        fabTop.innerHTML = `
            <svg class="ss-progress-ring" width="50" height="50" viewBox="0 0 50 50" aria-hidden="true">
                <circle class="ss-progress-ring-bg" stroke-width="3" fill="none" r="22" cx="25" cy="25"/>
                <circle class="ss-progress-ring-circle" stroke="url(#ss-fab-gold-grad)" stroke-width="3" stroke-linecap="round" fill="none" r="22" cx="25" cy="25"/>
                <defs>
                    <linearGradient id="ss-fab-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fde047"/>
                        <stop offset="50%" stop-color="#f59e0b"/>
                        <stop offset="100%" stop-color="#d97706"/>
                    </linearGradient>
                </defs>
            </svg>
            <span class="ss-fab-top-icon"><i class="fa-solid fa-arrow-up"></i></span>
        `;
        fabTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(fabTop);

        const ringRadius = 22;
        ringCircumference = 2 * Math.PI * ringRadius; // ~138.23
        ringCircle = fabTop.querySelector('.ss-progress-ring-circle');
        if (ringCircle) {
            ringCircle.style.strokeDasharray = `${ringCircumference} ${ringCircumference}`;
            ringCircle.style.strokeDashoffset = ringCircumference;
        }
    }

    function updateProgressBar() {
        if (!progressBar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';

        if (ringCircle) {
            const offset = ringCircumference - (Math.min(scrollPercent, 100) / 100) * ringCircumference;
            ringCircle.style.strokeDashoffset = offset;
        }
    }

    function updateFabTop() {
        if (!fabTop) return;
        if (window.scrollY > 400) {
            fabTop.classList.add('is-visible');
        } else {
            fabTop.classList.remove('is-visible');
        }
    }

    /* ---- 3. Optimized Scroll Handler ---- */
    let scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            requestAnimationFrame(function() {
                updateProgressBar();
                updateFabTop();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    /* ---- 4. Scroll-Triggered Reveal Animations (IntersectionObserver) ---- */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.ss-reveal, .ss-reveal-left, .ss-reveal-right, .ss-reveal-scale');
        if (!revealElements.length) return;

        function revealElement(el) {
            el.classList.add('is-revealed');
        }

        const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobileScreen = window.innerWidth < 768;

        if (!('IntersectionObserver' in window) || isReducedMotion || isMobileScreen) {
            revealElements.forEach(revealElement);
            document.documentElement.classList.add('ss-motion-ready');
            return;
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    revealElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.01,
            rootMargin: '0px 0px 80px 0px'
        });

        revealElements.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 80) {
                revealElement(el);
            } else {
                observer.observe(el);
            }
        });

        document.documentElement.classList.add('ss-motion-ready');
    }

    /* ---- 5. Animated Counter for Stats ---- */
    function animateCounter(el, target, suffix) {
        suffix = suffix || '';
        var duration = 2200;
        var startTime = null;
        var startVal = 0;

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easedProgress = easeOutExpo(progress);
            var current = Math.floor(startVal + (target - startVal) * easedProgress);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    function initCounters() {
        var counters = document.querySelectorAll('[data-ss-counter]');
        if (!counters.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var target = parseInt(entry.target.dataset.ssCounter, 10);
                    var suffix = entry.target.dataset.ssSuffix || '';
                    animateCounter(entry.target, target, suffix);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function(el) { observer.observe(el); });
    }

    /* ---- 6. Typed Placeholder Effect ---- */
    function initTypedPlaceholder() {
        var input = document.querySelector('#home-section input[type="text"]');
        if (!input) return;

        var phrases = [
            'Search Gulab Jamun, Baklava, Pizza...',
            'Try "Sialkoti Guldasta"...',
            'Craving Akhrot Halwa?...',
            'Looking for Zinger Burger?...',
            'Search Kunafa, Barfi, Fries...'
        ];
        var phraseIdx = 0;
        var charIdx = 0;
        var isDeleting = false;
        var typeSpeed = 65;
        var deleteSpeed = 35;
        var pauseDuration = 2500;

        // Only run typed effect when user hasn't typed anything
        function isUserTyping() {
            return Boolean(input && (document.activeElement === input || (input.value && input.value.length > 0)));
        }

        function typeStep() {
            if (isUserTyping()) {
                setTimeout(typeStep, 500);
                return;
            }

            var currentPhrase = phrases[phraseIdx];

            if (!isDeleting) {
                input.placeholder = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeStep, pauseDuration);
                    return;
                }
                setTimeout(typeStep, typeSpeed);
            } else {
                input.placeholder = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    isDeleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    setTimeout(typeStep, 400);
                    return;
                }
                setTimeout(typeStep, deleteSpeed);
            }
        }

        // Start after a delay
        setTimeout(typeStep, 3000);
    }

    /* ---- 7. Hero Parallax Effect on Orbs ---- */
    function initParallax() {
        var orbs = document.querySelectorAll('.hero-orb');
        if (!orbs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var heroSection = document.getElementById('home-section');
        if (!heroSection) return;

        window.addEventListener('scroll', function() {
            var rect = heroSection.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            var scrolled = window.scrollY * 0.15;
            orbs.forEach(function(orb, i) {
                var direction = i % 2 === 0 ? 1 : -1;
                orb.style.transform = 'translateY(' + (scrolled * direction) + 'px)';
            });
        }, { passive: true });
    }

    /* ---- 8. Welcome Toast (First Visit Only) ---- */
    function initWelcomeToast() {
        var storageKey = 'ss_welcomed';
        try {
            if (sessionStorage.getItem(storageKey)) return;
        } catch (e) { return; }

        var toast = document.createElement('div');
        toast.className = 'ss-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML =
            '<div class="ss-toast-icon">🍯</div>' +
            '<div style="flex:1;min-width:0">' +
                '<div style="font-weight:700;font-size:0.8rem;">Welcome to Sialkot Sweets!</div>' +
                '<div style="font-size:0.68rem;color:rgba(255,255,255,0.6);margin-top:3px;">Explore 75+ years of pure desi ghee mithai & bakery.</div>' +
            '</div>' +
            '<button class="ss-toast-close" aria-label="Dismiss notification"><i class="fa-solid fa-xmark"></i></button>';

        document.body.appendChild(toast);

        var closeBtn = toast.querySelector('.ss-toast-close');
        function dismissToast() {
            toast.classList.remove('is-visible');
            try { sessionStorage.setItem(storageKey, '1'); } catch (e) {}
            setTimeout(function() { toast.remove(); }, 600);
        }
        closeBtn.addEventListener('click', dismissToast);

        setTimeout(function() { toast.classList.add('is-visible'); }, 2800);
        setTimeout(dismissToast, 10000);
    }

    /* ---- 9. Active Nav Link Highlight on Scroll ---- */
    function initActiveNavHighlight() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-link');
        if (!sections.length || !navLinks.length) return;

        var sectionMap = {};
        navLinks.forEach(function(link) {
            var route = link.dataset.sectionRoute || link.getAttribute('href');
            if (route) sectionMap[route] = link;
        });

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var sectionId = entry.target.id;
                    // Resolve section ID to route name
                    var routeName = null;
                    for (var key in window.__sectionRoutes || {}) {
                        if (window.__sectionRoutes[key] === sectionId) { routeName = key; break; }
                    }
                    if (!routeName) return;
                    navLinks.forEach(function(l) { l.classList.remove('is-active'); });
                    var matchingLink = sectionMap[routeName];
                    if (matchingLink) matchingLink.classList.add('is-active');
                }
            });
        }, { threshold: 0.15, rootMargin: '-80px 0px -50% 0px' });

        sections.forEach(function(section) { observer.observe(section); });
    }

    // Expose sectionRoutes for the active nav highlight
    if (typeof sectionRoutes !== 'undefined') {
        window.__sectionRoutes = sectionRoutes;
    }

    /* ---- 10. Image Lazy Load Skeleton ---- */
    function initImageSkeletons() {
        var images = document.querySelectorAll('.menu-card img, .hero-slide');
        images.forEach(function(img) {
            if (img.complete) return;
            var parent = img.closest('.relative') || img.parentElement;
            if (parent && !parent.querySelector('.ss-skeleton-overlay')) {
                var skeleton = document.createElement('div');
                skeleton.className = 'ss-skeleton-overlay';
                skeleton.style.cssText = 'position:absolute;inset:0;background:linear-gradient(90deg,#f0ede8 25%,#e8e3db 50%,#f0ede8 75%);background-size:200% 100%;animation:ss-shimmer 1.5s ease-in-out infinite;z-index:1;pointer-events:none;';
                parent.style.position = 'relative';
                parent.appendChild(skeleton);
                img.addEventListener('load', function() {
                    skeleton.style.opacity = '0';
                    skeleton.style.transition = 'opacity 0.4s ease';
                    setTimeout(function() { skeleton.remove(); }, 500);
                }, { once: true });
            }
        });
    }

    /* ---- 11. Interactive Dynamic 3D Card Physics Tilt ---- */
    function initPhysicsTilt() {
        if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;

        function attachTilt(card) {
            if (!card || card.dataset.tiltActive === 'true') return;
            card.dataset.tiltActive = 'true';

            let rect = null;
            let centerX = 0, centerY = 0;
            let currentX = 0, currentY = 0;
            let targetX = 0, targetY = 0;
            let isHovered = false;
            let animId = null;

            function onMouseEnter() {
                rect = card.getBoundingClientRect();
                centerX = rect.width / 2;
                centerY = rect.height / 2;
                isHovered = true;
                loop();
            }

            function onMouseMove(e) {
                if (!rect) rect = card.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                targetX = ((mouseY - centerY) / centerY) * -5;
                targetY = ((mouseX - centerX) / centerX) * 5;
            }

            function onMouseLeave() {
                isHovered = false;
                targetX = 0;
                targetY = 0;
            }

            function loop() {
                currentX += (targetX - currentX) * 0.12;
                currentY += (targetY - currentY) * 0.12;

                card.style.transform = `perspective(850px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) translateY(${isHovered ? '-6px' : '0'})`;

                if (isHovered || Math.abs(targetX - currentX) > 0.04 || Math.abs(targetY - currentY) > 0.04) {
                    animId = requestAnimationFrame(loop);
                } else {
                    card.style.transform = '';
                    cancelAnimationFrame(animId);
                    animId = null;
                }
            }

            card.addEventListener('mouseenter', onMouseEnter, { passive: true });
            card.addEventListener('mousemove', onMouseMove, { passive: true });
            card.addEventListener('mouseleave', onMouseLeave, { passive: true });
        }

        // Attach to initial elements
        document.querySelectorAll('.ss-tilt, .menu-card, .branch-feature, .ss-purity-card, .premium-card').forEach(attachTilt);

        // Attach to dynamically rendered cards in menu
        const menuContainer = document.getElementById('menu-section');
        if (menuContainer) {
            const observer = new MutationObserver(() => {
                menuContainer.querySelectorAll('.menu-card').forEach(attachTilt);
            });
            observer.observe(menuContainer, { childList: true, subtree: true });
        }
    }

    /* ---- INIT ---- */
    function init() {
        initProgressBarAndFab();
        initScrollReveal();
        initCounters();
        initTypedPlaceholder();
        initParallax();
        initWelcomeToast();
        initActiveNavHighlight();
        initImageSkeletons();
        initPhysicsTilt();

        // Trigger initial scroll state
        updateProgressBar();
        updateFabTop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
