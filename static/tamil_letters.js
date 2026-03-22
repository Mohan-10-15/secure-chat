const layer = document.createElement("div");
document.body.appendChild(layer);

layer.style.position = "fixed";
layer.style.top = "0";
layer.style.left = "0";
layer.style.width = "100%";
layer.style.height = "100%";
layer.style.zIndex = "2";
layer.style.pointerEvents = "none";

const letters = ['அ','ஆ','இ','ஈ','உ','ஊ','எ','ஏ','ஐ','ஒ','ஓ','க','ங','ச','ஞ','ட','ண','த','ந','ப','ம'];

function createLetter() {
    const el = document.createElement("span");

    el.innerText = letters[Math.floor(Math.random() * letters.length)];

    el.style.position = "absolute";
    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.top = window.innerHeight + "px";

    el.style.fontSize = (25 + Math.random() * 30) + "px";
    el.style.color = "#3e2a14";
    el.style.opacity = "0.7";
    el.style.fontWeight = "bold";

    layer.appendChild(el);

    let pos = window.innerHeight;

    const move = setInterval(() => {
        pos -= 2;
        el.style.top = pos + "px";

        if (pos < -50) {
            clearInterval(move);
            el.remove();
        }
    }, 16);
}

setInterval(createLetter, 80);