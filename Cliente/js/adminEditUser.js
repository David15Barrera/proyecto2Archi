const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const nombreInput = document.getElementById('nombre');
const dpiInput = document.getElementById('dpi');
const cargoSelect = document.getElementById('cargo');
const correoInput = document.getElementById('correo');
const passTextarea = document.getElementById('pass');
const telefonoTextarea = document.getElementById('telefono');
const admin = document.getElementById('admin');

fetch(`http://localhost:3000/api/buscar`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ dpi: id })
})
.then(response => response.json())
.then(usuario => {
  nombreInput.value = usuario.nombre_usuario;
  dpiInput.value = usuario.dpi;
  cargoSelect.value = usuario.tipo_usuario;
  correoInput.value = usuario.correo_electronico;
  passTextarea.value = usuario.password;
  telefonoTextarea.value = usuario.telefono;
});

/*-------------------------------------------Codigo para modificar el usuario------------------*/
const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre_usuario = document.getElementById('nombre').value;
  const dpi = document.getElementById('dpi').value;
  const tipo_usuario = document.getElementById('cargo').value;
  const correo_electronico = document.getElementById('correo').value;
  const password = document.getElementById('pass').value;
  const telefono = document.getElementById('telefono').value;

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre_usuario, password, tipo_usuario, correo_electronico, telefono }),
  };

  fetch(`http://localhost:3000/api/editar/${id}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data.mensaje);
      alert("Modificación exitosa");
      window.location.href = "Usuarios.html";
    })
    .catch(error => {
      console.log(error);
    });
});