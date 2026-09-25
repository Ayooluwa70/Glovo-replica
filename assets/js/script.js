

(function (global) {
    'use strict';

    function $(sel) {
        return document.querySelector(sel);
    }

    function $all(sel) {
        return Array.prototype.slice.call(document.querySelectorAll(sel));
    }

    function goSearch() {
        var input = document.getElementById('search-input');
        var query = input ? input.value.trim() : '';
        var onPages = /\/pages\//.test(global.location.pathname);
        var url = (onPages ? '' : 'pages/') + 'search.html';
        if (query) {
            url += '?q=' + encodeURIComponent(query);
        }
        window.location.href = url;
    }

    function initIndexSearch() {
        var input = document.querySelector('.search-input');
        if (!input) return;
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') goSearch();
        });
    }
    var state = { query: '', category: 'all' };
    var requestId = 0;

    function esc(text) {
        var div = document.createElement('div');
        div.textContent = String(text == null ? '' : text);
        return div.innerHTML;
    }

    function metaText(store) {
        if (store.rating && store.reviews) {
            return esc(store.rating) + ' \u00B7 (' + esc(store.reviews) + ')';
        }
        if (store.rating) {
            return esc(store.rating) + ' \u00B7 \u00B7';
        }
        return '\u00B7 \u00B7';
    }

    function storeCardHtml(store) {
        var html = '<a class="store" href="store.html?store=' + esc(store.id) + '" data-category="' + esc(store.category) + '">';
        html += '<img src="' + esc(store.logo) + '" alt="' + esc(store.name) + '">';
        html += '<div>';
        html += '<h2>' + esc(store.name) + '</h2>';
        html += '<p><span class="material-symbols-outlined">thumb_up</span> ' + metaText(store) + '</p>';
        if (store.closed) {
            html += '<em><span class="material-symbols-outlined">thumb_up</span> ' + esc(store.closed) + '</em>';
        } else {
            html += '<span><span class="material-symbols-outlined">thumb_up</span> ' + esc(store.fee) + '</span>';
            html += '<small>' + esc(store.time) + '</small>';
        }
        html += '</div></a>';
        return html;
    }

    function showEmpty(query, custom) {
        var container = document.getElementById('stores-container');
        container.innerHTML = '';
        var box = document.createElement('div');
        box.className = 'no-results';
        var title = document.createElement('p');
        title.className = 'no-results-title';
        title.textContent = custom ? custom.title : (query ? 'No results for "' + query + '"' : 'Nothing in this category yet');
        var hint = document.createElement('p');
        hint.textContent = custom ? custom.hint : 'Try a different search or pick another category.';
        box.appendChild(title);
        box.appendChild(hint);
        container.appendChild(box);
    }

    function renderStores(results, query) {
        var container = document.getElementById('stores-container');
        var countEl = document.getElementById('results-count');
        var budgetActive = global.GlovoBudget && global.GlovoBudget.active();
        container.classList.remove('loading');

        if (!results.length) {
            if (countEl) countEl.textContent = '';
            var custom = (global.GlovoBudget && global.GlovoBudget.emptyMessage) ? global.GlovoBudget.emptyMessage() : null;
            showEmpty(query, custom);
            return;
        }

        container.innerHTML = results.map(storeCardHtml).join('');
        if (global.GlovoBudget && global.GlovoBudget.decorate) {
            global.GlovoBudget.decorate(container);
        }
        if (countEl) {
            countEl.textContent = results.length + ' store' + (results.length === 1 ? '' : 's') + (budgetActive ? ' within your budget' : '');
        }
    }

    function runSearch(query, category) {
        var container = document.getElementById('stores-container');
        var countEl = document.getElementById('results-count');
        var id = ++requestId;

        state.query = query.trim();
        state.category = category;

        container.classList.add('loading');
        if (countEl) countEl.textContent = 'Searching\u2026';

        global.GlovoAPI.search(query, category).then(function (results) {
            // Ignore stale responses if a newer search was started
            if (id !== requestId) return;
            if (global.GlovoBudget && global.GlovoBudget.apply) {
                results = global.GlovoBudget.apply(results);
            }
            renderStores(results, query.trim());
        });
    }

    function initSearchPage() {
        var input = document.getElementById('search-input');
        var button = document.getElementById('search-btn');
        if (!input || !document.getElementById('stores-container')) return;

        var links = $all('#categories a');
        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                links.forEach(function (l) { l.classList.remove('selected'); });
                link.classList.add('selected');
                runSearch(input.value, link.getAttribute('data-category'));
            });
        });

        input.addEventListener('input', function () {
            runSearch(input.value, state.category);
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') runSearch(input.value, state.category);
        });

        if (button) {
            button.addEventListener('click', function () {
                runSearch(input.value, state.category);
            });
        }

        // Pre-fill from ?q= sent by the index page
        var params = new URLSearchParams(window.location.search);
        var queryParam = params.get('q') || '';
        if (queryParam) {
            input.value = queryParam;
        }

        runSearch(input.value, 'all');
    }

    /* Keep backwards compatibility with the old inline filterStores() */
    global.filterStores = function (categoryName) {
        if (typeof global.GlovoAPI === 'undefined') return;
        state.category = categoryName;
        var input = document.getElementById('search-input');
        runSearch(input ? input.value : '', categoryName);
    };

    // Used by the inline onclick on index2.html
    global.goSearch = goSearch;

    // Re-run the current search (used by Budget Mode after its settings change)
    global.reloadSearch = function () {
        if (typeof global.GlovoAPI === 'undefined') return;
        var input = document.getElementById('search-input');
        runSearch(input ? input.value : '', state.category);
    };

    function init() {
        initIndexSearch();
        initSearchPage();
        initScrollToTop();
    }

    function initScrollToTop() {
        var btn = document.getElementById('scroll-to-top');
        if (!btn) return;

        var scrollThreshold = 300;

        window.addEventListener('scroll', function () {
            if (window.scrollY > scrollThreshold) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);