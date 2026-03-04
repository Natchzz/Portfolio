/**
 * chatbot.js — AI Portfolio Chatbot
 */

(function () {

  const SYSTEM_PROMPT = `You are Floyd's friendly AI portfolio assistant. You help visitors learn about Floyd Mark Ancheta's background, skills, projects, and experience. Be concise, warm, and helpful. Keep responses short (2-4 sentences max unless asked for more). Never show your thinking or reasoning process — respond directly with your answer only. Do not use phrases like "The user asked..." or internal deliberation.

Here's what you know about Floyd:
- Full name: Floyd Mark Ancheta
- Location: Pangasinan, Philippines
- Role: System and Network Engineer
- Education: BS Computer Engineering, Major in System and Network Administration — Pangasinan State University, Urdaneta City, 2021–2025
- Email: anchetafloydmark@gmail.com
- GitHub: github.com/Natchzz
- LinkedIn: linkedin.com/in/floydancheta
- Facebook: facebook.com/floydmark.ancheta

Skills & Technologies:
- Networking: Routing & Switching, ACLs, STP, EIGRP, OSPF, Network Troubleshooting
- Monitoring: Cacti, Grafana
- OS & Virtualization: Linux (Ubuntu, CentOS, Kali), Windows Server, VMware, VirtualBox
- Remote/Network Tools: PuTTY, Wireshark, VNC, TeamViewer, Raspberry Pi
- Embedded & Scripting: Python, Bash, C/C++, Arduino
- Web Dev: HTML, CSS, JavaScript, Bootstrap, PHP, CodeIgniter, MySQL

Projects:
1. RJE Resort Management System (2025, Capstone) — Web-based resort booking system using PHP, MySQL, CodeIgniter, Bootstrap. Handles reservations, guest check-in/out, real-time availability, and reporting.
2. TPLEX Incident Management System (2024, Academic) — Java/JavaFX/MySQL desktop system for the Tarlac-Pangasinan-La Union Expressway. Manages incident reporting, status workflows, responder assignment, and notifications.
3. Arduino Controlled Appliance Switch (2023, Embedded) — Arduino home automation system with relay modules for voice/app-controlled appliances, using C/C++ and Python.

Experience:
- Intern | IT Support at Zeldan Nordic Language Review Center, Baguio City (June-July 2024)
  Skills: Networking, Windows, Laravel, MySQL, PHP, Bootstrap

Cisco Badges:
- Network Technician Career Path (Feb 2026)
- Network Support and Security (Feb 2026)
- Network Addressing and Basic Troubleshooting (Feb 2026)
- Endpoint Security (Dec 2025)
- Cyber Threat Management (Nov 2025)
- Networking Devices and Initial Configuration (Nov 2025)
- Networking Basics (Nov 2025)
- Introduction to Cybersecurity (Feb 2024)

If asked about things unrelated to Floyd or his portfolio, politely redirect the conversation. Always be encouraging and professional.`;

  const QUICK_REPLIES = [
    "What are Floyd's skills?",
    "Tell me about his projects",
    "His work experience?",
    "How to contact Floyd?",
    "His Cisco badges?",
  ];

  let conversationHistory = [];
  let isOpen = false;
  let isLoading = false;
  let dotHidden = false;

  function buildChatUI() {
    const fab = document.createElement("button");
    fab.className = "chat-fab";
    fab.id = "chat-fab";
    fab.setAttribute("aria-label", "Open AI Assistant");
    fab.innerHTML = `
      <i class="fa-solid fa-robot fab-icon-open"></i>
      <i class="fa-solid fa-xmark fab-icon-close"></i>
      <span class="chat-fab-dot" id="chat-dot"></span>
    `;
    fab.addEventListener("click", toggleChat);

    const win = document.createElement("div");
    win.className = "chat-window";
    win.id = "chat-window";
    win.style.display = "none";
    win.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="chat-header-info">
          <div class="chat-header-name">Floyd's AI Assistant</div>
          <div class="chat-header-status">Online</div>
        </div>
        <button class="chat-header-close" id="chat-close-btn" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-quick-replies" id="chat-quick-replies"></div>
      <div class="chat-input-area">
        <textarea class="chat-input" id="chat-input" placeholder="Ask me anything about Floyd..." rows="1"></textarea>
        <button class="chat-send-btn" id="chat-send-btn" aria-label="Send">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
      <div class="chat-footer">Powered by AI · Responses may vary</div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(win);

    document.getElementById("chat-close-btn").addEventListener("click", toggleChat);
    document.getElementById("chat-send-btn").addEventListener("click", handleSend);
    document.getElementById("chat-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    document.getElementById("chat-input").addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = Math.min(this.scrollHeight, 80) + "px";
    });
  }

  function toggleChat() {
    const fab = document.getElementById("chat-fab");
    const win = document.getElementById("chat-window");
    isOpen = !isOpen;

    if (isOpen) {
      const dot = document.getElementById("chat-dot");
      if (dot && !dotHidden) { dot.style.display = "none"; dotHidden = true; }
      fab.classList.add("open");
      win.style.display = "flex";
      win.style.flexDirection = "column";
      win.classList.remove("closing");
      const msgs = document.getElementById("chat-messages");
      if (msgs.children.length === 0) {
        setTimeout(() => {
          appendMessage("bot", "Hi there! I'm Floyd's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!");
          renderQuickReplies(QUICK_REPLIES);
        }, 300);
      }
      setTimeout(() => document.getElementById("chat-input")?.focus(), 400);
    } else {
      fab.classList.remove("open");
      win.classList.add("closing");
      setTimeout(() => { win.style.display = "none"; }, 200);
    }
  }

  function renderMarkdown(text) {
    let t = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/\*(.+?)\*/g, "<em>$1</em>");
    t = t.replace(/`(.+?)`/g, "<code style='background:rgba(124,58,237,0.15);padding:1px 5px;border-radius:4px;font-size:0.75rem;'>$1</code>");
    t = t.replace(/^#{1,3}\s+(.+)$/gm, "<div style='font-weight:700;margin:8px 0 3px;'><strong>$1</strong></div>");
    t = t.replace(/^\d+\.\s+(.+)$/gm, "<div style='margin:5px 0;display:flex;gap:7px;align-items:flex-start'><span style='color:var(--accent);font-weight:700;flex-shrink:0'>•</span><span>$1</span></div>");
    t = t.replace(/^[-*]\s+(.+)$/gm, "<div style='margin:5px 0;display:flex;gap:7px;align-items:flex-start'><span style='color:var(--accent);font-weight:700;flex-shrink:0'>•</span><span>$1</span></div>");
    t = t.replace(/\n\n/g, "<div style='margin:5px 0'></div>");
    t = t.replace(/\n/g, "<br>");
    return t;
  }

  function appendMessage(sender, text) {
    const container = document.getElementById("chat-messages");
    const isBot = sender === "bot";
    const wrap = document.createElement("div");
    wrap.className = "chat-msg " + sender;
    const formatted = isBot ? renderMarkdown(text) : escapeHtml(text).replace(/\n/g, "<br>");
    wrap.innerHTML =
      '<div class="chat-msg-avatar"><i class="fa-solid ' + (isBot ? "fa-robot" : "fa-user") + '"></i></div>' +
      '<div class="chat-bubble">' + formatted + "</div>";
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
  }

  function showTyping() {
    const container = document.getElementById("chat-messages");
    const el = document.createElement("div");
    el.className = "chat-typing";
    el.id = "chat-typing";
    el.innerHTML = '<div class="chat-msg-avatar"><i class="fa-solid fa-robot"></i></div><div class="chat-typing-dots"><span></span><span></span><span></span></div>';
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById("chat-typing");
    if (el) el.remove();
  }

  function renderQuickReplies(replies) {
    const qr = document.getElementById("chat-quick-replies");
    if (!qr) return;
    qr.innerHTML = replies.map(r =>
      '<button class="chat-quick-btn" data-msg="' + escapeAttr(r) + '">' + escapeHtml(r) + "</button>"
    ).join("");
    qr.querySelectorAll(".chat-quick-btn").forEach(btn => {
      btn.addEventListener("click", () => { sendMessage(btn.dataset.msg); qr.innerHTML = ""; });
    });
  }

  function handleSend() {
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text || isLoading) return;
    input.value = "";
    input.style.height = "auto";
    document.getElementById("chat-quick-replies").innerHTML = "";
    sendMessage(text);
  }

  async function sendMessage(text) {
    if (isLoading) return;
    isLoading = true;
    const sendBtn = document.getElementById("chat-send-btn");
    if (sendBtn) sendBtn.disabled = true;
    appendMessage("user", text);
    conversationHistory.push({ role: "user", content: text });
    showTyping();

    try {
      const messages = [{ role: "system", content: SYSTEM_PROMPT }]
        .concat(conversationHistory);

      // Auto-detect local vs production — API key is safe on Vercel
      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const API_URL = isLocal
        ? "http://localhost:3000/api/chat"
        : "https://portfolio-three-pi-kmcywc10cn.vercel.app/api/chat";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages }),
      });

      const data = await response.json();
      hideTyping();
      let reply = "Sorry, I couldn't get a response right now. Please try again!";
      if (data && data.choices && data.choices[0]) {
        const msg = data.choices[0].message;
        // Use only content, never reasoning (prevents StepFun thinking leak)
        let txt = msg && msg.content;
        if (txt) {
          // Strip any reasoning block that starts with common thinking patterns
          txt = txt.replace(/^[\s\S]*?(?=(?:Floyd|Hi|Sure|Of course|Here|Based|I'd|I can|Let me provide|The|According|As Floyd))/i, "").trim();
          reply = txt || msg.content.trim();
        } else {
          reply = "Sorry, I couldn't get a response right now.";
        }
      } else if (data && data.error) {
        reply = "Error: " + JSON.stringify(data.error);
      }
      conversationHistory.push({ role: "assistant", content: reply });
      appendMessage("bot", reply);
      renderQuickReplies(getFollowUps(text));
    } catch (err) {
      hideTyping();
      appendMessage("bot", "Error: " + err.message);
    } finally {
      isLoading = false;
      if (sendBtn) sendBtn.disabled = false;
      const inp = document.getElementById("chat-input");
      if (inp) inp.focus();
    }
  }

  function getFollowUps(query) {
    const q = query.toLowerCase();
    if (q.includes("project") || q.includes("rje") || q.includes("tplex") || q.includes("arduino"))
      return ["What tech stack?", "His other projects?", "Any live demos?"];
    if (q.includes("skill") || q.includes("tech") || q.includes("know"))
      return ["Tell me about his projects", "His certifications?", "Work experience?"];
    if (q.includes("contact") || q.includes("email") || q.includes("hire"))
      return ["His GitHub?", "His LinkedIn?", "Where is Floyd located?"];
    if (q.includes("cert") || q.includes("cisco") || q.includes("badge"))
      return ["His networking skills?", "Tell me about his projects", "His education?"];
    if (q.includes("educat") || q.includes("school") || q.includes("degree"))
      return ["His skills?", "Tell me about his projects", "His work experience?"];
    return ["His projects?", "His skills?", "How to contact Floyd?"];
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  }
  function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildChatUI);
  } else {
    buildChatUI();
  }

})();