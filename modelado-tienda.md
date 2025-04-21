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
