document.getElementById("y").textContent = new Date().getFullYear();
document.getElementById("categories");

const grid_el = document.querySelector(".grid");

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    for (const product of data.products) {
      grid_el.innerHTML += `
        <article class="card" aria-label="">
            <div class="thumb">
              <img
                alt="Smart LED Bulb"
                src="${product.thumbnail}"
              />
            </div>
            <div class="info">
              <h3 class="title">${product.title}</h3>
              <p class="desc">${product.description}</p>
              <div class="price-row">
                <span class="price">${product.price}</span>
                <span class="muted">In stock</span>
              </div>
              <a
                class="btn full"
                href="#"
                aria-label="Add Smart LED Bulb to cart"
                >Add to cart</a
              >
            </div>
          </article>
          `;
    }
  });

const tags = document.querySelector(".tags");

fetch("https://dummyjson.com/products/categories")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    for (const categories of data) {
      tags.innerHTML += `
              <a class="tag" href="#">${categories.name}</a>
              `;
    }
  });

const searchInput = document.querySelector('.search input[type="search"]');
const searchButton = document.querySelector(".search button");

// When "Go" is clicked
searchButton.addEventListener("click", () => {
  const category = searchInput.value.trim().toLowerCase();
  if (!category) return;

  fetch(
    `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
  )
    .then((res) => {
      if (!res.ok) throw new Error("Category not found");
      return res.json();
    })
    .then((data) => {
      grid_el.innerHTML = "";

      if (data.products.length === 0) {
        grid_el.innerHTML = `<p>No products found in category "${category}".</p>`;
        return;
      }

      for (const product of data.products) {
        grid_el.innerHTML += `
          <article class="card">
            <div class="thumb">
              <img src="${product.thumbnail}" alt="${product.title}" />
            </div>
            <div class="info">
              <h3 class="title">${product.title}</h3>
              <p class="desc">${product.description}</p>
              <div class="price-row">
                <span class="price">$${product.price}</span>
                <span class="muted">In stock</span>
              </div>
              <a class="btn full" href="#">Add to cart</a>
            </div>
          </article>
        `;
      }
    })
    .catch(() => {
      grid_el.innerHTML = `<p>Category "${category}" not found.</p>`;
    });
})

