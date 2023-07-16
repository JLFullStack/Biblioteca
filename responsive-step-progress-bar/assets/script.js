(function () {
    "use strict";

    function animateProgressBar(){
        const 
            progressbar = document.querySelector("#progress-bar"),
            btnPrevious = document.querySelector("#progress-buttons #btn-previous"),
            btnNext = document.querySelector("#progress-buttons #btn-next");

        let progressValue = progressbar.style.width.replace("%", "");
        progressValue = parseInt(progressValue);

        btnPrevious.addEventListener("click", () => {
            if (progressValue > 0) {
                progressValue -= 33.33;
                progressbar.style.width = `${progressValue}%`;
            };
        });

        btnNext.addEventListener("click", () => {
            if (progressValue < 99) {
                progressValue += 33.33;
                progressbar.style.width = `${progressValue}%`;
            };
        });
    } 
    animateProgressBar();
})();
// #endregion