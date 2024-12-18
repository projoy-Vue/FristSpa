document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("search-input");
  const priceRange = document.getElementById("price-range");
  const sortBy = document.getElementById("sort-by");

  let products = []; // All products
  let currentPage = 1;
  const productsPerPage = 6;

  // Fetch products from JSON
  fetch("../data/categoriess.json")
    .then((response) => response.json())
    .then((data) => {
      products = data; // Store fetched products
      renderProducts();
      setupFilters();
    })
    .catch((error) => console.error("Error fetching products:", error));

  // Render products based on current filters and pagination
  function renderProducts() {
    const filteredProducts = applyFilters(products);
    const paginatedProducts = paginateProducts(filteredProducts);

    productGrid.innerHTML = "";
    paginatedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="btn add-to-cart">Add to Cart</button>
      `;
      productGrid.appendChild(productCard);
    });

    renderPagination(filteredProducts.length);
  }

  // Apply filters: search, price, and sort
  function applyFilters(products) {
    let filtered = [...products];

    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchTerm));
    }

    // Price range filter
    const priceFilter = priceRange.value;
    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= (max || Infinity));
    }

    // Sort filter
    const sortValue = sortBy.value;
    if (sortValue === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortValue === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

  // Paginate products
  function paginateProducts(products) {
    const start = (currentPage - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }

  // Render pagination
  function renderPagination(totalProducts) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("pagination-btn");
      if (i === currentPage) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentPage = i;
        renderProducts();
      });
      pagination.appendChild(btn);
    }
  }

  // Setup filters and events
  function setupFilters() {
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderProducts();
    });

    priceRange.addEventListener("change", () => {
      currentPage = 1;
      renderProducts();
    });

    sortBy.addEventListener("change", () => {
      currentPage = 1;
      renderProducts();
    });
  }
});
