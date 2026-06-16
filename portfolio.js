// ---------------- NAVBAR ----------------

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    
    if (hamburger.classList.contains('active')) {
        hamburger.innerHTML = 'X'; 
        hamburger.style.fontSize = '14px';
        hamburger.style.color = '#FFF8F0';
    } else {

        hamburger.innerHTML = '<span></span><span></span><span></span>';
    }
});


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
    });
});

// ----- Smooth scrolling -------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId === '#hero' ? '#home' : targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
});


// ---------------- SCROLL REVEAL ANIMATION ----------------

document.addEventListener("DOMContentLoaded", () => {
const revealElements = document.querySelectorAll(".reveal");

    revealElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(40px)";
        element.style.transition = "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
        element.style.willChange = "opacity, transform";
    });

    const observerOptions = {
        root: null,         
        rootMargin: "0px",
        threshold: 0.12 
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                target.style.opacity = "1";
                target.style.transform = "translateY(0)";
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
});


// ---------------- PROJECTS ----------------
const projects = [
    {
        id: 1,
        title: "Student Placement Analysis",
        description: "Explores how academic performance, specialization, and internships influence student placement outcomes.",
        tech_stack: "Excel, Python, SQL, Power BI",
        github_url: "https://github.com/ClauseJr/Student-Placement",
        image: "Student Placement.png"
    },
    {
        id: 2,
        title: "E-commerce Sales Analysis",
        description: "Analyzed e-commerce data to identify sales trends, customer behavior, and key profitability drivers.",
        tech_stack: "SQL, Excel, Power BI",
        github_url: "https://github.com/ClauseJr/E-Commerce-Analysis",
        image: "E-Commerce Dashboard.png"
    },
    {
        id: 3,
        title: "Spotify Music Analysis",
        description: "Analyzed Spotify data to uncover trends in music popularity, genre dynamics, and streaming success factors.",
        tech_stack: "Excel, Power BI",
        github_url: "https://github.com/ClauseJr/Spotify-Analysis",
        image: "Spotify Dashboard.png"
    },
    {
        id: 4,
        title: "Employee Turnover Analysis",
        description: "Investigated employee attrition trends to understand how workplace conditions influence retention and turnover.",
        tech_stack: "Excel, Python, SQL, Power BI",
        github_url: "https://github.com/ClauseJr/employee-attrition-analysis",
        image: "Employee Dashboard.png"
    },
    {
        id: 5,
        title: "Pizza Sales Analysis",
        description: "Analyzed pizza sales data to identify trends, customer preferences, and key performance indicators.",
        tech_stack: "Excel, Power BI",
        github_url: "https://github.com/ClauseJr/Pizza-Sales-Analysis",
        image: "Pizza Dashboard.png"
    }
];

const projectsContainer = document.getElementById("projects-container");
function loadProjects() {
    if(!projectsContainer) return;

    projectsContainer.innerHTML = "";
    projects.forEach(project => {
        const card = document.createElement("a");
        card.className = "project-card";
        card.href = project.github_url;
        card.target = "_blank";

        const imageHTML = project.image
            ? `<img src="${project.image}" alt="${project.title}">`
            : `<div class="project-image-placeholder">${project.title}</div>`;

        card.innerHTML = `
            <div class="project-image">
                ${imageHTML}
                <span class="project-link-icon" title="View on GitHub">↗</span>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tools">
                    ${project.tech_stack.split(",").map(tool => `<span>${tool.trim()}</span>`).join("")}
                </div>
            </div>
        `;
        projectsContainer.appendChild(card);
    });
}
    window.addEventListener("DOMContentLoaded", loadProjects);
