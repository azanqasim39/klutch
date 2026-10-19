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

            const initialSection = new URLSearchParams(window.location.search).get('section');
            if (initialSection && sectionRoutes[initialSection]) {
                requestAnimationFrame(() => requestAnimationFrame(() => scrollToSectionRoute(initialSection, false)));
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

                init() {
                    this.updateOpenStatus();
                    window.addEventListener('keydown', (event) => {
                        if (event.key === 'Escape') this.mobileMenuOpen = false;
                    });
                    // Re-check status every 60 seconds
                    setInterval(() => this.updateOpenStatus(), 60000);
                },

                updateOpenStatus() {
                    const now = new Date();
                    const hours = now.getHours(); // 0 to 23
                    // Open from 6:00 AM (06:00) to 1:00 AM (01:00 midnight/early morning)
                    this.isOpen = (hours >= 6 || hours < 1);
                },

                categories: [
                    { id: 'all', name: 'All Sweets & Bakery', icon: '🍽️' },
                    { id: 'fastfood', name: 'Fast Food', icon: '🍔' },
                    { id: 'sweets', name: 'Traditional Sweets', icon: '🍯' },
                    { id: 'arabian', name: 'Arabian Sweets', icon: '✨' },
                    { id: 'halwa', name: 'Halwa Jaat', icon: '🍲' },
                    { id: 'biscuits', name: 'Biscuits', icon: '🍪' },
                    { id: 'cakerusk', name: 'Cake Rusk', icon: '🥖' }
                ],

                items: [
                    // FAST FOOD SECTION ITEMS
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
                        image: 'https://lh3.googleusercontent.com/grass-cs/ACvplmOPe09IlGylcUcDY2Bu2JGJMjHmVAikkaOL9Z-ydbIZj4Kv5BKUAwk9YwDrIRpZ5jHJj5XssXx5TOL2YRcprRrZ8eBSlu4pUoCX__cbr292Ff85pAGbrKNS5xGpNlI8fMlEA7XrPlvYymXK=s680-w680-h510-rw',
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
                        name: 'Chicken Bar B.Q Sandwich / Panini',
                        urduName: 'چکن بار بی کیو سیندوج',
                        category: 'fastfood',
                        price: 550,
                        unit: 'Per Serving',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Toasted Panini',
                        image: 'sandwhich bbq.webp',
                        description: 'BBQ Chicken, BBQ Sauce, Mayo & Cucumber toasted inside freshly baked bread.',
                        ingredients: 'BBQ Chicken, BBQ Sauce, Creamy Mayo, Fresh Cucumber, Panini Bread.',
                        tags: ['BBQ Sauce', 'Crispy Toasted']
                    },
                    {
                        id: 'ff13',
                        name: 'Chicken Malai Boti Sandwich / Panini',
                        urduName: 'چکن ملائی بوٹی سیندوج',
                        category: 'fastfood',
                        price: 550,
                        unit: 'Per Serving',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Creamy Panini',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPEBAmwapsKk3lPiyVo3j9alBTM2j--bIrh5S9_2nVrw&s=10',
                        description: 'Tikka Chicken, Thousand Sauce, Mayo & Cucumber.',
                        ingredients: 'Tikka Chicken, Thousand Island Sauce, Mayo, Fresh Cucumber.',
                        tags: ['Thousand Sauce', 'Soft Tikka']
                    },
                    {
                        id: 'ff14',
                        name: 'Grilled Chicken Sandwich / Panini',
                        urduName: 'گرلڈ چکن سیندوج',
                        category: 'fastfood',
                        price: 550,
                        unit: 'Per Serving',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Healthy Grilled',
                        image: 'grilled chicken sandwhich.webp',
                        description: 'Grilled Chicken, Thousand Sauce, Mayo & Cucumber.',
                        ingredients: 'Juicy Grilled Chicken, Thousand Sauce, Creamy Mayo, Sliced Cucumber.',
                        tags: ['Grilled Fillet', 'Fresh Veggies']
                    },
                    {
                        id: 'ff15',
                        name: 'Chicken Tikka Sandwich / Panini',
                        urduName: 'چکن تکہ سیندوج',
                        category: 'fastfood',
                        price: 550,
                        unit: 'Per Serving',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Spicy Kick',
                        image: 'chicken tikka sandwhich.webp',
                        description: 'Tikka Chicken, Chilli Sauce, Mayo & Cucumber.',
                        ingredients: 'Spicy Tikka Chicken, Tangy Chilli Sauce, Mayo, Crisp Cucumber.',
                        tags: ['Chilli Sauce', 'Spicy']
                    },
                    {
                        id: 'ff16',
                        name: 'Chicken Black Olive Sandwich / Panini',
                        urduName: 'چکن بلیک اولیو سیندوج',
                        category: 'fastfood',
                        price: 550,
                        unit: 'Per Serving',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Peri Olive',
                        image: 'chicken black olive.webp',
                        description: 'Peri Peri Chicken, Peri Peri Sauce, Mayo & Cucumber.',
                        ingredients: 'Peri Peri Chicken, Sliced Black Olives, Peri Peri Sauce, Mayo, Cucumber.',
                        tags: ['Black Olives', 'Peri Peri']
                    },

                    // ROLLS
                    {
                        id: 'ff17',
                        name: 'Paratha Roll',
                        urduName: 'پراٹھا رول',
                        category: 'fastfood',
                        price: 350,
                        unit: 'Per Roll',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Crispy Roll',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvU2Dq-0TOpBnL-2kKmnIqpm6BUSzzOiWayQXdtSBGA&s=10',
                        description: 'Crispy fried flaky paratha wrapped with seasoned chicken, onion rings & garlic sauce.',
                        ingredients: 'Crispy Paratha, BBQ Chicken, Sliced Onion, Garlic Mayo.',
                        tags: ['Golden Paratha', 'Street Food']
                    },
                    {
                        id: 'ff18',
                        name: 'Twister Roll',
                        urduName: 'ٹوئسٹر رول',
                        category: 'fastfood',
                        price: 400,
                        unit: 'Per Roll',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Crispy Zinger',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMF_8e8yMJFdH1pscRUmrExf7WhaRZSdegPdG_vOPIQ&s=10',
                        description: 'Crunchy zinger chicken strip wrapped in a warm tortilla with iceberg lettuce and secret sauce.',
                        ingredients: 'Crispy Zinger Strip, Tortilla, Iceberg Lettuce, Mayo.',
                        tags: ['Zinger Strip', 'Tortilla Wrap']
                    },
                    {
                        id: 'ff19',
                        name: 'Kabab Paratha Roll',
                        urduName: 'کباب پراٹھا رول',
                        category: 'fastfood',
                        price: 400,
                        unit: 'Per Roll',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Juicy Kabab',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tECLV5FgxZyr5C-Mrm6CyCHOae1yvN9a0g7gEpZHeg&s=10',
                        description: 'Juicy seekh kabab rolled inside hot flaky paratha with mint yogurt sauce and onions.',
                        ingredients: 'Juicy Seekh Kabab, Paratha, Mint Chutney, Onions.',
                        tags: ['Seekh Kabab', 'Mint Chutney']
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
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI-gH0tASGgBbtTh51ZZgSWTUkT0dU4mxQ3rh0s2L6FA&s=10',
                        description: 'Choose your favorite dip sauce: Thousand Sauce, Creamy Sauce, Bar B.Q Sauce, or Ranch Sauce.',
                        ingredients: 'Fresh House Recipe Sauces.',
                        tags: ['Thousand', 'Creamy', 'BBQ', 'Ranch']
                    },

                    // BURGERS
                    {
                        id: 'ff21',
                        name: 'Zinger Burger',
                        urduName: 'زنگر برگر',
                        category: 'fastfood',
                        price: 430,
                        unit: 'Per Burger',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Crispy Hero',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ZdyPk5_4tcmeojm5MiEMdO9ulUyMkw9JGZuW9oqcUA&s=10',
                        description: 'Extra crispy whole fried zinger chicken fillet layered with mayo and fresh iceberg in a sesame bun.',
                        ingredients: 'Crispy Zinger Fillet, Sesame Bun, Iceberg Lettuce, Signature Garlic Mayo.',
                        tags: ['Extra Crispy', 'Sesame Bun']
                    },
                    {
                        id: 'ff22',
                        name: 'Chicken Burger',
                        urduName: 'چکن برگر',
                        category: 'fastfood',
                        price: 350,
                        unit: 'Per Burger',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Classic Favorite',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRooQjwfCM3cB0-wg3GTgtsKtnch7Xo6Kb83u_iQtFpJA&s=10',
                        description: 'Classic spiced chicken patty topped with creamy sauce, tomatoes, and crisp lettuce.',
                        ingredients: 'Spiced Chicken Patty, Bun, Mayo, Cucumber, Tomatoes.',
                        tags: ['Classic Patty', 'Creamy Sauce']
                    },
                    {
                        id: 'ff23',
                        name: 'Crispy Patty Burger',
                        urduName: 'کرسپی پیٹی برگر',
                        category: 'fastfood',
                        price: 420,
                        unit: 'Per Burger',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Crunchy Patty',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRyRC5i54vPhKUme3HapMlPf_RXWH92is430bbP0TVig&s=10',
                        description: 'Golden fried crispy chicken patty with tangy thousand island sauce and lettuce.',
                        ingredients: 'Crispy Breaded Chicken Patty, Soft Bun, Lettuce, Mayo Sauce.',
                        tags: ['Breaded Crunch', 'Tangy Sauce']
                    },

                    // SHAWARMA
                    {
                        id: 'ff24',
                        name: 'Zinger Shawarma',
                        urduName: 'زنگر شوارما',
                        category: 'fastfood',
                        price: 400,
                        unit: 'Per Serving',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Crispy Bite',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSqKkF8KQcFMqrDIBebXbM68YBwXP17rl-Gb40H15Zw&s=10',
                        description: 'Crispy zinger chicken strips wrapped in soft pita bread with garlic mayo and pickled cucumber.',
                        ingredients: 'Zinger Chicken Strips, Pita Bread, Garlic Mayo Sauce, Pickled Cucumber.',
                        tags: ['Crispy Zinger', 'Pita Bread']
                    },
                    {
                        id: 'ff25',
                        name: 'Chicken Shawarma',
                        urduName: 'چکن شوارما',
                        category: 'fastfood',
                        price: 320,
                        unit: 'Per Serving',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Traditional Wrap',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEVbIdrQEw4HdWk0iTyXpdcK1gxDLr6B-ZO3zmbZLRWg&s=10',
                        description: 'Shredded roasted chicken wrap with garlic sauce, salad & pickles inside soft pita.',
                        ingredients: 'Shredded Roasted Chicken, Soft Bread, Garlic Sauce, Salad.',
                        tags: ['Traditional Shawarma', 'Garlic Mayo']
                    },

                    // FRIES
                    {
                        id: 'ff26',
                        name: 'Fries Small',
                        urduName: 'فرائز سمال',
                        category: 'fastfood',
                        price: 90,
                        unit: 'Small Box',
                        rating: 4.6,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Snack Size',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK1VYJ1lKZtb-wfpLu5fomomrP0Olc0lKS3Ty3uiD7Rg&s=10',
                        description: 'Hot and crispy golden salted potato fries.',
                        ingredients: 'Fresh Potatoes, Vegetable Oil, Salt.',
                        tags: ['Crispy Fries', 'Salted']
                    },
                    {
                        id: 'ff27',
                        name: 'Fries Large',
                        urduName: 'فرائز لارج',
                        category: 'fastfood',
                        price: 180,
                        unit: 'Large Box',
                        rating: 4.7,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Golden Crisp',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUp13AUTXwpA_s-X25jVq9LbmEh5qfdq3E5llxZqZQmg&s=10',
                        description: 'Generous serving of hot & crispy golden potato fries.',
                        ingredients: 'Fresh Potatoes, Seasoning, Salt.',
                        tags: ['Golden Crisp', 'Hot']
                    },
                    {
                        id: 'ff28',
                        name: 'Family Pack Fries',
                        urduName: 'فیملی پیک فرائز',
                        category: 'fastfood',
                        price: 300,
                        unit: 'Family Pack',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Family Size',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMCK8UqgdZzoeqFAMGHEStXyGTrnG9ehfzPdCWIoRnlQ&s=10',
                        description: 'Extra large family sharing portion of hot crispy potato fries served with ketchup.',
                        ingredients: 'Fresh Potatoes, Seasoning, Ketchup.',
                        tags: ['Sharing Pack', 'Crispy Potato']
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
                        image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600&q=78',
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
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4PLwNdlDkmNYwh6WRBVi2Rg2msjuvg_VmfYK5dT4jyQ&s=10',
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
                        name: 'Tortilla Wrap',
                        urduName: 'ٹورٹیلا ریپ',
                        category: 'fastfood',
                        price: 700,
                        unit: 'Per Wrap',
                        rating: 4.8,
                        isHeritage: false,
                        isBestseller: false,
                        badge: 'Grilled Wrap',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJRy1bq5cDlRYWPGkBPqUFZ2D6fCbPka5NaWJ67f-LA&s=10',
                        description: 'Soft large tortilla wrapped around grilled chicken, melted cheese, mayo & fresh vegetables.',
                        ingredients: 'Tortilla Flatbread, Grilled Chicken, Melted Cheese, Mayo, Iceberg Lettuce.',
                        tags: ['Large Tortilla', 'Fresh Grilled']
                    },
                    {
                        id: 'ff33',
                        name: 'Zinger Wrap',
                        urduName: 'زنگر ریپ',
                        category: 'fastfood',
                        price: 650,
                        unit: 'Per Wrap',
                        rating: 4.9,
                        isHeritage: false,
                        isBestseller: true,
                        badge: 'Crispy Zinger',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPmJF8Mg5DHSeh7rbXun631AJRyHPSRxEsKpFh9oCx-Q&s=10',
                        description: 'Crispy zinger chicken fillet wrapped with tangy chili mayo and fresh crunchy salad.',
                        ingredients: 'Crispy Zinger Strips, Tortilla, Spicy Mayo, Fresh Salad.',
                        tags: ['Spicy Mayo', 'Crispy Fillet']
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

                setCategory(catId) {
                    this.selectedCategory = catId;
                    const menuEl = document.getElementById('menu-section');
                    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                },

                setSearch(term) {
                    this.searchQuery = term;
                    const menuEl = document.getElementById('menu-section');
                    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                },

                getProductSlug(item) {
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
