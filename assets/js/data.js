/**
 * data.js — Portfolio Data
 * ════════════════════════
 * Edit the arrays below to update your portfolio.
 * The HTML render files never need to change.
 */

/* ══════════════════════════════════
   PROJECTS
══════════════════════════════════ */
const projects = [
  {
    featured:    true,
    status:      "Expired",
    image:       "./assets/img/projects/RJE.png",
    year:        "2025",
    type:        "Capstone Project",
    typeIcon:    "fa-solid fa-code",
    title:       "RJE Resort Management System",
    subtitle:    "Resort Booking & Reservation Management System",
    description: "Developed a web-based resort management system for RJE Garden Resort to streamline reservation processing, guest management, and room/cottage monitoring. The system allows staff to manage bookings, track guest check-ins and check-outs, monitor availability in real-time, and generate reports for daily operations.",
    tags:        ["PHP", "MySQL", "CSS", "HTML", "Bootstrap", "CodeIgniter"],
    sourceUrl:   "",
    demoUrl:     "",
  },
  {
    featured:    false,
    status:      "Locally Deployed",
    image:       "./assets/img/projects/tplex.jpg",
    year:        "2024",
    type:        "Academic Project",
    typeIcon:    "fa-solid fa-code",
    title:       "TPLEX Incident Management System",
    subtitle:    "Toll Road Incident Tracking & Response",
    description: "Developed a full-featured incident management system for TPLEX (Tarlac-Pangasinan-La Union Expressway) that streamlines the reporting, tracking, and resolution of road incidents. Features include incident status workflows, responder assignment, automated notifications, and detailed incident history for analytics and reporting.",
    tags:        ["Java", "MySQL", "JavaFX", "JDBC"],
    sourceUrl:   "",
    demoUrl:     "",
  },
  {
    featured:    false,
    status:      "Hardware",
    image:       "./assets/img/projects/arduino.jpg",
    year:        "2023",
    type:        "Embedded Systems",
    typeIcon:    "fa-solid fa-microchip",
    title:       "Arduino Controlled Appliance Switch",
    subtitle:    "IoT Home Automation via Voice & App",
    description: "Designed and built an Arduino-based home automation system that allows users to control household appliances through relay modules and a serial interface. Demonstrates embedded systems fundamentals including digital I/O, relay logic, and real-time control.",
    tags:        ["Arduino", "C/C++", "Python", "Raspberry Pi"],
    sourceUrl:   "",
    demoUrl:     "",
  },
  // ── Add a new project here ──────────────────────────────────────
//   {
//     featured:    false,
//     status:      "Live",
//     image:       "./assets/img/projects/myproject.jpg",
//     year:        "2026",
//     type:        "Personal Project",
//     typeIcon:    "fa-solid fa-code",
//     title:       "My Project Title",
//     subtitle:    "Short one-liner subtitle",
//     description: "Full project description here.",
//     tags:        ["Tag1", "Tag2"],
//     sourceUrl:   "https://github.com/yourrepo",
//     demoUrl:     "https://yoursite.com",
//   },
];


/* ══════════════════════════════════
   ACHIEVEMENTS & EXPERIENCE
══════════════════════════════════ */
const achievements = [
  {
    date:     "June 2024 – July 2024",
    role:     "Intern | IT Support",
    company:  "Zeldan Nordic Language Review Center",
    location: "Baguio City",
    active:   true,
    tags:     ["Networking", "Windows", "Laravel", "MySQL", "PHP", "Bootstrap"],
  },
  // ── Add a new entry here ────────────────────────────────────────
  // {
  //   date:     "Month YYYY – Month YYYY",
  //   role:     "Your Role",
  //   company:  "Company Name",
  //   location: "City",
  //   active:   false,
  //   tags:     ["Tag1", "Tag2"],
  // },
];


/* ══════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════ */
const certifications = [
//   { name: "PD 907 Civil Service Eligibility",    issuer: "Philippine Civil Service Commission · 2024" },
//   { name: "AWS Cloud Practitioner Essentials",   issuer: "Amazon Web Services · 2023" },
//   { name: "Responsive Web Design",               issuer: "freeCodeCamp · 2022" },
  // ── Add a new certification here ────────────────────────────────
  // { name: "Certification Name", issuer: "Issuing Organization · Year" },
];


/* ══════════════════════════════════
   TECHNOLOGIES
══════════════════════════════════ */
const technologies = [
  {
    label: "Networking & Protocols",
    tags:  ["Routing & Switching", "Network Config & Troubleshooting", "ACLs", "STP", "EIGRP", "OSPF"],
  },
  {
    label: "Monitoring & Admin Tools",
    tags:  ["Cacti", "Grafana"],
  },
  {
    label: "Operating Systems & Virtualization",
    tags:  ["Linux (Ubuntu, CentOS, Kali)", "Windows Server", "VMware", "VirtualBox"],
  },
  {
    label: "Remote & Network Tools",
    tags:  ["PuTTY", "Wireshark", "VNC", "TeamViewer", "Raspberry Pi"],
  },
  {
    label: "Embedded & Scripting",
    tags:  ["Python", "Bash", "C/C++", "Arduino"],
  },
  {
    label: "Web Development",
    tags:  ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "CodeIgniter", "MySQL"],
  },
  // ── Add a new group here ─────────────────────────────────────────
  // { label: "Group Name", tags: ["Tag1", "Tag2"] },
];


/* ══════════════════════════════════
   CISCO BADGES
══════════════════════════════════ */
const badges = [
  { icon: "fa-solid fa-route",                name: "Network Technician Career Path",                  date: "Feb 16, 2026" },
  { icon: "fa-solid fa-network-wired",        name: "Network Support and Security",                    date: "Feb 16, 2026" },
  { icon: "fa-solid fa-sitemap",              name: "Network Addressing and Basic Troubleshooting",    date: "Feb 2, 2026"  },
  { icon: "fa-solid fa-lock",                 name: "Endpoint Security",                               date: "Dec 17, 2025" },
  { icon: "fa-solid fa-triangle-exclamation", name: "Cyber Threat Management",                         date: "Nov 1, 2025"  },
  { icon: "fa-solid fa-server",               name: "Networking Devices and Initial Configuration",    date: "Nov 29, 2025" },
  { icon: "fa-solid fa-wifi",                 name: "Networking Basics",                               date: "Nov 14, 2025" },
  { icon: "fa-solid fa-user-shield",          name: "Introduction to Cybersecurity",                   date: "Feb 16, 2024" },
  // ── Add a new badge here ─────────────────────────────────────────
  // { icon: "fa-solid fa-shield-halved", name: "Badge Name", date: "Mon DD, YYYY" },
];