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

async function animateTag(Tag_id, open_animation, close_animation) {
    const
        btn_group = document.querySelector("#button-group"),
        card = document.querySelector(`#${Tag_id}`);

    if (!(card == null)) {
        const btn_close = card.querySelectorAll(".btn-close");

        document.addEventListener("keydown", (event) => event.code === "Escape" ? closeCard() : null);

        btn_close.forEach(btn => btn.addEventListener("click", () => closeCard()));

        card.classList.contains(open_animation) ? closeCard() : openCard();

        function openCard() {
            card.style = ("display:flex");

            card.classList.add(open_animation);
            card.classList.remove(close_animation);

            card.parentElement.classList.add("modify-parent-in");
            card.parentElement.classList.remove("modify-parent-out");

            if (open_animation === "slide-up-scale"
                || open_animation === "slide-down-scale"
                || open_animation === "slide-lefht-scale"
                || open_animation === "slide-right-scale") btn_group.classList.add("decrease-scale");
        };

        async function closeCard() {
            card.classList.add(close_animation);
            card.classList.remove(open_animation);

            card.parentElement.classList.add("modify-parent-out");
            card.parentElement.classList.remove("modify-parent-in");

            if (btn_group.classList.contains("decrease-scale"))
                btn_group.classList.add("increase-scale"), btn_group.classList.remove("decrease-scale");

            await delay(300);
            card.style = ("");
            card.classList.remove(close_animation);
            btn_group.classList.remove("increase-scale");

            await delay(500);
            card.parentElement.classList.remove("modify-parent-out");
        };


        // #region first version

        // if (!card.classList.contains(open_animation)) {
        //     card.classList.add(open_animation);
        //     card.classList.remove(close_animation);

        //     card.parentElement.classList.add("modify-parent-in");
        //     card.parentElement.classList.remove("modify-parent-out");

        //     if (open_animation === "slide-up-scale"
        //         || open_animation === "slide-down-scale"
        //         || open_animation === "slide-lefht-scale"
        //         || open_animation === "slide-right-scale") btn_group.classList.add("decrease-scale");
        // };

        // async function closeCard() {
        //     if (card.classList.contains(open_animation)) {
        //         card.classList.add(close_animation);
        //         card.classList.remove(open_animation);

        //         card.parentElement.classList.add("modify-parent-out");
        //         card.parentElement.classList.remove("modify-parent-in");

        //         if (btn_group.classList.contains("decrease-scale"))
        //             btn_group.classList.add("increase-scale"), btn_group.classList.remove("decrease-scale");

        //         await delay(500);
        //         card.style = ("");
        //         card.classList.remove(close_animation);
        //         btn_group.classList.remove("increase-scale");
        //         card.parentElement.classList.remove("modify-parent-out");
        //     };
        // };

        // #endregion
    };
} animateTag();
