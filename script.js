const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix characters
const matrix = "10";
const font_size = 4;
const columns = canvas.width / font_size; // Number of columns for the text
const drops = [];

// Initialize the drops array
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Draw the matrix effect
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Background fade effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41"; // Matrix text color
    ctx.font = font_size + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // Reset the drop
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Loop the drawing function
setInterval(drawMatrix, 50);
