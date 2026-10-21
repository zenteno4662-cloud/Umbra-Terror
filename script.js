

const BOOKS = [
  { id: 1, title: "Drácula", author: "Bram Stoker", year: 1897, cover: "img/dracula.jpg", summary: "Un abogado viaja a Transilvania y desata la sed eterna de un conde vampiro sobre Inglaterra." },
  { id: 2, title: "Frankenstein", author: "Mary Shelley", year: 1818, cover: "img/frankenstein.jpg", summary: "Un científico desafía a la muerte creando vida con restos cadavéricos, desatando una trágica venganza." },
  { id: 3, title: "El resplandor", author: "Stephen King", year: 1977, cover: "img/el-resplandor.jpg", summary: "El aislamiento invernal en un hotel embrujado arrastra a un padre de familia hacia la locura homicida." },
  { id: 4, title: "La llamada de Cthulhu", author: "H.P. Lovecraft", year: 1928, cover: "img/la-llamada-de-cthulhu.jpg", summary: "Extraños cultos ancestrales despiertan el horror de una deidad cósmica que duerme en el océano." },
  { id: 5, title: "El exorcista", author: "William Peter Blatty", year: 1971, cover: "img/el-exorcista.jpg", summary: "Dos sacerdotes libran una aterradora batalla espiritual para salvar el alma de una niña poseída." },
  { id: 6, title: "El cuervo y relatos macabros", author: "Edgar Allan Poe", year: 1845, cover: "img/el-cuervo.jpg", summary: "Cuentos y poemas inmortales sobre la locura, el duelo incesante y los terrores de la mente humana." }
];

let cart = JSON.parse(localStorage.getItem("umbra_cart")) || [];


function renderBooks() {
  document.getElementById("books-grid").innerHTML = BOOKS.map(b => `
    <article class="book-card">
      <div class="card-cover">
        <img src="${b.cover}" alt="${b.title}" loading="lazy">
        <span class="price-badge">$100.00</span>
      </div>
      <div class="card-info">
        <div class="card-meta"><span>${b.author}</span><span>${b.year}</span></div>
        <h3 class="card-title">${b.title}</h3>
        <p class="card-summary">"${b.summary}"</p>
        <button class="btn btn-crimson btn-card" onclick="addToCart(${b.id}, this)">Añadir al Carrito 🛒</button>
      </div>
    </article>
  `).join("");
}


function addToCart(id, btn) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ id, title: BOOKS.find(b => b.id === id).title, qty: 1 });

  saveAndRender();

  if (btn) {
    btn.textContent = "¡Añadido! ✓";
    setTimeout(() => btn.textContent = "Añadir al Carrito 🛒", 700);
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveAndRender();
}

function checkout() {
  if (!cart.length) return;
  const count = cart.reduce((s, i) => s + i.qty, 0);
  alert(`¡Compra realizada con éxito!\nHas adquirido ${count} libro(s) por un total de $${count * 100}.00.\nLlegarán al caer la noche.`);
  cart = [];
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("umbra_cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = `$${count * 100}.00`;

  const container = document.getElementById("cart-items");
  if (!cart.length) {
    container.innerHTML = '<li class="cart-empty-text">El carrito está vacío. Haz clic en "Añadir al Carrito" en cualquier libro.</li>';
    return;
  }

  container.innerHTML = cart.map(i => `
    <li class="cart-item-row">
      <span class="cart-item-name">${i.title} ${i.qty > 1 ? `(x${i.qty})` : ''}</span>
      <span class="cart-item-price">$${i.qty * 100}.00</span>
      <button onclick="removeFromCart(${i.id})" class="btn-del" title="Quitar">✕</button>
    </li>
  `).join("");
}

renderBooks();
renderCart();
