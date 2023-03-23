function aplicarEstiloGridBoletim() {
    document.querySelectorAll(".historico-disciplina").forEach(x => {
        x.querySelectorAll("td")[1].classList.add("borda-tipo-1");
        x.querySelectorAll("td")[2].classList.add("borda-tipo-2");
        x.querySelectorAll("td")[3].classList.add("borda-tipo-3");
        x.querySelectorAll("td")[4].classList.add("borda-tipo-2");
        x.querySelectorAll("td")[5].classList.add("borda-tipo-3");
        x.querySelectorAll("td")[6].classList.add("borda-tipo-3");
    });
}
aplicarEstiloGridBoletim();

function destacarValorNotaDisciplina() {
    const mediaDasNotas = 6;

    document.querySelectorAll(".valor").forEach(x => {
        if (parseInt(x.textContent) < mediaDasNotas) x.classList.add("nota-vermelha");
        if (parseInt(x.textContent) >= mediaDasNotas) x.classList.add("nota-azul");
    });
}
destacarValorNotaDisciplina();