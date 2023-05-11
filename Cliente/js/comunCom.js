const DPI = localStorage.getItem('dpi');

const pedidosDiv = document.querySelector('#pedidos');

fetch(`http://localhost:3000/pedido/obtener/${DPI}`)
  .then(response => response.json())
  .then(data => {
    // Crear una tabla con los datos de los pedidos
    const table = document.createElement('table');

    // Agregar encabezados de la tabla
    const headerRow = document.createElement('tr');
    const headers = ['Nombre Usuario', 'Productos', 'Lugar de Envío', 'Fecha de Compra', 'Fecha de Entrega', 'Total', 'Estado del Pedido'];
    headers.forEach(header => {
      const headerCell = document.createElement('th');
      headerCell.textContent = header;
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Agregar datos de los pedidos a la tabla
    data.forEach(pedido => {
      const row = document.createElement('tr');
      const columns = [pedido.nombre_usuario, pedido.productos_comprados.map(p => p.nombre_producto).join(', '), pedido.lugar_envio, new Date(pedido.fecha_compra).toLocaleDateString('es-ES', { timeZone: 'UTC' }), new Date(pedido.fecha_entrega_prevista).toLocaleDateString('es-ES', { timeZone: 'UTC' }), pedido.Total, pedido.estado_pedido];
      columns.forEach(column => {
        const cell = document.createElement('td');
        cell.textContent = column;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    // Agregar la tabla al elemento 'pedidos' del HTML
    pedidosDiv.appendChild(table);
  })
  .catch(error => {
    console.error(error);
    alert('Error al obtener los pedidos');
  });
  const botonCerrarSesion = document.querySelector('.link--active');
 
  botonCerrarSesion.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('dpi'); // Agrega esta línea para borrar el DPI
  sessionStorage.removeItem('token');
  alert("Saliendo");
 
  // Redirigir al usuario a la página de inicio de sesión o a la página principal
  window.location.href = '/login';
});