const productos = [
  { id: 1, nombre: "Cinnamoroll", precio: 3500 },
  { id: 2, nombre: "Kirby", precio: 3000 },
  { id: 3, nombre: "Hotwheels", precio: 1500 },
  { id: 4, nombre: "Spiderman", precio: 4000 },
  { id: 5, nombre: "Sailor Moon", precio: 4500 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  mostrarCarrito();

  document.getElementById('finalizarCompraBtn').addEventListener('click', () => {
    if (carrito.length > 0) {
      document.getElementById('formularioCompra').style.display = 'block';
    } else {
      Toastify({
        text: 'Tu carrito está vacío.',
        duration: 2000,
        gravity: 'top',
        position: 'center',
        style: {
          background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        },
      }).showToast();
    }
  });

  document.getElementById('compraForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreUsuario = document.getElementById('nombre').value;
    const direccionUsuario = document.getElementById('direccion').value;

    if (nombreUsuario && direccionUsuario) {
      Toastify({
        text: `Gracias por tu compra, ${nombreUsuario}!`,
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
        },
      }).showToast();

      const historial = JSON.parse(localStorage.getItem('historial')) || [];
      historial.push({ carrito, nombre: nombreUsuario, direccion: direccionUsuario });
      localStorage.setItem('historial', JSON.stringify(historial));

      carrito = [];
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();
      document.getElementById('formularioCompra').style.display = 'none';
    } else {
      Toastify({
        text: 'Por favor, completa todos los campos.',
        duration: 2000,
        gravity: 'top',
        position: 'center',
        style: {
          background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        },
      }).showToast();
    }
  });
});

function mostrarProductos() {
  const productosContainer = document.getElementById('productos');
  productosContainer.innerHTML = '';
  productos.forEach((producto) => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');
    productoDiv.innerHTML = `
      <p>${producto.nombre} - $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    productosContainer.appendChild(productoDiv);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find((prod) => prod.id === id);
  const existeEnCarrito = carrito.find((item) => item.id === id);

  if (existeEnCarrito) {
    existeEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();

  Toastify({
    text: `${producto.nombre} añadido al carrito.`,
    duration: 2000,
    gravity: 'top',
    position: 'center',
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
  }).showToast();
}

function mostrarCarrito() {
  const carritoList = document.getElementById('carritoList');
  carritoList.innerHTML = '';
  let total = 0;

  carrito.forEach((producto) => {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
      <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</span>
      <div class="cantidad-control">
        <button onclick="modificarCantidad(${producto.id}, -1)">-</button>
        <span>${producto.cantidad}</span>
        <button onclick="modificarCantidad(${producto.id}, 1)">+</button>
      </div>
    `;
    carritoList.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  document.getElementById('totalCarrito').textContent = 'Total: $' + total;
}

function modificarCantidad(id, cambio) {
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
      carrito = carrito.filter((item) => item.id !== id);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }
}
