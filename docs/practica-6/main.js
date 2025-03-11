let productos = [
    {nombre: "Teclado", precio: 1500, stock: 20},
    {nombre: "Mouse", precio: 2000, stock: 9},
    {nombre: "Monitor", precio: 1300, stock: 15},
    {nombre: "Gabinete", precio: 750, stock: 7},
    {nombre: "Tarjeta gráfica", precio: 5000, stock: 3},
    ];

    //2. Agregar productos al carrito
    let carrito = [];

    function agregarAlCarrito(productoNombre, cantidad){
        for (let producto of productos){
            if (producto.nombre === productoNombre){
                if(producto.stock >= cantidad){
                    carrito.push({
                        nombre: productoNombre,
                        cantidad: cantidad,
                        precio: producto.precio
                    });
                }

                producto.stock -= cantidad;
                console.log(`* ${cantidad} ${productoNombre}(s) agregado(s) al carrito`)
            }
        }
        
    }

    agregarAlCarrito("Teclado", 10);
    agregarAlCarrito("Mouse", 4);
    agregarAlCarrito("Teclado", 5);
    agregarAlCarrito("Mouse", 8);

    //3. Calcular el total del carrito
    function calcularTotal(){
        let total = 0;
        for (let item of carrito){
            item += item.precio * item.cantidad;
        }

        return total;
    }

    let imprimirTotal = calcularTotal();
    console.log(`Venta total: $${imprimirTotal}`);

    //4. Calcular descuento

    function aplicarDescuento(total){
        if (total > 100){
            return total * 0.9;
        }
        return total;
    }

    let imprimirDescuento = aplicarDescuento(imprimirTotal);
    console.log(`Venta con descuento del 10%: $${imprimirDescuento}`);

    function procesarCompra(){
        console.log("Procesando compra");
        setTimeout(function ()){
            let total = calcularTotal();
            total = aplicarDescuento(total);
            console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
            3000;
        }
    }
