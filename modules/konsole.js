import XTerminal from "../xterminal/xterminal.esm.js"

export default () => {

    const konsole = document.querySelector("#konsole");

    const launcher = document.querySelector(".konsole-launcher");
    launcher.addEventListener("click", () => {
        konsole.style.display = "initial";
        setTimeout(() => {
            konsole.style.visibility = "initial"; 
            konsole.style.opacity = "1.0";
        }, 4);
        launcher.style["background-color"] = "#30303b";
    });

    document.querySelector("#konsole > .kde-appbar > .right .close-btn").addEventListener("click", () => {
        console.log("hi");
        konsole.style.visibility = "none"; 
        konsole.style.opacity = "0.0";
        setTimeout(() => {
            konsole.style.display = "none";
        }, 500);
        launcher.style["background-color"] = "rgba(0, 0, 0, 0.0)";
    });

    const term = new XTerminal();
    term.mount("#konsole > .content");

    // prompt style
    const promptStyle = "[abhay@Installation00 ~]$ ";

    // write prompt style and prepare for input
    const ask = () => {
        term.write(promptStyle);
    }

    // capture data event
    term.on('data', input => {
        if (input == 'clear') {
            // clear screen
            term.clear();
        } else {
            // do something
            term.writeln('Data: ' + input);
        }
        // then prompt user for more input
        ask();
    });

    // print greeting message
    term.writeln("Type 'help' for info on available commands");

    // initiate
    ask();

    document.querySelector("#konsole > .content .xt-stdin").tabIndex = "0";

    document.querySelector("#konsole > .content").addEventListener("click", (_) => {
        document.querySelector("#konsole > .content .xt-stdin").focus();
    });

    window.addEventListener('unload', () => term.dispose());
}