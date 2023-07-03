const firebaseConfig = {
  apiKey: "AIzaSyC77VlMtVYdVnmeGeo7EZ1iJ4T0Ny8PMts",
  authDomain: "registroweb-9ad43.firebaseapp.com",
  projectId: "registroweb-9ad43",
  storageBucket: "registroweb-9ad43.appspot.com",
  messagingSenderId: "873852913674",
  appId: "1:873852913674:web:8e412859c9813c836c77f3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//llamando elementos
let txtbtnRegistro = document.getElementById('txtbtnRegistro');
let txtbtnIngresarr = document.getElementById('txtbtnIngresarr');
let txtbSalir = document.getElementById('txtbSalir')
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let contenidoDeLaWeb2 = document.getElementById('contenidoDeLaWeb2');
let formulario = document.getElementById('formulario');
let txtbtnFace = document.getElementById('txtbtnFace');
let txtbtnGoo = document.getElementById('txtbtnGoo');
//funcion registro
txtbtnRegistro.addEventListener('click', () => {
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Se ha creado un Usuario");
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
      formulario.classList.replace('mostrar', 'ocultar');
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
})



txtbtnIngresarr.addEventListener('click', () => {
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Inicio sesión correctamente");
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
      contenidoDeLaWeb2.classList.replace('ocultar', 'mostrar');
      formulario.classList.replace('mostrar', 'ocultar');
      var user = userCvredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
})

txtbSalir.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("Cerraste la sesion");
    contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    contenidoDeLaWeb2.classList.replace('mostrar', 'ocultar');
    formulario.classList.replace('ocultar', 'mostrar');
  }).catch((error) => {
    // An error happened.
  });
})
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
    contenidoDeLaWeb2.classList.replace('ocultar', 'mostrar');
    formulario.classList.replace('mostrar', 'ocultar');
    // ...
  } else {
    // User is signed out
    // ...
    contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    formulario.classList.replace('ocultar', 'mostrar');
  }
});

txtbtnGoo.addEventListener('click', () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      console.log("Se inicio correctamente")
    }).catch((error) => {
      console.log("Error de login con Google")
    });
})
txtbtnFace.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
      console.log("Se inicio correctamente")
    })
    .catch((error) => {
      console.log("Error de login con Facebook")
    });
})

function cargarJSON() {
  fetch('data.json')
    .then(function (res) {
      // console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let html = '';
      data.forEach((datos) => {
        html += `
<div style="padding:20px; margin:auto">
<ul><li>
<h2><i>Desarrollador:</i></h2><br>
<h1 style="color:red">${datos.Desarrolladores}</h1></li></ul> <h2><i>Nombre del Juego:</i></h2><br>
<h1 Style="color:blue">${datos.Nombre}</h1>
<h1 Style="color:green"><img src="${datos.img} "width="250px" height="150"></h1> <h2><i>Precio del Juego:</i></h2>
<h1 style="color:yellow">S/.${datos.Precio}</h1>
<hr>
</div>
            `;
      });
      document.getElementById('contenidoDeLaWeb2').innerHTML = html;
    })
}
