(function () {
    "use strict";

    let count = 0;

    // Call fetchData every 10 seconds
    setInterval(newNotificationApiRequest, 20000); // 10000 milliseconds = 10 seconds

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

    async function notifyNewMessage(msg) {
        const
            bell = document.querySelector("#bell"),
            ntf_Count = document.querySelector("#notifications-count"),
            ntf_Card = document.querySelector("#notification-card"),
            ntf_CardBootstrap = bootstrap.Toast.getOrCreateInstance(ntf_Card),
            msgViewCard = document.querySelector("#msg-view-card card");

        count++;

        openBell();
        openNotificationCard();

        bell.addEventListener("click", () => {
            closeBell();
            closeNotificationCard();
            openMessageViewCard();

            //msgViewCard.innerHTML = msg;
        });

        // #region bell functions
        function openBell() {
            bell.style = "display:block";
            bell.classList.add("zoom-in");
            bell.classList.remove("zoom-out");

            ntf_Count.innerHTML = count;
        };

        async function closeBell() {
            bell.classList.remove("zoom-in");
            bell.classList.add("zoom-out");

            await delay(300);
            count = 0;
            bell.style = "display:";
            bell.classList.remove("zoom-out");
            ntf_Count.innerHTML = "";
        };
        // #endregion

        // #region notification card functions
        function openNotificationCard() {
            ntf_CardBootstrap.show();
            ntf_Card.classList.add("slide-left");
            ntf_Card.classList.remove("remove-right");
        };

        async function closeNotificationCard() {
            ntf_CardBootstrap.hide();
            ntf_Card.classList.add("remove-right");
            ntf_Card.classList.remove("slide-left");

            await delay(200);
            ntf_Card.classList.remove("remove-right");
        };
        // #endregion

        // #region message view card functions
        function openMessageViewCard(){
            msgViewCard.style = "display:block";
            msgViewCard.classList.add("slide-right");
            msgViewCard.classList.remove ("remove-right");
        };
        // #endregion

        if (ntf_Card.classList.contains("show")) {
            await delay(4000);
            closeNotificationCard();
        };
    };

    function manipulateAccordion() {
        var accordion = (function () {

            var $accordion = $('.accordion');
            var $accordion_header = $accordion.find('.accordion-header');
            var $accordion_item = $('.accordion__item');

            // default settings 
            var settings = {
                // animation speed
                speed: 400,

                // close all other accordion items if true
                oneOpen: false
            };

            return {
                // pass configurable object literal
                init: function ($settings) {
                    $accordion_header.on('click', function () {
                        accordion.toggle($(this));
                    });

                    $.extend(settings, $settings);

                    // ensure only one accordion is active if oneOpen is true
                    if (settings.oneOpen && $('.accordion__item.active').length > 1) {
                        $('.accordion__item.active:not(:first)').removeClass('active');
                    }

                    // reveal the active accordion bodies
                    $('.accordion__item.active').find('> .accordion-body').show();
                },
                toggle: function ($this) {

                    if (settings.oneOpen && $this[0] != $this.closest('.accordion').find('> .accordion__item.active > .accordion-header')[0]) {
                        $this.closest('.accordion')
                            .find('> .accordion__item')
                            .removeClass('active')
                            .find('.accordion-body')
                            .slideUp()
                    }

                    // show/hide the clicked accordion item
                    $this.closest('.accordion__item').toggleClass('active');
                    $this.next().stop().slideToggle(settings.speed);
                }
            }
        })();

        $(document).ready(function () {
            accordion.init({ speed: 300, oneOpen: true });
        });
    } manipulateAccordion();
})();