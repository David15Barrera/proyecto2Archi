const contenedorProductos = document.querySelector('.grid-container');
//const dpi_Usuario = localStorage.getItem('dpi');
//console.log(dpi_Usuario);
//------------------------------Para ver los productos

fetch('http://localhost:3000/prod/disponibles')
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
    <button class="orange" onclick="location.href='prodView.html?id=${producto._id}'">Observar</button>
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
  const carrito = {};
//------------------------------Para ver los productos no aprovados
const DPI = localStorage.getItem('dpi');
console.log(DPI);
const url = `http://localhost:3000/prod/prodCancelado/${DPI}`;

fetch(url)
  .then(respuesta => respuesta.json())
  .then(datos => {
    const productoscontainerCan = document.getElementById('productos-containerCan');
console.log(datos);
    // Iterar sobre los datos de los productos
    datos.forEach(producto => {
      // Crear un contenedor para cada producto
      const productocontainerCan = document.createElement('div');
      productocontainerCan.classList.add('producto-containerCan');

      // Crear un elemento HTML para mostrar la imagen del producto
      const imgElem = document.createElement('img');
      const rutaBase = 'http://localhost:3000';
      const rutaImagen = producto.img;
      imgElem.src = rutaBase + rutaImagen;

      // Agregar la imagen al contenedor de producto
      productocontainerCan.appendChild(imgElem);

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
      <button class="Red" id="btnEliminar-${producto._id}">Eliminar</button>
      `;
      botonesElem.style.display = 'block';

      // Agregar el elemento de los botones y el elemento de los datos del producto al contenedor de producto
      productoElem.appendChild(botonesElem);
      productocontainerCan.appendChild(productoElem);
      productoscontainerCan.appendChild(productocontainerCan);

      const btnEliminar = document.getElementById(`btnEliminar-${producto._id}`);
      btnEliminar.addEventListener('click', () => {
        // Hacer una petición DELETE al backend para eliminar el producto
        const url = `http://localhost:3000/prod/eliminar/${producto._id}`;
        fetch(url, { method: 'DELETE' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Producto eliminado:', data);
            // Mostrar alerta
            alert('Producto eliminado exitosamente');
            // Eliminar el contenedor del producto de la interfaz
            productocontainer.remove();
          })
          .catch(error => {
            console.error('Error al eliminar el producto:', error);
          });
      });

    });
  })
  .catch(error => {
    console.error(error);
  });




//-------------------------------------------------------- Para guardar los productos
//Hacer la consulta para poder guardar los datos de los productos
const formulario = document.getElementById('historia-form');
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('nombre', document.getElementById('nombre').value);
  formData.append('precio', document.getElementById('precio').value);
  formData.append('descripcion', document.getElementById('descripcion').value);
  formData.append('cantidad_existente', document.getElementById('cantidad_existente').value);
  formData.append('categoria', document.getElementById('categorias').value);
  formData.append('imagen', document.getElementById('imagen').files[0]);
  
  fetch('http://localhost:3000/prod/agproductos', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      formulario.reset();
    })
    .catch((error) => console.error(error));
});
