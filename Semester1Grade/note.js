document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("drawingPad");
    const ctx = canvas.getContext("2d");
    const colorPicker = document.getElementById("colorPicker");
    const thicknessSlider = document.getElementById("thicknessSlider");
    const clearButton = document.getElementById("clearButton");

    canvas.width = 500; // Set canvas width
    canvas.height = 400; // Set canvas height

    let drawing = false;

    canvas.addEventListener("mousedown", (event) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    });

    canvas.addEventListener("mousemove", (event) => {
        if (drawing) {
            ctx.strokeStyle = colorPicker.value;
            ctx.lineWidth = thicknessSlider.value;
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener("mouseup", () => {
        drawing = false;
        ctx.closePath();
    });

    canvas.addEventListener("mouseleave", () => {
        drawing = false;
        ctx.closePath();
    });

    clearButton.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
