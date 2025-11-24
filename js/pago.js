// js/pago.js

document.addEventListener("DOMContentLoaded", () => {
  if (typeof protegerPagina === "function") protegerPagina();

  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  document.getElementById("monto").value = total;

  const pagoForm = document.getElementById("pagoForm");

  pagoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const tarjeta = document.getElementById("tarjeta").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (nombre.length === 0 || tarjeta.length !== 16 || !/^\d{16}$/.test(tarjeta) || cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
      alert("Por favor, ingresa datos válidos para el pago.");
      return;
    }

    // Guardar datos para factura
    const factura = {
      nombre,
      carrito,
      total
    };
    localStorage.setItem("factura", JSON.stringify(factura));
    alert("Pago simulado exitoso. Será redirigido a la factura.");
    window.location.href = "factura.html";
  });
});
