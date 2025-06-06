const loader = document.querySelector(".loader");
loader.addEventListener("transitionend", () => {
    loader.style.display = "none";
});
window.addEventListener("pageshow", () => {
    loader.style.opacity = "0";
});
window.addEventListener("beforeunload", () => {
    loader.style.opacity = "1";
    loader.style.display = "flex";
});


if (window.matchMedia("(max-width: 768px), (orientation: portrait)").matches || /iphone|ipod|ipad|android|blackberry|windows phone|mobile/i.test(navigator.userAgent.toLowerCase())) {
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelector(".mobile-notice").style.display = "initial";
    });
}