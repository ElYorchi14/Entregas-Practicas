# Modelado de Datos - Tienda Online

## 1. Modelo Entidad-Relación de la Tienda Online

### Entidades Principales

#### 🛒 Cliente

- **ID_Cliente** (PK)
- Nombre
- Correo electrónico
- Contraseña
- Dirección

#### 📦 Producto

- **ID_Producto** (PK)
- Nombre
- Descripción
- Precio
- Stock
- Categoría

#### 📁 Categoría

- **ID_Categoría** (PK)
- Nombre
- Descripción

#### 🧾 Pedido

- **ID_Pedido** (PK)
- Fecha
- Total
- ID_Cliente (FK)

#### 📄 Detalle_Pedido

- **ID_Detalle** (PK)
- ID_Pedido (FK)
- ID_Producto (FK)
- Cantidad
- Precio Unitario

### Relaciones

- Un **cliente** puede hacer muchos **pedidos** (1 a N).
- Un **pedido** puede tener muchos **productos** (relación N a N mediante Detalle_Pedido).
- Un **producto** pertenece a una sola **categoría**, pero una **categoría** puede tener muchos **productos** (1 a N).
- La tabla **Detalle_Pedido** relaciona productos con pedidos y permite registrar la cantidad y el precio en cada compra.

---

## 2. Diagrama Relacional

![Diagrama Relacional](/assets/diagrama-relacional-tienda.png)

## Captura del esquema en Supabase

A continuación se muestra el modelo de datos generado en Supabase.

![Diagrama de Supabase](/assets/supabase-schema.png)

## Reglas de Negocio

### clientes

- Crear un cliente.
- Leer todos los clientes.
- Leer un cliente en particular.
- Actualizar un cliente.
- Eliminar un cliente.
- Antes de crear un cliente, verificar mediante su correo electrónico que no exista otro con el mismo correo.

### productos

- Crear un producto.
- Leer todos los productos.
- Leer un producto en particular.
- Actualizar un producto.
- Eliminar un producto.
- No permitir realizar un pedido si el producto tiene stock en 0.
- Reducir la cantidad de stock cada vez que se complete una compra.

### categorias

- Crear una categoría.
- Leer todas las categorías.
- Leer una categoría en particular.
- Actualizar una categoría.
- Eliminar una categoría (solo si no tiene productos asociados).

### pedidos

- Crear un pedido.
- Leer todos los pedidos.
- Leer un pedido en particular.
- Actualizar un pedido (solo si aún no ha sido procesado).
- Eliminar un pedido (solo si aún no ha sido procesado).
- Calcular automáticamente el total del pedido al momento de su creación sumando el precio \* cantidad de cada producto.

### detalle_pedidos

- Crear un detalle de pedido.
- Leer todos los detalles de pedido.
- Leer un detalle de pedido en particular.
- Actualizar un detalle de pedido.
- Eliminar un detalle de pedido.
- Validar que el producto asociado exista antes de agregarlo al detalle.
- No permitir cantidades menores o iguales a cero.
