const button = document.getElementById("summon");
const count = document.getElementById("count");
const message = document.getElementById("message");

let ducks = 0;

const milestones = {
    10: "The ducks are multiplying...",
    50: "The flock is growing.",
    100: "Duck invasion.",
    150: "QUACK.",
    250: "The ducks own this place.",
    500: "Duck apocalypse.",
    750: "Resistance is futile.",
    1000: "The King has arrived."
};

button.addEventListener("click", () => {

    ducks++;

    count.textContent = ducks + " Ducks Summoned";

    spawnDuck();

    if (milestones[ducks]) {
        message.textContent = milestones[ducks];
    }

    // 100 Ducks
    if (ducks === 100) {
        document.body.style.background = "#f8e27c";
    }

    // 150 Ducks
    if (ducks === 150) {

        for (let i = 0; i < 20; i++) {

            setTimeout(() => {
                spawnDuck();
            }, i * 50);

        }

    }

    // 500 Ducks
    if (ducks === 500) {
        document.body.classList.add("shake");
    }

    // 750 Ducks
    if (ducks === 750) {

        duckList.forEach(duck => {
            duck.vx *= 1.3;
            duck.vy *= 1.3;
        });

    }

    // 1000 Ducks
    if (ducks === 1000) {
        spawnGoldenDuck();
    }

});

const duckList = [];

function spawnDuck() {

    const duck = document.createElement("img");

    duck.src = "assets/ducks.png";
    duck.className = "duck";

    const size = window.innerWidth < 700 ? 42 : 60;

    duck.style.width = size + "px";

    const obj = {
        el: duck,
        x: Math.random() * (window.innerWidth - size),
        y: Math.random() * (window.innerHeight - size),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: size
    };

    duck.style.left = obj.x + "px";
    duck.style.top = obj.y + "px";

    document.body.appendChild(duck);

    duckList.push(obj);

}

function spawnGoldenDuck() {

    const duck = document.createElement("img");

    duck.src = "assets/golden-duck.png";
    duck.className = "duck golden";

    duck.style.width = window.innerWidth < 700 ? "70px" : "100px";

    duck.style.left = (window.innerWidth / 2 - 50) + "px";
    duck.style.top = (window.innerHeight / 2 - 50) + "px";

    document.body.appendChild(duck);

}

function animateDucks() {

    duckList.forEach(duck => {

        duck.x += duck.vx;
        duck.y += duck.vy;

        if (duck.x <= 0 || duck.x >= window.innerWidth - duck.size) {
            duck.vx *= -1;
        }

        if (duck.y <= 0 || duck.y >= window.innerHeight - duck.size) {
            duck.vy *= -1;
        }

        if (Math.random() < 0.002) {
            duck.vx += (Math.random() - 0.5) * 0.4;
            duck.vy += (Math.random() - 0.5) * 0.4;
        }

        duck.vx = Math.max(-1.5, Math.min(1.5, duck.vx));
        duck.vy = Math.max(-1.5, Math.min(1.5, duck.vy));

        duck.el.style.left = duck.x + "px";
        duck.el.style.top = duck.y + "px";

        duck.el.style.transform = duck.vx >= 0
            ? "scaleX(1)"
            : "scaleX(-1)";

    });

    requestAnimationFrame(animateDucks);

}

animateDucks();
