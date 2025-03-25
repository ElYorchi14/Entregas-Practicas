async function obtenerProductos() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    console.log("Productos obtenidos:", data);

    const $sectionProductos = document.querySelector("#productos");
    let content = "";

    data.forEach((producto) => {
      content += `
        <article class="producto">
          <h3>${producto.title}</h3>
          <img src="${producto.image}" alt="${producto.title}" />
          <p>${producto.description.substring(0, 100)}...</p>
          <span class="precio">$${producto.price}</span>
          <button class="boton-comprar" data-id="${producto.id}" data-nombre="${
        producto.title
      }" data-precio="${producto.price}">Agregar al carrito</button>
        </article>
      `;
    });

    $sectionProductos.innerHTML = content;
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerProductos();
  document
    .querySelector("#productos")
    .addEventListener("click", agregarAlCarrito);
  document
    .querySelector("#btn-compra")
    .addEventListener("click", procesarCompra);
});

let carrito = [];

function agregarAlCarrito(e) {
  if (e.target.matches(".boton-comprar")) {
    let id = e.target.getAttribute("data-id");
    let nombre = e.target.getAttribute("data-nombre");
    let precio = parseFloat(e.target.getAttribute("data-precio"));

    let item = carrito.find((producto) => producto.id === id);
    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  const $listaCarrito = document.querySelector("#lista-carrito");
  const $totalCarrito = document.querySelector("#total-carrito");
  const $mensajeCompra = document.querySelector("#mensaje-compra");

  $listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.nombre} x ${item.cantidad} - $${(
      item.precio * item.cantidad
    ).toFixed(2)}`;
    $listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  $totalCarrito.textContent = total.toFixed(2);

  // Ocultar el mensaje de compra si el carrito está vacío
  if (carrito.length === 0) {
    $mensajeCompra.classList.add("hidden");
  }
}

function procesarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const $mensajeCompra = document.querySelector("#mensaje-compra");
  $mensajeCompra.classList.remove("hidden");

  setTimeout(() => {
    $mensajeCompra.classList.add("hidden");
    alert("¡Compra realizada con éxito!");
    carrito = [];
    actualizarCarrito();
  }, 5000);
}
