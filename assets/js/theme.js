/**
 * theme.js — Portfolio Theme Manager + Partial Loader + Project Toggles
 *
 * Partials are loaded from the views/ folder via fetch().
 * NOTE: fetch() requires a local server (e.g. VS Code Live Server,
 * or run: npx serve . in your project folder).
 * It will NOT work by opening index.html directly as a file:// URL.
 */

/* ═══════════════════════════════════════
   THEME MANAGER
   Runs immediately (before DOM ready) to
   prevent flash of wrong theme on load.
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
   PARTIAL LOADER
   Fetches each views/*.html file and
   injects it into its slot <div>.
═══════════════════════════════════════ */

/**
 * Load a single HTML partial into a slot element.
 * @param {string} slotId   - The id of the target <div> (e.g. 'slot-projects')
 * @param {string} filePath - Path to the partial (e.g. './views/projects.html')
 */
async function loadPartial(slotId, filePath) {
  const slot = document.getElementById(slotId);
  if (!slot) return;

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`Failed to load ${filePath} (${res.status})`);
    slot.innerHTML = await res.text();
  } catch (err) {
    console.error(`[Partial Loader] ${err.message}`);
    slot.innerHTML = `<div class="alert alert-danger small">Could not load <strong>${filePath}</strong>. Make sure you are running a local server (e.g. VS Code Live Server).</div>`;
  }
}

/**
 * Load all partials in parallel, then run post-load setup.
 */
async function loadAllPartials() {
  await Promise.all([
    // Left column
    loadPartial('slot-achievements',  './views/achievements.html'),
    loadPartial('slot-projects',      './views/projects.html'),
    loadPartial('slot-certifications','./views/certifications.html'),
    // Right column
    loadPartial('slot-technologies',  './views/technologies.html'),
    loadPartial('slot-badges',        './views/badges.html'),
  ]);

  // Run any setup that depends on the injected HTML being present
  postLoadSetup();
}

/**
 * Runs after all partials are loaded into the DOM.
 */
function postLoadSetup() {
  // Re-apply theme checkmarks (theme dropdown is static, but good to be safe)
  const saved = localStorage.getItem('theme') || 'system';
  document.querySelectorAll('.theme-check').forEach(el => el.classList.remove('visible'));
  const active = document.querySelector(`.theme-option[data-value="${saved}"] .theme-check`);
  if (active) active.classList.add('visible');
}

// Kick off loading once the DOM is ready
document.addEventListener('DOMContentLoaded', loadAllPartials);


/* ═══════════════════════════════════════
   PROJECT DESCRIPTION TOGGLE
   Global function called by onclick in
   views/projects.html
═══════════════════════════════════════ */
function toggleDesc(index) {
  const wrapper   = document.getElementById('proj-desc-' + index);
  const btn       = document.querySelector(`[data-project="${index}"] .proj-toggle-btn`);
  if (!wrapper || !btn) return;

  const collapsed = wrapper.classList.toggle('collapsed');

  btn.innerHTML =
    (collapsed ? 'Show more' : 'Show less') +
    ` <i class="fa-solid fa-chevron-down proj-toggle-icon${collapsed ? '' : ' rotated'}" id="proj-icon-${index}"></i>`;
}