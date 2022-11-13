/* Entrega Final.- Estim - Ignacio Lozano */

//Clase Producto

class producto {
    constructor(id, juego, precio, img){
        this.id = id;
        this.juego = juego;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const eldenRing = new producto (1, "Elden Ring", 4999, "img/juegos/elden-ring.jpg");
const modernWarefare2 = new producto (2, "Call of Duty: Modern Warefare 2", 7999, "img/juegos/modern-warfare-2.jpg");
const fifa23 = new producto (3, "FIFA 23", 7999, "img/juegos/fifa-23.jpg");
const legoStarWars = new producto (4, "Lego Star Wars: The Skywalker Saga", 6999, "img/juegos/lego_star_wars.jpg");
const basket = new producto (5, "NBA 2K22", 3999, "img/juegos/2k.jpg");
const fallout4 = new producto (6, "Fallout 4", 2999, "img/juegos/fallout-4.jpg");
const farming15 = new producto (7, "Farming Simulator 15", 1999, "img/juegos/farming-15.jpg")
const fifa22 = new producto (8, "FIFA 22", 4999, "img/juegos/fifa-22.jpg")
const haloInfinite = new producto (9, "Halo Infinite", 5999, "img/juegos/halo-infinite.jpg")
const Hitman3 = new producto (10, "Hitman 3", 3999, "img/juegos/hitman-3.jpg")
const forzaHorizon5 = new producto (11, "Forza Horizon 5", 6999, "img/juegos/horizon-5.jpg")
const valhalla = new producto (12, "Assassins Creed: Valhalla", 4999, "img/juegos/valhalla.jpg")
const basket2 = new producto (13, "NBA 2K23", 6999, "img/juegos/2k23.jpg")
const apex = new producto (14, "Apex Legends", 0, "img/juegos/apex.jpg")
const fallguys = new producto (15, "Fall Guys: Ultimate Knockout", 0, "img/juegos/fallguys.jpg")
const fortnite = new producto (16, "Fortnite", 0, "img/juegos/fortnite.jpg")
const gtav = new producto (17, "Grand Theft Auto V", 4999, "img/juegos/gtav.jpg")
const overwatch = new producto (18, "Overwatch 2", 0, "img/juegos/overwatch2.jpg")
const redDead = new producto (19, "Red Dead Redemption 2", 5999, "img/juegos/red-dead.jpg")
const seaOfThieves = new producto (20, "Sea of Thieves", 4999, "img/juegos/sea-of-thieves.jpg")

const json = "json/productos.json"

// Array de productos

const productos = [eldenRing, modernWarefare2, fifa23, legoStarWars, basket, fallout4, farming15, fifa22, haloInfinite, Hitman3, forzaHorizon5, valhalla, basket2, apex, fallguys, fortnite, gtav, overwatch, redDead, seaOfThieves];

// Array carro

let carrito = [];

// Carrito local storage

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

// DOM Omar

const contenedorDeProductos = document.getElementById("cards");

// Productos

fetch(json)
.then(respuesta => respuesta.json())
.then(datos => {
    datos.forEach(product => {
        const carta = document.createElement("div");
        carta.classList.add("card")
        carta.innerHTML = `
            <div class="card-border"></div>
            <div class="card-content">
                <img src="${product.img}" class="imgProductos" alt=" ${product.juego}">
                <div class="card-body">
                <h5 class="card-title"> ${product.juego} </h5>
                <p class="card-text"> $ ${product.precio} </p>
                <button class="btn colorBoton" id="boton${product.id}"> Comprar </button>
            </div>
            
    `
    contenedorDeProductos.appendChild(carta);

    // Agregar productos al carro
    let boton = document.getElementById(`boton${product.id}`);
    boton.addEventListener("click", () => {
        agregarAlCarrito(product.id);
        console.log(boton);
    })
    })
})

// Agregar al carro

const agregarAlCarrito = (id) => {
    const producto = productos.find((product) => product.id === id);
    const productoEnCarrito = carrito.find((product) => product.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
        Toastify({
            text: "Producto agregado al carrito",
            duration: 1200,
            gravity: "top",
            position: "center",
            className: "tosti",
            offset: {
                x: 10, 
                y: 20,
              },
        }).showToast();
        
        //LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
        carrito.push(producto);
        Toastify({
            text: "Producto agregado al carrito",
            duration: 1200,
            gravity: "top",
            position: "center",
            className: "tosti",
            offset: {
                x: 10, 
                y: 20,
              },
        }).showToast();

        //LocalStorage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

// Mostrar el carrito de compras

const contenedorDeCarrito = document.getElementById("contenedorDeCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

// Funcion para mostrar el carro

const mostrarCarrito = () => {
    contenedorDeCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const carta2 = document.createElement("div");
        carta2.classList.add("card2")
        carta2.innerHTML = `
                <img src="${producto.img}" class="card-img-top imgProductos" alt=" ${producto.juego}">
                <div class="card-body2">
                <h5 class="card-title2"> ${producto.juego} </h5>
                <p class="card-text2"> $ ${producto.precio} </p>
                <p class="card-text3"> Cantidad: <button id="botonContador1${producto.id}" class="contador" type="button" value="-"> - </button> ${producto.cantidad} u. <button id="botonContador2${producto.id}" class="contador" type="button" value="+"> + </button> </p>
                <button class="btn colorBoton boton2" id="eliminar${producto.id}"> Eliminar producto </button>
        `
        contenedorDeCarrito.appendChild(carta2);

        // Eliminar con boton (+)
        const contadorMas = document.getElementById(`botonContador2${producto.id}`);
        contadorMas.addEventListener("click", () => {
        agregarUnoAlCarrito(producto.id);
        mostrarCarrito();
        })

        // Eliminar con boton (-)
        const contadorMenos = document.getElementById(`botonContador1${producto.id}`);
        contadorMenos.addEventListener("click", () => {
        eliminarUnoDelCarrito(producto.id);
        mostrarCarrito();
        })

        // Eliminar productos del carrito
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

 // Agregar un producto al carro, con boton (+)

const agregarUnoAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
            //LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Toastify({
            text: "Se sumó un juego más :D",
            duration: 1500,
            gravity: "top",
            position: "center",
            className: "tosti",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
              offset: {
                x: 10, 
                y: 10,
              },
        }).showToast();
    }else{
        carrito.push(producto);
        //LocalStorage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
    //console.log(carrito)
}

// Eliminar un producto del carrito, con boton (-)
const eliminarUnoDelCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito.cantidad == 1){
        carrito.splice(indice, 1);
        Toastify({
            text: "Uh, estaba bueno ese juego eh :{",
            duration: 2200,
            gravity: "top",
            position: "center",
            className: "tosti",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
              offset: {
                x: 10, 
                y: 10,
              },
        }).showToast();
        //LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
        productoEnCarrito.cantidad--;
        Toastify({
            text: "Producto eliminado",
            duration: 1200,
            gravity: "top",
            position: "center",
            className: "tosti",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
              offset: {
                x: 10, 
                y: 10,
              },
        }).showToast();

        //LocalStorage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    } 
    calcularTotal();
    //console.log(carrito)
}

// Boton eliminar producto

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito()
    Toastify({
        text: "* carita triste *",
        duration: 2000,
        gravity: "top",
        position: "center",
        className: "tosti",
        style: {
            background: "var(--g2)",
          },
          offset: {
            x: 10, 
            y: 10,
          },
    }).showToast();

    //LocalStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar todo el Carro

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarro();
    Toastify({
        text: "Carrito vaciado",
        duration: 1200,
        gravity: "top",
        position: "center",
        className: "tosti",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          offset: {
            x: 10, 
            y: 10,
          },
    }).showToast();
})

// Eliminar todo el carro

const eliminarTodoElCarro = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage
    localStorage.clear();
}

// Mensaje con el total de la compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}

// CARDS

document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    }
}

// Menu Nav

for(const link of document.getElementsByClassName("link")) {
    link.onmousemove = e => {
        const decimal = e.clientX /link.offsetWidth;

        const basePercent = 80,
        percentRange = 20,
        adjustablePercent = percentRange * decimal;

        const redishPercent = basePercent + adjustablePercent;

        link.style.setProperty("--redish-percent", `${redishPercent}%`);
    }
}

// Buscador

const resultado = document.getElementById("resultado");

const formulario = document.getElementById("formulario");

const formulario2 = document.getElementById("formulario2")


// Buscador de Tablet y Desktop
const filtrar = () =>{

    resultado.innerHTML = '';
    
    const texto = formulario.value.toLowerCase();
    for ( let producto of productos ){
        let nombre = producto.juego.toLowerCase();

        if ( nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
                <div class="cardsBuscador">
                    <img src="${producto.img}" class="card-img-top" alt=" ${producto.juego}">
                <div class="card-body3">
                    <h5 class="card-title3"> ${producto.juego} </h5>
                    <p class="card-text3"> $ ${producto.precio} </p>
                    <button class="button-28" role="button" id="boton${producto.id}"> Comprar </button>
                </div>
                </div>

            `
            // Agregar productos al carro
            const boton = document.querySelector(`#boton${producto.id}`);
            boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            clearInput();
            console.log(boton)

        })
        }
    }
    
    if ( resultado.innerHTML === '' ){
        resultado.innerHTML = `<li>Uh, que mala suerte! Ese no lo tenemos. :o</li>`
    }
}
formulario.addEventListener('keyup', filtrar);

// Buscador Mobile

const filtrarMobile = () =>{

    resultado.innerHTML = '';
    
    const texto = formulario2.value.toLowerCase();
    for ( let producto of productos ){
        let nombre = producto.juego.toLowerCase();

        if ( nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
                <div class="cardsBuscador">
                    <img src="${producto.img}" class="card-img-top" alt=" ${producto.juego}">
                <div class="card-body3">
                    <h5 class="card-title3"> ${producto.juego} </h5>
                    <p class="card-text3"> $ ${producto.precio} </p>
                    <button class="button-28" role="button" id="boton${producto.id}"> Comprar </button>
                </div>
                </div>

            `
            // Agregar productos al carro
            const boton = document.querySelector(`#boton${producto.id}`);
            boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            clearInput();
            console.log(boton)

        })
        }
    }
    
    if ( resultado.innerHTML === '' ){
        resultado.innerHTML = `<li>Uh, que mala suerte! Ese no lo tenemos. :o</li>`
    }
}
formulario2.addEventListener('keyup', filtrarMobile);

// Borrar al estar vacio el input del buscador - Desktop-Tablet

const borradoFiltrado = () =>{
    const texto = formulario.value.toLowerCase();
    if (texto == ""){
        resultado.innerHTML = '';
        showDropmenu.classList.replace("main3", "main3Hidden");
        }
    }
formulario.addEventListener('keyup', borradoFiltrado)

// Borrar al estar vacio el input del buscador - Mobile

const borradoFiltradoMobile = () =>{
    const texto = formulario2.value.toLowerCase();
    if (texto == ""){
        resultado.innerHTML = '';
        showDropmenu.classList.replace("main3", "main3Hidden");
        }
    }
formulario2.addEventListener('keyup', borradoFiltradoMobile)

// Clear input - Desktop-Tablet

const clearInput = () => {
    const getValue = document.getElementById("formulario");
    if (getValue.value != "") {
        getValue.value = "";
        resultado.innerHTML = '';
    } else if (getValue.value == ""){
        getValue.value = "";
        resultado.innerHTML = '';
    }
}

// Clear input - Mobile

const clearInputMobile = () => {
    const getValue = document.getElementById("formulario2");
    if (getValue.value != "") {
        getValue.value = "";
        resultado.innerHTML = '';
    } else if (getValue.value == ""){
        getValue.value = "";
        resultado.innerHTML = '';
    }
}

// Funcionalidad y animacion del contenedor de Search - Desktop-Tablet
// Abrir buscador

const showDropmenu = document.querySelector("#mainTres");
const btnHideDropmenu = document.getElementById("formulario");

btnHideDropmenu.addEventListener("keypress", () => {
    showDropmenu.classList.replace("main3Hidden", "main3"); 
})

// Cerrar buscador
document.addEventListener('click', function handleClickOutsideBox(event) {
    const box = document.getElementById('formulario');
      
    if (!box.contains(event.target)) {
        showDropmenu.classList.replace("main3", "main3Hidden");
        clearInput();
    }
});

// Funcionalidad y animacion del contenedor de Search - Mobile
// Abrir buscador

const btnHideDropmenu2 = document.getElementById("formulario2");

btnHideDropmenu2.addEventListener("keypress", () => {
    showDropmenu.classList.replace("main3Hidden", "main3"); 
})

// Cerrar buscador
document.addEventListener('click', function handleClickOutsideBox(event) {
    const box = document.getElementById('formulario2');
      
    if (!box.contains(event.target)) {
        showDropmenu.classList.replace("main3", "main3Hidden");
        clearInputMobile();
    }
});

// Clear Input con ESC

document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		clearInput();
        showDropmenu.classList.replace("main3", "main3Hidden");
	}
});

// Eliminar clase .cartaGradiente en mobile

const gradientCard = document.getElementById("gradientCard")
const gradientCard2 = document.querySelector('.carrito2')

let isMobile = window.matchMedia("only screen and (max-width: 821px)").matches;
let isTablet = window.matchMedia("only screen and (max-width: 480px)").matches;

if (isMobile)
    {
        gradientCard.classList.remove("cartaGradiente");
        gradientCard2.classList.remove("cartaGradiente");

    }

    if (isTablet)
    {
        gradientCard.classList.remove("cartaGradiente");
        gradientCard2.classList.remove("cartaGradiente");

    }
