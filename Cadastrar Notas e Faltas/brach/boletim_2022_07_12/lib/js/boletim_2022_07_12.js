function abrirBoletim() {
    $("#boletimModal").modal("show");
}
abrirBoletim();

function modalMsgNotaMaxima() {
    $("#modal-msg-nota-maxima").modal("show");

    // setTimeout(function () {
    //     $('#modal-msg-nota-maxima').modal('hide');
    // }, 2000);
}

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
    document.querySelectorAll(".historico-disciplina").forEach(x => {
        x.querySelectorAll("td")[1].classList.add("borda-tipo-1");
        x.querySelectorAll("td")[2].classList.add("borda-tipo-2");
        x.querySelectorAll("td")[3].classList.add("borda-tipo-3");
        x.querySelectorAll("td")[4].classList.add("borda-tipo-2");
        x.querySelectorAll("td")[5].classList.add("borda-tipo-3");
        x.querySelectorAll("td")[6].classList.add("borda-tipo-3");
    });

    document.querySelectorAll(".historico-geral-superior").forEach(x => {
        x.querySelectorAll("td")[0].classList.add("borda-tipo-5");
        x.querySelectorAll("td")[1].classList.add("borda-tipo-7");
        x.querySelectorAll("td")[2].classList.add("borda-tipo-7");
        x.querySelectorAll("td")[3].classList.add("borda-tipo-6");
    });

    document.querySelectorAll(".historico-geral-lateral").forEach(x => {
        x.querySelectorAll("td")[0].classList.add("borda-tipo-4");
        x.querySelectorAll("td")[1].classList.add("borda-tipo-4");
        x.querySelectorAll("td")[2].classList.add("borda-tipo-4");
        x.querySelectorAll("td")[3].classList.add("borda-tipo-4");
        x.querySelectorAll("td")[4].classList.add("borda-tipo-4");
        x.querySelectorAll("td")[5].classList.add("borda-tipo-4");
        x.querySelectorAll("td")[6].classList.add("borda-tipo-2");
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

    if (campo.value == "")
        return false;

    const valor = parseFloat(campo.value.replace(",", "."));

    if (valor > 10) {
        campo.value = 10;
        modalMsgNotaMaxima();
    }
    if (valor >= 6)
        campo.style.color = "blue";
    else
        campo.style.color = "red";
}

function limitarCampoDasFaltas(campo) {
    console.log("entrada" + campo.value);

    const expressao = new RegExp("[^0-9]", "g");

    campo.value = campo.value.replace(expressao, "");

    if (campo.value == "")
        return false;

    console.log("saída" + valor);
}

function verificarValorInput(valorInput) {
    let linha = valorInput.closest("tr"); // Retorna para a linha

    // Retorna a coleção de células
    console.log(linha.cells);

    //alert(linha.cells[1].value + ", " + linha.cells[2].value + ", " + linha.cells[7].value)
}

function calcularResultadoFinal() {

    //Media L. Portuguesa
    let nota1 = document.querySelectorAll(".nota-pt")[0].value;
    let nota2 = document.querySelectorAll(".nota-pt")[1].value;
    let nota3 = document.querySelectorAll(".nota-pt")[2].value;
    let nota4 = document.querySelectorAll(".nota-pt")[3].value;

    let mediaPortugues = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) + parseFloat(nota4)) / 4;

    //console.log("media português = " + mediaPortugues);

    //Soma das Faltas
    let falta1 = document.querySelectorAll(".falta-pt")[0].value;
    let falta2 = document.querySelectorAll(".falta-pt")[1].value;
    let falta3 = document.querySelectorAll(".falta-pt")[2].value;

    let somaDasFaltas = parseInt(falta1) + parseInt(falta2) + parseInt(falta3);

    function exibirResultadoFinal() {
        const msg = document.querySelector(".msg-resultado-final")

        if (mediaPortugues >= 6 && somaDasFaltas <= 100) {
            msg.innerHTML = '<span class="nota-azul"><span>APROVADO';
        } else {
            msg.innerHTML = '<span class="nota-vermelha"><span>REPROVADO';
        }
    }
    exibirResultadoFinal();
}