<?php

/**
 * views/projects.php
 * ─────────────────
 * Add / edit projects in the $projects array only.
 * The HTML template below never needs to change.
 *
 * Fields:
 *   featured    (bool)   — purple border + "Featured" badge
 *   status      (string) — right-side badge text ('Locally Deployed', 'Hardware', 'Live', etc.)
 *                          set to '' to hide
 *   image       (string) — path, e.g. './assets/img/projects/myproject.jpg'
 *   year        (string)
 *   type        (string) — 'Academic Project', 'Capstone Project', 'Embedded Systems', etc.
 *   type_icon   (string) — Font Awesome class, e.g. 'fa-solid fa-code'
 *   title       (string)
 *   subtitle    (string) — supports &amp; HTML entities
 *   description (string)
 *   tags        (array)  — technology chips
 *   source_url  (string) — GitHub/repo link; '' = hide button
 *   demo_url    (string) — live demo link;   '' = hide button
 */

$projects = [
    [
        'featured'    => true,
        'status'      => 'Expired',
        'image'       => './assets/img/projects/RJE.png',
        'year'        => '2025',
        'type'        => 'Capstone Project',
        'type_icon'   => 'fa-solid fa-code',
        'title'       => 'RJE Resort Management System',
        'subtitle'    => 'Resort Booking &amp; Reservation Management System',
        'description' => 'Developed a web-based resort management system for RJE Garden Resort to streamline reservation processing, guest management, and room/cottage monitoring. The system allows staff to manage bookings, track guest check-ins and check-outs, monitor availability in real-time, and generate reports for daily operations.',
        'tags'        => ['PHP', 'MySQL', 'CSS', 'HTML', 'Bootstrap', 'CodeIgniter'],
        'source_url'  => '',
        'demo_url'    => '',
    ],
    [
        'featured'    => false,
        'status'      => 'Locally Deployed',
        'image'       => './assets/img/projects/tplex.jpg',
        'year'        => '2024',
        'type'        => 'Academic Project',
        'type_icon'   => 'fa-solid fa-code',
        'title'       => 'TPLEX Incident Management System',
        'subtitle'    => 'Toll Road Incident Tracking &amp; Response',
        'description' => 'Developed a full-featured incident management system for TPLEX (Tarlac-Pangasinan-La Union Expressway) that streamlines the reporting, tracking, and resolution of road incidents. Features include incident status workflows, responder assignment, automated notifications, and detailed incident history for analytics and reporting.',
        'tags'        => ['Java', 'MySQL', 'JavaFX', 'JDBC'],
        'source_url'  => '',
        'demo_url'    => '',
    ],
    [
        'featured'    => false,
        'status'      => 'Hardware',
        'image'       => './assets/img/projects/arduino.jpg',
        'year'        => '2023',
        'type'        => 'Embedded Systems',
        'type_icon'   => 'fa-solid fa-microchip',
        'title'       => 'Arduino Controlled Appliance Switch',
        'subtitle'    => 'IoT Home Automation via Voice &amp; App',
        'description' => 'Designed and built an Arduino-based home automation system that allows users to control household appliances through relay modules and a serial interface. Demonstrates embedded systems fundamentals including digital I/O, relay logic, and real-time control.',
        'tags'        => ['Arduino', 'C/C++', 'Python', 'Raspberry Pi'],
        'source_url'  => '',
        'demo_url'    => '',
    ],
    // ── Paste a new project here to add it ──────────────────────────
    // [
    //     'featured'    => false,
    //     'status'      => 'Live',
    //     'image'       => './assets/img/projects/myproject.jpg',
    //     'year'        => '2026',
    //     'type'        => 'Personal Project',
    //     'type_icon'   => 'fa-solid fa-code',
    //     'title'       => 'My Project Title',
    //     'subtitle'    => 'Short one-liner subtitle',
    //     'description' => 'Full project description here.',
    //     'tags'        => ['Tag1', 'Tag2'],
    //     'source_url'  => 'https://github.com/yourrepo',
    //     'demo_url'    => 'https://yoursite.com',
    // ],
];
?>

<!-- ═══════════════════════════════════
     PROJECTS — single template, data-driven
     Add entries to $projects above; HTML below never changes.
════════════════════════════════════ -->
<div class="card portfolio-card" id="projects">
    <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-folder-open card-icon me-2"></i>Projects
    </div>
    <div class="card-body d-flex flex-column gap-3 p-3">

        <?php foreach ($projects as $i => $p): ?>
            <div class="proj-card <?= $p['featured'] ? 'featured' : '' ?>" data-project="<?= $i ?>">

                <!-- ── Badges ── -->
                <div class="proj-badges">
                    <span>
                        <?php if ($p['featured']): ?>
                            <span class="proj-badge-featured">
                                <i class="fa-solid fa-star me-1"></i>Featured
                            </span>
                        <?php endif; ?>
                    </span>
                    <?php if (!empty($p['status'])): ?>
                        <span class="proj-badge-status"><?= htmlspecialchars($p['status']) ?></span>
                    <?php endif; ?>
                </div>

                <!-- ── Preview Image ── -->
                <div class="proj-preview">
                    <img src="<?= htmlspecialchars($p['image']) ?>"
                        alt="<?= htmlspecialchars($p['title']) ?> Preview"
                        class="proj-preview-img"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                    <div class="proj-preview-placeholder">
                        <i class="fa-solid fa-display"></i>
                        <span>No preview available</span>
                    </div>
                </div>

                <!-- ── Meta ── -->
                <div class="proj-meta d-flex align-items-center gap-2 mt-3 mb-2">
                    <i class="fa-regular fa-calendar proj-meta-icon"></i>
                    <span class="proj-meta-year"><?= htmlspecialchars($p['year']) ?></span>
                    <span class="proj-meta-sep">•</span>
                    <i class="<?= htmlspecialchars($p['type_icon']) ?> proj-meta-icon"></i>
                    <span class="proj-meta-type"><?= htmlspecialchars($p['type']) ?></span>
                </div>

                <!-- ── Title ── -->
                <div class="proj-title"><?= htmlspecialchars($p['title']) ?></div>
                <div class="proj-subtitle"><?= $p['subtitle'] ?></div>

                <!-- ── Collapsible Description ── -->
                <div class="proj-desc-wrapper collapsed" id="proj-desc-<?= $i ?>">
                    <p class="proj-desc"><?= htmlspecialchars($p['description']) ?></p>
                </div>
                <button class="proj-toggle-btn" onclick="toggleDesc(<?= $i ?>)">
                    Show more
                    <i class="fa-solid fa-chevron-down proj-toggle-icon" id="proj-icon-<?= $i ?>"></i>
                </button>

                <!-- ── Technology Tags ── -->
                <?php if (!empty($p['tags'])): ?>
                    <div class="proj-tech-section mt-3">
                        <div class="proj-tech-label">
                            <i class="fa-solid fa-code me-1"></i> Technologies
                        </div>
                        <div class="d-flex flex-wrap gap-1 mt-2">
                            <?php foreach ($p['tags'] as $tag): ?>
                                <span class="chip"><?= htmlspecialchars($tag) ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endif; ?>

                <!-- ── Action Buttons (only renders if URLs are set) ── -->
                <?php if (!empty($p['source_url']) || !empty($p['demo_url'])): ?>
                    <div class="proj-actions mt-3">
                        <?php if (!empty($p['source_url'])): ?>
                            <a href="<?= htmlspecialchars($p['source_url']) ?>" target="_blank" class="proj-action-btn">
                                <i class="fa-solid fa-code me-2"></i>Source Code
                            </a>
                        <?php endif; ?>
                        <?php if (!empty($p['demo_url'])): ?>
                            <a href="<?= htmlspecialchars($p['demo_url']) ?>" target="_blank" class="proj-action-btn-secondary">
                                <i class="fa-solid fa-arrow-up-right-from-square me-2"></i>Live Demo
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

            </div>
        <?php endforeach; ?>

    </div>

</div>