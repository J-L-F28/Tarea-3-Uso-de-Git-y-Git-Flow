const Registro = (() => {
  let actualizador = null;

  const definirActualizador = (funcion) => {
    actualizador = funcion;
  };

  const formulario = () => document.getElementById("formulario-estudiante");

  const campo = (nombre) => document.getElementById(nombre);

  const leerFormulario = () => ({
    matricula: campo("matricula").value.trim(),
    nombre: campo("nombre").value.trim(),
    carrera: campo("carrera").value,
    correo: campo("correo").value.trim(),
    indice: parseFloat(campo("indice").value),
  });

  const limpiar = () => {
    formulario().reset();
    campo("estudiante-id").value = "";
    Validacion.limpiarErrores();
  };

  const crear = (datos) => {
    const estudiantes = Storage.leerTodos();
    estudiantes.push({ id: Storage.siguienteId(), ...datos });
    Storage.guardarTodos(estudiantes);
    App.notificar(`Estudiante ${datos.nombre} registrado correctamente.`);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const datos = leerFormulario();
    const id = Number(campo("estudiante-id").value);

    if (!Validacion.esValido(datos, id)) {
      App.notificar("Revise los campos marcados en rojo.", "error");
      return;
    }

    if (id && actualizador) actualizador(id, datos);
    else crear(datos);

    limpiar();
    document.dispatchEvent(new CustomEvent("estudiantes:actualizados"));
  };

  const iniciar = () => formulario().addEventListener("submit", manejarEnvio);

  return { iniciar, limpiar, campo, definirActualizador };
})();

App.alIniciar(Registro.iniciar);
