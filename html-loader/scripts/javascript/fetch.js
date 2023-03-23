const renderPartial = (id) => {
    fetch(`../../view/partial-${id}.html`)
        .then((response) => {
            if (response.ok) return response.text();
        })
        .then((text) => {
            document.querySelector("div").innerHTML = text;
        });
};