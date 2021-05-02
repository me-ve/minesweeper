function config(mode) {
    let settings;
    switch (mode) {
        case "easy":
            settings = new Settings(FIELDS_VERTICAL_EASY, FIELDS_HORIZONTAL_EASY, MINES_EASY);
            break;
        case "medium":
            settings = new Settings(FIELDS_VERTICAL_MEDIUM, FIELDS_HORIZONTAL_MEDIUM, MINES_MEDIUM);
            break;
        case "hard":
            settings = new Settings(FIELDS_VERTICAL_HARD, FIELDS_HORIZONTAL_HARD, MINES_HARD);
            break;
        default:
            break;
    }
    return settings;
}
class Settings {
    constructor(fieldsVertical, fieldsHorizontal, mines) {
        this.fieldsVertical = fieldsVertical;
        this.fieldsHorizontal = fieldsHorizontal;
        this.mines = mines;
    }
}