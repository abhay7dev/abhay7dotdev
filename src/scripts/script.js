import desktop from "./desktop.js";
import taskbar from "./taskbar.js";
import Konsole from "./apps/konsole.js";
import FireDragon from "./apps/firedragon.js";

desktop();
taskbar();

new Konsole();
new FireDragon();
