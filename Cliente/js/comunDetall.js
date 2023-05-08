const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const DPI = localStorage.getItem('dpi');
console.log(DPI);

const productosContainer = document.getElementById('productosView');

console.log(productId);

fetch(`http://localhost:3000/prod/detalles/${productId}`)
  .then(respuesta => respuesta.json())
  .then(datos => {
    const producto = datos;

    // Crear un contenedor para cada producto
    const productoContainer = document.createElement('div');
    productoContainer.classList.add('productosVer');

    // Crear un elemento HTML para mostrar la imagen del producto
    const imgElem = document.createElement('img');
    const rutaBase = 'http://localhost:3000';
    const rutaImagen = producto.img;
    imgElem.src = rutaBase + rutaImagen;

    // Agregar la imagen al contenedor de producto
    productoContainer.appendChild(imgElem);

    // Crear un elemento HTML para mostrar los datos del producto
    const productoElem = document.createElement('div');
    productoElem.innerHTML = `
      <br>
      <center><h3>${producto.nombre}</h3></center>
      <br>
      <p class="precio">Precio: Q${producto.precio}</p>
      <p>Descripcion: ${producto.descripcion}</p>
      <p>vendedor: ${producto.vendedor.nombre}</p>
      <p>Cantidad Existente: ${producto.cantidad_existente}</p>
      <p>Categorías: ${producto.categorias.join(', ')}</p>
      <p>Estado: ${producto.estado}</p>
    `;

    // Crear un elemento HTML para los botones del producto
    const botonesElem = document.createElement('div');
    botonesElem.innerHTML = `
      <button class="greenDet" id="btnAgregar">Añadir a Carrito</button>
      <input type="number" name="cantidad" id="cantidad" min="0" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
    `;
    botonesElem.style.display = 'block';

    // Agregar el elemento de los botones y el elemento de los datos del producto al contenedor de producto
    productoElem.appendChild(botonesElem);
    productoContainer.appendChild(productoElem);
    productosContainer.appendChild(productoContainer); // Agregar el contenedor de producto al contenedor de productos
    
    const btnAgregar = document.getElementById('btnAgregar');

    btnAgregar.addEventListener('click', () => {
      const cantidad = document.getElementById('cantidad').value;
      if (cantidad > producto.cantidad_existente) {
        alert('La cantidad ingresada es mayor que la cantidad existente');
        return;
      }
      const data = { DPI, cantidad };
    
      fetch(`http://localhost:3000/prod/detalles/${productId}`)
        .then(respuesta => respuesta.json())
        .then(producto => {
          data.id = producto._id;
          data.nombre = producto.nombre;
    
          fetch(`http://localhost:3000/carr/carrito/${DPI}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
            .then(respuesta => respuesta.json())
            .then(datos => {
              console.log(datos);
              alert('Producto agregado al carrito');
            })
            .catch(error => {
              console.error(error);
              alert('Error al agregar el producto al carrito');
            });
        })
        .catch(error => {
          console.error(error);
          alert('Error al obtener la información del producto');
        });
    });

  })
  .catch(error => {
    console.error(error);
  });

