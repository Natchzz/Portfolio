<?php

/**
 * views/achievements.php
 * Achievements & Experience timeline section.
 * To add a new entry, copy one $experiences array item and fill in your details.
 */

$experiences = [
    [
        'date'     => 'June 2024 – July 2024',
        'role'     => 'Intern | IT Support',
        'company'  => 'Zeldan Nordic Language Review Center',
        'location' => 'Baguio City',
        'active'   => true,
        'tags'     => ['Networking', 'Windows', 'Laravel', 'MySQL', 'PHP', 'Bootstrap'],
    ],
    // ── Add more entries below ──
    [
        'date'     => 'Month YYYY – Month YYYY',
        'role'     => 'Your Role',
        'company'  => 'Company Name',
        'location' => 'City',
        'active'   => false,
        'tags'     => ['Tag1', 'Tag2'],
    ],
];
?>

<div class="card portfolio-card" id="experience">
    <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-medal card-icon me-2"></i>Achievements and Experiences
    </div>
    <div class="card-body">
        <div class="portfolio-timeline">

            <?php foreach ($experiences as $index => $exp): ?>
                <div class="tl-item">
                    <div class="tl-dot <?= $exp['active'] ? 'active' : '' ?>"></div>
                    <div class="tl-content">
                        <div class="tl-date"><?= htmlspecialchars($exp['date']) ?></div>
                        <div class="tl-role"><?= htmlspecialchars($exp['role']) ?></div>
                        <div class="tl-company"><?= htmlspecialchars($exp['company']) ?></div>
                        <div class="tl-location"><?= htmlspecialchars($exp['location']) ?></div>
                        <?php if (!empty($exp['tags'])): ?>
                            <div class="d-flex flex-wrap gap-1 mt-2">
                                <?php foreach ($exp['tags'] as $tag): ?>
                                    <span class="chip"><?= htmlspecialchars($tag) ?></span>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>

        </div>
    </div>
</div>