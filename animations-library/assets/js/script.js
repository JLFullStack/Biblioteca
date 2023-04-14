function dialogManipulation(id, effect) {
    const
        body = document.querySelector("body"),
        dialog = document.querySelector("#" + id),
        closeDialog = document.querySelectorAll("button.close-dialog");

    //tratamento para o efeito de escala
    if (effect === "slide-up-scale") {
        //adiciona o efeito de escala na body
        body.classList.add("decrease-scale");

        //adiciona o efeito slide-up-and-scale
        dialog.classList.add(effect);

        //abre a tag
        dialog.showModal();

        //fecha a tag e remove os efeitos
        closeDialog.forEach(button => {
            button.onclick = function () {
                dialog.setAttribute("closing", "");

                setTimeout(function () {
                    body.classList.remove("decrease-scale");
                    body.classList.add("increase-scale");
                }, 200);

                setTimeout(function () {
                    dialog.classList.remove(effect);
                    dialog.removeAttribute("closing");
                    body.classList.remove("increase-scale");
                    dialog.close();
                }, 700);
            }
        });
    }

    //tratamento para o efeito de zoom e explosão I
    else if (effect === "zoom-explosion") {
        //adiciona o efeito de explosão na body
        body.classList.add("increase-explosion");

        //adiciona o efeito de zoom na tag
        dialog.classList.add(effect);

        //abre a tag
        dialog.showModal();

        //explode a tag e remove os efeitos
        closeDialog.forEach(button => {
            button.onclick = function () {
                dialog.setAttribute("closing", "");

                setTimeout(function () {
                    body.classList.remove("increase-explosion");
                    body.classList.add("zoom-fade-in");
                }, 100);

                setTimeout(function () {
                    dialog.classList.remove(effect);
                    dialog.removeAttribute("closing");
                    body.classList.remove("zoom-fade-in");
                    dialog.close();
                }, 700);
            }
        });
    }

    //tratamento para o efeito de zoom e explosão II
    else if (effect === "zoom-explosion-decrease") {
        //adiciona o efeito de explosão na body
        body.classList.add("increase-explosion");

        //adiciona o efeito de zoom na tag
        dialog.classList.add(effect);

        //abre a tag
        dialog.showModal();

        //fecha a tag e remove os efeitos
        closeDialog.forEach(button => {
            button.onclick = function () {
                dialog.setAttribute("closing", "");

                setTimeout(function () {
                    body.classList.remove("increase-explosion");
                    body.classList.add("decrease-explosion");
                }, 100);

                setTimeout(function () {
                    dialog.classList.remove(effect);
                    dialog.removeAttribute("closing");
                    body.classList.remove("decrease-explosion");
                    dialog.close();
                }, 700);
            }
        });
    }

    //tratamento para o efeito de sobreposição
    else if (effect === "slide-up-overlap") {
        //adiciona o efeito de escala na body
        body.classList.add("remove-up");

        //adiciona o efeito slide-up-and-scale
        dialog.classList.add(effect);

        //abre a tag
        dialog.showModal();

        //fecha a tag e remove os efeitos
        closeDialog.forEach(button => {
            button.onclick = function () {
                dialog.setAttribute("closing", "");

                setTimeout(function () {
                    body.classList.remove("remove-up");
                    body.classList.add("slide-down-fade"); //mudar para slide down large
                }, 200);

                setTimeout(function () {
                    dialog.classList.remove(effect);
                    dialog.removeAttribute("closing");
                    body.classList.remove("slide-down-fade");
                    dialog.close();
                }, 700);
            }
        });
    } else {
        //adiciona o efeito de transição escolhido
        dialog.classList.add(effect);

        //abre a tag
        dialog.showModal();

        //fecha a tag
        closeDialog.forEach(button => {
            button.onclick = function () {
                dialog.setAttribute("closing", "");

                setTimeout(function () {
                    dialog.classList.remove(effect);
                    dialog.removeAttribute("closing");
                    dialog.close();
                }, 500);
            }
        });
    }
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

function manipulateImage() {
    const
        buttons = document.querySelectorAll(".animation"),
        imgs = document.querySelectorAll(".card-img");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            // #region verify animation class
            if (btn.classList.contains("fades")) classModify("fade");
            if (btn.classList.contains("zoom")) classModify("zoom");
            // #endregion
        });
    });

    async function classModify(className) {
        imgs.forEach(img => {
            if (img.classList.contains(`${className}-in`)) {
                img.classList.add(`${className}-out`);
                img.classList.remove(`${className}-in`);
            }
            else {
                img.classList.add(`${className}-in`);
                img.classList.remove(`${className}-out`);
            };
        });

        await delay(500);

        imgs.forEach(img => img.classList.remove(`${className}-out`));
    };

} manipulateImage();