export default () => {
    const desktopImage = document.querySelector("#background-image");
    const desktopHighlight = document.querySelector(".desktop-highlight");

    let mousedown = false;
    let mouseX = -1;
    let mouseY = -1;

    desktopImage.addEventListener("mousedown", (e) => {
        if(e.buttons == 1 && document.elementFromPoint(e.clientX, e.clientY).isEqualNode(desktopImage)) {
            if(mouseX < 0 && mouseY < 0) {
                mouseX = e.pageX;
                mouseY = e.pageY;
                desktopHighlight.style.left = `${mouseX}px`;
                desktopHighlight.style.top = `${mouseY}px`;
                desktopHighlight.style.width = 0;
                desktopHighlight.style.height = 0;
            }
            mousedown = true;
        }
    });

    desktopImage.addEventListener("mousemove", (e) => {
        if(mousedown && e.pageX != mouseX && e.pageY != mouseY) {
            desktopHighlight.style.width = (Math.abs(e.pageX - mouseX) - 1) + "px";
            desktopHighlight.style.height = (Math.abs(e.pageY - mouseY) - 1) + "px";
            if(e.pageY < mouseY && e.pageX < mouseX) {
                desktopHighlight.style.transform = `translateY(-${Math.abs(e.pageY - mouseY) - 1}px) ` + `translateX(-${Math.abs(e.pageX - mouseX) - 1}px)`;
            } else if (e.pageX < mouseX) {
                desktopHighlight.style.transform = `translateX(-${Math.abs(e.pageX - mouseX) - 1}px)`;
            }  else if(e.pageY < mouseY) {
                desktopHighlight.style.transform = `translateY(-${Math.abs(e.pageY - mouseY) - 1}px)`
            }
        }   
    });

    desktopImage.addEventListener("mouseup", (e) => {
        mousedown = false;
        mouseX = -1;
        mouseY = -1;
        desktopHighlight.style.left = "initial";
        desktopHighlight.style.top = "initial";
        desktopHighlight.style.transform = "initial";
        desktopHighlight.style.width = 0;
        desktopHighlight.style.height = 0;
    });
}