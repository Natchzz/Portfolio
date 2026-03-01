<?php
/**
 * views/badges.php
 * Cisco Badges section.
 * To add a new badge, copy one $badges array item and fill in your details.
 */

$badges = [
    [
        'icon' => 'fa-solid fa-route',
        'name' => 'Network Technician Career Path',
        'date' => 'Feb 16, 2026',
    ],
    [
        'icon' => 'fa-solid fa-network-wired',
        'name' => 'Network Support and Security',
        'date' => 'Feb 16, 2026',
    ],
    [
        'icon' => 'fa-solid fa-sitemap',
        'name' => 'Network Addressing and Basic Troubleshooting',
        'date' => 'Feb 2, 2026',
    ],
    [
        'icon' => 'fa-solid fa-lock',
        'name' => 'Endpoint Security',
        'date' => 'Dec 17, 2025',
    ],
    [
        'icon' => 'fa-solid fa-triangle-exclamation',
        'name' => 'Cyber Threat Management',
        'date' => 'Nov 1, 2025',
    ],
    [
        'icon' => 'fa-solid fa-server',
        'name' => 'Networking Devices and Initial Configuration',
        'date' => 'Nov 29, 2025',
    ],
    [
        'icon' => 'fa-solid fa-wifi',
        'name' => 'Networking Basics',
        'date' => 'Nov 14, 2025',
    ],
    [
        'icon' => 'fa-solid fa-user-shield',
        'name' => 'Introduction to Cybersecurity',
        'date' => 'Feb 16, 2024',
    ],
    // ── Add more badges below ──
    // [
    //     'icon' => 'fa-solid fa-shield-halved',
    //     'name' => 'Badge Name',
    //     'date' => 'Mon DD, YYYY',
    // ],
];
?>

<div class="card portfolio-card" id="badges">
    <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-shield-halved card-icon me-2"></i>Cisco Badges
    </div>
    <div class="card-body p-0">

        <?php foreach ($badges as $index => $badge):
            $isLast = ($index === count($badges) - 1);
        ?>
        <div class="badge-item <?= $isLast ? 'badge-item-last' : '' ?>">
            <div class="badge-icon-wrap">
                <i class="<?= htmlspecialchars($badge['icon']) ?> badge-cisco-icon"></i>
            </div>
            <div class="badge-info">
                <div class="badge-name"><?= htmlspecialchars($badge['name']) ?></div>
                <div class="badge-meta">
                    <span class="badge-cisco-pill">Cisco</span>
                    <?= htmlspecialchars($badge['date']) ?>
                </div>
            </div>
        </div>
        <?php endforeach; ?>

    </div>
</div>