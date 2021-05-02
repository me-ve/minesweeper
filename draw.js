let canvas, ctx;
let width, height;
let gridOffsetX, gridOffsetY;
let colors;

function draw(grid) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(gridOffsetX, gridOffsetY, gridEndX - gridOffsetX, gridEndY - gridOffsetY);
    ctx.font = FONT;
    for (let i = 0; i < settings.fieldsVertical; i++) {
        let verStart = gridOffsetY + i * FIELD_HEIGHT;
        for (let j = 0; j < settings.fieldsHorizontal; j++) {
            let horStart = gridOffsetX + j * FIELD_WIDTH;
            ctx.fillStyle = grid[i][j].isMined ? "#FF00FF" : colors[grid[i][j].minesNearby];
            ctx.strokeStyle = "#808080";
            if (grid[i][j].status == EXPOSED) {
                symbol = " ";
                if (grid[i][j].isMined) symbol = "#";
                else if (grid[i][j].minesNearby > 0) symbol = grid[i][j].minesNearby;
                ctx.fillText(symbol, horStart + FIELD_WIDTH / 4, verStart + FIELD_HEIGHT - 2)
            }
            ctx.strokeRect(horStart, verStart, FIELD_WIDTH, FIELD_HEIGHT);
        }
    }
    window.requestAnimationFrame(draw.bind(draw, grid));
}