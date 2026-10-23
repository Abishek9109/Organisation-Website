
document.addEventListener("DOMContentLoaded", function () {
    const employeeSearch = document.getElementById("employeeSearch");
    const departmentFilter = document.getElementById("departmentFilter");
    const employeeCards = document.querySelectorAll(".employee-card");
    const employeeEmpty = document.getElementById("employeeEmpty");

    const employeeModal = document.getElementById("employeeModal");
    const closeEmployeeModal = document.getElementById("closeEmployeeModal");
    const employeeModalTitle = document.getElementById("employeeModalTitle");
    const employeeModalBody = document.getElementById("employeeModalBody");

    let lastEmployeeButton = null;

    /* Search and filter employees */
    function filterEmployees() {
        const searchText = employeeSearch.value.toLowerCase().trim();
        const selectedDepartment = departmentFilter.value;
        let visibleCount = 0;

        employeeCards.forEach(function (card) {
            const name = card.dataset.name.toLowerCase();
            const role = card.dataset.role.toLowerCase();
            const department = card.dataset.department;

            const matchesSearch =
                name.includes(searchText) ||
                role.includes(searchText) ||
                department.toLowerCase().includes(searchText);

            const matchesDepartment =
                selectedDepartment === "all" ||
                department === selectedDepartment;

            const shouldShow = matchesSearch && matchesDepartment;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        employeeEmpty.hidden = visibleCount !== 0;
    }

    employeeSearch.addEventListener("input", filterEmployees);
    departmentFilter.addEventListener("change", filterEmployees);

    /* Open profile popup */
    function openEmployeeModal(card, button) {
        lastEmployeeButton = button;

        employeeModalTitle.textContent = card.dataset.name;
        employeeModalBody.replaceChildren();

        const details = [
            ["Role", card.dataset.role],
            ["Department", card.dataset.department],
            ["Email", card.dataset.email]
        ];

        details.forEach(function (item) {
            const paragraph = document.createElement("p");
            const label = document.createElement("strong");

            label.textContent = item[0] + ": ";
            paragraph.appendChild(label);
            paragraph.appendChild(
                document.createTextNode(item[1])
            );

            employeeModalBody.appendChild(paragraph);
        });

        const about = document.createElement("p");
        about.textContent = card.dataset.about;
        employeeModalBody.appendChild(about);

        employeeModal.hidden = false;
        closeEmployeeModal.focus();
    }

    /* Connect all View Profile buttons */
    document.querySelectorAll(".employee-details").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".employee-card");

            if (card) {
                openEmployeeModal(card, button);
            }
        });
    });

    /* Close popup */
    function closeEmployeeDetails() {
        if (employeeModal.hidden) {
            return;
        }

        employeeModal.hidden = true;

        if (lastEmployeeButton && lastEmployeeButton.isConnected) {
            lastEmployeeButton.focus();
        }
    }

    closeEmployeeModal.addEventListener("click", closeEmployeeDetails);

    /* Close when clicking outside the popup */
    employeeModal.addEventListener("click", function (event) {
        if (event.target === employeeModal) {
            closeEmployeeDetails();
        }
    });

    /* Close with Escape key */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !employeeModal.hidden) {
            closeEmployeeDetails();
        }
    });

    /* Initial setup */
    filterEmployees();
});
