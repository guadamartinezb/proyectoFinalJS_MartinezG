/// Variables
const carrito = document.querySelector('#carroC');
const contenedorCarrito = document.querySelector('#listproduccarrito tbody');
const botonVaciar = document.querySelector('#vaciarCarro');
const productoslist = document.querySelector('#productoslista');
let productos = [];

cargarEventListeners();
function cargarEventListeners() {
    // Agregas producto tocando "Agregar al Carrito"
    productoslist.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carroC.addEventListener('click', eliminarProducto);

    // Muestra los productos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        productos = JSON.parse(localStorage.getItem('carroC')) || [];

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
// Toastify({

//     text: "El Producto agregado correctamente",

//     duration: 3000
//     // gravedad : "superior izquierda" ,  

//    } , 
//    onClick : function ( ) { }  
//   ) . mostrarbrindis ( ) ;



// Elimina prodcuto del carro de compra
function eliminarProducto(e) {
    if (e.target.classList.contains('producto-borrar')) {
        const articulosId = e.target.getAttribute('data-id');


        //         // Saco del arreglo de articulosId por el data-id
        productos = productos.filter(articulo => articulo.id !== articulosId);

        carritoHTML(); // Iterar sobre el carrito 
    }
    Swal.fire({
        title: 'Deseas borrar producto?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        denyButtonText: `No borrar`,
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire('Borrado!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Cambios no guardados', '', 'info')
        }
    })
}

//==========PRUBO ESTA FORMA===== 
//   function eliminarProducto (e)  {

//     e.preventDefault();
//     let articulo, articulosId;
//     if (e.target.classList.contains('producto-borrar')) {
//         e.target.parentElement.parentElement.remove();
//         articulo = e.target.parentElement.parentElement;
//         articulosId = articulo.querySelector('a').getAttribute('data-id');
//     }
//     this.eliminoProductoLocalStorage (articulosId);
//     this.totalCalcular();
// }
//almaceno en Local S
function guardarProductosLS(articulo) {
    productos = this.obtenerArtiLocalStorage();
    productos.push(articulo);
    localStorage.setItem('productos', JSON.stringify(productos));

}

function obtenerArtiLocalStorage() {
    // let articulosLocalS;
    if (localStorage.getItem('articulo') === null) {
        articulosLocalS = [];
    }
    //     else{ articulosLocalS = JSON.parse(localStorage.getItem('articulo'));
    // } return articulosLocalS;
    else {
        articulosLocalS = JSON.parse(localStorage.getItem('productos'));
        // } return articulosLocalS ;


    }

    // Lee el contenido del HTML al que le dimos click 
    function datosArticuloLeeo(articulo) {
        console.log(articulo);

        // Crear un objeto con el contenido del articulo actual
        const productosInfo = {
            imagen: articulo.querySelector('img').src,
            titulo: articulo.querySelector('h4').textContent,
            precio: articulo.querySelector('.precio').textContent,
            id: articulo.querySelector('a').getAttribute('data-id'),
            cantidad: 1,
        }

        let productos;
        productos = this.obtenerArtiLocalStorage();
        productos.forEach(function (productos) {
            if (productos.id === productosInfo) {
                productos = productos.id;
            }
        });

    }


    // me fijo si un producto ya lo habia tomado en el carro
    const existeProduc = productos.some(articulo => articulo.id === productosInfo.id);
    if (existeProduc) {
        // Actualizamos la cantidad
        const articulo = productos.map(articulo => {
            if (articulo.id === productosInfo) {
                articulo.cantidad++;
                return articulo;
            } else {
                return articulo; // retorna los objetos que no son los duplicados
            }
        });
        productos = [...articulo];
    } else {
        // Agrega elementos al arreglo de carrito
        productos = [...productos,productosInfo ];
    }
    console.log(productos);

    carritoHTML();

    //Calculo precios
    totalCalcular(); {
        let articulosLocalS;
        let total = 0;
        articulosLocalS = this.obtenerArtiLocalStorage();
        for (let i = 0; i < articulosLocalS.length; i++) {
            let elementos = Number(articulosLocalS[i].precio * articulosLocalS[i].cantidad);
            total = total + elementos;
        }
        document.getElementById('total').carritoHTML = "S/." + total.toFixed(2);
    }
    eventoO(e); {
        e.preventDefault();
        let id, cantidad, productos, articulosLocalS;
        if (e.target.classList.contains('cantidad')) {
            articulo = e.target.parentElement.parentElement;
            id = articulo.querySelector('a').getAttribute('data-id');
            cantidad = articulo.querySelector('input').value;
            articulosLocalS = this.obtenerArtiLocalStorage();


        }
    }



    // Muestra el Carrito de compras en el HTML
    // const contendio = element.carritoHTML;
    // element.carritoHTML = htmlString;

    function carritoHTML() {
        limpiarHTML();

        // Recorre el carrito y genera el HTML
        productos.forEach(articulo => {
            const { imagen, titulo, precio, cantidad, id } = articulo;
            const row = document.createElement('tr');
            row.carritoHTML = `
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
}

