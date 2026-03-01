/**
 * render.js — Portfolio Renderer
 * ═══════════════════════════════
 * Reads from data.js and builds the HTML for each section.
 * You should never need to edit this file.
 */

/* ══════════════════════════════════
   PROJECTS
══════════════════════════════════ */
function renderProjects() {
  const container = document.getElementById("slot-projects");
  if (!container) return;

  container.innerHTML = `
    <div class="card portfolio-card" id="projects">
      <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-folder-open card-icon me-2"></i>Projects
      </div>
      <div class="card-body d-flex flex-column gap-3 p-3">
        ${projects.map((p, i) => `
          <div class="proj-card ${p.featured ? "featured" : ""}" data-project="${i}">

            <div class="proj-badges">
              <span>${p.featured ? `<span class="proj-badge-featured"><i class="fa-solid fa-star me-1"></i>Featured</span>` : ""}</span>
              ${p.status ? `<span class="proj-badge-status">${p.status}</span>` : ""}
            </div>

            <div class="proj-preview">
              <img src="${p.image}" alt="${p.title} Preview" class="proj-preview-img"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="proj-preview-placeholder">
                <i class="fa-solid fa-display"></i><span>No preview available</span>
              </div>
            </div>

            <div class="proj-meta d-flex align-items-center gap-2 mt-3 mb-2">
              <i class="fa-regular fa-calendar proj-meta-icon"></i>
              <span class="proj-meta-year">${p.year}</span>
              <span class="proj-meta-sep">•</span>
              <i class="${p.typeIcon} proj-meta-icon"></i>
              <span class="proj-meta-type">${p.type}</span>
            </div>

            <div class="proj-title">${p.title}</div>
            <div class="proj-subtitle">${p.subtitle}</div>

            <div class="proj-desc-wrapper collapsed" id="proj-desc-${i}">
              <p class="proj-desc">${p.description}</p>
            </div>
            <button class="proj-toggle-btn" onclick="toggleDesc(${i})">
              Show more <i class="fa-solid fa-chevron-down proj-toggle-icon" id="proj-icon-${i}"></i>
            </button>

            ${p.tags.length ? `
            <div class="proj-tech-section mt-3">
              <div class="proj-tech-label"><i class="fa-solid fa-code me-1"></i> Technologies</div>
              <div class="d-flex flex-wrap gap-1 mt-2">
                ${p.tags.map(tag => `<span class="chip">${tag}</span>`).join("")}
              </div>
            </div>` : ""}

            ${p.sourceUrl || p.demoUrl ? `
            <div class="proj-actions mt-3">
              ${p.sourceUrl ? `<a href="${p.sourceUrl}" target="_blank" class="proj-action-btn"><i class="fa-solid fa-code me-2"></i>Source Code</a>` : ""}
              ${p.demoUrl  ? `<a href="${p.demoUrl}"   target="_blank" class="proj-action-btn-secondary"><i class="fa-solid fa-arrow-up-right-from-square me-2"></i>Live Demo</a>` : ""}
            </div>` : ""}

          </div>
        `).join("")}
      </div>
    </div>`;
}


/* ══════════════════════════════════
   ACHIEVEMENTS
══════════════════════════════════ */
function renderAchievements() {
  const container = document.getElementById("slot-achievements");
  if (!container) return;

  container.innerHTML = `
    <div class="card portfolio-card" id="experience">
      <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-medal card-icon me-2"></i>Achievements and Experiences
      </div>
      <div class="card-body">
        <div class="portfolio-timeline">
          ${achievements.map((a, i) => `
            <div class="tl-item">
              <div class="tl-dot ${a.active ? "active" : ""}"></div>
              <div class="tl-content">
                <div class="tl-date">${a.date}</div>
                <div class="tl-role">${a.role}</div>
                <div class="tl-company">${a.company}</div>
                <div class="tl-location">${a.location}</div>
                ${a.tags.length ? `
                <div class="d-flex flex-wrap gap-1 mt-2">
                  ${a.tags.map(tag => `<span class="chip">${tag}</span>`).join("")}
                </div>` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>`;
}


/* ══════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════ */
function renderCertifications() {
  const container = document.getElementById("slot-certifications");
  if (!container) return;

  container.innerHTML = `
    <div class="card portfolio-card" id="certifications">
      <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-scroll card-icon me-2"></i>Certifications
      </div>
      <div class="card-body d-flex flex-column gap-2">
        ${certifications.map((c, i) => `
          <div class="cert-item ${i < certifications.length - 1 ? "pb-2" : ""}">
            <div class="cert-name">${c.name}</div>
            <div class="cert-issuer">${c.issuer}</div>
          </div>
        `).join("")}
      </div>
    </div>`;
}


/* ══════════════════════════════════
   TECHNOLOGIES
══════════════════════════════════ */
function renderTechnologies() {
  const container = document.getElementById("slot-technologies");
  if (!container) return;

  container.innerHTML = `
    <div class="card portfolio-card" id="technologies">
      <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-code card-icon me-2"></i>Technologies
      </div>
      <div class="card-body d-flex flex-column gap-3">
        ${technologies.map(group => `
          <div class="tech-group">
            <div class="tech-group-label mb-2">${group.label}</div>
            <div class="d-flex flex-wrap gap-1">
              ${group.tags.map(tag => `<span class="chip">${tag}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>`;
}


/* ══════════════════════════════════
   CISCO BADGES
══════════════════════════════════ */
function renderBadges() {
  const container = document.getElementById("slot-badges");
  if (!container) return;

  container.innerHTML = `
    <div class="card portfolio-card" id="badges">
      <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-shield-halved card-icon me-2"></i>Cisco Badges
      </div>
      <div class="card-body p-0">
        ${badges.map((b, i) => `
          <div class="badge-item ${i === badges.length - 1 ? "badge-item-last" : ""}">
            <div class="badge-icon-wrap"><i class="${b.icon} badge-cisco-icon"></i></div>
            <div class="badge-info">
              <div class="badge-name">${b.name}</div>
              <div class="badge-meta">
                <span class="badge-cisco-pill">Cisco</span> ${b.date}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>`;
}


/* ══════════════════════════════════
   INIT — run all renderers on load
══════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderAchievements();
  renderCertifications();
  renderTechnologies();
  renderBadges();
});