import App from "../app.js";
import fakefs from "../fakefs.js";

export default class Firedragon extends App {
    constructor() {
        super({appName: "Firedragon", title: "Abhay's Projects"});
    }

    initApp() {
        this.appContent.innerHTML = fakefs["~/Downloads"]["files"]["projects.html"];
    }

    closeApp() {
        super.closeApp();
    }
}