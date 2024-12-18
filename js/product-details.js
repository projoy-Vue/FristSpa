
  document.addEventListener("DOMContentLoaded", () => {
    // Fetch JSON file
    fetch("../data/product.json")
      .then((response) => response.json())
      .then((data) => {
        const product = data[0]; // Assuming we are loading the first product

        // Populate product details
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
        document.getElementById("product-description").textContent = product.description;

        // Populate features
        const featuresList = document.getElementById("product-features");
        product.features.forEach((feature) => {
          const li = document.createElement("li");
          li.textContent = feature;
          featuresList.appendChild(li);
        });

        // Populate images
        document.getElementById("main-image").src = product.images[0];
        const gallery = document.getElementById("image-gallery");
        product.images.slice(1).forEach((image) => {
          const img = document.createElement("img");
          img.src = image;
          img.alt = "Gallery Image";
          img.addEventListener("click", () => {
            document.getElementById("main-image").src = image;
          });
          gallery.appendChild(img);
        });

        // Populate related products
        const relatedProducts = document.getElementById("related-products");
        product.relatedProducts.forEach((related) => {
          const div = document.createElement("div");
          div.classList.add("product-card");

          div.innerHTML = `
            <img src="${related.image}" alt="${related.name}">
            <h3>${related.name}</h3>
            <p class="price">$${related.price.toFixed(2)}</p>
          `;
          relatedProducts.appendChild(div);
        });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  });

