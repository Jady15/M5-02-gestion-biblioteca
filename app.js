// Datos iniciales de libros (JSON)
let biblioteca = {
    libros: [
        { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", disponible: true },
        { titulo: "1984", autor: "George Orwell", genero: "Distopía", disponible: true }
    ]
};

// Simulación de lectura de datos (JSON)
function leerDatos(callback) {
    setTimeout(() => {
        callback(null, biblioteca);
    }, 1000);
}

// Simulación de escritura de datos (JSON)
function escribirDatos(nuevaBiblioteca, callback) {
    setTimeout(() => {
        biblioteca = nuevaBiblioteca;
        callback(null);
    }, 1000);
}

// Mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((error, datos) => {
        if (error) {
            console.error("Error al leer los datos:", error);
            return;
        }
        console.log("Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

// Agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible, callback) {
    leerDatos((error, datos) => {
        if (error) {
            callback(error);
            return;
        }
        const nuevoLibro = { titulo, autor, genero, disponible };
        datos.libros.push(nuevoLibro);
        escribirDatos(datos, (error) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null, `Libro "${titulo}" agregado exitosamente.`);
        });
    });
}

// Cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado, callback) {
    leerDatos((error, datos) => {
        if (error) {
            callback(error);
            return;
        }
        const libro = datos.libros.find(libro => libro.titulo === titulo);
        if (!libro) {
            callback(`Libro "${titulo}" no encontrado`);
            return;
        }
        libro.disponible = nuevoEstado;
        escribirDatos(datos, (error) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null, `Disponibilidad de "${titulo}" actualizada a ${nuevoEstado ? 'Disponible' : 'Prestado'}`);
        });
    });
}

//* Ejemplo de uso para manejar resultados
mostrarLibros();

agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true, (error, mensaje) =>{
    if (error) {
        console.error("Error al agregar libro:", error);
    } else {
        console.log(mensaje);
        mostrarLibros();
    }
});

actualizarDisponibilidad("1984", false, (error, mensaje) => {
    if (error) {
        console.error("Error al actualizar disponibilidad:", error);
    } else {
        console.log(mensaje);
        mostrarLibros();
    }
})