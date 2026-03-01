<?php
/**
 * views/technologies.php
 * Technologies section.
 * To add a new group, copy one $tech_groups array item and fill in your details.
 */

$tech_groups = [
    [
        'label' => 'Networking &amp; Protocols',
        'tags'  => ['Routing &amp; Switching', 'Network Config &amp; Troubleshooting', 'ACLs', 'STP', 'EIGRP', 'OSPF'],
    ],
    [
        'label' => 'Monitoring &amp; Admin Tools',
        'tags'  => ['Cacti', 'Grafana'],
    ],
    [
        'label' => 'Operating Systems &amp; Virtualization',
        'tags'  => ['Linux (Ubuntu, CentOS, Kali)', 'Windows Server', 'VMware', 'VirtualBox'],
    ],
    [
        'label' => 'Remote &amp; Network Tools',
        'tags'  => ['PuTTY', 'Wireshark', 'VNC', 'TeamViewer', 'Raspberry Pi'],
    ],
    [
        'label' => 'Embedded &amp; Scripting',
        'tags'  => ['Python', 'Bash', 'C/C++', 'Arduino'],
    ],
    [
        'label' => 'Web Development',
        'tags'  => ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'CodeIgniter', 'MySQL'],
    ],
    // ── Add more groups below ──
    // [
    //     'label' => 'Group Name',
    //     'tags'  => ['Tag1', 'Tag2'],
    // ],
];
?>

<div class="card portfolio-card" id="technologies">
    <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-code card-icon me-2"></i>Technologies
    </div>
    <div class="card-body d-flex flex-column gap-3">

        <?php foreach ($tech_groups as $group): ?>
        <div class="tech-group">
            <div class="tech-group-label mb-2"><?= $group['label'] ?></div>
            <div class="d-flex flex-wrap gap-1">
                <?php foreach ($group['tags'] as $tag): ?>
                <span class="chip"><?= $tag ?></span>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endforeach; ?>

    </div>
</div>