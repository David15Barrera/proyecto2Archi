const form = document.getElementById('insertUser');
form.addEventListener('submit', enviarPeticion);

async function enviarPeticion(evento){
    evento.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('pass').value;
    const dpi = document.getElementById('dpi').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const cargo = document.getElementById('cargo').value;

    if (nombre === '' || password === '' || dpi === '' || correo === '' || telefono === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }


const data = {
    nombre_usuario: nombre,
    password: password,
    tipo_usuario: cargo,
    dpi: dpi,
    correo_electronico: correo,
    telefono: telefono
}

await fetch('http://localhost:3000/api/',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(respuesta => respuesta.json())
.then(datos => procesarData(datos))
}

function procesarData(datos){
    let mensaje = 'Usuario Registrado:\n';
    mensaje += `Nombre: ${datos.nombre_usuario}\n`;
    mensaje += `Tipo Usuario: ${datos.tipo_usuario}\n`;
    mensaje += `dpi: ${datos.dpi}\n`;
    mensaje += `Correo: ${datos.correo_electronico}\n`;
    mensaje += `Telefono: ${datos.telefono}\n`;

    alert(mensaje);
    console.log(datos); 
    form.reset(); 
    window.location.href = "Usuarios.html";
}

//----------------------------------------------------- Para agregarlo datos a la tabla

fetch('http://localhost:3000/api/veruser')
  .then(response => response.json())
  .then(data => {
    const tablaUsuarios = document.querySelector('#tabla-usuarios');
    
    data.forEach(usuario => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${usuario.nombre_usuario}</td>
        <td>${usuario.dpi}</td>
        <td>${usuario.correo_electronico}</td>
        <td>${usuario.tipo_usuario}</td>
        <td>${usuario.telefono}</td>
        <td><button class="editar" data-id="${usuario.dpi}">Editar</button>
        <button class="eliminar">Eliminar</button></td>
      `;
      tablaUsuarios.appendChild(fila);

      //Para abrir el documento
      const editarButton = fila.querySelector('.editar');
      editarButton.addEventListener('click', () => {
        const id = editarButton.dataset.id;
        window.location.href = `editUsuario.html?id=${id}`;
      });


      //Para eliminar algun usuario
      tablaUsuarios.appendChild(fila);

      const eliminarButton = fila.querySelector('.eliminar');
      eliminarButton.addEventListener('click', () => {
        const dpi = fila.querySelector('td:nth-child(2)').textContent;
        fetch(`http://localhost:3000/api/eliminar/${dpi}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          alert('Eliminado');
          location.reload();
        })
        .catch(error => console.log(error));
      });
    });
  });   

 