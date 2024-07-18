const suggestSearch = document.querySelector(".suggest_search");
const allSuggestSearchs = [
    "iphone 1k",
    "Dép nữ",
    "Đồ 1k",
    "Áo 1k",
    "Đồ 1k Quần Áo",
    "Balo",
    "Hộp Bút",
    "Quạt Mini",
    "Son",
    "Sticker",
];

function renderSuggestSearch() {
    suggestSearch.innerHTML = allSuggestSearchs
        .map((val) => {
            return `<a href="#">${val}</a>`;
        })
        .join("");
}

renderSuggestSearch();
