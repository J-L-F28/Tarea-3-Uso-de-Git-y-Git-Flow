const Eliminacion = (() => {
  const eliminar = (estudiante) => {
    const restantes = Storage.leerTodos().filter(
      (registro) => registro.id !== estudiante.id
    );
    Storage.guardarTodos(restantes);
    App.notificar(`Estudiante ${estudiante.nombre} eliminado.`, "error");
    document.dispatchEvent(new CustomEvent("estudiantes:actualizados"));
  };

  const confirmarYEliminar = (estudiante) => {
    const mensaje =
      `¿Está seguro de eliminar a ${estudiante.nombre} ` +
      `(matrícula ${estudiante.matricula})? Esta acción no se puede deshacer.`;

    if (window.confirm(mensaje)) eliminar(estudiante);
  };

  const botonEliminar = (estudiante) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton boton--peligro boton--mini";
    boton.textContent = "Eliminar";
    boton.addEventListener("click", () => confirmarYEliminar(estudiante));
    return boton;
  };

  const iniciar = () => {
    Listado.registrarAccion(botonEliminar);
    Listado.render();
  };

  return { iniciar };
})();

App.alIniciar(Eliminacion.iniciar);
