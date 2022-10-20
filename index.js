/// Variables
const carrito = document.querySelector('#carroC');
const contenedorCarrito = document.querySelector('#listproduccarrito tbody');
const botonVaciar = document.querySelector('#vaciarCarro');
const productoslist = document.querySelector('#productoslist');
let productos = [];

cargarEventListeners();
function cargarEventListeners() {
    // Agregas producto tocando "Agregar al Carrito"
    productoslist.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carroC.addEventListener('click', eliminarProducto);

    // Muestra los productos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        productos = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })


    // Vaciar el carrito 
    botonVaciar.addEventListener('click', () => {
        productos = [];

        limpiarHTML(); // Eliminamos todo el HTML
    })
}


// Funciones
function agregarProducto(e) {
    e.preventDefault();


    if (e.target.classList.contains('agregaralCarro')) {
        const artiSeleccionado = e.target.parentElement.parentElement;
        datosArticuloLeeo(artiSeleccionado);
    }

}

// Elimina prodcuto del carro de compra
function eliminarProducto(e) {
    if (e.target.classList.contains('producto-borrar')) {
        const articulosId = e.target.getAttribute('data-id');

        // Saco del arreglo de articulosId por el data-id
        productos = productos.filter(articulo => articulo.id !== articulosId);

        carritoHTML(); // Iterar sobre el carrito 
    }
}

// Lee el contenido del HTML al que le dimos click 
function datosArticuloLeeo(articulo) {
    // console.log(articulo);

    // Crear un objeto con el contenido del articulo actual
    const productosInfo = {
        imagen: articulo.querySelector('img').src,
        titulo: articulo.querySelector('h4').textContent,
        precio: articulo.querySelector('.precio').textContent,
        id: articulo.querySelector('a').getAttribute('data-id'),
        cantidad: 1, }

    let articulosLocalS;
    articulosLocalS = this.obtenerArtiLocalStorage ();
    articulosLocalS.forEach(function (articulosLocalS){
        if(articulosLocalS.id === productosInfo){
            articulosLocalS = articulosLocalS.id;
        }
    });       
            
 }
    

// me fijo si un producto ya lo habia tomado en el carro
const existeProduc = productos.some(articulo => articulo.id === productos.id);
if (existeProduc) {
    // Actualizamos la cantidad
    const articulo = productos.map(articulo => {
        if (articulo.id === productos.id) {
            articulo.cantidad++;
            return articulo;
        } else {
            return articulo; // retorna los objetos que no son los duplicados
        }
    });
    productos = [...articulo];
} else {
    // Agrega elementos al arreglo de carrito
    productos = [...productos, productos];
}
console.log(productos);

carritoHTML();

//Calculo precios
totalCalcular () ;{
    let articulosLocalS; 
    let total = 0;
    articulosLocalS = this.obtenerArtiLocalStorage ();
    for(let i = 0; i < articulosLocalS.length; i++ ){
        let elementos = Number(articulosLocalS[i].precio * articulosLocalS[i].cantidad);
        total = total + elementos;
    }
    document.getElementById('total').value = "S/." + total.toFixed(2);
}
eventoO (e) ; {
e.preventDefault ();
let id, cantidad, articulo , articulosLocalS;
if (e.target.classList.contains('cantidad')){
     articulo  = e.target.parentElement.parentElement;
     id = articulo.querySelector('a').getAttribute('data-id');
     cantidad = articulo.querySelector('input').value;
     articulosLocalS = this.obtenerArtiLocalStorage();
     
     
}
}



// Muestra el Carrito de compras en el HTML
function carritoHTML() {
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    productos.forEach(articulo => {
        const { imagen, titulo, precio, cantidad, id } = articulo;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${total}</td>
            <td>
                <a href="#" class="producto-borrar" data-id="${id}" > - </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(productos));
}

// Elimina los cursos del tbody
function limpiarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}