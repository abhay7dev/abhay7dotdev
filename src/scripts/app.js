import fakefs from "./fakefs.js";

export default class App {
    
    /**
     * Assign the project to an employee.
     * @param {Object} settings - The settings for the app
     * @param {string} settings.appName - The name of the app.
     * @param {string=} settings.title The window title of the app (optional)
     */
    constructor(settings) {
        if (new.target === App) throw TypeError("Attempt to create App object");
        
        this.fakefs = fakefs;
        this.appName = settings.appName;
        this.launcher = document.querySelector(`.app-launcher[data-app="${settings.appName.toLowerCase()}"]`);
        this.winTitle = settings.title ? settings.title : settings.appName;
        this.appIsOpen = false;

        this.initWindow();
    }

    initWindow() {

        const appTemplate = document.querySelector("#app-template");
        this.app = appTemplate.content.cloneNode(true).querySelector(".app");
        this.app.classList.add(this.appName.toLowerCase());
        this.app.classList.add("app");
        this.app.querySelector(".appbar > .win-icon").src = this.launcher.src;
        this.app.querySelector(".appbar > .win-icon").alt = this.appName;
        this.app.querySelector(".appbar > .win-title").innerText = this.winTitle;  
        this.appContent = this.app.querySelector(".app-content");      
        document.querySelector("#apps").append(this.app);

        // new ResizeObserver((entries) => { console.log(entries); window.appIsBeingDragged = true }).observe(this.app);

        this.launcher.addEventListener("click", (_) => {
            if(!this.appIsOpen) {
                // open window
                this.app.style.display = "initial";
                setTimeout(() => {
                    this.app.style.visibility = "initial"; 
                    this.app.style.opacity = "1.0";
                }, 4);
                this.initApp();
                this.appIsOpen = true;
                this.launcher.classList.add("active");
            }
        });

        this.app.querySelector(".close-btn").addEventListener("click", () => {
            this.closeApp()
        });

        // Adapted from https://www.w3schools.com/howto/howto_js_draggable.asp
        const appBar = this.app.querySelector(".appbar");
        let pos1, pos2, pos3, pos4;
        appBar.addEventListener("mousedown", (e) => {
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;
            
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            }
            document.onmousemove = (e) => {
                e.preventDefault();
                
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                
                // set the element's new position:
                appBar.parentElement.style.top = (Math.min(window.screen.height - 100, Math.max(0, appBar.parentElement.offsetTop - pos2))) + "px";
                appBar.parentElement.style.left = (Math.max(0, appBar.parentElement.offsetLeft - pos1)) + "px"
            }
        });
    }

    initApp() {
        throw new Error("initApp has not been initialized for " + this.constructor.name);
    }

    closeApp() {
        if(this.appIsOpen) {
            this.app.style.opacity = "0.0";
            this.app.style.visibility = "none"; 
            setTimeout(() => {
                this.app.style.display = "none";
                this.app.style.width = "48rem";
                this.app.style.height = "27rem";
                this.app.style.top = "20rem";
                this.app.style.left = "20rem";
            }, 400);
            this.appIsOpen = false;
            this.launcher.classList.remove("active");
        }
    }
    
}