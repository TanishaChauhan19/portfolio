// skills-cards.js
const skillData = [
  {
    label: "HTML/CSS",
    value: 90,
    color: "#f16529",
    projects: [
      { name: "Portfolio Website", link: "https://github.com/TanishaChauhan19/portfolio" },
      { name: "Image Search Engine", link: "Image.html" },
      { name: "Weather App", link: "weather.html" }
    ],
    level: "Expert"
  },
  {
    label: "JavaScript",
    value: 80,
    color: "#f7df1e",
    projects: [
      { name: "Image Search Engine", link: "Image.html" },
      { name: "Weather App", link: "weather.html" }
    ],
    level: "Advanced"
  },
  {
    label: "ReactJS",
    value: 70,
    color: "#61dafb",
    projects: [
      { name: "Sentimental Analysis", link: "senti.html" }
    ],
    level: "Intermediate"
  },
  {
    label: "Bootstrap",
    value: 75,
    color: "#563d7c",
    projects: [
      { name: "Portfolio Website", link: "https://github.com/TanishaChauhan19/portfolio" }
    ],
    level: "Advanced"
  },
  {
    label: "Python",
    value: 60,
    color: "#00599c",
    projects: [
        { name: "Diagnosis App", link: "doc.html" },
        { name: "Sentimental Analysis", link: "senti.html" }
    ],
    level: "Intermediate"
  },
  {
    label: "Java",
    value: 65,
    color: "#b07219",
    projects: [],
    level: "Intermediate"
  },
  {
    label: "C/C++",
    value: 70,
    color: "#b07219",
    projects: [],
    level: "Intermediate"
  },
  {
    label: "MySQL/Oracle",
    value: 70,
    color: "#00758f",
    projects: [],
    level: "Intermediate"
  }
];

document.addEventListener('DOMContentLoaded', function() {
  const skillsCards = document.querySelector('.skills-cards');
  const skillsContainer = document.querySelector('.skills-container');
  if (!skillsCards) return;
  skillsCards.innerHTML = '';
  skillData.forEach((skill, i) => {
    // Progress ring SVG
    const percent = skill.value;
    const radius = 26;
    const circ = 2 * Math.PI * radius;
    const dash = (percent / 100) * circ;
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.animationDelay = `${i * 0.12}s`;
    // Project list HTML
    let projectListHTML = '';
    if (skill.projects.length > 0) {
      projectListHTML = '<ul class="project-list">' + skill.projects.map(p => `<li><a href="${p.link}" target="_blank">${p.name}</a></li>`).join('') + '</ul>';
    } else {
      projectListHTML = '<ul class="project-list"><li>No related projects listed.</li></ul>';
    }
    card.innerHTML = `
      <svg class="progress-ring" width="64" height="64">
        <circle class="progress-ring-bg" cx="32" cy="32" r="26" />
        <circle class="progress-ring-fg" cx="32" cy="32" r="26" stroke-dasharray="0,${circ}" />
      </svg>
      <div class="skill-label">${skill.label}</div>
      <div class="skill-level">${skill.level} (${skill.value}%)</div>
      ${projectListHTML}
    `;
    card.setAttribute('data-skill', skill.label);
    skillsCards.appendChild(card);
    // Do NOT animate yet
  });

  // IntersectionObserver to trigger animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate cards and progress rings
        document.querySelectorAll('.skill-card').forEach((card, i) => {
          card.style.opacity = '';
          card.style.transform = '';
          card.style.animation = `cardFadeIn 0.7s forwards`;
          card.style.animationDelay = `${i * 0.12}s`;
          setTimeout(() => {
            const fg = card.querySelector('.progress-ring-fg');
            const percent = skillData[i].value;
            const radius = 26;
            const circ = 2 * Math.PI * radius;
            const dash = (percent / 100) * circ;
            fg.setAttribute('stroke-dasharray', `${dash},${circ}`);
          }, 300 + i * 120);
        });
        observer.unobserve(skillsContainer);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(skillsContainer);

  // Popup: Show on hover/click, and scroll to radial graph on button click
  skillsCards.addEventListener('click', function(e) {
    if (e.target.classList.contains('show-projects-btn')) {
      const skillLabel = e.target.getAttribute('data-skill');
      // Find the corresponding node in the radial graph
      const node = Array.from(document.querySelectorAll('.skill-node')).find(n => n.dataset.skill === skillLabel);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => node.click(), 400);
      }
    }
    // Card active state
    if (e.target.classList.contains('skill-card')) {
      document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
    }
  });
}); 