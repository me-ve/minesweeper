function between(val, par1, par2) {
    let min = par1 < par2 ? par1 : par2;
    let max = par1 > par2 ? par1 : par2;
    return (val >= min && val <= max);
}