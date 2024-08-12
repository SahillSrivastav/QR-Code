const generatorTab = document.querySelector(".nav-gene");
const scannerTab = document.querySelector(".nav-scan");

generatorTab.addEventListener("click", () => {
    generatorTab.classList.add("active");
    scannerTab.classList.remove("active");

    document.querySelector(".scanner").style.display = "none";
    document.querySelector(".generator").style.display = "block";
});

scannerTab.addEventListener("click", () => {
    scannerTab.classList.add("active");
    generatorTab.classList.remove("active");

    document.querySelector(".scanner").style.display = "block";
    document.querySelector(".generator").style.display = "none";
});

const generateButton = document.querySelector(".generator-form button");

generateButton.addEventListener("click", () => {
    generateButton.classList.add('clicked');
    setTimeout(() => generateButton.classList.remove('clicked'), 200);
});
