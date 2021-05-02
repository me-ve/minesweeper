let canvas, ctx;
let width, height;
let gridOffsetX, gridOffsetY;
let colors;
let timeStart, timeNow;
let gameRunning;
let gameEnded;
let isWon;

function draw(grid) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(gridOffsetX, gridOffsetY, gridEndX - gridOffsetX, gridEndY - gridOffsetY);
    ctx.font = FONT;
    for (let i = 0; i < settings.fieldsVertical; i++) {
        let verStart = gridOffsetY + i * FIELD_HEIGHT;
        for (let j = 0; j < settings.fieldsHorizontal; j++) {
            let horStart = gridOffsetX + j * FIELD_WIDTH;
            ctx.strokeStyle = "#808080";
            if (gameRunning) {
                switch (grid[i][j].status) {
                    case EXPOSED:
                        ctx.fillStyle = grid[i][j].isMined ? "#000000" : colors[grid[i][j].minesNearby];
                        symbol = " ";
                        if (grid[i][j].isMined) {
                            symbol = "☢";
                            ctx.fillText(symbol, horStart + FIELD_WIDTH / 6, verStart + FIELD_HEIGHT - 2)
                        } else if (grid[i][j].minesNearby > 0) {
                            symbol = grid[i][j].minesNearby;
                            ctx.fillText(symbol, horStart + FIELD_WIDTH / 4, verStart + FIELD_HEIGHT - 2);
                        }
                        break;
                    case HIDDEN:
                        ctx.fillStyle = "#808080";
                        ctx.fillRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
                        break;
                    case FLAGGED:
                        symbol = "⚑";
                        ctx.fillStyle = "#FF0000";
                        ctx.fillText(symbol, horStart + FIELD_WIDTH / 6, verStart + FIELD_HEIGHT - 2);
                        break;
                    case DETONATED:
                        ctx.fillStyle = "#FF0000";
                        symbol = "☢";
                        ctx.fillText(symbol, horStart + FIELD_WIDTH / 6, verStart + FIELD_HEIGHT - 2);
                        break;
                    case MISTAKEN:
                        symbol = "⛌";
                        break;
                }
            }
            ctx.strokeRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
        }
    }
    if (gameEnded) {
        let message = isWon ? "You won." : "Game over.";
        ctx.fillStyle = "#000000";
        ctx.font = "48px Helvetica"
        ctx.fillText(message, 24, 96);
    }
    if (typeof time != "undefined") {
        ctx.fillStyle = "#000000";
        ctx.font = "48px Helvetica"
        if (!gameEnded)
            time.now = Date.now();
        let ms = time.now - time.start;
        let timeStr = ms / 1000 | 0;
        ctx.fillText(timeStr, 24, 48);
    }
    if (typeof grid != "undefined")
        window.requestAnimationFrame(draw.bind(draw, grid));
}