// ---- Hamburger toggle ----
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const API_BASE = "https://my-portfolio-backend.loca.lt";
const TRACK_URL = `${API_BASE}/track/`;
const PROJECTS_URL = `${API_BASE}/projects/`;
const CONTACT_URL = `${API_BASE}/contact/`;

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ---- Smooth scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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

// ---- DOMContentLoaded: load projects & handle contact ----
document.addEventListener("DOMContentLoaded", () => {

    // ---- Load projects from backend ----
    async function loadProjects() {
        try {
            const response = await fetch(`${API_BASE}/projects/`);
            const projects = await response.json();
            const container = document.getElementById("projects-container");
            if (!container) return;

            container.innerHTML = "";
            projects.forEach(project => {
                const card = document.createElement("div");
                card.classList.add("project-card");
                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tools">
                        ${project.tech_stack.split(",").map(t => `<span>${t.trim()}</span>`).join("")}
                    </div>
                    <a href="${project.github_url}" target="_blank" class="project-btn">View on GitHub</a>
                `;
                container.appendChild(card);
            });

        } catch (error) {
            console.error("Error loading projects:", error);
        }
    }

    loadProjects();

    // ---- Contact form submission ----
    const form = document.getElementById("contact-form");
    const textarea = form.querySelector("textarea");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Limit word count
        const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0);
        if (words.length > 2000) {
            alert("Your message exceeds 2000 words. Please shorten it.");
            return;
        }

        const formData = new FormData(form);

        try {
            const res = await fetch(`${API_BASE}/contact/`, {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error("Failed to send message");

            const data = await res.json();
            alert(`Thanks ${data.name}! Your message has been recorded.`);

            form.reset();

        } catch (err) {
            console.error(err);
            alert("Failed to send message. Please try again later.");
        }
    });
});

// Track home page visit
fetch(`${API_BASE}/track/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        event_type: "visit",
        element_name: null,
        page_name: "home"
    })
});

// Track projects page visit
fetch(`${API_BASE}/track/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        event_type: "visit",
        element_name: null,
        page_name: "projects"
    })
});

window.addEventListener('load', function() {
    let page_name = document.body.dataset.page || "unknown";

    fetch('/api/track', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            event_type: 'visit',
            element_name: null,
            page_name: page_name
        })
    });
});

// ---------------- CONFIG ----------------
const API_URL = `${API_BASE}/track/`; // FastAPI tracking endpoint
const projectsContainer = document.getElementById("projects-container");

// ---------------- TRACKING FUNCTION ----------------
function trackEvent(eventType, elementName = null, pageName = document.body.dataset.page || "unknown") {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event_type: eventType,
            element_name: elementName,
            page_name: pageName
        })
    }).catch(err => console.error("Tracking error:", err));
}

// ---------------- PAGE VISIT ----------------
window.addEventListener("load", () => {
    trackEvent("visit", null);
});

// ---------------- CLICK TRACKING ----------------
document.querySelectorAll(".track-click").forEach(el => {
    el.addEventListener("click", () => {
        trackEvent("click", el.dataset.name);
    });
});

// ---------------- CV DOWNLOAD ----------------
document.querySelectorAll(".download-cv").forEach(el => {
    el.addEventListener("click", () => {
        trackEvent("download", el.dataset.name || "download_cv");
    });
});

// ---------------- CONTACT FORM ----------------
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", () => {
        trackEvent("submit", "contact_form");
    });
}

// ---------------- LOAD PROJECTS ----------------
async function loadProjects() {
    try {
        const res = await fetch(`${API_BASE}/projects/`);
        const projects = await res.json();

        projectsContainer.innerHTML = ""; // Clear container

        projects.forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.className = "project-card track-click";
            projectCard.dataset.name = `project_${project.id}`;

            // Build the HTML exactly to match your CSS
            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tools">
                    ${project.tech_stack.split(",").map(tool => `<span>${tool.trim()}</span>`).join("")}
                </div>
                <a href="${project.github_url}" target="_blank" class="project-btn">View on GitHub</a>
            `;

            // Track clicks on the project card
            projectCard.addEventListener("click", () => {
                trackEvent("click", `project_${project.id}`);
            });

            projectsContainer.appendChild(projectCard);
        });

    } catch (err) {
        console.error("Error loading projects:", err);
        projectsContainer.innerHTML = "<p>Failed to load projects.</p>";
    }
}

// Load projects when DOM is ready
window.addEventListener("DOMContentLoaded", loadProjects);

const sections = document.querySelectorAll("section[data-page]");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.visited) {
            trackEvent("visit", null, entry.target.dataset.page);
            entry.target.dataset.visited = "true"; // prevent duplicate tracking
        }
    });
}, { threshold: 0.5 }); // triggers when 50% of section is visible

sections.forEach(section => observer.observe(section));