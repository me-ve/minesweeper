let canvas, ctx;
let width, height;
let gridOffsetX, gridOffsetY;
let colors;
let timeStart, timeNow;
let gameRunning;

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
                ctx.fillStyle = grid[i][j].isMined ? "#FF00FF" : colors[grid[i][j].minesNearby];
                switch (grid[i][j].status) {
                    case EXPOSED:
                        symbol = " ";
                        if (grid[i][j].isMined) symbol = "#";
                        else if (grid[i][j].minesNearby > 0) symbol = grid[i][j].minesNearby;
                        ctx.fillText(symbol, horStart + FIELD_WIDTH / 4, verStart + FIELD_HEIGHT - 2)
                        break;
                    case HIDDEN:
                        break;
                    case FLAGGED:
                        break;
                    case DETONATED:
                        break;
                    case MISTAKEN:
                        break;
                }
            }
            ctx.strokeRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
        }
    }
    if (typeof time != "undefined") {
        ctx.fillStyle = "#000000";
        ctx.font = "48px Helvetica"
        time.now = Date.now();
        let ms = time.now - time.start;
        let timeStr = ms / 1000 | 0;
        ctx.fillText(timeStr, 24, 48);
    }
    if (typeof grid != "undefined")
        window.requestAnimationFrame(draw.bind(draw, grid));
}