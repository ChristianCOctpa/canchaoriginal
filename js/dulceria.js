// js/dulceria.js

document.addEventListener("DOMContentLoaded", () => {
  if (typeof protegerPagina === "function") protegerPagina();

  const productos = [
    { id: 1, nombre: "Gaseosa 500ml", precio: 500, stock: 10 },
    { id: 2, nombre: "Agua 500ml", precio: 400, stock: 15 },
    { id: 3, nombre: "Papas fritas", precio: 700, stock: 8 },
    { id: 4, nombre: "Chocolate", precio: 600, stock: 12 },
  ];

  // Cargar stock guardado en localStorage si existe
  const stockGuardado = JSON.parse(localStorage.getItem("stockDulceria"));
  if (stockGuardado) {
    productos.forEach(p => {
      const prodStock = stockGuardado.find(sp => sp.id === p.id);
      if (prodStock) p.stock = prodStock.stock;
    });
  }

  const productosDiv = document.getElementById("productos");
  const carritoUl = document.getElementById("carrito");
  const totalSpan = document.getElementById("total");
  const comprarBtn = document.getElementById("comprarBtn");

  let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

  function mostrarProductos() {
    productosDiv.innerHTML = "";
    productos.forEach(p => {
      productosDiv.innerHTML += `
        <div>
          <h4>${p.nombre}</h4>
          <p>Precio: ₡${p.precio}</p>
          <p>Stock: ${p.stock}</p>
          <button ${p.stock === 0 ? "disabled" : ""} data-id="${p.id}">Agregar al carrito</button>
        </div>
      `;
    });
  }

  function mostrarCarrito() {
    carritoUl.innerHTML = "";
    carrito.forEach(item => {
      carritoUl.innerHTML += `<li>${item.nombre} - ₡${item.precio}</li>`;
    });
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalSpan.textContent = total;
  }

  productosDiv.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = Number(e.target.dataset.id);
      const producto = productos.find(p => p.id === id);
      if (producto && producto.stock > 0) {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
        producto.stock--;
        mostrarProductos();
        mostrarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("stockDulceria", JSON.stringify(productos));
      }
    }
  });

  comprarBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert("Compra realizada con éxito. Proceda al pago.");
    window.location.href = "pago.html";
  });

  mostrarProductos();
  mostrarCarrito();
});
