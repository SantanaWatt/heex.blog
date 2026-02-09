//Ni le muevas aquí pa.
//Estoy guardando este script para algo muy cabron.

//librería AOS
AOS.init({
  duration: 1000, // Cuánto tarda la animación (1 segundo)
  once: false,    // Si quieres que se repita cada vez que subas y bajes
  mirror: true    // Esto hace que se mueva al bajar Y al subir
});

// Acepta la clase que pusiste en el HTML
var rellax = new Rellax('.rellax');