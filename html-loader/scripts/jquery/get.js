const renderPartial = (id) => {
    $.get(`../../view/partial-${id}.html`, function (data) {
        $("div").html(data);
    });
};