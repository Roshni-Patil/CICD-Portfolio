/* ============================================================
   ROSHNI PATIL — PORTFOLIO SCRIPT
   ============================================================
   HOW TO UPDATE:
   - Projects → edit the PROJECTS array below
   - Blogs    → edit the BLOGS array below
   - Certs    → edit the CERTS array below
   - Skills   → edit the SKILLS array below
   ============================================================ */

/* ===================== DATA ===================== */

const SKILLS = [
  { icon: 'fa-brands fa-redhat',       name: 'Red Hat / RHEL' },
  { icon: 'fa-solid fa-dharmachakra',  name: 'Kubernetes' },
  { icon: 'fa-solid fa-layer-group',   name: 'OpenShift' },
  { icon: 'fa-brands fa-docker',       name: 'Docker' },
  { icon: 'fa-solid fa-robot',         name: 'Ansible' },
  { icon: 'fa-brands fa-aws',          name: 'AWS' },
  { icon: 'fa-solid fa-terminal',      name: 'Bash / Shell' },
  { icon: 'fa-brands fa-git-alt',      name: 'Git' },
  { icon: 'fa-solid fa-infinity',      name: 'CI/CD' },
  { icon: 'fa-solid fa-chart-line',    name: 'Prometheus' },
  { icon: 'fa-solid fa-gauge',         name: 'Grafana' },
  { icon: 'fa-brands fa-python',       name: 'Python' },
  { icon: 'fa-solid fa-cloud',         name: 'Cloud Native' },
  { icon: 'fa-solid fa-network-wired', name: 'Networking' },
];

/* ------ PROJECTS — add / edit your projects here ------ */
const PROJECTS = [
  // {
  //   icon: '☸️',
  //   title: 'Kubernetes Monitoring Stack',
  //   short: 'Production-grade observability setup with Prometheus, Grafana and AlertManager on bare-metal Kubernetes.',
  //   desc: 'Deployed a full observability stack using kube-prometheus-stack helm chart. Configured custom dashboards for node, pod, and application metrics. Set up PagerDuty alerting rules.',
  //   stack: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana', 'AlertManager'],
  //   link: 'https://github.com/Roshni-Patil',
  // },

];

/* ------ CERTIFICATES — set link: 'https://...' to enable View Certificate ------ */
const CERTS = [
  {
    title: 'Red Hat Certified System Administrator',
    exam: 'EX200', issuer: 'Red Hat', status: 'completed',
    id: '210-213-948', version: 'RHEL 9, RHEL 8',
    link: 'https://www.credly.com/badges/1e522316-cc0f-4e34-8095-2ec0d0984bcf/public_url',   // e.g. 'https://rhtapps.redhat.com/verify?certId=XXXX'
  },
  {
    title: 'Red Hat Certified Engineer',
    exam: 'EX294', issuer: 'Red Hat', status: 'completed',
    id: '210-213-948', version: 'RHEL 8, Ansible 2.8',
    link: 'https://www.credly.com/badges/ba4f55e1-830d-440b-9f5e-cd13b267ee96/public_url',   // e.g. 'https://rhtapps.redhat.com/verify?certId=XXXX'
  },
  {
    title: 'Red Hat Certified in OpenShift Virtualization',
    exam: 'EX280', issuer: 'Red Hat', status: 'completed',
    id: '210-213-948', version: 'OCP 4.14',
    link: 'https://www.credly.com/badges/7ef5f06c-e98d-4f11-8d4e-d8ea41800036/public_url',
  },
  {
    title: 'Red Hat Certified Specialist in OpenShift AI',
    exam: 'EX267', issuer: 'Red Hat', status: 'completed',
    id: '210-213-948', version: 'RHOAI 2.8, OCP 4.14',
    link: 'https://www.credly.com/badges/4ac2665c-aa60-486f-9776-93844a27469a/public_url',
  },
  {
    title: 'Certified Kubernetes Administrator',
    exam: 'CKA', issuer: 'Linux Foundation', status: 'in-progress',
    id: null, version: 'Kubernetes 1.29',
    link: null,
  },
];

/* ------ BLOGS — add your blogs here when ready ------ */
const BLOGS = [
  // {
  //   tag: 'Kubernetes',
  //   title: 'How I Debugged a CrashLoopBackOff That Wasn\'t What It Seemed',
  //   date: 'Jan 2025', readtime: '8 min read',
  //   desc: 'A deep-dive into a subtle init container timing issue that only manifested under load. Covers kubectl debugging workflows and log correlation.',
  //   stack: ['Kubernetes', 'Debugging', 'Logs'],
  //   link: '#',
  // },

];

/* ===================== BUILD: SKILLS TRACK ===================== */
(function buildSkills() {
  const track = document.getElementById('skillsTrack');
  if (!track) return;
  [...SKILLS, ...SKILLS].forEach(s => {
    const pill = document.createElement('div');
    pill.className = 'skill-pill';
    pill.innerHTML = `<i class="${s.icon}"></i> ${s.name}`;
    track.appendChild(pill);
  });
})();

/* ===================== BUILD: PROJECTS ===================== */
(function buildProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'proj-card reveal';
    card.style.transitionDelay = (i * 0.08) + 's';
    card.innerHTML = `
      <div class="proj-inner">
        <div class="proj-front">
          <div class="proj-icon">${p.icon}</div>
          <h3>${p.title}</h3>
          <p>${p.short}</p>
          <div class="proj-front-footer">Hover to flip ↻</div>
        </div>
        <div class="proj-back">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="proj-stack">${p.stack.map(t => `<span>${t}</span>`).join('')}</div>
          <a href="${p.link}" target="_blank" class="proj-link">
            <i class="fab fa-github"></i> View on GitHub <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
})();

/* ===================== BUILD: CERTIFICATES ===================== */
(function buildCerts() {
  const grid = document.getElementById('certGrid');
  if (!grid) return;
  CERTS.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'cert-card reveal';
    card.dataset.status = c.status;
    card.style.transitionDelay = (i * 0.07) + 's';

    const dlBtn = c.status === 'completed'
      ? c.link
        ? `<a href="${c.link}" target="_blank" rel="noopener noreferrer" class="cert-download">
             <i class="fas fa-external-link-alt"></i> View Certificate
           </a>`
        : `<div class="cert-download na" style="cursor:default;opacity:0.6;">
             <i class="fas fa-clock"></i>  coming soon
           </div>`
      : `<div class="cert-download na"><i class="fas fa-hourglass-half"></i> In Progress</div>`;

    card.innerHTML = `
      <div class="cert-inner">
        <div class="cert-front">
          <div class="cert-issuer-logo"><i class="fas fa-award"></i> ${c.issuer} · ${c.exam}</div>
          <h3>${c.title}</h3>
          <span class="cert-status ${c.status}">
            ${c.status === 'completed' ? '✔ Completed' : '⏳ In Progress'}
          </span>
        </div>
        <div class="cert-back">
          <h3>${c.exam} — ${c.version}</h3>
          <p>${c.id ? 'Cert ID: ' + c.id : 'Currently studying for this certification.'}</p>
          ${dlBtn}
        </div>
      </div>`;
    grid.appendChild(card);
  });
})();

/* ===================== CERT FILTER ===================== */
document.getElementById('certFilter')?.addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  const f = e.target.dataset.filter;
  document.querySelectorAll('.cert-card').forEach(card => {
    card.style.display = (f === 'all' || card.dataset.status === f) ? '' : 'none';
  });
});

/* ===================== BUILD: BLOGS ===================== */
(function buildBlogs() {
  const grid = document.getElementById('blogsGrid');
  if (!grid) return;
  BLOGS.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'blog-card reveal';
    card.style.transitionDelay = (i * 0.09) + 's';
    card.innerHTML = `
      <div class="blog-inner">
        <div class="blog-front">
          <div class="blog-tag"># ${b.tag}</div>
          <h3>${b.title}</h3>
          <div class="blog-front-footer">
            <span class="blog-date">${b.date}</span>
            <span class="blog-read">${b.readtime}</span>
          </div>
        </div>
        <div class="blog-back">
          <p>${b.desc}</p>
          <div class="blog-stack">${b.stack.map(t => `<span>${t}</span>`).join('')}</div>
          <a href="${b.link}" target="_blank" class="blog-link">
            Read Article <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
})();

/* ===================== HERO TYPING ===================== */
(function heroType() {
  const el = document.getElementById('heroTyping');
  if (!el) return;
  const phrases = ['Roshni Patil', 'an OpenShift Engineer', 'a DevOps Enthusiast', 'an SRE in the Making'];
  let pi = 0, ci = 0, deleting = false;
  function loop() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(loop, 1800); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(loop, deleting ? 55 : 110);
  }
  loop();
})();

/* ===================== DARK / LIGHT TOGGLE ===================== */
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  // Load saved theme on page load
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.dataset.theme = saved;
    themeBtn.textContent = saved === 'light' ? '🌙' : '☀️';
  }

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
    themeBtn.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
}

/* ===================== SCROLL REVEAL ===================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

function observeAll() {
  document.querySelectorAll('.reveal, .tl-item, .proj-card, .cert-card, .blog-card')
    .forEach(el => observer.observe(el));
}
observeAll();
setTimeout(observeAll, 150); // catch dynamically added cards