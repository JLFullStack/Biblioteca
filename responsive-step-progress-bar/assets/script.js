(function () {
    "use strict";

    // add a delay at specified local code
    function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

    const animateProgressBar = () => {
        const 
            steps = document.querySelectorAll("#desktop-step-progress-bar ol li"),
            desktopProgressBar = document.querySelector("#progress-bar"),
            btnPrevious = document.querySelector("#progress-buttons #btn-previous"),
            btnNext = document.querySelector("#progress-buttons #btn-next");

        let nrCurrentContent = 1,
            currentValueRotation = 0,
            nextValueRotation = 100/(steps.length),
            vlDesktopProgressBar = parseInt(desktopProgressBar.style.width.replace("%", ""));

        updateMobileProgressBar(nrCurrentContent, steps.length, currentValueRotation, nextValueRotation); //adds the initial values of the mobile progress bar

        // #region Next button click event  
        btnNext.addEventListener("click", async () => {
            const 
                filteredStep = [...steps].filter(step => step.classList.contains("checking")),
                currentStep = filteredStep[0];
            
            let nextStep;

            try {
                nextStep = filteredStep[0].nextElementSibling;
            } catch (error) {
                return;
            }

            if (!currentStep.classList.contains("checking")) return;

            if (currentStep == steps[0]) btnPrevious.disabled = false; //anable previous button
            if (nextStep == steps[steps.length - 1]) btnNext.disabled = true; //disable next button

            desktopProgressBar.style.width = `${vlDesktopProgressBar += 100/(steps.length - 1)}%`; // modifies the desktop progress bar value

            updateMobileProgressBar(nrCurrentContent += 1, steps.length, currentValueRotation = nextValueRotation, nextValueRotation += 100/(steps.length)); // modifies the mobile progress bar value

            if(nextStep != null ) {
                // modifies background color and animates progress bar icons
                currentStep.firstElementChild.classList.remove("bg-warning");
                currentStep.firstElementChild.classList.add("bg-success");
                currentStep.firstElementChild.classList.add("decrease-scale");
                currentStep.firstElementChild.classList.remove("increase-scale");

                // modifies the step in checking
                currentStep.classList.remove("checking");

                await delay(250);
                currentStep.classList.add("checked");
                nextStep.classList.add("checking");

                nextStep.firstElementChild.classList.remove("bg-secondary");
                nextStep.firstElementChild.classList.add("bg-warning");
                nextStep.firstElementChild.classList.add("increase-scale");

                await delay(100);
                currentStep.firstElementChild.classList.remove("decrease-scale");
            };
        });
        // #endregion

        // #region Previous button click event 
        btnPrevious.addEventListener("click", async () => {
            const 
                filteredStep = [...steps].filter(step => step.classList.contains("checking")),
                currentStep = filteredStep[0];

            let previousStep;

            try {
                previousStep = filteredStep[0].previousElementSibling;
            } catch (error) {
                return;
            }

            if (!currentStep.classList.contains("checking")) return;

            if (currentStep == steps[steps.length - 1]) btnNext.disabled = false; //anable next button
            if (previousStep == steps[0]) btnPrevious.disabled = true; //disable previous button

            // modifies the desktop progress bar value
            vlDesktopProgressBar -= 100/(steps.length - 1);
            if(vlDesktopProgressBar < 0) vlDesktopProgressBar = 0;
            desktopProgressBar.style.width = `${vlDesktopProgressBar}%`;

            updateMobileProgressBar(nrCurrentContent -= 1, steps.length, currentValueRotation = nextValueRotation, nextValueRotation -= 100/(steps.length)); // modifies the mobile progress bar value

            if(previousStep != null ) {
                // modifies background color and animates progress bar icons
                currentStep.firstElementChild.classList.remove("bg-warning");
                currentStep.firstElementChild.classList.add("bg-secondary");
                currentStep.firstElementChild.classList.add("decrease-scale");
                currentStep.firstElementChild.classList.remove("increase-scale");

                //modifies the step in checking
                currentStep.classList.remove("checking");

                await delay(250);
                previousStep.classList.remove("checked");
                previousStep.classList.add("checking");

                previousStep.firstElementChild.classList.remove("bg-success");
                previousStep.firstElementChild.classList.add("bg-warning");
                previousStep.firstElementChild.classList.add("increase-scale");

                await delay(100);
                currentStep.firstElementChild.classList.remove("decrease-scale");
            };
        });
        // #endregion
    } 
    animateProgressBar();

    async function updateMobileProgressBar(nrCurrentContent, nrContents, currentValueRotation, nextValueRotation) {
        // #region Updates the values
        const 
            steps = document.querySelectorAll("#desktop-step-progress-bar ol li"),
            contentNextStep = document.querySelector("#content-next-step"),
            radialProgressBar = document.querySelector("#radialProgressBar"),
            mask1 = document.querySelector("#mask-1"),
            fulls = document.querySelectorAll(".full");

        document.querySelector("#nrCurrentContent").innerHTML = nrCurrentContent; // updates the current content number
        document.querySelector("#nrContents").innerHTML = `&nbspof ${nrContents}`; // updates the number of contents
        document.querySelector("#content-current-step").innerHTML = steps[nrCurrentContent - 1].innerText; // updates the current step

        if (steps[nrCurrentContent] != undefined) {
            contentNextStep.style = "";
            contentNextStep.innerHTML = `Next: ${steps[nrCurrentContent].innerText}`; // updates the next content
        } 
        else contentNextStep.style = "display:none";
        // #endregion

        // #region adds the animations
        let 
            currentValue = (180/100)*currentValueRotation,
            nextValue = (180/100)*nextValueRotation;

        radialProgressBar.style.setProperty('--current-value', `${currentValue}deg`);
        radialProgressBar.style.setProperty('--next-value', `${nextValue}deg`);

        mask1.classList.add("update-radial-progress-bar");
        fulls.forEach(full => full.classList.add("update-radial-progress-bar"));

        await delay(500);
        mask1.classList.remove("update-radial-progress-bar");
        fulls.forEach(full => full.classList.remove("update-radial-progress-bar"));
        // #endregion
    };
})();
// #endregion