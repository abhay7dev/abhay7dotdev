export default () => {

    const firedragon = document.querySelector("#firedragon");
    const firedragonContent = document.querySelector("#firedragon > .content");

    const launcher = document.querySelector(".firedragon-launcher")
    
    launcher.addEventListener("click", () => {
        firedragon.style.display = "initial";
        setTimeout(() => {
            firedragon.style.visibility = "initial"; 
            firedragon.style.opacity = "1.0";
        }, 4);
        launcher.style["background-color"] = "#30303b";
        firedragon.style["z-index"] = ++window.nextZ;
    });

    const closeFiredragon = () => {
        firedragon.style.visibility = "none"; 
        firedragon.style.opacity = "0.0";
        setTimeout(() => {
            firedragon.style.display = "none";
            firedragon.style.width = "32rem";
            firedragon.style.height = "18rem";
            firedragon.style.top = "20rem";
            firedragon.style.left = "30rem";
        }, 500);
        launcher.style["background-color"] = "rgba(0, 0, 0, 0.0)";
    }

    document.querySelector("#firedragon > .kde-appbar > .right .close-btn").addEventListener("click", closeFiredragon);

    window.onmessage = (e) => {
        if (e.data == 'firedragon-content-clicked') {
            firedragon.style["z-index"] = ++window.nextZ;  
        }
    }

}