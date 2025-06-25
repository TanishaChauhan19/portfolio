// skills-radial.js
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
      label: "MySQL/Oracle",
      value: 70,
      color: "#00758f",
      projects: [],
      level: "Intermediate"
    }
  ];
document.addEventListener('DOMContentLoaded', function() {
  const skillGraph = document.getElementById('skill-graph');
  const projectTitle = document.getElementById('selected-skill-title');
  const projectList = document.getElementById('project-list');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillGraph.classList.add('in-view');
        createSkillNodes();
        observer.unobserve(skillGraph); // Animate only once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(skillGraph);

  function createSkillNodes() {
    // Radial layout
    const radius = 140;
    const centerX = 175;
    const centerY = 175;
    const total = skillData.length;

    skillData.forEach((skill, i) => {
      const angle = (2 * Math.PI * i) / total - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle) - 50; // 50 = node width/2
      const y = centerY + radius * Math.sin(angle) - 50; // 50 = node height/2
      const node = document.createElement('div');
      node.className = 'skill-node';
      node.dataset.skill = skill.label;
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.borderColor = skill.color;
      node.style.animationDelay = `${i * 0.1}s`;
      node.innerHTML = `<span>${skill.label}</span><span class=\"level\">${skill.level}</span>`;
      node.addEventListener('click', () => selectSkill(node));
      skillGraph.appendChild(node);
    });
    // Select the first skill node by default after creation
    selectSkill(document.querySelector('.skill-node'));
  }

  function selectSkill(selectedNode) {
    if (!selectedNode) return;
    const skillLabel = selectedNode.dataset.skill;
    const skill = skillData.find(s => s.label === skillLabel);
    if (!skill) return;

    // Highlight selected
    document.querySelectorAll('.skill-node').forEach(n => {
      n.classList.toggle('selected', n === selectedNode);
    });
    // Update title
    projectTitle.textContent = skill.label;
    // Fade out, update, and fade in the project list
    projectList.style.opacity = 0;
    setTimeout(() => {
        projectList.innerHTML = '';
        if (skill.projects.length > 0) {
          skill.projects.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `<a href=\"${p.link}\" target=\"_blank\">${p.name}</a>`;
            projectList.appendChild(li);
          });
        } else {
          const li = document.createElement('li');
          li.textContent = 'No related projects listed.';
          projectList.appendChild(li);
        }
        projectList.style.opacity = 1;
    }, 200);
  }
}); 