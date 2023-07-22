(function () {
    "use strict";

    const animateStepProgressBar = () => {
        const 
            steps = document.querySelectorAll("#desktop-step-progress-bar ol li"),
            desktopProgressBar = document.querySelector("#progress-bar"),
            btnPrevious = document.querySelector("#progress-buttons #btn-previous"),
            btnNext = document.querySelector("#progress-buttons #btn-next");

        let currentContentNumber = 1,
            currentRotationValue = 0,
            nextRotationValue = 100/(steps.length),
            desktopProgressBarValue = parseInt(desktopProgressBar.style.width.replace("%", ""));

        updateMobileProgressBar(currentContentNumber, currentRotationValue, nextRotationValue); //adds the initial values
 
        btnNext.addEventListener("click", () => {
            const 
                currentStep = [...steps].filter(step => step.classList.contains("checking"))[0],
                nextStep = currentStep.nextElementSibling;

            btnPrevious.disabled = false; //anable the previous button
            if (nextStep == steps[steps.length - 1]) btnNext.disabled = true; //disable the next button

            desktopProgressBar.style.width = `${desktopProgressBarValue += 100/(steps.length - 1)}%`; // modifies the width value

            // modifies the steps properts
            currentStep.classList.remove("checking");
            currentStep.classList.add("checked");

            nextStep.classList.remove("unchecked");
            nextStep.classList.add("checking");

            updateMobileProgressBar(currentContentNumber += 1, 
                                    currentRotationValue = nextRotationValue, 
                                    nextRotationValue += 100/(steps.length));
        });
 
        btnPrevious.addEventListener("click", () => {
            const 
                currentStep = [...steps].filter(step => step.classList.contains("checking"))[0],
                previousStep = currentStep.previousElementSibling;

            btnNext.disabled = false; //anable the next button
            if (previousStep == steps[0]) btnPrevious.disabled = true; //disable the previous button

            // modifies the width value
            desktopProgressBarValue -= 100/(steps.length - 1);
            if(desktopProgressBarValue < 0) desktopProgressBarValue = 0;
            desktopProgressBar.style.width = `${desktopProgressBarValue}%`;

            // modifies the steps properts
            currentStep.classList.remove("checking");
            currentStep.classList.add("unchecked");

            previousStep.classList.remove("checked");
            previousStep.classList.add("checking");

            updateMobileProgressBar(currentContentNumber -= 1, 
                                    currentRotationValue = nextRotationValue, 
                                    nextRotationValue -= 100/(steps.length)); 
        });
    } 
    animateStepProgressBar();

    function updateMobileProgressBar(currentContentNumber, currentRotationValue, nextRotationValue) {
        // #region Updates the values
        const 
            steps = document.querySelectorAll("#desktop-step-progress-bar ol li"),
            nextStepContent = document.querySelector("#next-step-content"),
            radialProgressBar = document.querySelector("#radial-progress-bar"),
            fullMask = document.querySelector("#full-mask"),
            full = document.querySelector("#full"),
            half = document.querySelector("#half");

        document.querySelector("#current-content-number").innerHTML = currentContentNumber;
        document.querySelector("#number-of-contents").innerHTML = `&nbspof ${steps.length}`;
        document.querySelector("#current-step-content").innerHTML = steps[currentContentNumber - 1].innerText;

        if (steps[currentContentNumber] != undefined) {
            nextStepContent.style = "";
            nextStepContent.innerHTML = `Next: ${steps[currentContentNumber].innerText}`;
        } 
        else nextStepContent.style = "display:none";
        // #endregion

        // #region adds the animations

        //modifies of percentage to degrees
        currentRotationValue = (180/100)*currentRotationValue,
        nextRotationValue = (180/100)*nextRotationValue;

        radialProgressBar.style.setProperty('--current-rotation-value', `${currentRotationValue}deg`);
        radialProgressBar.style.setProperty('--next-rotation-value', `${nextRotationValue}deg`);

        if (!fullMask.classList.contains("update-radial-progress-bar-1")) {
            fullMask.classList.remove("update-radial-progress-bar-2");
            full.classList.remove("update-radial-progress-bar-2");
            half.classList.remove("update-radial-progress-bar-2");

            fullMask.classList.add("update-radial-progress-bar-1");
            full.classList.add("update-radial-progress-bar-1");
            half.classList.add("update-radial-progress-bar-1");
        } 
        else {
            fullMask.classList.remove("update-radial-progress-bar-1");
            full.classList.remove("update-radial-progress-bar-1");
            half.classList.remove("update-radial-progress-bar-1");

            fullMask.classList.add("update-radial-progress-bar-2");
            full.classList.add("update-radial-progress-bar-2");
            half.classList.add("update-radial-progress-bar-2");
        }
        // #endregion
    };
})();
// #endregion