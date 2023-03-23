const
    body = document.body,
    header = document.querySelector("header"),
    footer = document.querySelector("footer"),
    input = document.querySelector("input"),
    ico_search = document.querySelector(".ico-search"),
    ico_theme = document.querySelector(".ico-theme"),
    ico_user = document.querySelectorAll(".ico-user");

const setdarkmode = () => {
    body.classList.add("dark-1");
    header.classList.add("dark-2");
    footer.classList.add("dark-2");
    input.classList.add("dark");
    ico_search.classList.add("dark");
    ico_theme.classList.add("dark");
    ico_user.forEach(ico => ico.classList.add("dark"));
}

const setlightmode = () => {
    body.classList.remove("dark-1");
    header.classList.remove("dark-2");
    footer.classList.remove("dark-2");
    input.classList.remove("dark");
    ico_search.classList.remove("dark");
    ico_theme.classList.remove("dark");
    ico_user.forEach(ico => ico.classList.remove("dark"));
}

ico_theme.addEventListener("click", () => {
    if (!body.classList.contains("dark-1")) setdarkmode();
    else setlightmode();
});