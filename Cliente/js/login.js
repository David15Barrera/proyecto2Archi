const form = document.getElementById('Login');
form.addEventListener('submit', enviarPeticion);

async function enviarPeticion(evento){
    evento.preventDefault();
    const password = document.getElementById('password').value;
    const dpi = document.getElementById('dpi').value;
    const cargo = 'comun';


const data = {
    password: password,
    dpi: dpi,
    tipo_usuario: cargo
}

await fetch('http://localhost:3000/api/Login',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(respuesta => respuesta.json())
.then(datos => {
  if (datos.mensaje === 'Autenticación exitosa') {
        const token = datos.token; // Obtener el token de autenticación
        localStorage.setItem('token', token); // Almacenar el token en el local storage
        localStorage.setItem('dpi', dpi); // Almacenar el dpi en el local storage
  if (datos.tipo_usuario === 'administrador') {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación del local storage
        if (!token) {
          // Si el token no existe en el local storage, redirigir al usuario de vuelta a la página de login
          window.location.href = 'login.html';
          return;
        }
        window.location.href = 'admin.html'; // redirige a la página de admin
  } else if (datos.tipo_usuario === 'comun') {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación del local storage
          if (!token) {
            // Si el token no existe en el local storage, redirigir al usuario de vuelta a la página de login
            window.location.href = 'login.html';
            return;
          }
         window.location.href = 'comun.html'; // redirige a la página de común
   }else if (datos.tipo_usuario === 'bodega') {
          const token = localStorage.getItem('token'); // Obtener el token de autenticación del local storage
          if (!token) {
            // Si el token no existe en el local storage, redirigir al usuario de vuelta a la página de login
            window.location.href = 'login.html';
            return;
          }
          window.location.href = 'bodega.html'; // redirige a la página de común
    } else {
      // en caso de que el tipo de usuario no sea reconocido
      console.log('Tipo de usuario no reconocido');
    }
  } else {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerText = datos.mensaje;
    console.log(datos.mensaje); // muestra el mensaje de error en la consola
  }
})
}

//-------------------------- Seccion de manejo del del input del login---------------------------------

const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});