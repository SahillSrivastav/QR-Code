const generatorDiv = document.querySelector(".generator");
const generateBtn = generatorDiv.querySelector(".generator-form button");
const qrInput = generatorDiv.querySelector(".generator-form input");
const qrImg = generatorDiv.querySelector(".generator-img img");
const downloadBtn = generatorDiv.querySelector(".generator-btn .btn-link");

let imgURL = '';


generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if(!qrValue.trim()) return;

    generateBtn.innerText = "Generating QR Code...";
    imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

    qrImg.src = imgURL;

    qrImg.addEventListener("load",() =>{
        generatorDiv.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    })

    console.log(imgURL)
});

// downloading qr code
downloadBtn.addEventListener("click", () => {
    if(!imgURL) return;
    fetchImage(imgURL)
})

function fetchImage(url){
    fetch(url).then(res => res.blob()).then(file =>{
        let tempfile = URL.createObjectURL(file);
        let file_name = url.split("/").pop().split(".")[0];
        let extension = file.type.split("/")[1];
        download(tempfile, file_name, extension);
    })
    .catch(() => imgURL = '');
}

function download(tempfile, file_name, extension){
    let a = document.createElement('a');
    a.href = tempfile;
    a.download = `${file_name}.${extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

// if value is empty remove active class'
qrInput.addEventListener("input", () => {
    if(!qrInput.value.trim())
        return generatorDiv.classList.remove("active");
})


