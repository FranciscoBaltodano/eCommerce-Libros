// con la librearia readline podemos ingresar datos en la consola
const readline = require('readline');

// creamos nuestro constructor de libros donde cada libro tiene un titulo, autor y genero
class Libro {
  constructor(titulo, autores, genero, precio) {
    this.titulo = titulo;
    this.autores = autores;
    this.genero = genero;
    this.precio = precio;
  }
}


class ECommerce {
  constructor() {
    // en este arreglo almacenaremos nuestros libros
    this.libros = [];
    // rl viene por readline y la utilizaremos para recibir la entrada del usuario
    this.rl = readline.createInterface({
    // stdin es la entrada estandar, mientras que stdout es la salida esttandar
    // lo que nos permite interacuar con el usuario a travves de preguntas
      input: process.stdin,
      output: process.stdout
    });
  }

  solicitarAccion() {
    // el rl.question es parte de la interfaz de readline 
    // esta nos permite hacer peticiones y recibir respuestas desde la consola
    this.rl.question('¿Qué acción desea realizar? (buscar, eliminar, agregar, ver): ', accion => {
      switch (accion) {
        case 'buscar':
          this.buscarLibro();
          break;
        case 'eliminar':
          this.eliminarLibro();
          break;
        case 'agregar':
          this.agregarLibro();
          break;
        case 'ver':
          this.verLibros();
        break;
        default:
          console.log('Acción no válida.');
          // en caso de que la accion no sea valida realizamos otra solicitud al usuario
          this.solicitarAccion();
          break;
      }
    });
  }

  // Ejecutamos el programa con el iniciar eCommerce
  iniciarEcommerce() {
    this.solicitarAccion();
  }

  agregarLibro() {
    this.rl.question('Ingrese el título del libro: ', titulo => {
      this.rl.question('Ingrese el autor/es del libro (separados por comas): ', autores => {
        this.rl.question('Ingrese el género del libro: ', genero => {
          this.rl.question('Ingrese el precio del libro: ', precio => {
            // Validar que el precio sea un número
            // con la siguiente expresion validamos que solo se permitan numeros
            if (!(/^\d+(\.\d+)?$/.test(precio))) {
              console.log('El precio ingresado no es válido. Debe ser un número.');
              this.solicitarAccion();
              return;
            }
  
            // al ser ingresados correctamente los datos, creamos un nuevos libro
            // seguidamente con un push, lo añadimos al arreglo de libros almacenados
            const libro = new Libro(titulo, autores.split(','), genero, parseFloat(precio));
            this.libros.push(libro);
            console.log('Libro agregado correctamente.');
            this.solicitarAccion();
          });
        });
      });
    });
  }


  buscarLibro() {
  this.rl.question('Ingrese el título del libro a buscar: ', titulo => {
    const tituloBuscado = titulo.toLowerCase(); // Convertir a minúsculas

    // con el metodo.includes buscamos si la entrada del usuario coincide con alguno de los libros
    const librosEncontrados = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(tituloBuscado)
    );

    // de encontrar coincidencias, usamos un forEach para mapear y mostrar los libros encontrados
    if (librosEncontrados.length > 0) {
      console.log('Libros encontrados:');
      librosEncontrados.forEach(libro => {
        console.log(libro);
      });
    } else {
      console.log('No hay libros con ese título.');
    }
    this.solicitarAccion();
  });
}


  verLibros() {
    // si el usuario quiere ver los libros en existencia primero debemos validar que exista alguno
    if (this.libros.length === 0) {
      console.log('No hay libros en el comercio electrónico.');
    } else {
    // si existe un libro usamos un forEach para mostrar en consola los libros en existencia
      console.log('Libros existentes:');
      this.libros.forEach(libro => {
        console.log(libro);
      });
    }
    this.solicitarAccion();
  }
  

  eliminarLibro() {
    // para eliminar un libro el usuario debera hacerlo en base al titulo del libro
    this.rl.question('Ingrese el título del libro a eliminar: ', titulo => {
      const libroIndex = this.libros.findIndex(libro => libro.titulo === titulo);
      if (libroIndex !== -1) {
        // con el metodo .splice eliminaremos el libro del array donde se encuentran los libros almacenados
        this.libros.splice(libroIndex, 1);
        console.log('Libro eliminado correctamente.');
      } else {
        console.log('Libro no encontrado.');
      }
      this.solicitarAccion();
    });
  }

  
}

// Creamos una instancia de la clase ECommerce y llamamos al metodo iniciarEcommerce
const eCommerce = new ECommerce();

eCommerce.iniciarEcommerce();
