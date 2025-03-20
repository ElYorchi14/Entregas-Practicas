const productos = [
  { nombre: "Teclado", precio: 1500, stock: 20 },
  { nombre: "Mouse", precio: 2000, stock: 9 },
  { nombre: "Monitor", precio: 1300, stock: 15 },
  { nombre: "Gabinete", precio: 750, stock: 7 },
  { nombre: "Tarjeta gráfica", precio: 5000, stock: 3 },
];

let carrito = [];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnCompra = document.getElementById("btn-compra");
const mensajeCompra = document.getElementById("mensaje-compra");

// Mostrar productos en la interfaz
productos.forEach((producto) => {
  const productoDiv = document.createElement("div");
  productoDiv.classList.add("producto");
  productoDiv.innerHTML = `
        <p>${producto.nombre} - $${producto.precio} (Stock: ${producto.stock})</p>
        <button onclick="agregarAlCarrito('${producto.nombre}')">+</button>
        <button onclick="quitarDelCarrito('${producto.nombre}')">-</button>
    `;
  listaProductos.appendChild(productoDiv);
});

// Agregar productos al carrito
function agregarAlCarrito(nombre) {
  let producto = productos.find((p) => p.nombre === nombre);
  if (producto && producto.stock > 0) {
    producto.stock--;
    let item = carrito.find((p) => p.nombre === nombre);
    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ nombre: nombre, cantidad: 1, precio: producto.precio });
    }
    actualizarCarrito();
  } else {
    alert("No hay suficiente stock");
  }
}

// Quitar productos del carrito
function quitarDelCarrito(nombre) {
  let item = carrito.find((p) => p.nombre === nombre);
  if (item) {
    item.cantidad--;
    let producto = productos.find((p) => p.nombre === nombre);
    producto.stock++;
    if (item.cantidad === 0) {
      carrito = carrito.filter((p) => p.nombre !== nombre);
    }
    actualizarCarrito();
  }
}

// Actualizar la visualización del carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x ${item.cantidad} - $${
      item.precio * item.cantidad
    }`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalCarrito.textContent = total;
}

// Simular el proceso de compra
btnCompra.addEventListener("click", function () {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  mensajeCompra.classList.remove("hidden");

  setTimeout(() => {
    mensajeCompra.classList.add("hidden");
    alert("¡Compra realizada con éxito!");
    carrito = [];
    actualizarCarrito();
  }, 5000);
});
