
const newsSearch = document.getElementById("newsSearch");
const newsCategory = document.getElementById("newsCategory");
const newsCards = document.querySelectorAll(".news-card");
const newsCount = document.getElementById("newsCount");
const newsEmpty = document.getElementById("newsEmpty");

const newsModal = document.getElementById("newsModal");
const closeNewsModal = document.getElementById("closeNewsModal");
const newsModalCategory = document.getElementById("newsModalCategory");
const newsModalDate = document.getElementById("newsModalDate");
const newsModalTitle = document.getElementById("newsModalTitle");
const newsModalSummary = document.getElementById("newsModalSummary");
const newsModalContent = document.getElementById("newsModalContent");

let lastNewsButton = null;

/* 1. Search and filter news articles */
function filterNews() {
    const searchText = newsSearch.value.toLowerCase().trim();
    const selectedCategory = newsCategory.value;
    let visibleCount = 0;

    newsCards.forEach(function (card) {
        const searchableText = (
            card.dataset.title + " " +
            card.dataset.summary + " " +
            card.dataset.content + " " +
            card.dataset.category
        ).toLowerCase();

        const matchesSearch = searchableText.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            card.dataset.category === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    newsCount.textContent =
        visibleCount + (visibleCount === 1 ? " article" : " articles");

    newsEmpty.hidden = visibleCount !== 0;
}

newsSearch.addEventListener("input", filterNews);
newsCategory.addEventListener("change", filterNews);

/* 2. Open a full news article */
function openNewsModal(card) {
    lastNewsButton = document.activeElement;

    newsModalCategory.textContent = card.dataset.category;
    newsModalDate.textContent = card.dataset.date;
    newsModalTitle.textContent = card.dataset.title;
    newsModalSummary.textContent = card.dataset.summary;
    newsModalContent.textContent = card.dataset.content;

    newsModal.hidden = false;
    closeNewsModal.focus();
}

/* 3. Add a click event to each Read More button */
document.querySelectorAll(".read-news").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".news-card");
        openNewsModal(card);
    });
});

/* 4. Close the modal */
function closeNewsArticle() {
    if (newsModal.hidden) return;

    newsModal.hidden = true;

    if (lastNewsButton) {
        lastNewsButton.focus();
    }
}

closeNewsModal.addEventListener("click", closeNewsArticle);

newsModal.addEventListener("click", function (event) {
    if (event.target === newsModal) {
        closeNewsArticle();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !newsModal.hidden) {
        closeNewsArticle();
    }
});

/* 5. Set the initial article count */
filterNews();
