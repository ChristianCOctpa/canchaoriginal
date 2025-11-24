// js/auth.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  document.querySelector("main").prepend(mensaje);

  function mostrarMensaje(texto, tipo = "error") {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.style.display = "block";
  }

  function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (!validarEmail(email)) {
        mostrarMensaje("Ingrese un correo válido.");
        return;
      }
      if (password.length < 6) {
        mostrarMensaje("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const usuario = usuarios.find((u) => u.email === email && u.password === password);

      if (usuario) {
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        mostrarMensaje("Inicio de sesión exitoso.", "exito");
        setTimeout(() => window.location.href = "index.html", 1000);
      } else {
        mostrarMensaje("Usuario o contraseña incorrectos.");
      }
    });
  }

  // Registro
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value.trim();

      if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres.");
        return;
      }
      if (!validarEmail(email)) {
        mostrarMensaje("Ingrese un correo válido.");
        return;
      }
      if (password.length < 6) {
        mostrarMensaje("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      if (usuarios.some((u) => u.email === email)) {
        mostrarMensaje("Este correo ya está registrado.");
        return;
      }

      const nuevoUsuario = { nombre, email, password };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarMensaje("Registro exitoso. Redirigiendo...", "exito");
      setTimeout(() => window.location.href = "login.html", 1500);
    });
  }
});
