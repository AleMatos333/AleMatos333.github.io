let productos = [
    {
        "id": "Sándwich Serrano",
        "titulo": "Sándwich Serrano",
        "imagen": "img/comida/sandwich serrano.jpg",
        "categoria": {
            "nombre": "Sándwich",
            "id": "Sándwich"
        },
        "precio": 10
    },
    {
        "id": "Sándwich Clásico",
        "titulo": "Sándwich Clásico",
        "imagen": "img/comida/sandwixh clasico.jpeg",
        "categoria": {
            "nombre": "Sándwich",
            "id": "Sándwich"
        },
        "precio": 5
    },
    {
        "id": "Ensalada César",
        "titulo": "Ensalada César",
        "imagen": "img/comida/ensalada cesar.jpeg",
        "categoria": {
            "nombre": "Ensalada",
            "id": "Ensalada"
        },
        "precio": 6
    },
    {
        "id": "Ensalada Mediterránea",
        "titulo": "Ensalada Mediterránea",
        "imagen": "img/comida/ensalada mediterranea.jpeg",
        "categoria": {
            "nombre": "Ensalada",
            "id": "Ensalada"
        },
        "precio": 8
    },
    {
        "id": "Lomo Simple",
        "titulo": "Lomo Simple",
        "imagen": "img/comida/lomo simple.jpg",
        "categoria": {
            "nombre": "Lomo",
            "id": "Lomo"
        },
        "precio": 12
    },
    {
        "id": "Lomo Completo",
        "titulo": "Lomo Completo",
        "imagen": "img/comida/lomo completo.jpg",
        "categoria": {
            "nombre": "Lomo",
            "id": "Lomo"
        },
        "precio": 15
    },
    {
        "id": "Lomo con Rúcula",
        "titulo": "Lomo con Rúcula",
        "imagen": "img/comida/lomo con rucula.jpeg",
        "categoria": {
            "nombre": "Lomo",
            "id": "Lomo"
        },
        "precio": 18
    },
];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}