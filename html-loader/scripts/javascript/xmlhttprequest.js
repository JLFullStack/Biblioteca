const renderPartial = (id) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (e) => {
        let xhr = e.target;

        if (xhr.readyState === 4)
            if (xhr.status === 200) document.querySelector("div").innerHTML = xhr.responseText;
    };

    xhr.open("GET", `../../view/partial-${id}.html`, true);
    xhr.send();
};