
(function () {
    const data = {
        hr: {
            title: "👥 Human Resources",
            description: "Human Resources manages the employee lifecycle and helps create a positive workplace where people can develop their careers.",
            responsibilities: [
                "Recruitment and candidate selection",
                "Employee onboarding and orientation",
                "Training and development",
                "Employee engagement and welfare",
                "Performance management"
            ],
            skills: [
                "Communication",
                "Teamwork",
                "Organization",
                "Conflict resolution"
            ],
            goal: "Build a supportive workplace, recruit suitable talent, and help employees grow."
        },

        technology: {
            title: "💻 Technology",
            description: "The Technology department develops and maintains the software and systems that support the organization's operations.",
            responsibilities: [
                "Website and application development",
                "Software testing and maintenance",
                "Database management",
                "IT support and troubleshooting",
                "System security and improvement"
            ],
            skills: [
                "Programming",
                "Problem-solving",
                "SQL and databases",
                "Software testing"
            ],
            goal: "Deliver secure, reliable, and efficient technology solutions."
        },

        finance: {
            title: "📊 Finance",
            description: "Finance monitors financial activities and helps the organization manage its resources responsibly.",
            responsibilities: [
                "Budget preparation",
                "Financial reporting",
                "Expense tracking",
                "Maintaining financial records",
                "Financial performance analysis"
            ],
            skills: [
                "Numerical analysis",
                "Excel and spreadsheets",
                "Attention to detail",
                "Analytical thinking"
            ],
            goal: "Maintain accurate financial information and support sound business decisions."
        },

        marketing: {
            title: "📣 Marketing",
            description: "Marketing promotes the organization, communicates its value, and builds relationships with its audience.",
            responsibilities: [
                "Planning marketing campaigns",
                "Creating digital content",
                "Brand development",
                "Audience and market research",
                "Campaign performance analysis"
            ],
            skills: [
                "Creativity",
                "Communication",
                "Content creation",
                "Data analysis"
            ],
            goal: "Increase brand awareness and build meaningful audience relationships."
        }
    };

    // Make this function available to the HTML buttons.
    window.showDepartment = function (departmentKey) {
        const department = data[departmentKey];

        if (!department) {
            console.error("Department not found:", departmentKey);
            return;
        }

        const modal = document.getElementById("deptModal");
        const title = document.getElementById("deptTitle");
        const content = document.getElementById("deptContent");

        if (!modal || !title || !content) {
            console.error("Department popup elements are missing.");
            return;
        }

        title.textContent = department.title;
        content.replaceChildren();

        function addParagraph(text) {
            const p = document.createElement("p");
            p.textContent = text;
            content.appendChild(p);
        }

        function addList(heading, items) {
            const h3 = document.createElement("h3");
            h3.textContent = heading;
            content.appendChild(h3);

            const ul = document.createElement("ul");

            items.forEach(function (item) {
                const li = document.createElement("li");
                li.textContent = item;
                ul.appendChild(li);
            });

            content.appendChild(ul);
        }

        addParagraph(department.description);
        addList("Key Responsibilities", department.responsibilities);
        addList("Important Skills", department.skills);

        const goalHeading = document.createElement("h3");
        goalHeading.textContent = "Department Goal";
        content.appendChild(goalHeading);

        addParagraph(department.goal);

        modal.hidden = false;
        document.getElementById("deptClose").focus();
    };

    function closeDepartment() {
        document.getElementById("deptModal").hidden = true;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("deptModal");
        const closeButton = document.getElementById("deptClose");

        if (!modal || !closeButton) {
            console.error("Department popup could not be initialized.");
            return;
        }

        closeButton.addEventListener("click", closeDepartment);

        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeDepartment();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && !modal.hidden) {
                closeDepartment();
            }
        });
    });
})();
