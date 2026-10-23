
// ==========================================
// NOVA ORGANIZATION - DEMO JAVASCRIPT
// ==========================================


// 1. Discover More button
const learnMoreBtn = document.getElementById("learnMoreBtn");
const aboutSection = document.getElementById("about");

if (learnMoreBtn && aboutSection) {
    learnMoreBtn.addEventListener("click", function () {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });
}


// 2. Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(navLinks.classList.contains("active"))
        );
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// 3. Service buttons
document.querySelectorAll(".service-action").forEach(function (button) {
    button.addEventListener("click", function () {
        const serviceName = this.dataset.service;
        const messageField = document.getElementById("message");
        const contactSection = document.getElementById("contact");

        if (messageField) {
            messageField.value =
                "I'm interested in " + serviceName +
                ". Please contact me with more information.";
        }

        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// 4. Contact form submission
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {
        // Prevent the page from reloading
        event.preventDefault();

        // Validate required fields and email
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Get the user's name before resetting the form
        const name = document.getElementById("name").value.trim();

         const email = document.getElementById("email").value.trim();

          alert('Message Sent Successfully' )
        // Display the success message
        formMessage.textContent =
            "Message sent successfully! Thank you, " + name + "." ;

        formMessage.classList.add("success-message");
        formMessage.classList.remove("error-message");

        // Clear the input fields without clearing the success message
        contactForm.reset();


             
    });

  

    // Clear the status when the user clicks Clear Form
    contactForm.addEventListener("reset", function () {
        formMessage.textContent = "";
        formMessage.classList.remove("success-message", "error-message");
    });
}


// 5. Back to Top button
const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
    function updateBackToTop() {
        backToTopButton.style.display =
            window.scrollY > 300 ? "block" : "none";
    }

    window.addEventListener("scroll", updateBackToTop);
    updateBackToTop();

    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// 6. Automatically update copyright year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* 7. Dark / Light Mode */
(() => {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const themeLabel = document.getElementById("themeLabel");

    if (!themeToggle) {
        console.log("Theme toggle button not found in HTML.");
        return;
    }

    // Apply the selected theme
    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.body.classList.toggle("dark-mode", isDark);

        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        if (themeIcon) {
            themeIcon.textContent = isDark ? "☀️" : "🌙";
        }

        if (themeLabel) {
            themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
        }

        try {
            localStorage.setItem("nova-theme", theme);
        } catch (error) {
            // Theme still works if browser storage is unavailable.
        }
    }

    // Restore the previously selected theme
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("nova-theme");
    } catch (error) {
        // Continue with the light theme if storage is unavailable.
    }

    applyTheme(savedTheme === "dark" ? "dark" : "light");

    // Switch themes when the button is clicked
    themeToggle.addEventListener("click", function () {
        const isDark = document.body.classList.contains("dark-mode");

        applyTheme(isDark ? "light" : "dark");
    });
})();


/* ===================================
   STEP 3: ORGANIZATION INTERACTIONS
=================================== */

/* 1. Employee Search and Department Filter */

const employeeSearch = document.getElementById("employeeSearch");
const departmentFilter = document.getElementById("departmentFilter");
const employeeCards = document.querySelectorAll(".employee-card");
const employeeEmpty = document.getElementById("employeeEmpty");

function filterEmployees() {
    const searchText = employeeSearch.value.toLowerCase().trim();
    const selectedDepartment = departmentFilter.value;
    let visibleCount = 0;

    employeeCards.forEach(function (card) {
        const name = card.dataset.name.toLowerCase();
        const department = card.dataset.department;

        const matchesName = name.includes(searchText);
        const matchesDepartment =
            selectedDepartment === "all" ||
            department === selectedDepartment;

        if (matchesName && matchesDepartment) {
            card.hidden = false;
            visibleCount++;
        } else {
            card.hidden = true;
        }
    });

    employeeEmpty.hidden = visibleCount !== 0;
}

if (employeeSearch && departmentFilter) {
    employeeSearch.addEventListener("input", filterEmployees);
    departmentFilter.addEventListener("change", filterEmployees);
}


/* 2. Open and Close the Details Modal */

const detailsModal = document.getElementById("detailsModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalButton = document.getElementById("closeModal");

let previousFocus = null;

function openModal(title, details) {
    if (!detailsModal || !modalTitle || !modalBody) {
        return;
    }

    previousFocus = document.activeElement;

    modalTitle.textContent = title;
    modalBody.replaceChildren();

    const detailsParagraph = document.createElement("p");
    detailsParagraph.textContent = details;
    modalBody.appendChild(detailsParagraph);

    detailsModal.hidden = false;

    if (closeModalButton) {
        closeModalButton.focus();
    }
}

function closeModal() {
    if (!detailsModal || detailsModal.hidden) {
        return;
    }

    detailsModal.hidden = true;

    if (previousFocus) {
        previousFocus.focus();
    }
}


/* 3. Employee Details */

document.querySelectorAll(".employee-details").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".employee-card");

        const name = card.querySelector("h3").textContent;
        const role = card.querySelector("p").textContent;
        const department = card.dataset.department;

        openModal(
            name,
            "Role: " + role + ". Department: " + department + "."
        );
    });
});


/* 4. Event Details */

document.querySelectorAll(".event-details").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".event-card");

        const title = card.querySelector("h3").textContent;
        const details = Array.from(card.querySelectorAll("p"))
            .map(function (paragraph) {
                return paragraph.textContent;
            })
            .join(" ");

        openModal(title, details);
    });
});


/* 5. Job Details */

document.querySelectorAll(".job-details").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".job-card");

        const title = card.querySelector("h3").textContent;
        const details = Array.from(card.querySelectorAll("p"))
            .map(function (paragraph) {
                return paragraph.textContent;
            })
            .join(" ");

        openModal(title, details);
    });
});


/* 6. Close Modal Interactions */

if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
}

if (detailsModal) {
    detailsModal.addEventListener("click", function (event) {
        if (event.target === detailsModal) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
