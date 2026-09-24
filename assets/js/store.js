(function (global) {
    'use strict';

    var STORES = {
        'mama-t-amala': { logo: '../assets/img/logos/mama-t-amala.svg', name: 'Mama T Amala Joint', category: 'restaurants', emoji: '\uD83C\uDF72', rating: '100%', reviews: 14, time: '10-25 min', fee: 'Free', desc: 'Home-style Nigerian amala, soups and grilled delicacies.' },
        'parfait-parlor': { logo: '../assets/img/logos/parfait-parlor.svg', name: 'Parfait Parlor Limited', category: 'restaurants', emoji: '\uD83C\uDF68', rating: '100%', reviews: 54, time: '15-30 min', fee: 'Free', desc: 'Creamy parfaits, sundaes and frozen treats.' },
        'ebony-express': { logo: '../assets/img/logos/ebony-express.svg', name: 'Ebony Express Food & More', category: 'restaurants', emoji: '\uD83C\uDF54', rating: '', reviews: '', time: '20-35 min', fee: 'Free', desc: 'Quick bites, burgers and fast-food classics.' },
        't-best-joint': { logo: '../assets/img/logos/t-best-joint.svg', name: 'T-Best Joint', category: 'restaurants', emoji: '\uD83C\uDF5B', rating: '', reviews: '', time: '', fee: '', desc: 'Local rice, stews and everyday favourites.', closed: true },
        't5-poolbar': { logo: '../assets/img/logos/t5-poolbar.svg', name: 'T5 Poolbar and Lounge', category: 'smoking', emoji: '\uD83C\uDF79', rating: '', reviews: '', time: '', fee: '', desc: 'Chilled cocktails, drinks and lounge snacks.', closed: true },
        'nedu-shawarma': { logo: '../assets/img/logos/nedu-shawarma.svg', name: 'Nedu Shawarma and Grill', category: 'restaurants', emoji: '\uD83C\uDF2F', rating: '', reviews: '', time: '', fee: '', desc: 'Shawarma, grilled skewers and wraps.', closed: true },
        'tea-and-more': { logo: '../assets/img/logos/tea-and-more.svg', name: 'Tea & More', category: 'restaurants', emoji: '\uD83C\uDF75', rating: '86%', reviews: 41, time: '25-40 min', fee: 'Free', desc: 'Teas, coffees and light bites.' },
        'bubble-tea': { logo: '../assets/img/logos/bubble-tea.svg', name: 'The Bubble Tea Shop', category: 'restaurants', emoji: '\uD83E\uDDCB', rating: '98%', reviews: 31, time: '10-25 min', fee: 'Free', desc: 'Fruity and milky bubble teas with popping pearls.' },
        'spar-market': { logo: '../assets/img/logos/spar-market.svg', name: 'SPAR Market', category: 'groceries', emoji: '\uD83D\uDED2', rating: '93%', reviews: '500+', time: '15-30 min', fee: 'Free', desc: 'Daily groceries, fresh produce and household essentials.' },
        'tonis-tea': { logo: '../assets/img/logos/tonis-tea.svg', name: "Toni's Tea", category: 'restaurants', emoji: '\uD83E\uDDC3', rating: '94%', reviews: 27, time: '15-30 min', fee: 'Free', desc: 'Fresh juices, teas and refreshing drinks.' },
        'h-medix': { logo: '../assets/img/logos/h-medix.svg', name: 'H-Medix Supermarket', category: 'health', emoji: '\uD83D\uDC8A', rating: '83%', reviews: '1k+', time: '15-30 min', fee: 'Free', desc: 'Medicines, personal care and everyday wellness.' },
        '4u-supermarket': { logo: '../assets/img/logos/4u-supermarket.svg', name: '4U Supermarket', category: 'groceries', emoji: '\uD83E\uDDFA', rating: '95%', reviews: 249, time: '10-25 min', fee: 'Free', desc: 'Groceries, beverages and home essentials at your door.' },
        'todays-bukka': { logo: '../assets/img/logos/todays-bukka.svg', name: "Today's Bukka Express", category: 'restaurants', emoji: '\uD83C\uDF58', rating: '86%', reviews: 80, time: '15-30 min', fee: 'Free', desc: 'Home-style bukka meals fast.' },
        'medplus': { logo: '../assets/img/logos/medplus.svg', name: 'Medplus Pharmacy', category: 'health', emoji: '\uD83C\uDFE5', rating: '96%', reviews: 171, time: '10-25 min', fee: 'Free', desc: 'Trusted pharmacy for medicines and wellness.' },
        'thyme-by-flour': { logo: '../assets/img/logos/thyme-by-flour.svg', name: 'THYME BY FLOUR', category: 'shops', emoji: '\uD83E\uDD50', rating: 'New', reviews: '', time: '20-35 min', fee: 'Free', desc: 'Artisan bakery, pastries and specialty coffee.' }
    };

    function item(name, desc, price, emoji) {
        return { name: name, desc: desc, price: price, emoji: emoji };
    }

    var TEMPLATES = {
        restaurants: [
            { title: 'Starters', items: [
                item('Plantain Chips', 'Crispy with pepper dip', 800, '\uD83C\uDF5F'),
                item('Spring Rolls', '4 pieces, veg filling', 1200, '\uD83C\uDF72'),
                item('Chicken Suya Skewers', 'Spicy peanut marinade', 1500, '\uD83C\uDF57'),
                item('Puff Puff', '5 golden dough balls', 600, '\uD83C\uDF5C')
            ] },
            { title: 'Mains', items: [
                item('Jollof Rice & Chicken', 'Smoky party jollof, grilled chicken', 2800, '\uD83C\uDF5A'),
                item('Fried Rice & Beef', 'Loaded with veg and fried beef', 2600, '\uD83C\uDF5B'),
                item('White Rice & Stew', 'Beef stew with plantain', 2200, '\uD83C\uDF35'),
                item('Ofada Rice', 'With ayamase and boiled egg', 2400, '\uD83C\uDF3E'),
                item('Spaghetti Bolognese', 'Classic beef bolognese', 2500, '\uD83C\uDF5D')
            ] },
            { title: 'Drinks', items: [
                item('Coca-Cola', '500ml can', 500, '\uD83E\uDD64'),
                item('Zobo Drink', 'Hibiscus with ginger', 700, '\uD83E\uDDC3'),
                item('Chapman', 'Nigerian classic', 1000, '\uD83E\uDDC7'),
                item('Bottled Water', '50cl', 300, '\uD83D\uDCA7'),
                item('Mango Smoothie', 'Fresh blended mango', 1500, '\uD83E\uDD67')
            ] },
            { title: 'Desserts', items: [
                item('Chocolate Cake', 'Slice of moist cake', 1800, '\uD83C\uDF82'),
                item('Vanilla Ice Cream', 'Single scoop', 1200, '\uD83C\uDF68'),
                item('Fruit Salad', 'Seasonal fresh fruit', 900, '\uD83C\uDF52'),
                item('Puff Puff with Sauce', 'With chocolate dip', 700, '\uD83C\uDF6B')
            ] }
        ],
        groceries: [
            { title: 'Fruits & Veg', items: [
                item('Bananas', '1 bunch (6 pcs)', 1500, '\uD83C\uDF4C'),
                item('Tomatoes', '1kg fresh', 1800, '\uD83C\uDF45'),
                item('Onions', '1kg', 1200, '\uD83E\uDDC5'),
                item('Cucumber', 'Fresh, 2 pcs', 800, '\uD83E\uDD52'),
                item('Carrots', '500g', 1000, '\uD83E\uDD55')
            ] },
            { title: 'Staples', items: [
                item('Rice', '5kg bag', 9500, '\uD83C\uDF5A'),
                item('Beans', '1kg', 1600, '\uD83E\uDED8'),
                item('Yam Tuber', 'Medium size', 2500, '\uD83E\uDD55'),
                item('Garri', '1kg', 1400, '\uD83C\uDF3E'),
                item('Semolina', '1kg', 1800, '🌾')
            ] },
            { title: 'Beverages', items: [
                item('Milo', '250g tin', 3200, '\uD83C\uDF6B'),
                item('Peak Milk', 'Powder, 400g', 3000, '\uD83E\uDD5B'),
                item('Lipton Tea', '25 envelopes', 1800, '\uD83C\uDF75'),
                item('Minute Maid', '1L juice', 1500, '\uD83E\uDDC3')
            ] },
            { title: 'Household', items: [
                item('Dishwashing Liquid', '500ml', 1900, '\uD83E\uDDFB'),
                item('Toilet Paper', 'Pack of 4', 1600, '\uD83E\uDEA5'),
                item('Laundry Detergent', '1kg', 3500, '\uD83E\uDDFC'),
                item('Kitchen Foil', '1 roll', 2300, '\uD83E\uDD38')
            ] }
        ],
        health: [
            { title: 'Medicine', items: [
                item('Paracetamol', 'Pain & fever relief', 800, '\uD83D\uDC8A'),
                item('Panadol Extra', '12 tablets', 1000, '\uD83D\uDC8A'),
                item('Cough Syrup', '100ml bottle', 2200, '\uD83E\uDDE9'),
                item('Vitamin C Tablets', '30 tablets', 2500, '\uD83C\uDF44')
            ] },
            { title: 'First Aid', items: [
                item('Plasters', 'Box of 50', 900, '\uD83C\uDFBD'),
                item('Bandage', 'Sterile roll', 1300, '\uD83C\uDFBD'),
                item('Antiseptic', '120ml', 1800, '\uD83E\uDEE7'),
                item('Digital Thermometer', 'Fast reading', 3000, '🌡')
            ] },
            { title: 'Personal Care', items: [
                item('Toothpaste', '150g tube', 1400, '\uD83E\uDEB7'),
                item('Body Wash', '500ml', 2800, '\uD83E\uDDFC'),
                item('Hand Sanitizer', '100ml', 1500, '\uD83E\uDEA2'),
                item('Tissues', 'Pack of 3', 1300, '\uD83E\uDEA6')
            ] },
            { title: 'Baby', items: [
                item('Baby Wipes', '80 wipes', 2200, '\uD83E\uDEB3'),
                item('Diapers', 'Pack of 30', 6500, '\uD83E\uDEB4'),
                item('Baby Oil', '200ml', 1900, '\uD83C\uDF9F'),
                item('Baby Lotion', '200ml', 2100, '\uD83C\uDFF5')
            ] }
        ],
        shops: [
            { title: 'Fashion', items: [
                item('Classic T-Shirt', 'Cotton, all sizes', 5500, '\uD83D\uDC55'),
                item('Baseball Cap', 'Adjustable', 2500, '\uD83E\uDDE2'),
                item('Sneakers', 'Unisex, comfy', 15000, '\uD83D\uDC5F'),
                item('Sunglasses', 'UV protection', 3000, '\uD83D\uDD76')
            ] },
            { title: 'Electronics', items: [
                item('Power Bank', '10000mAh', 12000, '\uD83D\uDD0B'),
                item('Earphones', 'Wired, bass boost', 6500, '\uD83C\uDFA7'),
                item('USB Cable', 'Fast charge', 2000, '\uD83D\uDD0C'),
                item('Smart Watch', 'Fitness tracker', 25000, '\u231A')
            ] },
            { title: 'Home', items: [
                item('Scented Candle', 'Vanilla aroma', 3500, '\uD83D\uDEEF'),
                item('Photo Frame', 'A4 size', 2800, '\uD83D\uDDBC'),
                item('Water Bottle', 'Insulated 750ml', 4000, '\uD83E\uDDF5'),
                item('Throw Blanket', 'Soft knit', 9000, '\uD83E\uDDE5')
            ] },
            { title: 'Gifts', items: [
                item('Gift Card', 'Variable amount', 5000, '\uD83C\uDF81'),
                item('Notebook Set', '3 A5 journals', 2200, '\uD83D\uDCD3'),
                item('Perfume', '50ml eau de parfum', 18000, '\uD83D\uDC68'),
                item('Chocolate Box', '12 assorted', 4500, '\uD83C\uDF6B')
            ] }
        ],
        smoking: [
            { title: 'Cocktails', items: [
                item('Mojito', 'Fresh mint & lime', 3000, '\uD83C\uDF79'),
                item('Margarita', 'Classic on the rocks', 3500, '\uD83C\uDF79'),
                item('Gin & Tonic', 'With lime', 2800, '\uD83C\uDF79'),
                item('Long Island', 'Strong blend', 4500, '\uD83C\uDF78')
            ] },
            { title: 'Beer', items: [
                item('Heineken', '330ml bottle', 1800, '\uD83C\uDF7B'),
                item('Guinness', '330ml can', 2000, '\uD83C\uDF7B'),
                item('Star Lager', '600ml', 1200, '\uD83C\uDF7B'),
                item('Desperados', '330ml', 2200, '\uD83C\uDF7B')
            ] },
            { title: 'Snacks', items: [
                item('Chicken Wings', '6 pieces', 2500, '\uD83C\uDF57'),
                item('Chips & Dip', 'Large bowl', 1300, '\uD83C\uDF5F'),
                item('Roasted Groundnuts', '100g', 700, '\uD83E\uDD5C'),
                item('Suya Platter', 'Spiced beef skewers', 2000, '\uD83C\uDF57')
            ] },
            { title: 'Soft Drinks', items: [
                item('Chapman', 'House special', 1200, '\uD83E\uDDC7'),
                item('Coca-Cola', 'Can', 700, '\uD83E\uDD64'),
                item('Bottled Water', '50cl', 500, '\uD83D\uDCA7'),
                item('Zobo', 'Chilled', 800, '\uD83E\uDDC3')
            ] }
        ]
    };

    var CUSTOM = {
        'mama-t-amala': [
            { title: 'Amala & Delicacies', items: [
                item('Amala & Ewedu', 'With chicken', 2500, '\uD83C\uDF72'),
                item('Amala & Abula', 'Mixed soup special', 3000, '\uD83C\uDF72'),
                item('Amala & Egusi', 'Rich melon soup', 3200, '\uD83C\uDF72'),
                item('Semo & Efo Riro', 'Spinach stew', 2800, '\uD83C\uDF5B'),
                item('Pounded Yam & Egusi', 'Classic combination', 3500, '\uD83C\uDF5B')
            ] },
            { title: 'Soups & Stews', items: [
                item('Ogbono Soup', 'Draw soup with assorted', 1800, '\uD83C\uDF72'),
                item('Seafood Okro', 'Prawns & stockfish', 2200, '\uD83C\uDF5B'),
                item('Bitterleaf Soup', 'With cow skin', 1900, '\uD83E\uDD57'),
                item('Banga Soup', 'Palm nut special', 2000, '\uD83C\uDF72')
            ] },
            { title: 'Grill & Sides', items: [
                item('Grilled Croaker', 'Whole fish, pepper sauce', 4500, '\uD83D\uDC1F'),
                item('Assorted Meat', 'Mixed offal platter', 2200, '\uD83C\uDF56'),
                item('Fried Plantain', 'Golden dood', 1200, '\uD83C\uDF5F'),
                item('Dodo & Egg', 'Plantain with fried egg', 1000, '\uD83C\uDF5E')
            ] },
            { title: 'Drinks', items: [
                item('Palm Wine', 'Fresh, 1L', 1500, '\uD83E\uDDC3'),
                item('Chapman', 'Nigerian classic', 1000, '\uD83E\uDDC7'),
                item('Zobo', 'With pineapple', 700, '\uD83E\uDDC3'),
                item('Bottled Water', '50cl', 400, '\uD83D\uDCA7')
            ] }
        ],
        'spar-market': [
            { title: 'Fresh Produce', items: [
                item('Apples', '1kg, crisp red', 2800, '\uD83C\uDF4E'),
                item('Watermelon', 'Fresh slices', 1500, '\uD83C\uDF49'),
                item('Carrots', '500g', 1100, '\uD83E\uDD55'),
                item('Green Peppers', '3 pcs', 1300, '\uD83E\uDD52')
            ] },
            { title: 'Bakery', items: [
                item('White Bread', 'Large loaf', 1200, '\uD83C\uDF5E'),
                item('Whole Wheat Bread', 'Healthy choice', 1500, '\uD83C\uDF5E'),
                item('Croissant', 'Buttery, fresh', 1400, '\uD83E\uDD50'),
                item('Doughnuts', 'Pack of 4', 1800, '\uD83C\uDF69')
            ] },
            { title: 'Dairy & Eggs', items: [
                item('Eggs', 'Half tray (15)', 3200, '\uD83E\uDD5A'),
                item('Fresh Milk', '1L', 1700, '\uD83E\uDD5B'),
                item('Butter', '200g', 2100, '\uD83E\uDDC8'),
                item('Cheddar Cheese', '200g', 2600, '\uD83E\uDDC0')
            ] },
            { title: 'Frozen', items: [
                item('Chicken Thighs', '1kg', 5200, '\uD83C\uDF57'),
                item('Fish Steaks', '1kg', 4800, '\uD83D\uDC1F'),
                item('Mixed Vegetables', '500g', 2400, '\uD83E\uDD66'),
                item('Ice Cream Tub', 'Vanilla 1L', 3500, '\uD83C\uDF68')
            ] }
        ],
        'medplus': [
            { title: 'Everyday Medicines', items: [
                item('Pain Relief', 'Fast-acting tablets', 1500, '\uD83D\uDC8A'),
                item('Malaria Treatment', 'Full course', 3200, '\uD83D\uDC8A'),
                item('Cough & Cold', 'Syrup + tablets', 2400, '\uD83E\uDEB6'),
                item('Digestion Aid', 'Antacid relief', 2000, '\uD83D\uDC8A')
            ] },
            { title: 'Beauty', items: [
                item('Face Cream', 'Moisturising 50ml', 4500, '\uD83E\uDDE6'),
                item('Body Lotion', '500ml', 3200, '\uD83E\uDDFC'),
                item('Lip Balm', 'Nourishing', 1400, '\uD83D\uDC44'),
                item('Sunscreen', 'SPF 50', 5500, '\uD83C\uDF1E')
            ] },
            { title: 'Baby Care', items: [
                item('Cotton Diapers', 'Pack of 24', 7500, '\uD83E\uDEB4'),
                item('Baby Wipes', '100 wipes', 2400, '\uD83E\uDEB3'),
                item('Baby Shampoo', 'Gentle wash', 2800, '\uD83C\uDF34'),
                item('Teething Gel', 'Soothing relief', 1900, '\uD83D\uDC40')
            ] },
            { title: 'Vitamins', items: [
                item('Vitamin C', 'Effervescent', 3000, '\uD83C\uDF44'),
                item('Multivitamin', 'Daily complete', 4200, '\uD83D\uDCAA'),
                item('Omega 3', 'Heart health', 6000, '\uD83D\uDC1F'),
                item('Iron Supplement', 'Energy support', 2600, '\uD83D\uDCAA')
            ] }
        ],
        'thyme-by-flour': [
            { title: 'Baked Goodies', items: [
                item('Chocolate Croissant', 'Flaky & rich', 1800, '\uD83E\uDD50'),
                item('Sourdough Loaf', 'Freshly baked', 3000, '\uD83C\uDF5E'),
                item('Pistachio Tart', 'Signature', 2500, '\uD83E\uDDED'),
                item('Fruit Scone', 'With jam', 1600, '\uD83E\uDD50')
            ] },
            { title: 'Coffee & Tea', items: [
                item('Cappuccino', 'Velvet foam', 2200, '\u2615'),
                item('Flat White', 'Double shot', 2000, '\u2615'),
                item('Matcha Latte', 'Ceremonial grade', 2800, '\uD83C\uDF75'),
                item('Chamomile Tea', 'Calming blend', 1400, '\uD83C\uDF3F')
            ] },
            { title: 'Pastry Boxes', items: [
                item('Assorted Pastry Box', '12 mixed pieces', 9000, '\uD83C\uDF82'),
                item('Mini Tart Box', '6 tarts', 6000, '\uD83E\uDDED'),
                item('Macaron Box', '8 colourful', 7500, '\uD83C\uDF6A'),
                item('Cupcake Box', '6 assorted', 5500, '\uD83C\uDF82')
            ] },
            { title: 'Savouries', items: [
                item('Spanakopita', 'Spinach filo pie', 1800, '\uD83E\uDD57'),
                item('Ham & Cheese Quiche', 'Individual', 2200, '\uD83E\uDD56'),
                item('Tomato Basil Panini', 'Toasted', 2400, '\uD83E\uDD6A'),
                item('Bruschetta', '4 pieces', 2000, '\uD83C\uDF45')
            ] }
        ]
    };

    var cartStorageKey = 'glovo_cart';
    var cart = loadCart();
    var storeId = 'mama-t-amala';

    function productKey(storeKey, productName) {
        return storeKey + '::' + productName;
    }

    function loadCart() {
        try {
            var raw = JSON.parse(localStorage.getItem(cartStorageKey) || '{}');
            return typeof raw === 'object' && raw !== null ? raw : {};
        } catch (e) {
            return {};
        }
    }

    function saveCart() {
        try {
            localStorage.setItem(cartStorageKey, JSON.stringify(cart));
        } catch (e) {
            /* storage unavailable */
        }
    }

    function storeFromQuery() {
        var params = new URLSearchParams(window.location.search);
        return params.get('store') || 'mama-t-amala';
    }

    function getMenu() {
        var store = STORES[storeId];
        var category = store ? store.category : 'restaurants';
        return CUSTOM[storeId] || TEMPLATES[category] || TEMPLATES.restaurants;
    }

function emojiImg(emoji, size) {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" fill="#ffc244">' +
            '<rect width="100%" height="100%" rx="10"/>' +
            '<text x="50%" y="55%" font-size="' + Math.round(size * 0.4) + '" dominant-baseline="middle" text-anchor="middle">' + emoji + '</text></svg>';
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }

    function productImgHtml(prod, size) {
        var photo = (global.PRODUCT_SHOTS && global.PRODUCT_SHOTS[prod.name]) ? global.PRODUCT_SHOTS[prod.name] : '';
        if (!photo) return emojiImg(prod.emoji, size);
        var fallback = emojiImg(prod.emoji, size);
        return '<img src="' + photo + '" alt="' + prod.name +
            '" onerror="this.onerror=null;this.src=\'' + fallback + '\'">';
    }

    function naira(n) {
        return '\u20A6' + n.toLocaleString('en-NG');
    }

    function renderHeader() {
        var store = STORES[storeId] || { name: storeId };
        document.getElementById('store-title').textContent = store.name;
    }

    function renderHero() {
        var store = STORES[storeId] || { name: storeId, rating: '', reviews: '', time: '', fee: '', desc: '', emoji: '\uD83C\uDF54' };
        var hero = document.getElementById('store-hero');
        var closedBadge = store.closed ? '<span class="closed-badge">Closed</span>' : '';
        var heroImg = store.logo ? store.logo : emojiImg(store.emoji, 180);
        hero.innerHTML =
            '<div class="hero-img"><img src="' + heroImg + '" alt="' + store.name + '"></div>' +
            '<div class="hero-info">' +
                '<h1>' + store.name + '</h1>' +
                '<p class="hero-meta">' +
                    (store.rating ? '<span>' + store.rating + '</span>' : '') +
                    (store.reviews ? '<span>' + store.reviews + ' reviews</span>' : '') +
                    (store.time ? '<span>' + store.time + '</span>' : '') +
                '</p>' +
                closedBadge +
                '<p class="hero-desc">' + store.desc + '</p>' +
            '</div>';
    }

    function renderTabs(categories) {
        var tabs = document.getElementById('menu-tabs');
        var html = '';
        categories.forEach(function (cat, i) {
            var active = i === 0 ? ' class="active"' : '';
            html += '<button' + active + ' data-target="cat-' + i + '">' + cat.title + '</button>';
        });
        tabs.innerHTML = html;
        tabs.querySelectorAll('button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = document.getElementById(btn.getAttribute('data-target'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function renderMenu(menu) {
        var container = document.getElementById('menu');
        var html = '';
        menu.forEach(function (cat, i) {
            html += '<section class="menu-cat" id="cat-' + i + '">';
            html += '<h2>' + cat.title + '</h2>';
            html += '<div class="product-grid">';
            cat.items.forEach(function (prod) {
                var key = productKey(storeId, prod.name);
                var qty = cart[key] || 0;
                html += '<article class="product" data-key="' + key + '">';
                html += '<div class="product-info">';
                html += '<h3>' + prod.name + '</h3>';
                html += '<p>' + prod.desc + '</p>';
                html += '<span class="price">' + naira(prod.price) + '</span>';
                html += '</div>';
                html += '<div class="product-side">';
                html += productImgHtml(prod, 96);
                html += '<div class="product-actions" data-key="' + key + '" data-price="' + prod.price + '"></div>';
                html += '</div>';
                html += '</article>';
            });
            html += '</div></section>';
        });
        container.innerHTML = html;
        container.querySelectorAll('.product-actions').forEach(function (el) {
            el.addEventListener('click', function (e) {
                var t = e.target;
                var key = el.getAttribute('data-key');
                var price = parseInt(el.getAttribute('data-price'), 10);
                if (t.classList.contains('inc')) {
                    add(key, price);
                } else if (t.classList.contains('dec')) {
                    dec(key);
                } else if (t.classList.contains('add')) {
                    add(key, price);
                }
            });
        });
        refreshProductControls();
    }

    function add(key, price) {
        cart[key] = (cart[key] || 0) + 1;
        saveCart();
        refreshProductControls();
        refreshCartUI();
    }

    function dec(key) {
        if (cart[key]) {
            cart[key] -= 1;
            if (cart[key] <= 0) delete cart[key];
            saveCart();
            refreshProductControls();
            refreshCartUI();
        }
    }

    function refreshProductControls() {
        document.querySelectorAll('.product-actions').forEach(function (el) {
            var key = el.getAttribute('data-key');
            var qty = cart[key] || 0;
            if (qty === 0) {
                el.innerHTML = '<button class="add" aria-label="Add to cart">+</button>';
            } else {
                el.innerHTML = '<button class="dec" aria-label="Remove one">\u2212</button><span class="qty">' + qty + '</span><button class="inc" aria-label="Add one">+</button>';
            }
        });
    }

    function cartItems() {
        var store = STORES[storeId] || { name: storeId };
        var menu = getMenu();
        var allById = {};
        menu.forEach(function (cat) {
            cat.items.forEach(function (prod) {
                allById[productKey(storeId, prod.name)] = prod;
            });
        });
        var result = [];
        Object.keys(cart).forEach(function (key) {
            if (key.indexOf(storeId + '::') === 0 && cart[key] > 0) {
                var prod = allById[key];
                if (prod) {
                    result.push({ key: key, product: prod, qty: cart[key] });
                }
            }
        });
        return result;
    }

    function cartTotals() {
        var items = cartItems();
        var subtotal = items.reduce(function (sum, it) { return sum + it.product.price * it.qty; }, 0);
        var delivery = items.length ? 500 : 0;
        return { count: items.reduce(function (s, it) { return s + it.qty; }, 0), items: items, subtotal: subtotal, delivery: delivery, total: subtotal + delivery };
    }

    function refreshCartUI() {
        var totals = cartTotals();
        var bar = document.getElementById('cart-bar');
        var drawer = document.getElementById('cart-drawer');
        var countEl = document.getElementById('cart-count');
        var totalEl = document.getElementById('cart-total');

        if (totals.count > 0) {
            bar.classList.add('show');
        } else {
            bar.classList.remove('show');
            closeDrawer();
        }
        if (countEl) countEl.textContent = totals.count;
        if (totalEl) totalEl.textContent = naira(totals.total);

        var list = document.getElementById('cart-items');
        var subtotalEl = document.getElementById('subtotal');
        var deliveryEl = document.getElementById('delivery-fee');
        var finalEl = document.getElementById('grand-total');
        if (list) {
            var html = '';
            totals.items.forEach(function (it) {
                html += '<div class="cart-item">';
                html += productImgHtml(it.product, 48);
                html += '<div class="cart-item-info"><strong>' + it.product.name + '</strong><span>' + naira(it.product.price) + '</span></div>';
                html += '<div class="cart-stepper">';
                html += '<button class="dec" data-key="' + it.key + '" data-price="' + it.product.price + '">\u2212</button>';
                html += '<span>' + it.qty + '</span>';
                html += '<button class="inc" data-key="' + it.key + '" data-price="' + it.product.price + '">+</button>';
                html += '</div>';
                html += '<span class="cart-item-total">' + naira(it.product.price * it.qty) + '</span>';
                html += '</div>';
            });
            list.innerHTML = html;
            list.querySelectorAll('button').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var key = btn.getAttribute('data-key');
                    var price = parseInt(btn.getAttribute('data-price'), 10);
                    if (btn.classList.contains('inc')) add(key, price);
                    else dec(key);
                });
            });
        }
        if (subtotalEl) subtotalEl.textContent = naira(totals.subtotal);
        if (deliveryEl) deliveryEl.textContent = totals.items.length ? naira(totals.delivery) : '\u2014';
        if (finalEl) finalEl.textContent = naira(totals.total);
    }

    function openDrawer() {
        document.getElementById('cart-drawer').classList.add('open');
        document.getElementById('scrim').classList.add('show');
    }

    function closeDrawer() {
        document.getElementById('cart-drawer').classList.remove('open');
        document.getElementById('scrim').classList.remove('show');
    }

    function init() {
        if (!document.getElementById('store-title') || !document.getElementById('cart-bar')) return;
        storeId = storeFromQuery();
        if (!STORES[storeId]) storeId = 'mama-t-amala';
        renderHeader();
        renderHero();
        var menu = getMenu();
        renderTabs(menu);
        renderMenu(menu);
        refreshCartUI();

        document.getElementById('cart-bar').addEventListener('click', openDrawer);
        document.getElementById('close-cart').addEventListener('click', closeDrawer);
        document.getElementById('scrim').addEventListener('click', closeDrawer);

        var checkout = document.getElementById('checkout');
        if (checkout) {
            checkout.addEventListener('click', function () {
                var totals = cartTotals();
                if (totals.count === 0) return;
                cart = {};
                saveCart();
                refreshProductControls();
                refreshCartUI();
                document.getElementById('cart-summary').style.display = 'none';
                document.getElementById('cart-empty').style.display = 'block';
                openDrawer();
            });
        }

        var backToMenu = document.getElementById('back-to-menu');
        if (backToMenu) {
            backToMenu.addEventListener('click', function () {
                closeDrawer();
                document.getElementById('cart-summary').style.display = 'block';
                document.getElementById('cart-empty').style.display = 'none';
            });
        }

        var scrollBox = document.querySelector('.menu-layout .tabs-wrap');
        if ('IntersectionObserver' in window) {
            var sections = document.querySelectorAll('.menu-cat');
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        document.querySelectorAll('#menu-tabs button').forEach(function (btn) {
                            btn.classList.toggle('active', btn.getAttribute('data-target') === entry.target.id);
                        });
                    }
                });
            }, { root: null, rootMargin: '-20% 0px -70% 0px' });
            sections.forEach(function (s) { observer.observe(s); });
        }
    }

    global.GlovoMenu = {
        stores: STORES,

        menuFor: function (storeId) {
            var store = STORES[storeId] || {};
            return CUSTOM[storeId] || TEMPLATES[store.category || 'restaurants'] || TEMPLATES.restaurants;
        },

        // Price of a single named item in a store (0 if unknown)
        itemPrice: function (storeId, name) {
            var found = null;
            this.menuFor(storeId).some(function (cat) {
                return cat.items.some(function (it) {
                    if (it.name === name) { found = it; return true; }
                    return false;
                });
            });
            return found ? found.price : 0;
        },

        // Cheapest item in a store (0 if the store has no priced items)
        cheapest: function (storeId) {
            var min = Infinity;
            this.menuFor(storeId).forEach(function (cat) {
                cat.items.forEach(function (it) {
                    if (it.price >= 0 && it.price < min) min = it.price;
                });
            });
            return min === Infinity ? 0 : min;
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);