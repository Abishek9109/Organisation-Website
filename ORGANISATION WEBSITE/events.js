
const eventSearch = document.getElementById("eventSearch");
const eventCategory = document.getElementById("eventCategory");
const eventCards = document.querySelectorAll(".event-listing .event-card");
const noEventsMessage = document.getElementById("noEventsMessage");

const eventModal = document.getElementById("eventModal");
const eventModalTitle = document.getElementById("eventModalTitle");
const eventModalBody = document.getElementById("eventModalBody");
const closeEventModal = document.getElementById("closeEventModal");

let lastEventButton = null;

/* 1. Search and filter events */
function filterEvents() {
    const searchText = eventSearch.value.toLowerCase().trim();
    const selectedCategory = eventCategory.value;
    let visibleCount = 0;

    eventCards.forEach(function (card) {
        const title = card.dataset.title.toLowerCase();
        const category = card.dataset.category;

        const matchesTitle = title.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const shouldShow = matchesTitle && matchesCategory;
        card.hidden = !shouldShow;

        if (shouldShow) visibleCount++;
    });

    noEventsMessage.hidden = visibleCount !== 0;
}

eventSearch.addEventListener("input", filterEvents);
eventCategory.addEventListener("change", filterEvents);

/* 2. Open event details */
function openEventModal(card) {
    lastEventButton = document.activeElement;
    eventModalTitle.textContent = card.dataset.title;
    eventModalBody.replaceChildren();

    const details = [
        ["Category", card.dataset.category],
        ["Date", card.dataset.date],
        ["Location", card.dataset.location],
        ["Description", card.dataset.description]
    ];

    details.forEach(function (item) {
        const paragraph = document.createElement("p");
        const label = document.createElement("strong");

        label.textContent = item[0] + ": ";
        paragraph.appendChild(label);
        paragraph.appendChild(document.createTextNode(item[1]));

        eventModalBody.appendChild(paragraph);
    });

    eventModal.hidden = false;
    closeEventModal.focus();
}

/* 3. Connect event buttons */
document.querySelectorAll(".event-details").forEach(function (button) {
    button.addEventListener("click", function () {
        openEventModal(button.closest(".event-card"));
    });
});

/* 4. Close event details */
function closeEventDetails() {
    if (eventModal.hidden) return;

    eventModal.hidden = true;

    if (lastEventButton) lastEventButton.focus();
}

closeEventModal.addEventListener("click", closeEventDetails);

eventModal.addEventListener("click", function (event) {
    if (event.target === eventModal) {
        closeEventDetails();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !eventModal.hidden) {
        closeEventDetails();
    }
});
