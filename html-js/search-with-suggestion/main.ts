
const products = [
    { id: 1, name: "Laptop Pro 15", category: "Electronics", price: 85000, inStock: true },
    { id: 2, name: "Wireless Mouse", category: "Electronics", price: 1200, inStock: true },
    { id: 3, name: "Mechanical Keyboard", category: "Electronics", price: 4500, inStock: false },
    { id: 4, name: "Noise Cancelling Headphones", category: "Electronics", price: 7200, inStock: true },
    { id: 5, name: "Smartphone X", category: "Electronics", price: 65000, inStock: true },
    { id: 6, name: "LED Monitor 27\"", category: "Electronics", price: 18000, inStock: false },
    { id: 7, name: "USB-C Hub", category: "Accessories", price: 2200, inStock: true },
    { id: 8, name: "External Hard Drive 1TB", category: "Storage", price: 5400, inStock: true },
    { id: 9, name: "Gaming Chair", category: "Furniture", price: 15000, inStock: true },
    { id: 10, name: "Office Desk", category: "Furniture", price: 12500, inStock: false },
    { id: 11, name: "Water Bottle", category: "Lifestyle", price: 500, inStock: true },
    { id: 12, name: "Backpack", category: "Lifestyle", price: 2500, inStock: true },
    { id: 13, name: "Running Shoes", category: "Sports", price: 4800, inStock: true },
    { id: 14, name: "Fitness Band", category: "Sports", price: 3500, inStock: false },
    { id: 15, name: "Bluetooth Speaker", category: "Electronics", price: 3200, inStock: true },
    { id: 16, name: "Smartwatch", category: "Electronics", price: 11000, inStock: true },
    { id: 17, name: "DSLR Camera", category: "Electronics", price: 55000, inStock: false },
    { id: 18, name: "Coffee Maker", category: "Appliances", price: 7500, inStock: true },
    { id: 19, name: "Microwave Oven", category: "Appliances", price: 12500, inStock: true },
    { id: 20, name: "Air Conditioner", category: "Appliances", price: 42000, inStock: false },
];


/**
 * On focus show suggestion box 
 * On blur close the suggestion box
 * On type find matching item with query and make a list of items and append the list  in the suggestion box
 * On click of item from suggestion box, populate the search with with the item value
 */
(function () {
    const search = document.getElementById("search") as HTMLInputElement;
    const suggestionBox = document.getElementById("suggestion-box") as HTMLDivElement;

    function handleShow() {
        suggestionBox.classList.add("show");
    }

    function handleClose() {
        suggestionBox.classList.remove("show");
    }

    function handleInput(e: Event) {
        const { value } = e.target as HTMLInputElement;
        processInput(value);
    }

    function handleSuggestion(e: Event) {
        const target = e.target as HTMLElement;
        if (target.tagName === "LI") {
            search.value = target.innerText;
            search.focus();
            handleClose();
        }
    }

    function processInput(value: string) {
        suggestionBox.innerHTML = "";
        if (!value.trim()) {
            handleClose();
            return;
        }

        const matchedItems = products.filter(p =>
            p.name.toLowerCase().includes(value.toLowerCase())
        );

        if (matchedItems.length) {
            handleShow();
            const list = document.createElement("ul");
            list.className = "list";

            const listItems = matchedItems.map(item => {
                const li = document.createElement("li");
                li.className = "list__item";
                li.textContent = item.name;
                return li;
            });

            list.append(...listItems);
            suggestionBox.append(list);
        } else {
            handleClose();
        }
    }

    function handleOutsideClick(e: Event) {
        const target = e.target as HTMLElement;
        if (target === suggestionBox || suggestionBox.contains(target)) {
            return;
        }
        handleClose();
    }

    search.addEventListener("focus", handleShow);
    search.addEventListener("input", handleInput);
    suggestionBox.addEventListener("click", handleSuggestion);
    window.addEventListener("mousedown", handleOutsideClick);
})();