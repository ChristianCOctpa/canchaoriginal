
function cargarNavbarFooter() {
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  navbar.innerHTML = `
    <nav>
      <div class="nav-container">
        <div class="logo"><a href="index.html">Fútbol 5 Aserrí</a></div>
        <button class="menu-toggle" aria-label="Toggle menu">&#9776;</button>
        <ul class="nav-links">
          <li><a href="index.html">Inicio</a></li>
          <li><a href="reserva.html">Reservar</a></li>
          <li><a href="dulceria.html">Dulcería</a></li>
          <li><a href="pago.html">Pago</a></li>
          <li>
            <button id="loginBtn" style="display:none;">Iniciar sesión</button>
            <button id="logoutBtn" style="display:none;">Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </nav>
  `;

  footer.innerHTML = `
    <footer style="text-align:center; padding:10px; background:#1a5a14; color:#ecf0f1;">
      © 2025 Cancha de Fútbol 5 Aserrí
      <h3 class="headline footer">Contáctenos</h3>
          <ul>
            <li><i class="fa fa-phone" aria-hidden="true"></i><a href="tel:8313-5971" class="ng-binding">Whatsapp: 8313-5971</a></li>
            <li><i class="fa fa-envelope" aria-hidden="true"></i>
              <a href="https://www.facebook.com/share/16MEhMWQzL/" target="_blank" rel="noopener noreferrer">Síguenos en Facebook </a>
              <a href="https://www.instagram.com/canchalepanto?igsh=MWhtOXhjaHo0Z2JqcA==" target="_blank" rel="noopener noreferrer">Síguenos en instagram </a>
            </li>
            
          </ul>
    </footer>
  `;

  
  const menuToggle = navbar.querySelector(".menu-toggle");
  const navLinks = navbar.querySelector(".nav-links");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Menu hamburguesa toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Mostrar/Ocultar botones según login
  const usuarioActual = localStorage.getItem("usuarioActual");

  if (usuarioActual) {
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }

  // Cerrar sesión
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioActual");
    alert("Sesión cerrada");
    window.location.href = "login.html";
  });

  // Ir a iniciar sesión
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", () => {
  cargarNavbarFooter();

  // --- Carrusel ---
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let index = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Auto-play cada 5s
    setInterval(() => {
      index = (index + 1) % slides.length;
      updateCarousel();
    }, 5000);
  }
  
  
});
