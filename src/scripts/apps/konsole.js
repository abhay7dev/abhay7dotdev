import App from "../app.js";
import XTerminal from "../lib/xterminal.esm.js";

export default class Konsole extends App {
    constructor() {
        super({appName: "Konsole", title: "~ : fakesh — Konsole"});
    }

    initApp() {
        this.term = new XTerminal();
        this.term.mount(this.appContent);
        this.setupVars();
        this.setupTerm();
        this.term.writeln("Welcome! Type 'help' to get started! ");
        this.prompt();
        this.term.focus();
    }

    setupVars() {
        this.wd = "~";
        this.keepPrompting = true;
        this.playing = false;
        this.aud = new Audio();
        this.historyCache = localStorage.getItem("history") != null ? JSON.parse(localStorage.getItem("history")) : [];
        this.term.history = this.historyCache;
    }

    setupTerm() {
        this.term.on("data", (inp) => {
            this.evaluateInput(inp);
            this.prompt();
        });
        this.term.on('keypress', (ev) => {
            if (ev.key.toLowerCase() == 'l' && ev.ctrlKey) {
                ev.cancel();
                this.term.clear();
                this.prompt();
            }
            
            if (ev.key.toLowerCase() == 'c' && ev.ctrlKey) {
                if(this.playing) {
                    this.aud.pause();
                    this.endAud();
                } else {
                    this.term.writeln("^C");
                    this.app.querySelector(".xt-cursor").previousElementSibling.innerText = "";
                }
                this.prompt();
            }
        });
    }

    prompt() {
        let toks = this.wd.split("/");
        if(this.keepPrompting && !this.playing) this.term.write(`<span class="konsole-prompt">[abhay@Installation00 ${toks[toks.length - 1]}]$</span>`);
    }

    ls(data) {
        const folder = this.fakefs[this.wd];
        const totalArr = [];
        const toks = data.split(/\s+/);
        if(folder.folders != null && folder.files != null) {
            totalArr.push.apply(totalArr, folder.folders);
            totalArr.push.apply(totalArr, Object.keys(folder.files));
            totalArr.sort();
            for(const st of totalArr) {
                if(st.charAt(0) != "." || (toks.length > 1 && (toks[1] == "-a" || toks[1] == "-la"))) {
                    console.log(st);
                    this.term.write(`<span class='lsoutput${folder.folders.indexOf(st) > -1 ? " folder" : ""}'>${st}</span>`);            
                }
            }
            this.term.writeln("");
        }
    }

    cd(data) {
        let toks = data.split(/\s+/);
        if(toks.length > 2) {
            this.term.write("cd: string not in pwd: " + toks[1]);
        } else if(toks.length == 1) {
            this.wd = "~";
        } else {
            if(this.fakefs[this.wd + "/" + toks[1]] != null) {
                this.wd = this.wd + "/" + toks[1];
            } else if(toks[1] == "..") {
                if(this.wd != "~") {
                    this.wd = this.wd.substring(0, this.wd.length - this.wd.split("").reverse().join("").indexOf("/") - 1);
                }
            } else if(toks[1] != ".") {
                this.term.writeln("cd: no such directory: " + toks[1]);
            }
        }
    }

    cat(data) {
        let toks = data.split(/\s+/);
        if(toks.length < 2) return;
        for(let i = 1; i < toks.length ; i++) {
            if(this.fakefs[this.wd].files[toks[i]] != null) {
                this.term.writeln(this.fakefs[this.wd].files[toks[i]]);
            } else {
                this.term.writeln("cat: " + toks[i] + ": No such file");
            }
        }
    }

    kew(data) {
        const toks = data.split(/\s+/);
        this.term.writeln("NON-SELF-PRODUCED MUSIC NOT HOSTED BY ME ON THIS SITE.\nAll rights held by the copyright holders. Please direct takedown requests to the hosting site (archive.org).\nI just want to share music I like 🙏");
        let tempWd = this.wd;
        let fileName = toks[1];
        if(toks.length == 2  && toks[1].indexOf("/") > -1) {
            let subToks = toks[1].split("/");
            fileName = subToks[subToks.length - 1];
            tempWd = this.wd + "/" + toks[1].substring(0, toks[1].length - toks[1].split("").reverse().join("").indexOf("/") - 1);
        }
        if(fileName.startsWith("LMSOUNDZ_")) {
            this.term.writeln("\nYou are listening to an LMSoundz production. Reuse allowed with proper attribution/credits");    
        }
        if(toks.length == 2 && this.fakefs[tempWd] != null && this.fakefs[tempWd].files[fileName] != null && fileName.endsWith(".mp3")) {
            this.aud = (fileName.startsWith("LMSOUNDZ_") ? this.fakefs[tempWd].files[fileName] : new Audio(this.fakefs[tempWd].files[fileName]));
            this.aud.play();
            this.aud.addEventListener("ended", () => {
                this.endAud();
                this.prompt();
            });
            this.playing = true;
            this.term.writeln(`<span class="playing-wrap"><span class="spinner"></span> Playing (exit or ctrl-c to stop)...</span>`);
            // term.pause();
        } else {
            this.term.writeln("Music not found or invalid args");
        }
    }

    endAud() {
        this.playing = false;
        this.term.history = this.historyCache;
        localStorage.setItem("history", JSON.stringify(this.term.history));
        const wrap = this.app.querySelectorAll(".spinner").forEach(e => e.classList.add("spinner-complete"));
    }

    viu(data) {
        const toks = data.split(/\s+/);
        let tempWd = this.wd;
        let fileName = toks[1];
        if(toks.length == 2  && toks[1].indexOf("/") > -1) {
            let subToks = toks[1].split("/");
            fileName = subToks[subToks.length - 1];
            tempWd = this.wd + "/" + toks[1].substring(0, toks[1].length - toks[1].split("").reverse().join("").indexOf("/") - 1);
        }
        if(toks.length == 2 && this.fakefs[tempWd] != null && this.fakefs[tempWd].files[fileName] != null && fileName.endsWith(".png")) {
            this.term.writeln(`<img class="viu-img" src="${this.fakefs[tempWd].files[fileName]}" alt="${fileName}">`);
        } else {
            this.term.writeln("Picture not found or invalid args");
        }
        
    }

    help() {
        const commands = {
            "help": "View available commands",
            "ls": "List directory",
            "cd": "Change directory - cd [directory]",
            "pwd": "Print working directory",
            "whoami": "Print effective user info",
            "kew": "Terminal based audio player - kew [filename]",
            "viu": "Terminal based image viewer - viu [filename]",
            "cat": "Print file to standard output - cat [filename]",
            "clear": "Clear Konsole",
            "clear_hist": "Clear History",
            "exit": "Exit Konsole",
            "echo": "Display a line of text",
        }
        this.term.writeln(`GNU AGPL Licensed Fakesh 1.0.0\nThese shell commands are defined internally`);
        for(const key of Object.keys(commands)) {
            this.term.writeln(`\t<span class="help-cmd">${key}</span> - ${commands[key]}`);
        }
    }

    evaluateInput(data) {
        data = data.trim();
        if(this.playing) {
            if(data == "exit") {
                this.aud.pause();
                this.endAud();
            }
            return;
        }
        if(data == "clear") {
            this.term.clear();
        } else if(data.split(/\s+/)[0] == "echo") {
            const toEcho = data.trim().split(/\s+/).length > 1 ? data.substring(data.indexOf("echo") + 5) : "";
            this.term.writeln(toEcho);
        } else if(data == "pwd") {
            this.term.writeln(`/home/abhay${this.wd != "~" ? this.wd.substring(this.wd.indexOf("/")): ""}`);
        } else if(data.split(/\s+/)[0] == "ls") {
            this.ls(data);
        } else if(data.split(/\s+/)[0] == "cd") {
            this.cd(data);
        } else if(data.split(/\s+/)[0] == "cat") {
            this.cat(data);
        } else if(data.split(/\s+/)[0] == "kew") {
            this.kew(data);
        } else if(data.split(/\s+/)[0] == "viu") {
            this.viu(data);
        } else if(data == "help") {
            this.help();
        } else if(data == "clear_hist") {
            this.term.clearHistory();
            localStorage.setItem("history", "[]");
        } else if(data == "whoami") {
            this.term.writeln(`<b style="color: var(--cat-green)">Abhay</b>\n\n<i style="color: var(--cat-subtext)">Hey there! I am an incoming freshman at UW for CS.\nHaving grown up in an era with ever-increasing processing power and the explosion of AI, I have developed a strong interest in the realm of computing and understanding everything there is to know about it.\nAs a self-proclaimed jack of all trades, I have an understanding of many of the fields in the realm of computing, and I'm <b style="color: var(--cat-blue)">constantly looking to expand my knowledge.</b>\nI've dealt with WebDev, Cybersecurity, Operating Systems, DevOps, Networking, Graphics, Architecture, and Low-Level concepts with countless languages, tools, and technology.\n\nI'm always looking to learn, whether it is about CS, Math, Science, or Politics.\nIn my free time, I enjoy hanging with my friends (& munchin on Chipotle) and making music (FL Studio).\nI support FLOSS, self-hosting, and privacy-respecting online services, though I do balance those values with modern.\n\nContact me at <a href="mailto:me@abhay7.dev">me [at] abhay7.dev</a> (me@abhay7.dev)\n\nFeel free to explore this site and find out various facets of me and my personality!<b style="color: var(--cat-blue)">Thank You </b> for visiting<i>😁\n`);
        } else if(data == "exit") {
            this.closeApp();
        } else {
            if(data.replace(/\s/g,'') != "") this.term.writeln("fakesh: " + data + ": command not found");
        }
        this.historyCache = this.term.history;
        localStorage.setItem("history", JSON.stringify(this.historyCache));
    }

    closeApp() {
        super.closeApp();
        this.term.dispose();
        if(this.playing) {
            this.aud.pause();
            this.endAud();
        }
    }

}