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
const db = firebase.firestore();

//llamando elementos
let txtbtnRegistro = document.getElementById('txtbtnRegistro');
let txtbtnIngresarr = document.getElementById('txtbtnIngresarr');
let txtbSalir = document.getElementById('txtbSalir')
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let contenidoDeLaWeb2 = document.getElementById('contenidoDeLaWeb2');
let formulario = document.getElementById('formulario');
let txtbtnFace = document.getElementById('txtbtnFace');
let txtbtnGoo = document.getElementById('txtbtnGoo');
let btnPublicar=document.getElementById('btnPublicar');
let pagprincipal=document.getElementById('pagprincipal');



//funcion registro
txtbtnRegistro.addEventListener('click', () => {
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Se ha creado un Usuario");
      cargarJSON();
      //contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
      //contenidoDeLaWeb2.classList.replace('ocultar', 'mostrar');
     // formulario.classList.replace('mostrar', 'ocultar');
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
      //formulario.classList.replace('mostrar', 'ocultar');
      comentarios.classList.replace('ocultar','mostrar')
      var user = userCvredential.user;
      // ...
      pagprincipal.classList.replace('mostrar', 'ocultar');
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
comentarios.classList.replace('mostrar','ocultar')
pagprincipal.classList.replace('ocultar','mostrar');
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
    comentarios.classList.replace('ocultar','mostrar')
    cargarJSON();
    // ...
  } else {
    // User is signed out
    // ...
    contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    contenidoDeLaWeb2.classList.replace('mostrar', 'ocultar');
    formulario.classList.replace('ocultar', 'mostrar');
  }
  imprimirComentariosEnPantalla();
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
<div style="padding:20px; margin:50px;background-color: rgba(160, 30, 30, 0.61); border:white solid;" >
<ul>
<img src="${datos.img} "width="300px" height="500" style="padding-right:25px;">
<br>
<h3 Style="color:white;font-family: 'Roboto', sans-serif;text-align: center;padding-top:50px">${datos.Nombre}</h3>
<h3 style="color:white;font-family: 'Roboto', sans-serif;text-align: center">${datos.Precio}</h3>
<hr>
</div>
            `;
      });
      document.getElementById('contenidoDeLaWeb2').innerHTML = html;
    })
  }
    btnPublicar.addEventListener('click',()=> { 
      db.collection("comentarios").add({
        titulo: txtTitulo=document.getElementById('txtTitulo').value,
        descripcion: txtDescripcion=document.getElementById('txtDescripcion').value,
    })
    .then((docRef) => {
        console.log("Se guardo tu comentario correctamente");
        imprimirComentariosEnPantalla();
    })
    .catch((error) => {
        console.error("Error al guardar comentarios ", error);
    });
    })
 
    function imprimirComentariosEnPantalla(){
      db.collection("comentarios").get().then((querySnapshot)=> {
       let html= '';
        querySnapshot.forEach((doc) => {
        console.log(`${doc.data().titulo}`);
        console.log(`${doc.data().descripcion}`);
        var listarDatos=`<br>
        <div style="color: white;background-color:rgba(160, 30, 30, 0.61);border: 1px solid;border-radius: 5px;font-family: 'Roboto', sans-serif"">
        <li class="listarDatos">
        <h5 class="listarDatosH5" style="color:white"> ${doc.data().titulo} </h5>
        <p> ${doc.data().descripcion} </p>
        </li>
        </div>
        `;
        html+=listarDatos;
        
    });document.getElementById('imprimirComentariosEnPantalla').innerHTML=html
    });
  }

