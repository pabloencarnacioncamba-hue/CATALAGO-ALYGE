// ✅ URL del Web App de Google Sheets (debe terminar en /exec)
const API_URL = "https://script.google.com/macros/s/AKfycbwScqdIrqYxmcZMLcw5CyulNxeMCV90gPfqdhJqNnj9udL8il10H20SyLbWcgysPYJR/exec";
const NUMERO_WHATSAPP = "5213318192003"; // número en formato internacional

let productos = [];
let categorias = [];

// Carga los productos desde Google Sheets
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarCategorias();
    mostrarProductos(productos);
  })
  .catch(err => {
    console.error("Error al cargar productos:", err);
    document.getElementById("productos").innerHTML = "<p style='text-align:center;'>Error al cargar los productos.</p>";
  });

// Muestra las categorías únicas
function mostrarCategorias() {
  const contenedor = document.getElementById("categorias");
  categorias = [...new Set(productos.map(p => p.Categoría))];
  contenedor.innerHTML = categorias.map(c => `<span class="categoria" onclick="filtrar('${c}')">${c}</span>`).join('');
}

// Muestra los productos filtrados
function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = lista.map(p => `
    <div class="card">
      <img src="${p.Imagen_URL}" alt="${p.Nombre}" />
      <h3>${p.Nombre}</h3>
      <p>${p.Descripción || ''}</p>
      <strong>$${p.Precio}</strong>
      <br>
      <button onclick="consultar('${encodeURIComponent(p.Nombre)}')">Consultar</button>
    </div>
  `).join('');
}

// Filtra por categoría
function filtrar(cat) {
  const filtrados = productos.filter(p => p.Categoría === cat);
  mostrarProductos(filtrados);
}

// Buscar productos por texto
document.getElementById("buscador").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = productos.filter(p => p.Nombre.toLowerCase().includes(texto));
  mostrarProductos(filtrados);
});

// Enviar mensaje por WhatsApp
function consultar(nombre) {
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=Hola,%20quiero%20consultar%20la%20disponibilidad%20del%20artículo:%20${nombre}`;
  window.open(url, "_blank");
}
