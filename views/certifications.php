<!-- <?php
/**
 * views/certifications.php
 * Certifications section.
 * To add a new certification, copy one $certifications array item and fill in your details.
 */

$certifications = [
    [
        'name'   => 'PD 907 Civil Service Eligibility',
        'issuer' => 'Philippine Civil Service Commission · 2024',
    ],
    [
        'name'   => 'AWS Cloud Practitioner Essentials',
        'issuer' => 'Amazon Web Services · 2023',
    ],
    [
        'name'   => 'Responsive Web Design',
        'issuer' => 'freeCodeCamp · 2022',
    ],
    // ── Add more certifications below ──
    // [
    //     'name'   => 'Certification Name',
    //     'issuer' => 'Issuing Organization · Year',
    // ],
];
?>

<div class="card portfolio-card" id="certifications">
    <div class="card-header portfolio-card-header">
        <i class="fa-solid fa-scroll card-icon me-2"></i>Certifications
    </div>
    <div class="card-body d-flex flex-column gap-2">

        <?php foreach ($certifications as $index => $cert):
            $isLast = ($index === count($certifications) - 1);
        ?>
        <div class="cert-item <?= $isLast ? '' : 'pb-2' ?>">
            <div class="cert-name"><?= htmlspecialchars($cert['name']) ?></div>
            <div class="cert-issuer"><?= htmlspecialchars($cert['issuer']) ?></div>
        </div>
        <?php endforeach; ?>

    </div>
</div> -->