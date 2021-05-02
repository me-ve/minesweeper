function exposeNeighboursIfEmpty(grid, safeFieldsLeft, x0, y0) {
    let BorderL = (x0 <= 0);
    let BorderU = (y0 <= 0);
    let BorderD = (y0 >= grid.length - 1);
    let BorderR = (x0 >= grid[0].length - 1);

    let checking = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ];

    if (BorderU) {
        for (let i = 0; i <= 2; i++)
            checking[0][i] = false;
    }
    if (BorderL) {
        for (let i = 0; i <= 2; i++)
            checking[i][0] = false;
    }
    if (BorderR) {
        for (let i = 0; i <= 2; i++)
            checking[i][2] = false;
    }
    if (BorderD) {
        for (let i = 0; i <= 2; i++)
            checking[2][i] = false;
    }
    if (grid[y0][x0].status != EXPOSED) {
        grid[y0][x0].status = EXPOSED;
        safeFieldsLeft--;
    }
    if (!grid[y0][x0].minesNearby)
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (checking[y + 1][x + 1]) {
                    let newX = x + x0,
                        newY = y + y0;
                    if (grid[newY][newX].status == HIDDEN) safeFieldsLeft = exposeNeighboursIfEmpty(grid, safeFieldsLeft, newX, newY);
                }
            }
        }
    return safeFieldsLeft;
}