const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");

let spinning = false;
let currentRotation = 0;

const segments = 6;
const segmentAngle = 360 / segments;

spinBtn.addEventListener("click", () => {

    if (credits <= 0) return;
    credits--;
    updateCreditsUI();

    if (spinning) return;
    spinning = true;

    const index = Math.floor(Math.random() * segments);

    // ⭐ STEP 4 GOES HERE
    const prizeImages = [
        "001 TTU.JPG",
        "002 Lion.JPG",
        "003 Phoenix.JPG",
        "004 Rocket.JPG",
        "005 Rose Nebula.JPG",
        "006 Dragon.JPG"
    ];

addLog(prizeImages[index]);

    const extraSpins = 360 * 5;

    const targetAngle = index * segmentAngle + (segmentAngle / 2);

    // ✅ IMPORTANT FIX:
    // always move forward (clockwise), never recalculate from zero
    currentRotation = currentRotation + extraSpins + (360 - (currentRotation % 360) - targetAngle);

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        spinning = false;
    }, 5000);
});

let credits = 0; // initial value (you can set 0 for launch lock)

const creditDisplay = document.getElementById("creditDisplay");
const adminCode = document.getElementById("adminCode");
const addCreditBtn = document.getElementById("addCreditBtn");

const SECRET_CODE = "Purple123456"; // change this

function updateCreditsUI() {
    creditDisplay.innerText = `Credits: ${credits}`;

    if (credits <= 0) {
        spinBtn.disabled = true;
        spinBtn.innerText = "NO CREDITS";
    } else {
        spinBtn.disabled = false;
        spinBtn.innerText = "SPIN";
    }
}

updateCreditsUI();

addCreditBtn.addEventListener("click", () => {

    if (adminCode.value === SECRET_CODE) {
        credits += 1; // or any amount you want
        updateCreditsUI();
        alert("Credits added!");
    } else {
        alert("Wrong passcode!");
    }

    adminCode.value = "";
});

const logList = document.getElementById("logList");

function addLog(resultImage) {

    const now = new Date();
    const timeString = now.toLocaleString();

    const entry = document.createElement("div");
    entry.classList.add("log-item");

    entry.innerText = `${timeString} — Won: ${resultImage}`;

    logList.prepend(entry);
}