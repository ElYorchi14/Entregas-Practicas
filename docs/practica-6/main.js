// 1️⃣ Arreglo de productos
let productos = [
  { nombre: "Teclado", precio: 1500, stock: 20 },
  { nombre: "Mouse", precio: 2000, stock: 9 },
  { nombre: "Monitor", precio: 1300, stock: 15 },
  { nombre: "Gabinete", precio: 750, stock: 7 },
  { nombre: "Tarjeta gráfica", precio: 5000, stock: 3 },
];

// 2️⃣ Carrito de compras
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(productoNombre, cantidad) {
  let producto = productos.find((p) => p.nombre === productoNombre);

  if (!producto) {
    console.log(`❌ El producto "${productoNombre}" no existe.`);
    return;
  }

  if (producto.stock >= cantidad) {
    let itemCarrito = carrito.find((p) => p.nombre === productoNombre);

    if (itemCarrito) {
      itemCarrito.cantidad += cantidad;
    } else {
      carrito.push({
        nombre: productoNombre,
        cantidad,
        precio: producto.precio,
      });
    }

    producto.stock -= cantidad;
    console.log(`✅ ${cantidad} "${productoNombre}" agregado(s) al carrito.`);
  } else {
    console.log(
      `⚠️ No hay suficiente stock de "${productoNombre}". Quedan ${producto.stock} unidades.`
    );
  }
}

// 3️⃣ Calcular total del carrito
function calcularTotal() {
  return carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
}

// 4️⃣ Aplicar descuento
function aplicarDescuento(total) {
  return total > 100 ? total * 0.9 : total;
}

// 5️⃣ Eliminar productos del carrito
function eliminarDelCarrito(productoNombre, cantidad) {
  let itemCarrito = carrito.find((p) => p.nombre === productoNombre);
  let producto = productos.find((p) => p.nombre === productoNombre);

  if (!itemCarrito) {
    console.log(`❌ El producto "${productoNombre}" no está en el carrito.`);
    return;
  }

  if (itemCarrito.cantidad > cantidad) {
    itemCarrito.cantidad -= cantidad;
    producto.stock += cantidad;
    console.log(
      `🗑️ Se eliminaron ${cantidad} "${productoNombre}" del carrito.`
    );
  } else {
    carrito = carrito.filter((p) => p.nombre !== productoNombre);
    producto.stock += itemCarrito.cantidad;
    console.log(`🗑️ Se eliminó "${productoNombre}" completamente del carrito.`);
  }
}

// 6️⃣ Simular proceso de compra
function procesarCompra() {
  if (carrito.length === 0) {
    console.log("🛒 Tu carrito está vacío.");
    return;
  }

  let total = calcularTotal();
  let totalConDescuento = aplicarDescuento(total);

  console.log("⌛ Procesando compra...");

  let contador = 3;
  let temporizador = setInterval(() => {
    console.log(`⏳ Compra confirmada en ${contador}...`);
    contador--;

    if (contador < 0) {
      clearInterval(temporizador);
      console.log(
        `✅ Compra completada. Total a pagar: $${totalConDescuento.toFixed(2)}`
      );
      carrito = []; // Vaciamos el carrito tras la compra
    }
  }, 1000);
}

// 🛒 PRUEBA DEL SIMULADOR
agregarAlCarrito("Teclado", 5);
agregarAlCarrito("Mouse", 2);
agregarAlCarrito("Monitor", 1);
console.log(`💰 Total sin descuento: $${calcularTotal()}`);
console.log(`🎉 Total con descuento: $${aplicarDescuento(calcularTotal())}`);
eliminarDelCarrito("Mouse", 1);
procesarCompra();
