(() => {
    const iniciarDataTable = () => {
        let tbLote = new DataTable('#lote', {
            responsive: true,
            order: [[1, 'desc']],

            language: {
                lengthMenu: "Visualizar&nbsp _MENU_ &nbsppor página",
                search: "Pesquisar&nbsp;:",
                info: "total: _MAX_ lote(s)",
                infoEmpty: "Nenhum lote encontrado!",
                infoFiltered: "/ total da pesquisa: _TOTAL_ lote(s) encontrado(s)",
                zeroRecords: "Nenhum lote encontrado!",
                emptyTable: "Nenhum lote cadastrado!",
                processing: "Em processamento...",
                loadingRecords: "Carregando registros...",
                decimal: ",",
                paginate: {
                    previous: "Anterior",
                    next: "Próximo"
                }
            }
        });
    }
    iniciarDataTable();
})();