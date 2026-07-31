const Edicion = (() => {
  const botonGuardar = () => document.getElementById("boton-guardar");
  const botonCancelar = () => document.getElementById("boton-cancelar");

  const cargarEnFormulario = (estudiante) => {
    Registro.campo("estudiante-id").value = estudiante.id;
    Registro.campo("matricula").value = estudiante.matricula;
    Registro.campo("nombre").value = estudiante.nombre;
    Registro.campo("carrera").value = estudiante.carrera;
    Registro.campo("correo").value = estudiante.correo;
    Registro.campo("indice").value = estudiante.indice;

    botonGuardar().textContent = "Actualizar";
    botonCancelar().hidden = false;
    document.getElementById("panel-registro").scrollIntoView({ behavior: "smooth" });
  };

  const actualizar = (id, datos) => {
    const estudiantes = Storage.leerTodos().map((estudiante) =>
      estudiante.id === id ? { ...estudiante, ...datos } : estudiante
    );
    Storage.guardarTodos(estudiantes);
    App.notificar(`Estudiante ${datos.nombre} actualizado correctamente.`);
  };

  const salirDeModoEdicion = () => {
    botonGuardar().textContent = "Guardar";
    botonCancelar().hidden = true;
  };

  const cancelar = () => {
    Registro.limpiar();
    salirDeModoEdicion();
  };

  const botonEditar = (estudiante) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton boton--secundario boton--mini";
    boton.textContent = "Editar";
    boton.addEventListener("click", () => cargarEnFormulario(estudiante));
    return boton;
  };

  const iniciar = () => {
    Listado.registrarAccion(botonEditar);
    Registro.definirActualizador(actualizar);
    botonCancelar().addEventListener("click", cancelar);
    document.addEventListener("estudiantes:actualizados", salirDeModoEdicion);
    Listado.render();
  };

  return { iniciar };
})();

App.alIniciar(Edicion.iniciar);
