function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    mode = "hard";
    settings = config(mode);
    colors = [
        "#FFFFFF",
        "#0000FF",
        "#008000",
        "#FF0000",
        "#000080",
        "#800000",
        "#008080",
        "#000000",
        "#808080"
    ];
    gridOffsetX = GRID_X_CENTER - (settings.fieldsHorizontal * FIELD_WIDTH) / 2;
    gridOffsetY = GRID_Y_CENTER - (settings.fieldsVertical * FIELD_HEIGHT) / 2;
    gridEndX = GRID_X_CENTER + (settings.fieldsHorizontal * FIELD_WIDTH) / 2;
    gridEndY = GRID_Y_CENTER + (settings.fieldsVertical * FIELD_HEIGHT) / 2;
    gameRunning = false;
    gameEnded = false;
    isWon = false;
    let grid;
    canvas.onclick = function(e) {
        let x = e.clientX - canvas.offsetLeft;
        let y = e.clientY - canvas.offsetTop;
        if (between(x, gridOffsetX, gridEndX) && between(y, gridOffsetY, gridEndY) && !gameEnded) {
            let xIndex = (x - gridOffsetX) / FIELD_WIDTH | 0;
            let yIndex = (y - gridOffsetY) / FIELD_HEIGHT | 0;
            if (!gameRunning) {
                grid = gen_grid(settings, [yIndex, xIndex]);
                gameRunning = true;
                draw(grid);
                time = { start: Date.now() };
                console.log("Game started.");
            } else {
                if (grid[yIndex][xIndex].isMined) {
                    console.log("Mine detected.");
                    grid[yIndex][xIndex].status = DETONATED;
                    gameEnded = true;
                } else {
                    console.log("Field is clear.");
                }
            }
        }
    }
    draw(grid);
}
init();