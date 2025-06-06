export default () => {

    const tb = document.querySelector("#taskbar");
    tb.addEventListener("mouseover", () => {
        tb.style.bottom = "0.7rem";
    });
    tb.addEventListener("mouseout", () => {
        tb.style.bottom = "-2.3rem";
    });

    const taskGhost = document.querySelector("#task-ghost");
    taskGhost.addEventListener("mouseover", () => {
        tb.style.bottom = "0.7rem";
    });

    const timeElem = document.querySelector("#datetime > .time");
    const dateElem = document.querySelector("#datetime > .date");
    let dt = new Date();
    
    const addZero = (dt) => dt < 10 ? "0" + dt : dt;

    timeElem.innerText = addZero(dt.getHours()) + ":" + addZero(dt.getMinutes()) + " " + (dt.getHours() > 12 ? "PM" : "AM");
    dateElem.innerText = dt.toLocaleDateString();

    setInterval(() => {
        let newDt = new Date();
        if(newDt.toLocaleDateString() != dt.toLocaleDateString()) {
            dateElem.innerText = newDt.toLocaleDateString();
        }
        timeElem.innerText = addZero(newDt.getHours()) + ":" + addZero(newDt.getMinutes()) + " " + (newDt.getHours() > 12 ? "PM" : "AM");
        dt = newDt;
    }, 1000);

}