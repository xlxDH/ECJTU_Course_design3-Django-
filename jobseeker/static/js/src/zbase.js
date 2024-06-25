export class AcGame {
    constructor(id, AcWingOS) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.AcWingOS = AcWingOS;

        this.settings = new Settings(this);
        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);
        this.form = new AcForm(this);

        this.start();
    }

    start() {
    }
}

export class hr_AcGame {
    constructor(id, AcWingOS) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.AcWingOS = AcWingOS;

        this.settings = new hr_Settings(this);
        this.menu = new hr_AcGameMenu(this);
        this.playground = new hr_AcGamePlayground(this);
        this.form = new hr_AcForm(this);
        this.start();
    }

    start() {
    }
}
