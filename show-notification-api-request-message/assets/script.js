(function () {
    "use strict";

    let count = 0;
    let newMessage = "";

    // call fetchData function every 10 seconds
    setInterval(newNotificationApiRequest, 10000); // 10000 milliseconds = 10 seconds

    // add a delay at specified local code
    function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

    async function newNotificationApiRequest() {
        try {
            const
                url = `https://viacep.com.br/ws/${11702760}/json/`,
                request = await fetch(url); //send new api request

            if (request.ok) {
                const response = await request.json(); // desserialize json result

                count++;
                newMessage = response.logradouro;
                notifyNewMessage();

            } else throw new Error(`HTTP error! Status: ${response.status}`);

        } catch (error) {
            console.error('Error fetching API data:', error);
        };
    } newNotificationApiRequest();

    async function notifyNewMessage() {
        const
            bell = document.querySelector("#bell"),
            ntf_Count = document.querySelector("#notifications-count"),
            ntf_Card = document.querySelector("#notification-card"),
            ntf_CardBootstrap = bootstrap.Toast.getOrCreateInstance(ntf_Card);

        // show bell button
        bell.style = "display:block";
        bell.classList.add("zoom-in");
        bell.classList.remove("zoom-out");

        ntf_Count.innerHTML = count;

        // show nofification card
        ntf_CardBootstrap.show();
        ntf_Card.classList.add("slide-left");
        ntf_Card.classList.remove("remove-right");

        bell.addEventListener("click", showMessageViewCard);

        // close notification card after 4 seconds
        await delay(4000);
        closeNotificationCard();
    };

    async function closeNotificationCard() {
        const
            ntf_Card = document.querySelector("#notification-card"),
            ntf_CardBootstrap = bootstrap.Toast.getOrCreateInstance(ntf_Card);

        // reset notification card attributes
        ntf_CardBootstrap.hide();
        ntf_Card.classList.add("remove-right");
        ntf_Card.classList.remove("slide-left");

        // remove notification card class after 200 milliseconds
        await delay(200);
        ntf_Card.classList.remove("remove-right");
    };

    function showMessageViewCard() {
        const
            bell = document.querySelector("#bell"),
            ntf_Count = document.querySelector("#notifications-count"),
            msgViewCard = document.querySelector("#msg-view-card card"),
            btn_close = msgViewCard.querySelectorAll(".btn-close"),
            accordion = msgViewCard.querySelector(".accordion");

        closeNotificationCard();
        closeBellButton();

        async function closeBellButton() {
            bell.classList.remove("zoom-in");
            bell.classList.add("zoom-out");

            // reset bell button attributes after 300 milliseconds
            await delay(300);
            count = 0;
            bell.style = "display:";
            bell.classList.remove("zoom-out");
            ntf_Count.innerHTML = "";
        };

        // open message view card
        msgViewCard.style = "display:block";
        msgViewCard.classList.add("slide-right");
        msgViewCard.classList.remove("remove-right");

        // #region add messages in the accordion
        for (let i = 0; i < count; i++) {
            const div = document.createElement("div");
            let localDateTime = new Date();

            div.classList.add("accordion_item");

            div.innerHTML = `
                        <div class="accordion-header p-3" onclick="manipulateAccordion(this)">Menssagem - ${localDateTime.toLocaleString()}
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-chevron-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                                </svg>
                            </i>
                        </div>
                        <div class="accordion-body">
                            <div class="accordion-content">
                                ${newMessage}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quidem obcaecati quis, iste sed velit quam
                                eius nostrum temporibus consequatur doloremque fuga quaerat odio impedit animi veritatis dicta quibusdam
                                sequi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit id, architecto accusamus sit
                                doloremque voluptatibus, nesciunt dolorum cupiditate earum nobis exercitationem magni aut quas expedita
                                consequatur quaerat obcaecati amet? Nam.
                            </div>
                        </div>
                    `;

            accordion.appendChild(div);
        };
        // #endregion

        // #region close message view card
        btn_close.forEach(btn => btn.addEventListener("click", () => closeMessageViewCard()));

        document.addEventListener("keydown", (event) => event.code === "Escape" ? closeMessageViewCard() : null);

        async function closeMessageViewCard() {
            msgViewCard.classList.add("remove-right");
            msgViewCard.classList.remove("slide-right");

            // reset message view card attributes after 400 milliseconds
            await delay(400);
            msgViewCard.style = ("");
            msgViewCard.classList.remove("remove-right");
            accordion.innerHTML = "";
        };
        // #endregion

        bell.removeEventListener("click", showMessageViewCard); // reset event listener click
    };
})();

// add a delay at specified local code
function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

// #region accordion
async function manipulateAccordion(headerClicked) {
    const
        itemActived = headerClicked.closest(".accordion_item"),
        contentActived = itemActived.querySelector(".accordion-content"),
        accordion = document.querySelector("#msg-view-card .accordion"),
        allItens = accordion.querySelectorAll(".accordion_item"),
        AllContents = accordion.querySelectorAll(".accordion-content");

    // remove or add active class on clicked accordion header
    if (itemActived.classList.contains("active")) {
        itemActived.classList.remove("active");

        await delay(500);
        AllContents.forEach(content => content.hasAttribute("style") ? content.removeAttribute("style") : null);
    }
    else {
        allItens.forEach(item => item.classList.remove("active")); // remove active class from all accordion itens
        itemActived.classList.add("active");
        contentActived.style = "display:block";

        await delay(500);
        AllContents.forEach(content =>
            content.hasAttribute("style") ? content.removeAttribute("style") + (contentActived.style = "display:block") : null);
    };
};
// #endregion