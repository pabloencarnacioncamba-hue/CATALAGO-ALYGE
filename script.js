const API_URL = https://script.google.com/macros/s/AKfycbxa2rjMhKahAMtu2G0IVshgOq7AEDSNZ6t82GnXDwPMz_SfBKgCfJkNeV88zqcD8lhS/exec; // ?? reemplaza con la URL /exec
const NUMERO_WHATSAPP = "5213312345678"; // ?? reemplaza con tu número real

let productos = [];
let categorias = [];

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarCategorias();
    mostrarProductos(productos);
  });

function mostrarCategorias() {
  const contenedor = document.getElementById("categorias");
  categorias = [...new Set(productos.map(p => p.Categoría))];
  contenedor.innerHTML = categorias.map(c => `<span class="categoria" onclick="filtrar('${c}')">${c}</span>`).join('');
}

function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = lista.map(p => `
    <div class="card">
      <img src="${p.Imagen_URL}" alt="${p.Nombre}" />
      <h3>${p.Nombre}</h3>
      <p>${p.Descripción}</p>
      <strong>$${p.Precio}</strong>
      <br>
      <button onclick="consultar('${encodeURIComponent(p.Nombre)}')">Consultar</button>
    </div>
  `).join('');
}

function filtrar(cat) {
  const filtrados = productos.filter(p => p.Categoría === cat);
  mostrarProductos(filtrados);
}

function consultar(nombre) {
  const url = `https://wa.me/$5213318192003?text=Hola,%20quiero%20consultar%20la%20disponibilidad%20del%20artículo:%20${nombre}`;
  window.open(url, "_blank");
}

document.getElementById("buscador").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = productos.filter(p => p.Nombre.toLowerCase().includes(texto));
  mostrarProductos(filtrados);
});
