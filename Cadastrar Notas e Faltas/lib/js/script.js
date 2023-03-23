function abrirBoletim() {
    $("#boletimModal").modal("show");
}
abrirBoletim();

/*adicionarTdTabelaBoletim
function adicionarTdTabelaBoletim() {
    const
        ensino = "fundamental 1",
        anoTurmaDoAluno = "1°A",
        quantMaterias = 2,
        trPortugues = document.querySelector("#portugues"),
        trMatematica = document.querySelector("#matematica");

    if (ensino === "fundamental 1") {

        //tentar colocar as td dentro deste for 
        for (let i = 0; i < quantMaterias; i++){}

        //Cria td de Português
        for (let i = 0; i < 8; i++) {
            let td = document.createElement('td');

            if (i == 0) {
                td.className = "titulo";
                td.innerText = "L. Portuguesa";
                trPortugues.appendChild(td);
            }
            if (i == 1 || i == 3 || i == 5 || i == 6) {
                td.className = "valor";
                td.innerHTML = '<input class="form-control" type="number">';
                trPortugues.appendChild(td);
            }
            if (i == 2 || i == 4 || i == 7) {
                td.className = "falta";
                td.innerHTML = '<input class="form-control" type="number">';
                trPortugues.appendChild(td);
            }
        }

        //Cria td de Matemática
        for (let i = 0; i < 8; i++) {
            let td = document.createElement('td');

            if (i == 0) {
                td.className = "titulo";
                td.innerText = "Matemática";
                trMatematica.appendChild(td);
            }
            if (i == 1 || i == 3 || i == 5 || i == 6) {
                td.className = "valor";
                td.innerHTML = '<input class="form-control" type="number">';
                trMatematica.appendChild(td);
            }
            if (i == 2 || i == 4 || i == 7) {
                td.className = "falta";
                td.innerHTML = '<input class="form-control" type="number">';
                trMatematica.appendChild(td);
            }
        }
    }
}
adicionarTdTabelaBoletim();
*/

function aplicarEstiloGridBoletim() {
    document.querySelectorAll(".historico-geral-superior").forEach(x => {
        x.querySelectorAll("td")[0].classList.add("borda-tipo-3");
        x.querySelectorAll("td")[1].classList.add("borda-tipo-5");
        x.querySelectorAll("td")[2].classList.add("borda-tipo-5");
        x.querySelectorAll("td")[3].classList.add("borda-tipo-4");
    });

    document.querySelectorAll(".historico-geral-lateral").forEach(x => {
        x.querySelectorAll("td")[0].classList.add("borda-tipo-2");
        x.querySelectorAll("td")[1].classList.add("borda-tipo-2");
        x.querySelectorAll("td")[2].classList.add("borda-tipo-2");
    });

    document.querySelectorAll(".historico-disciplina").forEach(x => {
        x.querySelectorAll("td")[1].classList.add("borda-tipo-1");
        x.querySelectorAll("td")[2].classList.add("borda-tipo-1");
        x.querySelectorAll("td")[3].classList.add("borda-tipo-1");
    });
}
aplicarEstiloGridBoletim();

function destacarValorNotaDisciplina() {

    const mediaDasNotasParaAprovacao = 6;

    document.querySelectorAll(".valor").forEach(x => {
        if (parseInt(x.textContent) < mediaDasNotasParaAprovacao) x.classList.add("nota-vermelha");
        if (parseInt(x.textContent) >= mediaDasNotasParaAprovacao) x.classList.add("nota-azul");
    })
}
destacarValorNotaDisciplina();

function limitarCampoDasNotas(campo) {
    campo.value = campo.value.replace(new RegExp("[^0-9,]", "g"), "");

    if (campo.value == "") return false;

    const valor = parseFloat(campo.value.replace(",", "."));

    if (valor > 10) {
        campo.value = 10;
        ModalMsgNotaMaxima();
        //alert("O valor máximo de uma nota é dez (10)");
    }

    if (valor >= 6) campo.style.color="blue";
    else campo.style.color="red";;
}

function exibirResultadoFinal(mediaPortugues) {
    const msg = document.querySelector(".msg-resultado-final")

    if (mediaPortugues >= 6) {
        msg.innerHTML = '<span class="nota-azul"><span>APROVADO';
    } else {
        msg.innerHTML = '<span class="nota-vermelha"><span>REPROVADO';
    }
}

function cadastrarNotas() {

    //Media L. Portuguesa
    let nota1 = document.querySelectorAll(".nota-pt")[0].value;
    let nota2 = document.querySelectorAll(".nota-pt")[1].value;
    let nota3 = document.querySelectorAll(".nota-pt")[2].value;
    let nota4 = document.querySelectorAll(".nota-pt")[3].value;

    let mediaPortugues = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) + parseFloat(nota4)) / 4;

    exibirResultadoFinal(mediaPortugues);
}