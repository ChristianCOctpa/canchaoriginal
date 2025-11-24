// js/reserva.js

document.addEventListener("DOMContentLoaded", () => {
  // Proteger página
  if (typeof protegerPagina === "function") protegerPagina();

  const reservaForm = document.getElementById("reservaForm");
  const mensajeReserva = document.getElementById("mensajeReserva");

  // Cargar reservas previas
  let reservas = JSON.parse(localStorage.getItem("reservas") || "[]");

  // Función para chequear si fecha/hora está ocupada
  function estaDisponible(fecha, hora) {
    return !reservas.some(r => r.fecha === fecha && r.hora === hora);
  }

  // Limitar fecha mínima a hoy
  const fechaInput = document.getElementById("fecha");
  const hoy = new Date().toISOString().split("T")[0];
  fechaInput.min = hoy;

  reservaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fecha = fechaInput.value;
    const hora = document.getElementById("hora").value;

    if (!fecha || !hora) {
      mensajeReserva.style.color = "red";
      mensajeReserva.textContent = "Por favor, seleccione fecha y hora.";
      return;
    }

    if (!estaDisponible(fecha, hora)) {
      mensajeReserva.style.color = "red";
      mensajeReserva.textContent = "Este horario ya está reservado, por favor elija otro.";
      return;
    }

    // Guardar reserva
    reservas.push({ fecha, hora, usuario: JSON.parse(localStorage.getItem("usuarioActual"))?.email || "Anónimo" });
    localStorage.setItem("reservas", JSON.stringify(reservas));

    mensajeReserva.style.color = "green";
    mensajeReserva.textContent = `Reserva confirmada para el ${fecha} a las ${hora}.`;

    // Limpiar formulario
    reservaForm.reset();
  });
});
