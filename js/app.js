const App = (() => {
  const tareasDeInicio = [];

  const alIniciar = (tarea) => tareasDeInicio.push(tarea);

  const iniciar = () => tareasDeInicio.forEach((tarea) => tarea());

  const notificar = (mensaje, tipo = "exito") => {
    const aviso = document.getElementById("aviso");
    if (!aviso) return;
    aviso.textContent = mensaje;
    aviso.className = `aviso aviso--${tipo}`;
    aviso.hidden = false;
    setTimeout(() => {
      aviso.hidden = true;
    }, 3000);
  };

  return { alIniciar, iniciar, notificar };
})();

document.addEventListener("DOMContentLoaded", App.iniciar);
