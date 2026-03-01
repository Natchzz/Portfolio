/**
 * theme.js — Portfolio Theme Manager + Project Toggles
 * PHP handles the partials via include, so no fetch() needed here.
 */

/* ═══════════════════════════════════════
   THEME MANAGER
═══════════════════════════════════════ */
(function () {
    const root    = document.documentElement;
    const osQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const THEMES = {
        light:  { iconClass: 'fa-solid fa-sun',     label: 'LIGHT'  },
        dark:   { iconClass: 'fa-solid fa-moon',    label: 'DARK'   },
        system: { iconClass: 'fa-solid fa-desktop', label: 'SYSTEM' },
    };

    function resolveTheme(choice) {
        return choice === 'system' ? (osQuery.matches ? 'dark' : 'light') : choice;
    }

    function applyTheme(choice) {
        const resolved = resolveTheme(choice);
        root.classList.toggle('light', resolved === 'light');

        const iconEl  = document.getElementById('theme-icon');
        const labelEl = document.getElementById('theme-label');
        const meta    = THEMES[choice] || THEMES.system;

        if (iconEl)  iconEl.className    = meta.iconClass;
        if (labelEl) labelEl.textContent = meta.label;

        // Sync checkmarks
        document.querySelectorAll('.theme-check').forEach(el => el.classList.remove('visible'));
        const active = document.querySelector(`.theme-option[data-value="${choice}"] .theme-check`);
        if (active) active.classList.add('visible');
    }

    // Apply immediately to prevent flash of wrong theme
    const saved = localStorage.getItem('theme') || 'system';
    applyTheme(saved);

    // React to OS-level changes when mode is "system"
    osQuery.addEventListener('change', () => {
        if ((localStorage.getItem('theme') || 'system') === 'system') applyTheme('system');
    });

    // Wire up theme buttons after DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const choice = option.dataset.value;
                localStorage.setItem('theme', choice);
                applyTheme(choice);

                const btn = document.getElementById('theme-btn');
                if (btn) {
                    const bsDropdown = bootstrap.Dropdown.getInstance(btn);
                    if (bsDropdown) bsDropdown.hide();
                }
            });
        });

        applyTheme(localStorage.getItem('theme') || 'system');
    });
})();


/* ═══════════════════════════════════════
   PROJECT DESCRIPTION TOGGLE
   Called by onclick="toggleDesc(n)" in
   views/projects.php
═══════════════════════════════════════ */
function toggleDesc(index) {
    const wrapper = document.getElementById('proj-desc-' + index);
    const btn     = document.querySelector(`[data-project="${index}"] .proj-toggle-btn`);
    if (!wrapper || !btn) return;

    const collapsed = wrapper.classList.toggle('collapsed');

    btn.innerHTML =
        (collapsed ? 'Show more' : 'Show less') +
        ` <i class="fa-solid fa-chevron-down proj-toggle-icon${collapsed ? '' : ' rotated'}" id="proj-icon-${index}"></i>`;
}