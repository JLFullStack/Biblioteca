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
            vlMobileProgressBar = 100/(steps.length),
            vlDesktopProgressBar = parseInt(desktopProgressBar.style.width.replace("%", ""));

        updateMobileProgressBar(nrCurrentContent, steps.length, vlMobileProgressBar); //adds the initial values of the mobile progress bar

        // #region Next button click event  
        btnNext.addEventListener("click", () => {
            const 
                filteredStep = [...steps].filter(step => step.classList.contains("checking")),
                currentStep = filteredStep[0],
                nextStep = filteredStep[0].nextElementSibling;

            if (currentStep == steps[0]) btnPrevious.disabled = false; //anable previous button
            if (nextStep == steps[steps.length - 1]) btnNext.disabled = true; //disable next button

            desktopProgressBar.style.width = `${vlDesktopProgressBar += 100/(steps.length - 1)}%`; // modifies the desktop progress bar value

            updateMobileProgressBar(nrCurrentContent += 1, steps.length, vlMobileProgressBar += 100/(steps.length)); // modifies the mobile progress bar value

            if(nextStep != null ) {
                // modifies the step in checking
                currentStep.classList.remove("checking");
                currentStep.classList.add("checked");
                nextStep.classList.add("checking");

                // modifies background color and animates progress bar icons
                async function animateIcons () {
                    currentStep.firstElementChild.classList.remove("bg-warning");
                    currentStep.firstElementChild.classList.add("bg-success");
                    currentStep.firstElementChild.classList.add("decrease-scale");
                    currentStep.firstElementChild.classList.remove("increase-scale");

                    await delay(350);
                    nextStep.firstElementChild.classList.remove("bg-secondary");
                    nextStep.firstElementChild.classList.add("bg-warning");
                    nextStep.firstElementChild.classList.add("increase-scale");

                    await delay(100);
                    currentStep.firstElementChild.classList.remove("decrease-scale");
                } animateIcons();
            };
        });
        // #endregion

        // #region Previous button click event 
        btnPrevious.addEventListener("click", () => {
            const 
                filteredStep = [...steps].filter(step => step.classList.contains("checking")),
                currentStep = filteredStep[0],
                previousStep = filteredStep[0].previousElementSibling;

            if (currentStep == steps[steps.length - 1]) btnNext.disabled = false; //anable next button
            if (previousStep == steps[0]) btnPrevious.disabled = true; //disable previous button

            // modifies the desktop progress bar value
            vlDesktopProgressBar -= 100/(steps.length - 1);
            if(vlDesktopProgressBar < 0) vlDesktopProgressBar = 0;
            desktopProgressBar.style.width = `${vlDesktopProgressBar}%`;

            updateMobileProgressBar(nrCurrentContent -= 1, steps.length, vlMobileProgressBar -= 100/(steps.length)); // modifies the mobile progress bar value

            if(previousStep != null ) {
                //modifies the step in checking
                currentStep.classList.remove("checking");
                previousStep.classList.remove("checked");
                previousStep.classList.add("checking");

                // modifies background color and animates progress bar icons
                async function animateIcons () {
                    currentStep.firstElementChild.classList.remove("bg-warning");
                    currentStep.firstElementChild.classList.add("bg-secondary");
                    currentStep.firstElementChild.classList.add("decrease-scale");
                    currentStep.firstElementChild.classList.remove("increase-scale");

                    await delay(350);
                    previousStep.firstElementChild.classList.remove("bg-success");
                    previousStep.firstElementChild.classList.add("bg-warning");
                    previousStep.firstElementChild.classList.add("increase-scale");

                    await delay(100);
                    currentStep.firstElementChild.classList.remove("decrease-scale");
                } animateIcons();
            };
        });
        // #endregion
    } 
    animateProgressBar();

    function updateMobileProgressBar(nrCurrentContent, nrContents, vlMobileProgressBar) {
        const 
            steps = document.querySelectorAll("#desktop-step-progress-bar ol li"),
            contentNextStep = document.querySelector("#content-next-step"),
            radialGradient = "radial-gradient(closest-side, white 80%, transparent 85% 100%)",
            conicGradient = `conic-gradient(rgb(49, 133, 0) ${vlMobileProgressBar}%, rgb(236, 236, 236) 0)`;

        document.querySelector("#nrCurrentContent").innerHTML = nrCurrentContent; // updates the current content number
        document.querySelector("#nrContents").innerHTML = ` of ${nrContents}`; // updates the number of contents
        document.querySelector("#content-current-step").innerHTML = steps[nrCurrentContent - 1].innerText; // updates the current step

        if (steps[nrCurrentContent] != undefined) {
            contentNextStep.style = "";
            contentNextStep.innerHTML = `Next: ${steps[nrCurrentContent].innerText}`; // updates the next content
        } else contentNextStep.style = "display:none";

        document.querySelector("#radialProgressBar").style.setProperty('--progress', `${(180/100)*vlMobileProgressBar}deg`);
    };
})();
// #endregion