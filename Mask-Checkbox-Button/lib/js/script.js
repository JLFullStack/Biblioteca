function mudarStatusDaCheckbox() {
    const btn = document.querySelectorAll(".btn-masked-checkbox");

    btn.forEach(btn => {
        //verifica o status ao clicar na label 
        btn.addEventListener("click", () => {
            if (btn.children[0].checked == true) {
                console.log("ativo");
            } else console.log("inativo");
        });

        //verifica o status ao clicar no primeiro span e muda seu status atual
        btn.children[1].addEventListener("click", () => {
            if (btn.children[0].checked == false) btn.children[0].checked = true;
        });

        //verifica o status ao clicar no segundo span e muda seu status atual
        btn.children[2].addEventListener("click", () => {
            if (btn.children[0].checked == true) btn.children[0].checked = false;
        });
    });    
} mudarStatusDaCheckbox();