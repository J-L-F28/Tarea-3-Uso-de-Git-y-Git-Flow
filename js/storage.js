const Storage = (() => {
  const CLAVE = "itla.estudiantes";

  const leerTodos = () => JSON.parse(localStorage.getItem(CLAVE) || "[]");

  const guardarTodos = (estudiantes) =>
    localStorage.setItem(CLAVE, JSON.stringify(estudiantes));

  const buscarPorId = (id) =>
    leerTodos().find((estudiante) => estudiante.id === id) || null;

  const siguienteId = () =>
    leerTodos().reduce((mayor, estudiante) => Math.max(mayor, estudiante.id), 0) + 1;

  return { leerTodos, guardarTodos, buscarPorId, siguienteId };
})();
