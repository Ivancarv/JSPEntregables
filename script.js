const productos = [
  { nombre: "Cinnamoroll", precio: 3500 },
  { nombre: "Kirby", precio: 3000 },
  { nombre: "Hotwheels", precio: 1500 },
  { nombre: "Spiderman", precio: 4000 },
  { nombre: "Sailor Moon", precio: 4500 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  mostrarCarrito();

  // Finalizar compra
  document.getElementById('finalizarCompraBtn').addEventListener('click', () => {
      if (carrito.length > 0) {
          document.getElementById('formularioCompra').style.display = 'block';
      } else {
          alert('Tu carrito está vacío.');
      }
  });

  // Confirmar compra
  document.getElementById('compraForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const nombreUsuario = document.getElementById('nombre').value;
      const direccionUsuario = document.getElementById('direccion').value;

      if (nombreUsuario && direccionUsuario) {
          alert('Gracias por tu compra, ' + nombreUsuario + '! Tu pedido será enviado a ' + direccionUsuario + '.');
          // Guardar historial de compras
          const historial = JSON.parse(localStorage.getItem('historial')) || [];
          historial.push({ carrito, nombre: nombreUsuario, direccion: direccionUsuario });
          localStorage.setItem('historial', JSON.stringify(historial));
          // Vaciar carrito después de la compra
          carrito = [];
          localStorage.setItem('carrito', JSON.stringify(carrito));
          mostrarCarrito();
          document.getElementById('formularioCompra').style.display = 'none';
      } else {
          alert('Por favor, completa todos los campos.');
      }
  });
});

// Mostrar productos disponibles
function mostrarProductos() {
  const productosContainer = document.getElementById('productos');
  productos.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
          <p>${producto.nombre} - $${producto.precio}</p>
          <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
      `;
      productosContainer.appendChild(productoDiv);
  });
}

// Agregar al carrito
function agregarAlCarrito(index) {
  const producto = productos[index];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
  const carritoList = document.getElementById('carritoList');
  carritoList.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
      const li = document.createElement('li');
      li.textContent = `${producto.nombre} - $${producto.precio}`;
      carritoList.appendChild(li);
      total += producto.precio;
  });

  document.getElementById('totalCarrito').textContent = 'Total: $' + total;
}
