/* Glovo search API.
   Data is served by a free live JSON-storage API (ExtendsClass, no account
   needed, HTTPS + CORS enabled): https://extendsclass.com/api/json-storage

   Every call returns a Promise, exactly like a real remote API. If the
   network is unavailable the loading fails, an embedded copy of the same
   data is used so the page still works offline. */

(function (global) {
    'use strict';

    // Live endpoint hosting the store catalogue
    var LIVE_URL = 'https://extendsclass.com/api/json-storage/bin/eddbade';

    // Serve the right relative path whether we are on the root page or in /pages/
    var onPages = /\/pages\//.test(window.location.pathname);
    var ROOT = onPages ? '../' : '';

    // Offline fallback copy (used only when the live API cannot be reached)
    var FALLBACK = [
        { id: 'mama-t-amala', name: 'Mama T Amala Joint', category: 'restaurants', logo: 'assets/img/logos/mama-t-amala.svg', rating: '100%', reviews: 14, time: '10-25 min', fee: 'Free', desc: 'Home-style Nigerian amala, soups and grilled delicacies.' },
        { id: 'parfait-parlor', name: 'Parfait Parlor Limited', category: 'restaurants', logo: 'assets/img/logos/parfait-parlor.svg', rating: '100%', reviews: 54, time: '15-30 min', fee: 'Free', desc: 'Creamy parfaits, sundaes and frozen treats.' },
        { id: 'ebony-express', name: 'Ebony Express Food and More', category: 'restaurants', logo: 'assets/img/logos/ebony-express.svg', rating: '', reviews: '', time: '20-35 min', fee: 'Free', desc: 'Quick bites, burgers and fast-food classics.' },
        { id: 't-best-joint', name: 'T-Best Joint', category: 'restaurants', logo: 'assets/img/logos/t-best-joint.svg', rating: '', reviews: '', time: '', fee: '', desc: 'Local rice, stews and everyday favourites.', closed: 'Closed until tomorrow' },
        { id: 't5-poolbar', name: 'T5 Poolbar and Lounge', category: 'smoking', logo: 'assets/img/logos/t5-poolbar.svg', rating: '', reviews: '', time: '', fee: '', desc: 'Chilled cocktails, drinks and lounge snacks.', closed: 'Closed' },
        { id: 'nedu-shawarma', name: 'Nedu Shawarma and Grill', category: 'restaurants', logo: 'assets/img/logos/nedu-shawarma.svg', rating: '', reviews: '', time: '', fee: '', desc: 'Shawarma, grilled skewers and wraps.', closed: 'Closed' },
        { id: 'tea-and-more', name: 'Tea and More', category: 'restaurants', logo: 'assets/img/logos/tea-and-more.svg', rating: '86%', reviews: 41, time: '25-40 min', fee: 'Free', desc: 'Teas, coffees and light bites.' },
        { id: 'bubble-tea', name: 'The Bubble Tea Shop', category: 'restaurants', logo: 'assets/img/logos/bubble-tea.svg', rating: '98%', reviews: 31, time: '10-25 min', fee: 'Free', desc: 'Fruity and milky bubble teas with popping pearls.' },
        { id: 'spar-market', name: 'SPAR Market', category: 'groceries', logo: 'assets/img/logos/spar-market.svg', rating: '93%', reviews: '500+', time: '15-30 min', fee: 'Free', desc: 'Daily groceries, fresh produce and household essentials.' },
        { id: 'tonis-tea', name: "Toni's Tea", category: 'restaurants', logo: 'assets/img/logos/tonis-tea.svg', rating: '94%', reviews: 27, time: '15-30 min', fee: 'Free', desc: 'Fresh juices, teas and refreshing drinks.' },
        { id: 'h-medix', name: 'H-Medix Supermarket', category: 'health', logo: 'assets/img/logos/h-medix.svg', rating: '83%', reviews: '1k+', time: '15-30 min', fee: 'Free', desc: 'Medicines, personal care and everyday wellness.' },
        { id: '4u-supermarket', name: '4U Supermarket', category: 'groceries', logo: 'assets/img/logos/4u-supermarket.svg', rating: '95%', reviews: 249, time: '10-25 min', fee: 'Free', desc: 'Groceries, beverages and home essentials at your door.' },
        { id: 'todays-bukka', name: "Today's Bukka Express", category: 'restaurants', logo: 'assets/img/logos/todays-bukka.svg', rating: '86%', reviews: 80, time: '15-30 min', fee: 'Free', desc: 'Home-style bukka meals fast.' },
        { id: 'medplus', name: 'Medplus Pharmacy', category: 'health', logo: 'assets/img/logos/medplus.svg', rating: '96%', reviews: 171, time: '10-25 min', fee: 'Free', desc: 'Trusted pharmacy for medicines and wellness.' },
        { id: 'thyme-by-flour', name: 'THYME BY FLOUR', category: 'shops', logo: 'assets/img/logos/thyme-by-flour.svg', rating: 'New', reviews: '', time: '20-35 min', fee: 'Free', desc: 'Artisan bakery, pastries and specialty coffee.' }
    ];

    var CATEGORIES = ['all', 'restaurants', 'groceries', 'shops', 'health', 'smoking'];

    var cache = null;
    var cachePromise = null;

    function clone(item) {
        return JSON.parse(JSON.stringify(item));
    }

    function withRoot(store) {
        var copy = clone(store);
        if (copy.logo && copy.logo.indexOf(ROOT) !== 0) {
            copy.logo = ROOT + copy.logo;
        }
        return copy;
    }

    // Fetch the live catalogue once, then reuse it for every search.
    function getStores() {
        if (cache) return Promise.resolve(cache);

        if (!cachePromise) {
            cachePromise = fetch(LIVE_URL)
                .then(function (res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.json();
                })
                .then(function (data) {
                    if (!Array.isArray(data) || !data.length) {
                        throw new Error('Empty API response');
                    }
                    cache = data.map(withRoot);
                    return cache;
                })
                .catch(function () {
                    cachePromise = null; // allow a retry next time
                    return FALLBACK.map(withRoot);
                });
        }
        return cachePromise;
    }

    function matches(query, store) {
        var q = String(query || '').trim().toLowerCase();
        if (!q) return true;
        var haystack = (store.name + ' ' + store.category + ' ' + (store.desc || '')).toLowerCase();
        var words = q.split(/\s+/);
        return words.every(function (word) {
            return haystack.indexOf(word) !== -1;
        });
    }

    function search(query, category) {
        var q = query || '';
        var cat = category || 'all';
        return getStores().then(function (stores) {
            return stores.filter(function (store) {
                var inCategory = cat === 'all' || store.category === cat;
                return inCategory && matches(q, store);
            });
        });
    }

    function all() {
        return getStores().then(function (stores) {
            return stores.slice();
        });
    }

    function categories() {
        return Promise.resolve(CATEGORIES.slice());
    }

    global.GlovoAPI = {
        search: search,
        all: all,
        categories: categories
    };
})(window);