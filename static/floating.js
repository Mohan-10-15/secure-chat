const letters = ['அ','ஆ','இ','ஈ','உ','ஊ','எ','ஏ','ஐ','ஒ','ஓ','க','ங','ச','ஞ','ட','ண','த','ந','ப','ம'];

setInterval(() => {
    const el = document.createElement("span");

    el.innerText = letters[Math.floor(Math.random() * letters.length)];

    el.style.position = "fixed";
    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.top = window.innerHeight + "px";
    el.style.opacity = "0.4";
    el.style.fontSize = "24px";

    document.body.appendChild(el);

    let pos = window.innerHeight;

    const move = setInterval(() => {
        pos -= 2;
        el.style.top = pos + "px";

        if (pos < 0) {
            clearInterval(move);
            el.remove();
        }
    }, 20);

}, 200);