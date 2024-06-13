export class JobSeek {
    constructor(id, OS) {
        this.id = id;
        this.$job_seeker = $('#' + id);
        this.OS = OS;

        this.settings = new Settings(this);
        //this.menu = new Menu(this);
        //this.playground = new Playground(this);

        this.start();
    }

    start() {

    }

}
