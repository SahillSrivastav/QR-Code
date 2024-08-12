const scannerDiv = document.querySelector(".scanner");

const camera = scannerDiv.querySelector("h1 .fa-camera");
const stopCam = scannerDiv.querySelector("h1 .fa-circle-stop");

const form = scannerDiv.querySelector(".scanner-form");
const fileInput = form.querySelector("input");
const p = form.querySelector("p");
const img = form.querySelector("img");
const video = form.querySelector("video");
const content = form.querySelector(".content");

const textarea = scannerDiv.querySelector(".scanner-details textarea");
const copyBtn = scannerDiv.querySelector(".scanner-details .copy");
const closeBtn = scannerDiv.querySelector(".scanner-details .close");

//Input file
form.addEventListener("click", () => fileInput.click());

//scan QR Code
fileInput.addEventListener("change", e =>{
    let file = e.target.files[0];
    if(!file) return;
    fetchRequest(file);
})

// function fetchRequest(file){
//     let formData = new FormData();
//     formData.append("file", file);
    
//     p.innerText = "Scanning QR Code...";
//     fetch(`http://api.qrserver.com/v1/read-qr-code/`,{
//         method: "POST", body: formData
//     }).then(res => res.json()).then(result => {
//         let text = result[0].symbol[0].data; 

//         if(!text)
//             return p.innerText = "Could not Scan QR Code"
//         console.log(text)
//         scannerDiv.classList.add("active");
//         form.classList.add("active-img");
        
//     })
// }

function fetchRequest(file){
    let formData = new FormData();
    formData.append("file", file);
    
    p.innerText = "Scanning QR Code...";
    fetch(`http://api.qrserver.com/v1/read-qr-code/`,{
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        let text = result[0].symbol[0].data; 

        if(!text) {
            p.innerText = "Could not Scan QR Code";
            return;
        }

        console.log(text);  // For debugging purposes
        scannerDiv.classList.add("active");
        form.classList.add("active-img");

        img.src = URL.createObjectURL(file);
        textarea.innerText = text;
    }).catch(error => {
        p.innerText = "An error occurred while scanning the QR Code.";
        console.error(error);
    });
}

// scan QR Code Camera
let scanner;

camera.addEventListener("click", () => {
    camera.style.display = "none";
    form.classList.add("pointerEvents");
    p.innerText = "Scanning QR Code...";

    scanner = new Instascan.Scanner({video: video});

    Instascan.Camera.getCameras()
    .then(cameras => {
        if(cameras.length > 0){
            scanner.start(cameras[0]).then(() => {
                form.classList.add("active-video");
                stopCam.style.display = "inline-block";
            })
        }else{
            console.log("No Cameras found");
        }
    })
    .catch(err => console.error(err))
    
    scanner.addListener("scan", c => {
        scannerDiv.classList.add("active");
        textarea.innerText = c;
    })
})

// copy btn
copyBtn.addEventListener("click", () => {
    let text = textarea.textContent;
    navigator.clipboard.writeText(text);
})

// close btn
closeBtn.addEventListener("click", () => stopScan());
stopCam.addEventListener("click", () => stopScan());

//stop scan
function stopScan(){
    p.innerText = "Upload QR Code to Scan"; 

    camera.style.display = "inline-block";
    stopCam.style.display = "none";

    form.classList.remove("active-video", "active-img" , "pointerEvents");
    scannerDiv.classList.remove("active");
    form.classList.remove("active-img");

    if(scanner) scanner.stop();

}