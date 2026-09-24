/* Budget Mode — lets the user set a spending budget, hides stores they cannot
   afford, and shows how much of the budget is already spent (via the cart). */

(function (global) {
    'use strict';

    var AMOUNT_KEY = 'glovo_budget_amount';
    var MODE_KEY = 'glovo_budget_active';

    var toggle, body, input;
    var budgetEl, spentEl, leftEl, noteEl, noteToggle, progressFill;

    function readAmount() {
        try {
            var n = parseInt(localStorage.getItem(AMOUNT_KEY), 10);
            return (isNaN(n) || n <= 0) ? 5000 : n;
        } catch (e) {
            return 5000;
        }
    }

    function readActive() {
        try {
            return localStorage.getItem(MODE_KEY) === '1';
        } catch (e) {
            return false;
        }
    }

    function write(key, value) {
        try {
            localStorage.setItem(key, String(value));
        } catch (e) {
            /* storage unavailable */
        }
    }

    function naira(n) {
        return '\u20A6' + Math.max(0, Number(n) || 0).toLocaleString('en-NG');
    }

    // Total value of everything currently in the cart, across all stores
    function spentFromCart() {
        var cart = {};
        try {
            cart = JSON.parse(localStorage.getItem('glovo_cart') || '{}');
        } catch (e) {
            return 0;
        }
        var total = 0;
        Object.keys(cart).forEach(function (key) {
            var qty = parseInt(cart[key], 10) || 0;
            if (qty <= 0) return;
            var sep = key.indexOf('::');
            if (sep === -1) return;
            if (!global.GlovoMenu) return;
            var storeId = key.slice(0, sep);
            var name = key.slice(sep + 2);
            total += global.GlovoMenu.itemPrice(storeId, name) * qty;
        });
        return total;
    }

    function state() {
        var amount = readAmount();
        var active = readActive();
        var spent = spentFromCart();
        return { amount: amount, active: active, spent: spent, left: amount - spent };
    }

    function isAffordable(store) {
        if (!global.GlovoMenu) return true;
        var cheapest = global.GlovoMenu.cheapest(store.id);
        if (!cheapest) return false;
        var s = state();
        return cheapest <= Math.max(0, s.left);
    }

    function apply(results) {
        var s = state();
        if (!s.active) return (results || []).slice();
        return (results || []).filter(isAffordable);
    }

    function active() {
        return readActive();
    }

    function emptyMessage() {
        if (!readActive()) return null;
        return {
            title: 'Nothing fits your budget',
            hint: 'Try raising your budget or removing items from your cart.'
        };
    }

    function decorate(container) {
        if (!readActive()) return;
        var cards = container.querySelectorAll('.store');
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var id = new URL(card.href, window.location.href).searchParams.get('store');
            if (!id || !global.GlovoMenu) continue;
            var cheapest = global.GlovoMenu.cheapest(id);
            if (!cheapest) continue;
            var chip = card.querySelector('.budget-chip');
            if (!chip) {
                chip = document.createElement('span');
                chip.className = 'budget-chip';
                card.querySelector('div').appendChild(chip);
            }
            chip.textContent = 'Meals from ' + naira(cheapest) + '\u00A0\u00B7\u00A0under ' + naira(Math.max(0, state().left));
        }
    }

    function refresh() {
        var s = state();
        if (!budgetEl) return;

        budgetEl.textContent = naira(s.amount);
        spentEl.textContent = naira(s.spent);
        leftEl.textContent = naira(s.left);
        leftEl.classList.toggle('over', s.left < 0);

        var pct = s.amount > 0 ? Math.min(100, Math.max(0, (s.spent / s.amount) * 100)) : 0;
        if (progressFill) {
            progressFill.style.width = pct.toFixed(1) + '%';
            progressFill.classList.toggle('over', s.spent > s.amount);
        }

        if (s.active) {
            if (s.left > 0) {
                noteEl.textContent = 'Only showing stores with meals under ' + naira(s.left) + ' (what you have left to spend).';
            } else {
                noteEl.textContent = 'Your budget is all spent — remove items from your cart or raise your budget.';
            }
        } else {
            noteEl.textContent = 'Turn on Budget Mode to only see stores you can afford.';
        }
    }

    function applyUi() {
        var s = state();
        input.value = s.amount;
        toggle.classList.toggle('on', s.active);
        toggle.setAttribute('aria-pressed', String(s.active));
        body.hidden = !s.active;
        if (noteToggle) {
            noteToggle.textContent = s.active ? 'On' : 'Off';
        }
        refresh();
    }

    function triggerSearch() {
        if (typeof global.reloadSearch === 'function') {
            global.reloadSearch();
        }
    }

    function init() {
        toggle = document.getElementById('budget-toggle');
        if (!toggle) return;

        body = document.getElementById('budget-body');
        input = document.getElementById('budget-input');
        budgetEl = document.getElementById('budget-amount');
        spentEl = document.getElementById('budget-spent');
        leftEl = document.getElementById('budget-left');
        noteEl = document.getElementById('budget-note');
        noteToggle = document.getElementById('budget-toggle-note');
        progressFill = document.getElementById('budget-progress-fill');

        applyUi();

        toggle.addEventListener('click', function () {
            var on = !readActive();
            write(MODE_KEY, on ? '1' : '0');
            applyUi();
            triggerSearch();
        });

        input.addEventListener('input', function () {
            var n = parseInt(input.value, 10);
            if (isNaN(n) || n <= 0) return;
            write(AMOUNT_KEY, String(n));
            refresh();
            triggerSearch();
        });

        // Recompute the "spent" figure whenever the cart changes
        global.addEventListener('storage', function () {
            refresh();
            triggerSearch();
        });
    }

    global.GlovoBudget = {
        state: state,
        apply: apply,
        active: active,
        emptyMessage: emptyMessage,
        decorate: decorate
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);