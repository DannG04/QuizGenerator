# 🎯 QuizForge

**QuizForge** es un generador de cuestionarios interactivos que te permite crear quizzes personalizados en formato HTML a partir de datos JSON. La aplicación genera archivos HTML completamente independientes que no requieren servidor para funcionar.

## ✨ Características

- 📝 **Editor JSON integrado** con validación en tiempo real
- 🎨 **Múltiples temas visuales** predefinidos (Minimalista, Neón, Océano, Atardecer, Bosque)
- 👁️ **Vista previa en vivo** de tus quizzes antes de generarlos
- 🌙 **Modo oscuro/claro** para una mejor experiencia de usuario
- 📱 **Diseño responsivo** que funciona en todos los dispositivos
- 🎉 **Animaciones y efectos** (confetti al completar el quiz)
- 💾 **Exportación a HTML** - archivos independientes que funcionan sin servidor
- 🤖 **Prompts optimizados para IA** para generar preguntas automáticamente con ChatGPT, Claude o Gemini

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene incluido con Node.js)

Para verificar que los tienes instalados, ejecuta en tu terminal:

```bash
node --version
npm --version
```

## 📦 Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/DannG04/QuizGenerator.git
   cd QuizGenerator
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** en la URL que se muestra en la terminal (normalmente `http://localhost:5173`)

## 💡 Uso

### Paso 1: Ingresa el Título del Quiz

Escribe el título de tu cuestionario en el campo "Título del Quiz" en la parte superior del editor.

### Paso 2: Escribe o Genera el JSON

Puedes crear tus preguntas de dos formas:

#### Opción A: Escribir manualmente

Escribe el JSON directamente en el editor siguiendo este formato:

```json
[
  {
    "question": "¿Cuál es la capital de Francia?",
    "options": ["Londres", "Berlín", "París", "Madrid"],
    "correct": 2,
    "explanation": "París es la capital y ciudad más poblada de Francia."
  },
  {
    "question": "¿Cuál es el planeta más grande del sistema solar?",
    "options": ["Tierra", "Marte", "Júpiter", "Saturno"],
    "correct": 2,
    "explanation": "Júpiter es el planeta más grande de nuestro sistema solar."
  }
]
```

#### Opción B: Usar IA para generar preguntas

1. Haz clic en el botón de ayuda "?" en el editor
2. Copia el prompt optimizado para IA
3. Pégalo en ChatGPT, Claude, Gemini u otra IA
4. Especifica tu tema (ejemplo: "historia de México", "matemáticas básicas", etc.)
5. Copia la respuesta JSON y pégala en el editor

### Paso 3: Selecciona un Tema

Elige uno de los temas visuales disponibles:

- **Minimalista** - Diseño limpio y profesional
- **Neón** - Estilo vibrante con colores brillantes
- **Océano** - Tonos azules y relajantes
- **Atardecer** - Colores cálidos y acogedores
- **Bosque** - Tonos verdes naturales

Puedes hacer clic en el ícono de ojo 👁️ para previsualizar cada tema.

### Paso 4: Vista Previa

Haz clic en el botón "Vista Previa" para ver cómo se verá tu quiz antes de generarlo.

### Paso 5: Generar el Quiz

Haz clic en el botón "Generar Quiz HTML" para descargar el archivo HTML. El archivo se guardará en tu carpeta de descargas y podrás:

- Abrirlo directamente en cualquier navegador
- Compartirlo por email
- Subirlo a cualquier servidor web
- Usarlo sin conexión a internet

## 📋 Formato JSON Detallado

Cada pregunta en el array JSON debe tener esta estructura:

```json
{
  "question": "Texto de la pregunta",
  "options": ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
  "correct": 0,
  "explanation": "Explicación opcional de la respuesta correcta"
}
```

### Campos:

- **question** (requerido): El texto de la pregunta
- **options** (requerido): Array con mínimo 2 opciones (recomendado 4)
- **correct** (requerido): Índice de la respuesta correcta (0 = primera opción, 1 = segunda, etc.)
- **explanation** (opcional): Texto explicativo que se muestra al responder

### Ejemplo completo con 3 preguntas:

```json
[
  {
    "question": "¿En qué año llegó el hombre a la Luna?",
    "options": ["1965", "1969", "1972", "1975"],
    "correct": 1,
    "explanation": "El Apolo 11 llevó a Neil Armstrong y Buzz Aldrin a la Luna el 20 de julio de 1969."
  },
  {
    "question": "¿Cuál es el océano más grande del mundo?",
    "options": ["Atlántico", "Índico", "Ártico", "Pacífico"],
    "correct": 3,
    "explanation": "El Océano Pacífico es el más grande, cubriendo más del 30% de la superficie terrestre."
  },
  {
    "question": "¿Quién escribió 'Don Quijote de la Mancha'?",
    "options": ["Miguel de Cervantes", "Lope de Vega", "Federico García Lorca", "Gabriel García Márquez"],
    "correct": 0,
    "explanation": "Miguel de Cervantes escribió esta obra maestra de la literatura española en 1605."
  }
]
```

## 🛠️ Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`

Inicia la aplicación en modo desarrollo.\
Abre [http://localhost:5173](http://localhost:5173) para verla en tu navegador.

La página se recargará automáticamente cuando hagas cambios.\
También verás errores de lint en la consola.

### `npm run build`

Construye la aplicación para producción en la carpeta `dist`.\
Optimiza la construcción para el mejor rendimiento.

Los archivos se minimizan y los nombres incluyen hashes.\
Tu aplicación está lista para ser desplegada!

### `npm run preview`

Previsualiza la versión de producción localmente después de ejecutar `npm run build`.

### `npm run lint`

Ejecuta ESLint para verificar problemas en el código.

## 🎨 Temas Disponibles

| Tema | Descripción | Colores principales |
|------|-------------|---------------------|
| Minimalista | Diseño limpio y profesional | Grises y azul suave |
| Neón | Estilo vibrante y moderno | Rosa neón y morado |
| Océano | Tonos relajantes del mar | Azules y turquesa |
| Atardecer | Colores cálidos | Naranjas y rosas |
| Bosque | Tonos naturales | Verdes y marrones |

## 🔧 Tecnologías Utilizadas

- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción ultrarrápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Biblioteca de animaciones
- **Lucide React** - Iconos modernos
- **Canvas Confetti** - Efectos de celebración

## 📂 Estructura del Proyecto

```
QuizGenerator/
├── public/              # Archivos públicos estáticos
│   └── logo.png        # Logo de la aplicación
├── src/
│   ├── components/     # Componentes de React
│   │   ├── EditorPanel.jsx
│   │   ├── ThemeSelector.jsx
│   │   ├── GenerateButton.jsx
│   │   ├── PreviewModal.jsx
│   │   ├── HelpModal.jsx
│   │   └── Header.jsx
│   ├── utils/          # Utilidades
│   │   └── generator.js  # Lógica de generación HTML
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── index.html          # HTML principal
├── package.json        # Dependencias y scripts
└── vite.config.js      # Configuración de Vite
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Si deseas mejorar el proyecto:

1. Haz un Fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está disponible para uso personal y educativo.

## 👨‍💻 Autor

DannG04

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes una sugerencia, por favor abre un [Issue](https://github.com/DannG04/QuizGenerator/issues) en GitHub.

---

**¡Disfruta creando quizzes interactivos con QuizForge! 🎉**
