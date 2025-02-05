function changeFoto() {
    const image = document.getElementById("imgFoto");
    if (!image) return;

    image.addEventListener("mouseenter", () => {
        image.style.transform = "scale(1.1)";
    });
    image.addEventListener("mouseleave", () => {
        image.style.transform = "scale(1)";
    });

    const animateImage = async () => {
        await new Promise(resolve => setTimeout(resolve, 4500));
        
        for (let i = 0; i < 2; i++) {
            image.style.transform = "scale(1.1)";
            await new Promise(resolve => setTimeout(resolve, 300));
            image.style.transform = "scale(1)";
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    };

    animateImage();
}

function changeLogo() {
    const imageLogo = document.getElementById("imgLogo");
    if (!imageLogo) return;

    imageLogo.addEventListener("mouseenter", () => {
        imageLogo.style.transform = "scale(1.1)";
    });
    imageLogo.addEventListener("mouseleave", () => {
        imageLogo.style.transform = "scale(1)";
    });

    const animateLogo = async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        for (let i = 0; i < 2; i++) {
            imageLogo.style.transform = "scale(1.1)";
            await new Promise(resolve => setTimeout(resolve, 300));
            imageLogo.style.transform = "scale(1)";
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    };

    animateLogo();
}


document.addEventListener("DOMContentLoaded", function () {
    if (typeof changeFoto === 'function') {
        changeFoto();
    }
    
    if (typeof changeLogo === 'function') {
        changeLogo(); 
    }

    if (typeof AOS !== 'undefined' && typeof AOS.init === 'function') {
        AOS.init();
    }
    console.log("ola");

    const message = document.getElementById("message");
    if (message) {
        setTimeout(function () {
            message.classList.add("msg-hidden");
        }, 1500);

        setTimeout(function () {
            message.remove();
        }, 3000);
    }
});
