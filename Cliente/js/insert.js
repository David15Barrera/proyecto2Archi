const form = document.getElementById('insertar');
form.addEventListener('submit', enviarPeticion);

async function enviarPeticion(evento){
    evento.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('password').value;
    const dpi = document.getElementById('dpi').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const cargo = 'comun';

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
    mensaje += `Nombe: ${datos.nombre_usuario}\n`;
    mensaje += `Tipo Usuario: ${datos.tipo_usuario}\n`;
    mensaje += `dpi: ${datos.dpi}\n`;
    mensaje += `Correo: ${datos.correo_electronico}\n`;
    mensaje += `Telefono: ${datos.telefono}\n`;

    alert(mensaje);
    console.log(datos);
    form.reset(); 
}