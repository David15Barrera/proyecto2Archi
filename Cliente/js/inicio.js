const dpi = localStorage.getItem('dpi');

const dpiUsuarioElem = document.getElementById('dpiUsuario');
//Para mostrarlo en el cuadro
dpiUsuarioElem.textContent = dpi;

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
  
  const nombreDiv = document.getElementById('nombreUsuario');
  nombreDiv.innerText = `Nombre: ${nombreUsuario}`;
  
  const correoDiv = document.getElementById('correoUsuario');
  correoDiv.innerText = `Correo: ${correoUsuario}`;
  
  const cargoDiv = document.getElementById('cargoUsuario');
  cargoDiv.innerText = `Cargo: ${cargoUsuario}`;
})
.catch(error => console.log(error));
