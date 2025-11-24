// js/factura.js

document.addEventListener("DOMContentLoaded", () => {
  if (typeof protegerPagina === "function") protegerPagina();

  const facturaDiv = document.getElementById("facturaDetalle");
  const factura = JSON.parse(localStorage.getItem("factura"));

  if (!factura) {
    facturaDiv.textContent = "No hay factura disponible.";
    return;
  }

  let html = `<p><strong>Nombre en tarjeta:</strong> ${factura.nombre}</p>`;
  html += `<h3>Productos comprados:</h3><ul>`;
  factura.carrito.forEach(item => {
    html += `<li>${item.nombre} - ₡${item.precio}</li>`;
  });
  html += `</ul>`;
  html += `<p><strong>Total pagado:</strong> ₡${factura.total}</p>`;

  facturaDiv.innerHTML = html;
});
