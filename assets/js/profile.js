(function (global) {
    'use strict';

    var USER_KEY = 'glovo_user';
    var LOCATION_KEY = 'glovo_location';
    var LOGGED_KEY = 'glovo_logged_in';
    var DEFAULT_USER = 'Ayooluwa';

    function read(key, fallback) {
        try {
            var v = global.localStorage.getItem(key);
            return (v === null || v === '') ? fallback : v;
        } catch (e) {
            return fallback;
        }
    }

    function write(key, value) {
        try {
            global.localStorage.setItem(key, value);
            return true;
        } catch (e) {
            return false;
        }
    }

    function bySelector(sel) {
        return Array.prototype.slice.call(document.querySelectorAll(sel));
    }

    var profile = {
        getUser: function () { return read(USER_KEY, DEFAULT_USER); },
        setUser: function (name) {
            name = String(name == null ? '' : name).trim();
            if (!name) return false;
            write(USER_KEY, name);
            applyAll();
            return true;
        },
        getLocation: function () { return read(LOCATION_KEY, ''); },
        setLocation: function (loc) {
            loc = String(loc == null ? '' : loc).trim();
            if (!loc) return false;
            write(LOCATION_KEY, loc);
            applyAll();
            return true;
        },
        isLoggedIn: function () { return read(LOGGED_KEY, '') === '1'; },
        login: function (name) {
            name = String(name == null ? '' : name).trim();
            if (name) write(USER_KEY, name);
            write(LOGGED_KEY, '1');
            applyAll();
            return true;
        },
        logout: function () {
            try {
                global.localStorage.removeItem(LOGGED_KEY);
            } catch (e) { /* storage unavailable */ }
            write(USER_KEY, DEFAULT_USER);
            applyAll();
            return true;
        }
    };

    global.GlovoProfile = profile;

    function ensureDefaults() {
        bySelector('[data-profile-user]').forEach(function (el) {
            if (!el.getAttribute('data-user-default')) {
                el.setAttribute('data-user-default', el.textContent);
            }
        });
        bySelector('[data-profile-location]').forEach(function (el) {
            if (!el.getAttribute('data-loc-default')) {
                el.setAttribute('data-loc-default', el.textContent);
            }
        });
    }

    function applyAll() {
        var user = profile.getUser();
        var loc = profile.getLocation();

        ensureDefaults();

        bySelector('[data-profile-user]').forEach(function (el) {
            el.textContent = user;
        });

        bySelector('[data-profile-location]').forEach(function (el) {
            el.textContent = loc || el.getAttribute('data-loc-default') || '';
        });
    }

    /* ---------- Log out button + confirm ---------- */

    var logoutModal = null;

    function ensureLogoutButtons() {
        bySelector('[data-profile-user-widget]').forEach(function (w) {
            if (w.querySelector('.profile-logout')) return;
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'profile-logout';
            btn.title = 'Log out';
            btn.textContent = 'Log out';
            btn.setAttribute('aria-label', 'Log out');
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                openLogoutConfirm();
            });
            var label = w.querySelector('[data-profile-user]');
            if (label && label.parentNode) {
                label.parentNode.insertBefore(btn, label.nextSibling);
            } else {
                w.appendChild(btn);
            }
        });
    }

    function openLogoutConfirm() {
        if (!logoutModal) buildLogoutConfirm();
        var nameEl = logoutModal.querySelector('.logout-user');
        if (nameEl) nameEl.textContent = profile.getUser();
        logoutModal.style.display = 'flex';
    }

    function buildLogoutConfirm() {
        logoutModal = document.createElement('div');
        logoutModal.className = 'glovo-modal';
        logoutModal.innerHTML =
            '<div class="glovo-modal-card">' +
            '<button type="button" class="glovo-modal-cancel" aria-label="Close">&times;</button>' +
            '<h3>Log out?</h3>' +
            '<p>You are logged in as <b class="logout-user"></b>. Do you really want to log out?</p>' +
            '<div class="glovo-modal-actions">' +
            '<button type="button" class="glovo-modal-ghost">Cancel</button>' +
            '<button type="button" class="glovo-modal-save glovo-modal-danger">Log out</button>' +
            '</div>' +
            '</div>';
        document.body.appendChild(logoutModal);

        var cancel = logoutModal.querySelector('.glovo-modal-cancel');
        var ghost = logoutModal.querySelector('.glovo-modal-ghost');
        var confirmBtn = logoutModal.querySelector('.glovo-modal-danger');

        function close() {
            logoutModal.style.display = 'none';
        }
        logoutModal._close = close;

        cancel.addEventListener('click', close);
        ghost.addEventListener('click', close);
        logoutModal.addEventListener('click', function (e) {
            if (e.target === logoutModal) close();
        });
        confirmBtn.addEventListener('click', function () {
            profile.logout();
            close();
            var onPages = /\/pages\//.test(window.location.pathname);
            global.location.href = (onPages ? '../' : '') + 'index.html';
        });
    }

    /* ---------- Location popup ---------- */

    var modal = null;

    function buildModal() {
        modal = document.createElement('div');
        modal.className = 'glovo-modal';
        modal.innerHTML =
            '<div class="glovo-modal-card">' +
            '<button type="button" class="glovo-modal-cancel" aria-label="Close">&times;</button>' +
            '<h3>Choose your location</h3>' +
            '<p>Where should we deliver your order?</p>' +
            '<input type="text" class="glovo-modal-input" placeholder="e.g. 4, Ahmadu Bello Way, Abuja" maxlength="80">' +
            '<button type="button" class="glovo-modal-save">Save location</button>' +
            '</div>';
        document.body.appendChild(modal);

        var input = modal.querySelector('.glovo-modal-input');
        var save = modal.querySelector('.glovo-modal-save');
        var cancel = modal.querySelector('.glovo-modal-cancel');

        function commit() {
            var val = input.value.trim();
            if (val) {
                var dest = modal.getAttribute('data-dest');
                profile.setLocation(val);
                close();
                if (dest) global.location.href = dest;
            }
        }

        function close() {
            modal.style.display = 'none';
            input.value = '';
            modal.removeAttribute('data-dest');
        }

        modal._close = close;

        save.addEventListener('click', commit);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); commit(); }
        });
        cancel.addEventListener('click', close);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) close();
        });
    }

    function openLocationModal(dest) {
        if (!modal) buildModal();
        if (dest) {
            modal.setAttribute('data-dest', dest);
        } else {
            modal.removeAttribute('data-dest');
        }
        var input = modal.querySelector('.glovo-modal-input');
        input.value = profile.getLocation() || '';
        modal.style.display = 'flex';
        setTimeout(function () { input.focus(); }, 30);
    }

    /* ---------- Username editing widget ---------- */

    function initUserWidget(w) {
        w.classList.add('profile-widget');
        var editing = false;

        w.addEventListener('click', function (ev) {
            if (ev.target.closest && (ev.target.closest('input') || ev.target.closest('.profile-edit-cancel') || ev.target.closest('.profile-logout'))) return;
            if (editing) return;
            openEditor();
        });

        function openEditor() {
            var label = w.querySelector('[data-profile-user]');
            if (!label || editing) return;
            editing = true;
            w.classList.add('editing');

            var input = document.createElement('input');
            input.type = 'text';
            input.className = 'profile-edit-input';
            input.value = profile.getUser();
            input.maxLength = 40;

            label.style.display = 'none';

            var cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'profile-edit-cancel';
            cancelBtn.textContent = '\u00d7';
            cancelBtn.setAttribute('aria-label', 'Cancel editing');

            label.parentNode.insertBefore(input, label.nextSibling);
            label.parentNode.insertBefore(cancelBtn, input.nextSibling);

            input.focus();
            input.select();

            function finish(save) {
                if (!editing) return;
                editing = false;
                var val = input.value.trim();
                input.removeEventListener('keydown', onKey);
                input.removeEventListener('blur', onBlur);
                cancelBtn.removeEventListener('click', onCancel);
                if (save && val && val !== profile.getUser()) profile.setUser(val);
                if (input.parentNode) input.parentNode.removeChild(input);
                if (cancelBtn.parentNode) cancelBtn.parentNode.removeChild(cancelBtn);
                label.style.display = '';
                label.textContent = profile.getUser();
                w.classList.remove('editing');
            }

            function onCancel() { finish(false); }

            function onKey(e) {
                if (e.key === 'Enter') { e.preventDefault(); finish(true); }
                else if (e.key === 'Escape') { finish(false); }
            }

            function onBlur() {
                if (document.activeElement === cancelBtn) return;
                finish(true);
            }

            input.addEventListener('keydown', onKey);
            input.addEventListener('blur', onBlur);
            cancelBtn.addEventListener('click', onCancel);
        }
    }

    /* ---------- Init ---------- */

    function init() {
        ensureDefaults();
        applyAll();

        var locBtn = document.getElementById('choose-location');
        if (locBtn) {
            locBtn.addEventListener('click', function (e) {
                e.preventDefault();
                openLocationModal(/\/pages\//.test(window.location.pathname) ? 'index2.html' : 'pages/index2.html');
            });
        }

        bySelector('[data-profile-location-widget]').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                openLocationModal();
            });
        });

        bySelector('[data-profile-user-widget]').forEach(initUserWidget);
        ensureLogoutButtons();

        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var openModals = [modal, logoutModal];
            for (var i = 0; i < openModals.length; i++) {
                var m = openModals[i];
                if (!m || m.style.display !== 'flex') continue;
                if (typeof m._close === 'function') m._close();
                else m.style.display = 'none';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);