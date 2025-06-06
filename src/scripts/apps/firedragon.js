import App from "../app.js";
import fakefs from "../fakefs.js";

export default class Firedragon extends App {
    constructor() {
        super({appName: "Firedragon", title: "Abhay's Projects"});
    }

    initApp() {
        const source = document.querySelector(".preload > .projects-preload-html");
        this.appContent.append(...source.children);
        // this.appContent.innerHTML = fakefs["~/Downloads"]["files"]["projects.html"];
    }

    closeApp() {
        super.closeApp();
    }
}