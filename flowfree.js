const board = document.getElementById('board');
const colors = ['red', 'blue', 'green', 'yellow']; // Colores de los puntos

// Función para crear un punto en una posición específica del tablero
function createDot(color, row, col) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.backgroundColor = color;
    dot.dataset.color = color; // Almacenar el color como un atributo de datos
    dot.dataset.row = row; // Almacenar la fila como un atributo de datos
    dot.dataset.col = col; // Almacenar la columna como un atributo de datos
    dot.addEventListener('click', handleDotClick);
    board.appendChild(dot);
}

// Función para conectar dos puntos del mismo color
function connectDots(dot1, dot2) {
    const line = document.createElement('div');
    line.className = 'line';
    line.style.backgroundColor = dot1.dataset.color; // Establecer el color de la línea igual al color de los puntos

    const rect1 = dot1.getBoundingClientRect();
    const rect2 = dot2.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;

    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    line.style.width = length + 'px';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';
    line.style.transform = `rotate(${angle}deg)`;

    board.appendChild(line);
}

// Manejar clics en los puntos
let selectedDot = null;
function handleDotClick(event) {
    const dot = event.target;

    if (!selectedDot) {
        selectedDot = dot;
        dot.classList.add('selected');
    } else if (selectedDot !== dot) {
        if (dot.dataset.color === selectedDot.dataset.color) {
            connectDots(selectedDot, dot);
        }
        selectedDot.classList.remove('selected');
        selectedDot = null;
    }
}

// Función para generar el tablero con puntos aleatorios
function generateBoard() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            createDot(color, i, j);
        }
    }
}

// Agregar evento de clic a los puntos para manejar las conexiones
function addClickEventsToDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.addEventListener('click', handleDotClick);
    });
}

// Llamar a las funciones para generar los puntos y agregar eventos al cargar la página
window.onload = function () {
    generateBoard();
    addClickEventsToDots();
};
