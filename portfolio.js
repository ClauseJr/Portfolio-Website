// ---- Hamburger toggle ----
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ---- Smooth scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        if(navLinks.classList.contains('active')) navLinks.classList.remove('active');
    });
});

// ---- Typing effect ----
const professions = [
    "Data Analyst",
    "Business Analyst",
    "Market Analyst",
    "Financial Analyst",
    "Graphic Designer",
    "Photographer"
];
const typingElement = document.getElementById("typing-text");
let professionIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    typingElement.textContent = isDeleting
        ? currentProfession.substring(0, charIndex--)
        : currentProfession.substring(0, charIndex++);

    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true; 
        setTimeout(typeEffect, 1500); 
        return;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}
typeEffect();

// ---------------- PROJECTS ----------------
// Hardcoded projects (replace or add your own)
const projects = [
    {
        id: 1,
        title: "Student Placement Analysis",
        description: "An end-to-end data analysis project examining factors influencing student placement outcomes. The analysis highlights academic performance, specialization, and internship experience as key drivers",
        tech_stack: "SQL, Excel, Power BI",
        github_url: "https://github.com/ClauseJr/Student-Placement"
    },
    {
        id: 2,
        title: "E-commerce Sales Analysis",
        description: "Analyzed e-commerce transaction data to uncover sales trends, profitability drivers, customer purchasing behavior, and regional performance to support data-driven business decisions.",
        tech_stack: "SQL, Excel, Power BI",
        github_url: "https://github.com/ClauseJr/E-Commerce-Analysis"
    },
    {
        id: 3,
        title: "Spotify Music Analysis",
        description: "Analyzed Spotify music data to uncover trends in music consumption, artist popularity, and genre dynamics.The project explores how factors like release timing, artist collaborations, and listener demographics influence streaming success.",
        tech_stack: "Excel, Power BI",
        github_url: "https://github.com/ClauseJr/Spotify-Analysis"
    },
    {
        id: 4,
        title: "Employee Turnover Analysis",
        description: "This project presents an end-to-end analysis of employee attrition using Excel, SQL, Python, and Power BI. It explores how factors such as job satisfaction, leadership, work-life balance, innovation, company recognition and overtime influences employee turnover.",
        tech_stack: "Excel, Python, SQL, Power BI",
        github_url: "https://github.com/ClauseJr/employee-attrition-analysis"
    }
];

const projectsContainer = document.getElementById("projects-container");
function loadProjects() {
    if(!projectsContainer) return;

    projectsContainer.innerHTML = "";
    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tools">
                ${project.tech_stack.split(",").map(tool => `<span>${tool.trim()}</span>`).join("")}
            </div>
            <a href="${project.github_url}" target="_blank" class="project-btn">View on GitHub</a>
        `;
        projectsContainer.appendChild(card);
    });
}
window.addEventListener("DOMContentLoaded", loadProjects);

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
    const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        alert("Thanks! Your message has been sent.");
        form.reset();
    } else {
        alert("Oops! Something went wrong. Please try again.");
    }
    } catch (err) {
    alert("Network error. Try again later.");
    console.error("Formspree error:", err);
    }
});
