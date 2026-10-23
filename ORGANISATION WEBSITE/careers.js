
const jobSearch = document.getElementById("jobSearch");
const jobDepartment = document.getElementById("jobDepartment");
const jobCards = document.querySelectorAll(".job-card");
const noJobsMessage = document.getElementById("noJobsMessage");

const careerModal = document.getElementById("careerModal");
const careerModalTitle = document.getElementById("careerModalTitle");
const careerModalBody = document.getElementById("careerModalBody");
const closeCareerModal = document.getElementById("closeCareerModal");

let lastCareerButton = null;

/* Filter jobs by title and department */
function filterJobs() {
    const searchText = jobSearch.value.toLowerCase().trim();
    const selectedDepartment = jobDepartment.value;
    let visibleJobs = 0;

    jobCards.forEach(function (card) {
        const title = card.dataset.title.toLowerCase();
        const department = card.dataset.department;

        const matchesTitle = title.includes(searchText);
        const matchesDepartment =
            selectedDepartment === "all" ||
            department === selectedDepartment;

        const showCard = matchesTitle && matchesDepartment;
        card.hidden = !showCard;

        if (showCard) visibleJobs++;
    });

    noJobsMessage.hidden = visibleJobs !== 0;
}

jobSearch.addEventListener("input", filterJobs);
jobDepartment.addEventListener("change", filterJobs);

/* Open modal */
function openCareerModal(title, content) {
    lastCareerButton = document.activeElement;
    careerModalTitle.textContent = title;
    careerModalBody.replaceChildren();

    if (typeof content === "string") {
        const paragraph = document.createElement("p");
        paragraph.textContent = content;
        careerModalBody.appendChild(paragraph);
    } else {
        careerModalBody.appendChild(content);
    }

    careerModal.hidden = false;
    closeCareerModal.focus();
}

/* Close modal */
function closeCareerDetails() {
    if (careerModal.hidden) return;

    careerModal.hidden = true;

    if (lastCareerButton) {
        lastCareerButton.focus();
    }
}

closeCareerModal.addEventListener("click", closeCareerDetails);

careerModal.addEventListener("click", function (event) {
    if (event.target === careerModal) {
        closeCareerDetails();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !careerModal.hidden) {
        closeCareerDetails();
    }
});

/* View job details */
document.querySelectorAll(".job-details").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".job-card");
        const title = card.dataset.title;
        const department = card.dataset.department;
        const jobType = card.querySelector(".job-tag").textContent;
        const description = card.querySelectorAll("p")[1].textContent;

        openCareerModal(
            title,
            department + " department. " +
            jobType + ". " + description +
            " Contact the organization for further role requirements."
        );
    });
});

/* Demo application form */
document.querySelectorAll(".apply-job").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".job-card");
        const jobTitle = card.dataset.title;

        const form = document.createElement("form");
        form.id = "jobApplicationForm";

        form.innerHTML = `
            <p>Apply for: <strong></strong></p>

            <label for="applicantName">Full Name</label>
            <input id="applicantName" name="applicantName"
                   type="text" required>

            <label for="applicantEmail">Email Address</label>
            <input id="applicantEmail" name="applicantEmail"
                   type="email" required>

            <button type="submit" class="btn">Submit Application</button>
            <p id="applicationMessage" role="status" aria-live="polite"></p>
        `;

        form.querySelector("strong").textContent = jobTitle;

        openCareerModal("Apply for " + jobTitle, form);

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.reportValidity()) return;

            const applicantName =
                form.elements.applicantName.value.trim();

            const message = form.querySelector("#applicationMessage");
            message.textContent =
                "Thank you, " + applicantName +
                "! Your demo application has been completed.";

            form.querySelector("button[type='submit']").disabled = true;
        });
    });
});
