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
    ctx.fillStyle = "#B0B0B0";
    ctx.fillRect(gridOffsetX, gridOffsetY, gridEndX - gridOffsetX, gridEndY - gridOffsetY);
    ctx.font = FONT;
    let flags = 0;
    for (let i = 0; i < settings.fieldsVertical; i++) {
        let verStart = gridOffsetY + i * FIELD_HEIGHT;
        for (let j = 0; j < settings.fieldsHorizontal; j++) {
            let horStart = gridOffsetX + j * FIELD_WIDTH;
            ctx.strokeStyle = "#808080";
            if (gameRunning) {
                switch (grid[i][j].status) {
                    case EXPOSED:
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
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
                        ctx.fillStyle = "#B0B0B0";
                        ctx.fillRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
                        break;
                    case FLAGGED:
                        ctx.fillStyle = "#B0B0B0";
                        ctx.fillRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
                        symbol = "⚑";
                        ctx.fillStyle = "#FF0000";
                        ctx.fillText(symbol, horStart + FIELD_WIDTH / 6, verStart + FIELD_HEIGHT - 2);
                        flags++;
                        break;
                    case DETONATED:
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
                        ctx.fillStyle = "#FF0000";
                        symbol = "☢";
                        ctx.fillText(symbol, horStart + FIELD_WIDTH / 6, verStart + FIELD_HEIGHT - 2);
                        break;
                    case MISTAKEN:
                        ctx.fillStyle = "#B0B0B0";
                        ctx.fillRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
                        ctx.fillStyle = "#FF0000";
                        symbol = "⚑";
                        ctx.fillText(symbol, horStart + FIELD_WIDTH / 6, verStart + FIELD_HEIGHT - 2);
                        ctx.fillStyle = "#000000";
                        symbol = "⨉";
                        ctx.fillText(symbol, horStart, verStart + FIELD_HEIGHT - 4);
                        break;
                }
            }
            ctx.strokeRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
        }
    }
    if (gameEnded) {
        let message = gameWon ? "You won." : "Game over.";
        ctx.fillStyle = "#000000";
        ctx.font = "48px Helvetica"
        ctx.fillText(message, 24, 96);
    } else if (gameRunning) {
        let flagsLeft = 10 - flags;
        let message = "Flags: " + flagsLeft;
        ctx.fillStyle = "#000000";
        ctx.font = "48px Helvetica"
        ctx.fillText(message, 24, 96);
    }
    if (typeof time != "undefined") {
        ctx.fillStyle = "#000000";
        ctx.font = "48px Helvetica"
        if (!gameEnded) {
            time.now = Date.now();
            let ms = time.now - time.start;
            let timeStr = ms / 1000 | 0;
            ctx.fillText("Time: " + timeStr, 24, 48);
        } else {
            let ms = time.now - time.start;
            let timeStr = ms / 1000 | 0;
            ctx.fillText("Time: " + timeStr, 24, 48);
        }
    }
    if (typeof grid != "undefined")
        window.requestAnimationFrame(draw.bind(draw, grid));
}