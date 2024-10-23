
let nombre = "Juan";
let Cant = 25;
const PI = 3.1416;
let Productos = ["Cinnamoroll", "Kirby", "Hotwheels" , "Spiderman" , "Sailor "];


function saludar() {
  let nombreUsuario = prompt("¿Cuál es tu nombre?");
  if (nombreUsuario) {
    alert("Hola, " + nombreUsuario + "! Bienvenido.");
  } else {
    alert("No ingresaste ningún nombre.");
  }
}


function listaProducto() {
  let mensaje = "Estos son nuestros productos disponibles:\n";
  for (let i = 0; i < Productos.length; i++) {
    mensaje += Productos[i] + "\n";
  }
  alert(mensaje);
}


function buscarProducto() {
  let ProducBuscado = prompt("Ingresa el nombre de la fruta que quieres buscar:");
  if (Productos.includes(ProducBuscado)) {
    alert(ProducBuscado + " está disponible.");
  } else {
    alert(ProducBuscado + " no está disponible.");
  }
}


function CantidadProducto() {
  let Cant = prompt("¿Cuál es la cantidad de productos que lleva?");
  if (Cant >= 3) {
    console.log("El usuario lleva " + Cant + " productos, es perfecto! vuelva pronto.");
    alert("Gracias por comprar!! Cuando vuelvas a comprar te daremos un 2x1.");
  } else {
    console.log("El usuario lleva " + Cant + " productos, es muy poco! lleva mas.");
    alert("lleva un producto mas y te damos descuento!.");
  }
}

