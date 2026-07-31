const Validacion = (() => {
  const PATRON_MATRICULA = /^\d{4}-\d{4}$/;
  const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const CAMPOS = ["matricula", "nombre", "carrera", "correo", "indice"];

  const matriculaDuplicada = (matricula, idActual) =>
    Storage.leerTodos().some(
      (estudiante) =>
        estudiante.matricula.toLowerCase() === matricula.toLowerCase() &&
        estudiante.id !== idActual
    );

  const validar = (datos, idActual) => {
    const errores = {};

    if (!datos.matricula) errores.matricula = "La matrícula es obligatoria.";
    else if (!PATRON_MATRICULA.test(datos.matricula))
      errores.matricula = "Formato esperado: 0000-0000.";
    else if (matriculaDuplicada(datos.matricula, idActual))
      errores.matricula = "Ya existe un estudiante con esa matrícula.";

    if (!datos.nombre) errores.nombre = "El nombre es obligatorio.";
    else if (datos.nombre.split(" ").filter(Boolean).length < 2)
      errores.nombre = "Indique nombre y apellido.";

    if (!datos.carrera) errores.carrera = "Seleccione una carrera.";

    if (!datos.correo) errores.correo = "El correo es obligatorio.";
    else if (!PATRON_CORREO.test(datos.correo))
      errores.correo = "El correo electrónico no es válido.";

    if (!Number.isFinite(datos.indice))
      errores.indice = "El índice académico es obligatorio.";
    else if (datos.indice < 0 || datos.indice > 4)
      errores.indice = "El índice debe estar entre 0.00 y 4.00.";

    return errores;
  };

  const limpiarErrores = () =>
    CAMPOS.forEach((nombre) => {
      document.getElementById(nombre).classList.remove("invalido");
      document.getElementById(`error-${nombre}`).textContent = "";
    });

  const pintarErrores = (errores) =>
    Object.entries(errores).forEach(([nombre, mensaje]) => {
      document.getElementById(nombre).classList.add("invalido");
      document.getElementById(`error-${nombre}`).textContent = mensaje;
    });

  const esValido = (datos, idActual) => {
    const errores = validar(datos, idActual);
    limpiarErrores();
    pintarErrores(errores);
    return Object.keys(errores).length === 0;
  };

  return { esValido, limpiarErrores };
})();
