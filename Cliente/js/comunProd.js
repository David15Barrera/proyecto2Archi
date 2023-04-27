const contenedorProductos = document.querySelector('.grid-container');

//------------------------------Para ver los productos

fetch('http://localhost:3000/prod/verprod')
  .then(respuesta => respuesta.json())
  .then(datos => {
    const productosContainer = document.getElementById('productos-container');

    // Iterar sobre los datos de los productos
    datos.forEach(producto => {
      // Crear un contenedor para cada producto
      const productoContainer = document.createElement('div');
      productoContainer.classList.add('producto-container');

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
        <center><h3>${producto.nombre}</h3></center>
        <p>Precio: Q${producto.precio}</p>
        <p>Categorías: ${producto.categorias.join(', ')}</p>
        <p>Estado: ${producto.estado}</p>
      `;

      // Crear un elemento HTML para los botones del producto
      const botonesElem = document.createElement('div');
      botonesElem.innerHTML = `
        <button class="orange" href="prodView.html" >Observar</button>
        <button class="green">Añadir a Carrito</button>
      `;
      botonesElem.style.display = 'block';

      // Agregar el elemento de los botones y el elemento de los datos del producto al contenedor de producto
      productoElem.appendChild(botonesElem);
      productoContainer.appendChild(productoElem);
      productosContainer.appendChild(productoContainer);
    });
  })
  .catch(error => {
    console.error(error);
  });
