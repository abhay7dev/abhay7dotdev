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
        term.clear();
        term.writeln("Type 'help' for info on available commands");
        term.focus();
        ask();
    });

    const term = new XTerminal();
    term.mount("#konsole > .content");

    const closeKonsole = () => {
        konsole.style.visibility = "none"; 
        konsole.style.opacity = "0.0";
        setTimeout(() => {
            konsole.style.display = "none";
            konsole.style.width = "30rem";
            konsole.style.height = "20rem";
            konsole.style.top = "20rem";
            konsole.style.left = "20rem";
        }, 500);
        launcher.style["background-color"] = "rgba(0, 0, 0, 0.0)";
    }

    document.querySelector("#konsole > .kde-appbar > .right .close-btn").addEventListener("click", closeKonsole);

    // prompt style
    const promptStyle = "[abhay@Installation00 ~]$ ";

    // write prompt style and prepare for input
    const ask = () => {
        term.write(promptStyle);
    }

    const handleInput = (inp) => {
        if(inp == "clear") {
            term.clear();
        } else if(inp == "help") {
            term.writeln(`abhay7.dev Konsole\nhelp\t- Print help menu\nwhoami\t- Print info about me\npwd\t- Print Workding Directory\nexit\t- Exit Konsole\n`);
        } else if(inp == "whoami") {
            term.writeln("abhay ~ Installation00\n\nHi there! I am a (mostly) self-taught developer living in the US (PST Time :)). I have a lot of interests and passions and tech is one of them. Explore the rest of this computer to learn more!\n");
        } else if(inp == "pwd") {
            term.writeln("/home/abhay\n");
        } else if(inp == "exit") {
            closeKonsole();
        }

    }

    // capture data event
    term.on('data', input => {
        handleInput(input);
        ask();
    });

    document.querySelector("#konsole > .content .xt-stdin").tabIndex = "0";

    document.querySelector("#konsole > .content").addEventListener("click", (_) => {
        document.querySelector("#konsole > .content .xt-stdin").focus();
    });

    window.addEventListener('unload', () => term.dispose());
}