import konsole from "./modules/konsole.js";
import firedragon from "./modules/firedragon.js";

const setUpInteractions = () => {
    Array.from(document.querySelectorAll(".kde-appbar")).forEach((elem) => {
        
        // Adapted from https://www.w3schools.com/howto/howto_js_draggable.asp
        let pos1, pos2, pos3, pos4;

        elem.onmousedown = (e) => {
            
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
                elem.parentElement.style.top = (elem.parentElement.offsetTop - pos2) + "px";
                elem.parentElement.style.left = (elem.parentElement.offsetLeft - pos1) + "px"
            }

        };

    });
}

const setUpApps = () => {
    konsole();
    firedragon();
    const apps = Array.from(document.querySelectorAll(".app"));
    window.nextZ = 1;
    apps.forEach((a) => {
        Array.from(a.children).forEach((c) => {
            c.addEventListener("mousedown", (e) => {
                a.style["z-index"] = ++nextZ;
            }); 
        });
    });
    const maximizeButs = Array.from(document.querySelectorAll(".max-but"));
    maximizeButs.forEach((but) => {
        but.addEventListener("click", (_) => {
            const a = but.parentElement.parentElement.parentElement;
            a.style.width = "95%";
            a.style.height = "95%";
            a.style.top = "1rem";
            a.style.left = "1rem";
            // a.style.resize = "both";
        });
    });

}

export default () => {
    setUpInteractions();
    setUpApps();
}