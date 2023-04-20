(function () {
    "use strict";

    let count = 0;

    // Call fetchData every 10 seconds
    setInterval(newNotificationApiRequest, 10000); // 10000 milliseconds = 10 seconds

    function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

    async function newNotificationApiRequest() {
        try {
            const
                url = `https://viacep.com.br/ws/${11722350}/json/`,
                request = await fetch(url);

            if (request.ok) {
                const response = await request.json();

                notifyNewMessage(response.logradouro);

            } else throw new Error(`HTTP error! Status: ${response.status}`);

        } catch (error) {
            console.error('Error fetching API data:', error);
        };
    };

    function notifyNewMessage(msg) {
        const
            btn_bell = document.querySelector("#bell"),
            notificationsCount = document.querySelector("#notifications-count"),
            alertMessage = document.querySelector("#message-notification"),
            toastBootstrap = bootstrap.Toast.getOrCreateInstance(alertMessage),
            card_msg = document.querySelector("#card-notification #card-msg");

        count++;

        btn_bell.style = "display:block";

        notificationsCount.innerHTML = count;
        toastBootstrap.show();

        btn_bell.addEventListener("click", () => {
            notificationsCount.innerHTML = "";
            btn_bell.style = "display:none";
            count = 0;

            card_msg.innerHTML = msg;
        });
    };
})();