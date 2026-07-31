const Listado = (() => {
  const COLUMNAS = ["Matrícula", "Nombre", "Carrera", "Correo", "Índice"];
  const proveedoresDeAccion = [];

  const registrarAccion = (proveedor) => proveedoresDeAccion.push(proveedor);

  const contenedor = () => document.getElementById("contenedor-tabla");

  const formatearIndice = (indice) =>
    Number.isFinite(indice) ? indice.toFixed(2) : "—";

  const encabezado = () => {
    const thead = document.createElement("thead");
    const fila = document.createElement("tr");
    const titulos = proveedoresDeAccion.length
      ? [...COLUMNAS, "Acciones"]
      : COLUMNAS;

    titulos.forEach((titulo) => {
      const th = document.createElement("th");
      th.textContent = titulo;
      fila.appendChild(th);
    });

    thead.appendChild(fila);
    return thead;
  };

  const celdaAcciones = (estudiante) => {
    const celda = document.createElement("td");
    celda.className = "celda-acciones";
    proveedoresDeAccion.forEach((proveedor) =>
      celda.appendChild(proveedor(estudiante))
    );
    return celda;
  };

  const fila = (estudiante) => {
    const tr = document.createElement("tr");
    const valores = [
      estudiante.matricula,
      estudiante.nombre,
      estudiante.carrera,
      estudiante.correo,
      formatearIndice(estudiante.indice),
    ];

    valores.forEach((valor) => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });

    if (proveedoresDeAccion.length) tr.appendChild(celdaAcciones(estudiante));
    return tr;
  };

  const mensajeVacio = () => {
    const parrafo = document.createElement("p");
    parrafo.className = "vacio";
    parrafo.textContent = "Aún no hay estudiantes registrados.";
    return parrafo;
  };

  const render = (estudiantes = Storage.leerTodos()) => {
    const destino = contenedor();
    destino.replaceChildren();

    if (!estudiantes.length) {
      destino.appendChild(mensajeVacio());
      return;
    }

    const tabla = document.createElement("table");
    const cuerpo = document.createElement("tbody");
    estudiantes.forEach((estudiante) => cuerpo.appendChild(fila(estudiante)));

    tabla.appendChild(encabezado());
    tabla.appendChild(cuerpo);
    destino.appendChild(tabla);
  };

  const iniciar = () => {
    document.addEventListener("estudiantes:actualizados", () => render());
    render();
  };

  return { iniciar, render, registrarAccion };
})();

App.alIniciar(Listado.iniciar);
// Modulo de listado 
