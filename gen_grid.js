function gen_grid(settings, firstField) {
    let grid = new Array(settings.fieldsVertical);
    for (let i = 0; i < settings.fieldsVertical; i++) {
        grid[i] = new Array(settings.fieldsHorizontal);
        for (let j = 0; j < settings.fieldsHorizontal; j++) {
            grid[i][j] = new Field(false, 0, EXPOSED);
        }
    }
    let minesLeft = settings.mines;
    while (minesLeft > 0) {
        let x = Math.random() * (settings.fieldsHorizontal - 1) | 0;
        let y = Math.random() * (settings.fieldsVertical - 1) | 0;
        if ((!grid[y][x].isMined) && !(y == firstField[0] && x == firstField[1])) {
            grid[y][x].isMined = true;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let neighbourX = x + j,
                        neighbourY = y + i;
                    if (
                        between(neighbourY, 0, settings.fieldsVertical) &&
                        between(neighbourX, 0, settings.fieldsHorizontal))
                        grid[y + i][x + j].minesNearby++;
                }
            }
            minesLeft--;
        }
    }
    return grid;
}