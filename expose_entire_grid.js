function exposeEntireGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j].status == FLAGGED && !grid[i][j].isMined)
                grid[i][j].status = MISTAKEN;
            if (grid[i][j].status == HIDDEN) {
                if (grid[i][j].isMined && gameWon) {
                    grid[i][j].status = FLAGGED;
                } else {
                    grid[i][j].status = EXPOSED;
                }
            }
        }
    }
}