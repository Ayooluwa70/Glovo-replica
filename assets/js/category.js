/* Category tiles on the home pages (index.html / login.html): clicking a tile
   expands a panel listing the related items across the stores in that
   category, styled after the search results page. Each item links through to
   its store page. */

(function (global) {
    'use strict';

    var TILES = {
        pharmacy: { cat: 'health', label: 'Pharmacy & beauty' },
        groceries: { cat: 'groceries', label: 'Groceries' },
        food: { cat: 'restaurants', label: 'Food' },
        shop: { cat: 'shops', label: 'Shop' }
    };

    var panel = null;
    var grid = null;
    var openKey = null;

    function esc(text) {
        var div = document.createElement('div');
        div.textContent = String(text == null ? '' : text);
        return div.innerHTML;
    }

    function naira(n) {
        return '\u20A6' + Math.max(0, Number(n) || 0).toLocaleString('en-NG');
    }

    function storeHref(storeId) {
        var prefix = /\/pages\//.test(global.location.pathname) ? '' : 'pages/';
        return prefix + 'store.html?store=' + encodeURIComponent(storeId);
    }

    function setTileActive(key) {
        var tiles = Array.prototype.slice.call(document.querySelectorAll('[data-category-tile]'));
        tiles.forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-category-tile') === key);
        });
    }

    function close() {
        if (!panel) return;
        panel.style.display = 'none';
        openKey = null;
        setTileActive(null);
    }

    function buildPanel() {
        panel = document.createElement('section');
        panel.className = 'category-panel';
        panel.style.display = 'none';
        panel.innerHTML =
            '<div class="cat-panel-head">' +
            '<h3 class="cat-title"></h3>' +
            '<span class="cat-count"></span>' +
            '<button type="button" class="cat-close" aria-label="Close">&times;</button>' +
            '</div>' +
            '<div class="cat-panel-grid"></div>';
        grid = panel.querySelector('.cat-panel-grid');
        panel.querySelector('.cat-close').addEventListener('click', close);

        var nav = document.querySelector('.nav');
        if (nav && nav.parentNode) {
            nav.parentNode.insertBefore(panel, nav.nextSibling);
        } else {
            document.body.appendChild(panel);
        }
    }

    function thumbHtml(item) {
        var photo = (global.PRODUCT_SHOTS && global.PRODUCT_SHOTS[item.name]) ? global.PRODUCT_SHOTS[item.name] : '';
        var thumb = document.createElement('span');
        thumb.className = 'cat-thumb';
        if (photo) {
            var img = document.createElement('img');
            img.src = photo;
            img.alt = esc(item.name);
            img.loading = 'lazy';
            img.addEventListener('error', function () {
                while (thumb.firstChild) thumb.removeChild(thumb.firstChild);
                thumb.textContent = item.emoji || '\uD83D\uDCC6';
                thumb.classList.add('cat-thumb-emoji');
            });
            thumb.appendChild(img);
        } else {
            thumb.classList.add('cat-thumb-emoji');
            thumb.textContent = item.emoji || '\uD83D\uDCC6';
        }
        return thumb;
    }

    function addItemCard(store, item) {
        var card = document.createElement('a');
        card.className = 'cat-item';
        card.href = storeHref(store.id);
        card.title = item.name + ' \u00B7 ' + store.name;
        card.appendChild(thumbHtml(item));

        var body = document.createElement('div');
        body.className = 'cat-item-body';

        var nameEl = document.createElement('h4');
        nameEl.textContent = item.name;

        var storeEl = document.createElement('p');
        storeEl.textContent = store.name;

        var priceEl = document.createElement('span');
        priceEl.className = 'cat-price';
        priceEl.textContent = naira(item.price);

        body.appendChild(nameEl);
        body.appendChild(storeEl);
        body.appendChild(priceEl);
        card.appendChild(body);
        grid.appendChild(card);
    }

    function show(key) {
        var info = TILES[key];
        if (!info) return;
        if (!panel) buildPanel();

        var titleEl = panel.querySelector('.cat-title');
        var countEl = panel.querySelector('.cat-count');
        titleEl.textContent = info.label;
        countEl.textContent = 'Loading\u2026';
        grid.innerHTML = '';
        panel.style.display = 'block';
        openKey = key;
        setTileActive(key);

        if (!global.GlovoMenu || !global.GlovoAPI) {
            countEl.textContent = 'Store list unavailable';
            return;
        }

        global.GlovoAPI.all().then(function (stores) {
            if (openKey !== key) return;
            var entries = [];
            stores.forEach(function (store) {
                if (store.category !== info.cat) return;
                var menu = global.GlovoMenu.menuFor(store.id);
                if (!menu) return;
                menu.forEach(function (cat) {
                    (cat.items || []).forEach(function (item) {
                        entries.push({ store: store, item: item });
                    });
                });
            });

            if (!entries.length) {
                countEl.textContent = 'No items available yet';
                return;
            }
            countEl.textContent = entries.length + ' item' + (entries.length === 1 ? '' : 's available');
            entries.forEach(function (entry) {
                addItemCard(entry.store, entry.item);
            });
        });
    }

    function toggle(key) {
        if (openKey === key) close();
        else show(key);
    }

    function init() {
        var tiles = Array.prototype.slice.call(document.querySelectorAll('[data-category-tile]'));
        tiles.forEach(function (btn) {
            btn.addEventListener('click', function () {
                toggle(btn.getAttribute('data-category-tile'));
            });
        });
    }

    global.GlovoCategories = { show: show, close: close };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);