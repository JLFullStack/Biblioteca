function dialogManipulation(id, effect) {
    const
        dialog = document.querySelector("#"+id),
        closeDialog = document.querySelectorAll("button.close-dialog");

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