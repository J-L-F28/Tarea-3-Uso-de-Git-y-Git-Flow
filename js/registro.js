const Registro = (() => {
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
  };

  const crear = (datos) => {
    const estudiantes = Storage.leerTodos();
    estudiantes.push({ id: Storage.siguienteId(), ...datos });
    Storage.guardarTodos(estudiantes);
    App.notificar(`Estudiante ${datos.nombre} registrado correctamente.`);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    crear(leerFormulario());
    limpiar();
    document.dispatchEvent(new CustomEvent("estudiantes:actualizados"));
  };

  const iniciar = () => formulario().addEventListener("submit", manejarEnvio);

  return { iniciar, limpiar, campo };
})();

App.alIniciar(Registro.iniciar);
// Modulo de registro 
