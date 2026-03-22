setInterval(() => {
    const el = document.createElement("div");
    el.innerText = "தமிழ்";
    el.style.position = "fixed";
    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.top = window.innerHeight + "px";
    el.style.opacity = "0.3";

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
}, 500);