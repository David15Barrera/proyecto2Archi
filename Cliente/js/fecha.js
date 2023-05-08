// Para agregar la fecha de hoy
 const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear().toString();
    const fechaActualFormatoISO = `${anio}-${mes}-${dia}`;
    document.getElementById("fechaCompra").value = fechaActualFormatoISO;
  
  const fechaCompra = new Date(document.getElementById('fechaCompra').value);

  // Establecer la fecha de entrega prevista
  const fechaEntrega = new Date(fechaCompra.setDate(fechaCompra.getDate() + 5));
  const diaEnt = fechaEntrega.getDate().toString().padStart(2, '0');
  const mesEnt = (fechaEntrega.getMonth() + 1).toString().padStart(2, '0');
  const anioEnt = fechaEntrega.getFullYear().toString();
  const fechaEntregaFormatoISO = `${anioEnt}-${mesEnt}-${diaEnt}`;
  document.getElementById("fechaEntrega").value = fechaEntregaFormatoISO;


const dpi = localStorage.getItem('dpi');


// Hacer la petición HTTP POST al endpoint /buscar del backend
fetch('http://localhost:3000/api/buscar', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ dpi })
})
.then(respuesta => respuesta.json())
.then(datos => {
  // Mostrar el nombre, correo y cargo del usuario en la página HTML
  const nombreUsuario = datos.nombre_usuario;
  const correoUsuario = datos.correo_electronico;
  const cargoUsuario = datos.tipo_usuario;
  
  const nombreDiv = document.getElementById('nombre');
  nombreDiv.value = `${nombreUsuario}`;
})
.catch(error => console.log(error));


//----------------------------------------------

