function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    mode = "easy";
    settings = config(mode);
    colors = [
        COLOR_ZERO,
        COLOR_ONE,
        COLOR_TWO,
        COLOR_THREE,
        COLOR_FOUR,
        COLOR_FIVE,
        COLOR_SIX,
        COLOR_SEVEN,
        COLOR_EIGHT
    ];
    gridOffsetX = GRID_X_CENTER - (settings.fieldsHorizontal * FIELD_WIDTH) / 2;
    gridOffsetY = GRID_Y_CENTER - (settings.fieldsVertical * FIELD_HEIGHT) / 2;
    gridEndX = GRID_X_CENTER + (settings.fieldsHorizontal * FIELD_WIDTH) / 2;
    gridEndY = GRID_Y_CENTER + (settings.fieldsVertical * FIELD_HEIGHT) / 2;
    gameRunning = false;
    gameEnded = false;
    gameWon = false;
    let grid;
    let flagsLeft;
    let safeFieldsLeft = settings.fieldsVertical * settings.fieldsHorizontal - settings.mines;
    canvas.onclick = function(e) {
        let x = e.clientX - canvas.offsetLeft;
        let y = e.clientY - canvas.offsetTop;
        if (between(x, gridOffsetX, gridEndX) && between(y, gridOffsetY, gridEndY) && !gameEnded) {
            let xIndex = (x - gridOffsetX) / FIELD_WIDTH | 0;
            let yIndex = (y - gridOffsetY) / FIELD_HEIGHT | 0;
            if (!gameRunning) {
                grid = gen_grid(settings, [yIndex, xIndex]);
                safeFieldsLeft = exposeNeighboursIfEmpty(grid, safeFieldsLeft, xIndex, yIndex) - 1;
                flagsLeft = settings.mines;
                gameRunning = true;
                draw(grid);
                time = { start: Date.now() };
            } else {
                if (grid[yIndex][xIndex].status != FLAGGED) {
                    if (grid[yIndex][xIndex].isMined) {
                        grid[yIndex][xIndex].status = DETONATED;
                        gameEnded = true;
                        exposeEntireGrid(grid);
                    } else {
                        safeFieldsLeft = exposeNeighboursIfEmpty(grid, safeFieldsLeft, xIndex, yIndex);
                    }
                }
            }
            if (safeFieldsLeft == 0 && !gameEnded) {
                gameEnded = true;
                gameWon = true;
                exposeEntireGrid(grid);
            }
        }
    }
    canvas.oncontextmenu = function(e) {
        let x = e.clientX - canvas.offsetLeft;
        let y = e.clientY - canvas.offsetTop;
        if (between(x, gridOffsetX, gridEndX) && between(y, gridOffsetY, gridEndY) && !gameEnded) {
            let xIndex = (x - gridOffsetX) / FIELD_WIDTH | 0;
            let yIndex = (y - gridOffsetY) / FIELD_HEIGHT | 0;
            if (gameRunning) {
                switch (grid[yIndex][xIndex].status) {
                    case HIDDEN:
                        if (flagsLeft) {
                            grid[yIndex][xIndex].status = FLAGGED;
                            flagsLeft--;
                        }
                        break;
                    case FLAGGED:
                        grid[yIndex][xIndex].status = HIDDEN;
                        flagsLeft++;
                        break;
                }
            }
        }
        return false;
    }
    draw(grid);
}
init();