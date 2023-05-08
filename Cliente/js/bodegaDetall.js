const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

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
      <button class="greenDet" id="aprobarBtn">Aprobar</button>
      <button class="greenDet" id="noAprobarBtn">No Aprobar</button>
    `;
    botonesElem.style.display = 'block';

    // Agregar el elemento de los botones y el elemento de los datos del producto al contenedor de producto
    productoElem.appendChild(botonesElem);
    productoContainer.appendChild(productoElem);
    productosContainer.appendChild(productoContainer); // Agregar el contenedor de producto al contenedor de productos
 
    const aprobarBtn = document.getElementById('aprobarBtn');
    aprobarBtn.addEventListener('click', () => {
      const url = `http://localhost:3000/prod/aprobar/${productId}`;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estado: 'disponible' // Aquí indicas el nuevo estado del producto
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Producto aprobado:', data);
    //      window.location.href = 'prodApro.html'; // redirige a la página de productos
        })
        .catch(error => {
          console.error('Error al aprobar el producto:', error);
        });
    });


    const noAprobarBtn = document.getElementById('noAprobarBtn');
    noAprobarBtn.addEventListener('click', () => {
      const url = `http://localhost:3000/prod/desaprobar/${productId}`;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estado: 'Restringido' // Aquí indicas el nuevo estado del producto
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Producto aprobado:', data);
    //      window.location.href = 'prodApro.html'; // redirige a la página de productos
        })
        .catch(error => {
          console.error('Error al aprobar el producto:', error);
        });
    });
  })
  .catch(error => {
    console.error(error);
  });