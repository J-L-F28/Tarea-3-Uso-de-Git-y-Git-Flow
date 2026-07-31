# Sistema de Gestión de Estudiantes — ITLA

Proyecto CRUD desarrollado para la **Tarea 3: Uso de Git y Git Flow** de la asignatura
Programación III del Instituto Tecnológico de las Américas.

La aplicación permite registrar, consultar, actualizar y eliminar estudiantes,
persistiendo la información en el `localStorage` del navegador.

## Tecnologías

- HTML5
- CSS3
- JavaScript (ES6, sin dependencias externas)
- `localStorage` como capa de persistencia

## Cómo ejecutar

No requiere instalación ni servidor. Basta con clonar el repositorio y abrir
`index.html` en cualquier navegador moderno.

```bash
git clone https://github.com/J-L-F28/Tarea-3-Uso-de-Git-y-Git-Flow.git
cd Tarea-3-Uso-de-Git-y-Git-Flow
```

## Estructura del proyecto

```
.
├── index.html          Interfaz principal
├── css/
│   └── styles.css      Hoja de estilos
└── js/
    ├── storage.js      Capa de acceso a localStorage
    └── app.js          Arranque de la aplicación y utilidades comunes
```

## Estrategia de ramificación (Git Flow)

| Rama        | Propósito                                                        |
| ----------- | ---------------------------------------------------------------- |
| `main`      | Rama estable. Contiene únicamente versiones liberadas.            |
| `qa`        | Rama de control de calidad. Recibe lo validado en `dev`.          |
| `dev`       | Rama de integración. Punto de partida de toda rama de trabajo.    |
| `feature/*` | Desarrollo de nuevas funcionalidades.                             |
| `hotfix/*`  | Corrección de defectos detectados en el flujo.                    |

Cada rama de trabajo genera tres Pull Requests: hacia `dev`, hacia `qa` y hacia `main`.

## Autor

Josué López — Programación III — ITLA
