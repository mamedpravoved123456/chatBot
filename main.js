function addMessage(message, isUser) {
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(isUser ? "user-message" : "bot-message");
    messageElement.innerHTML = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleInput(event) {
    if (event.key === "Enter") {
        const userMessage = event.target.value;
        event.target.value = "";
        addMessage(userMessage, true);
        const botResponse = getBotResponse(userMessage);
        setTimeout(() => addMessage(botResponse, false), 500);
    }
}

function sendTopic(topic) {
    addMessage(topic, true);
    const botResponse = getBotResponse(topic);
    setTimeout(() => addMessage(botResponse, false), 500);
}

const responses = {
    "привет": generateTopicButtons(),
    "какие мероприятия в этом месяце?": "С афишей мероприятий в Ленинском районе вы можете ознакомиться здесь: <br><a href='https://afisha.yandex.ru/nizhny-novgorod?utm_source=direct_search&utm_medium=paid_performance&utm_campaign=113628211%7CMSCAMP-60_%5BAF-PT%5D_%7BWS%3AS%7D_RU-47_goal-REV_Category-Афиша-Plus&utm_term=афиша%20городских%20мероприятий&utm_content=INTid%7C0100000052792047784_52792047784%7Ccid%7C113628211%7Cgid%7C5481726355%7Caid%7C16420632483%7Cpos%7Cpremium3%7Csrc%7Csearch_none%7Cdvc%7Cdesktop%7Cevid%7C0%7Cretid%7C0&yclid=10825400636646096895'>Ознакомиться можете здесь</a>.  Например, 15 июля в парке состоится фестиваль.",
    "адрес администрации ленинского района": "Администрация Ленинского района находится по адресу: проспект Ленина, 1, Нижний Новгород, 603000. <br>Посмотреть на карте: <a href='https://yandex.ru/profile/1140021248?lang=ru'>Яндекс.Карты</a>",
    "телефон администрации": "Телефоны для справок:<br>- Общий: +7 (831) 123-45-67<br>- Отдел по работе с обращениями граждан: +7 (831) 987-65-43",
    "как связаться с администрацией": "Вы можете связаться с нами:<br>- По телефону: +7 (831) 123-45-67<br>- По электронной почте: lenadmin@example.com",
    "какие услуги предоставляет администрация": "Администрация Ленинского района предоставляет следующие услуги:<br>- Выдача разрешений на строительство<br>- Прием заявлений на улучшение жилищных условий<br>- Выдача справок населению<br>- Организация мероприятий",
    "как получить справку": "Для получения справки (например, о составе семьи) вам необходимо обратиться в кабинет №10 по адресу проспект Ленина, 1 в часы приема: понедельник и среда с 9:00 до 12:00.  Необходимые документы: паспорт, свидетельство о рождении (если есть дети). Телефон для справок: +7 (831) 111-22-33",
    "график работы администрации": "Администрация Ленинского района работает с понедельника по пятницу с 9:00 до 18:00, перерыв с 13:00 до 14:00.",
    //Как добраться
    "как добраться до администрации": "Администрация Ленинского района находится по адресу: проспект Ленина, 1, Нижний Новгород, 603000. <br>Как добраться:<br>- Автобусом №1 до остановки 'Администрация Ленинского района'<br>- Маршрутным такси №2 до остановки 'Площадь'<br><a href='https://yandex.ru/maps/47/nizhny-novgorod/house/prospekt_lenina_46/YEoYfwVlTE0AQFtsfX55cXRlYg==/?ll=43.925556%2C56.279775&source=serp_navig&z=17.33'>Посмотреть на карте</a>",
    //Новые темы
    "сообщить о проблеме с отоплением": "По вопросам отопления обращайтесь в домоуправляющую компанию (ДУК) по телефону +7 (831) 555-66-77",
    "сообщить о яме на дороге": "Пожалуйста, оставьте заявку на сайте 'Наш Нижний' (ссылка)",
    "default": "Извините, я не понимаю ваш вопрос. Пожалуйста, сформулируйте его иначе или попробуйте обратиться к разделам сайта."
};

function generateTopicButtons() {
    const topics = [
        "какие мероприятия в этом месяце?",
        "адрес администрации ленинского района",
        "телефон администрации",
        "график работы администрации",
        "как добраться до администрации",
        "сообщить о проблеме с отоплением",
        "сообщить о яме на дороге"
    ];

    let buttonsHTML = "";
    topics.forEach(topic => {
        buttonsHTML += `<button class="topic-button" onclick="sendTopic('${topic}')">${getButtonText(topic)}</button>`;
    });
    return buttonsHTML;
}

function getButtonText(topic) {
    switch (topic) {
        case "какие мероприятия в этом месяце?":
            return "Мероприятия";
        case "адрес администрации ленинского района":
            return "Адрес";
        case "телефон администрации":
            return "Телефон";
        case "график работы администрации":
            return "График работы";
        case "как добраться до администрации":
            return "Как добраться";
        case "сообщить о проблеме с отоплением":
            return "Нет отопления";
        case "сообщить о яме на дороге":
            return "Яма на дороге";
        default:
            return topic;
    }
}

function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();

    const synonyms = {
        "мероприятия": ["мероприятия", "события", "афиша", "куда сходить", "что проходит"],
        "адрес": ["адрес", "где находится", "расположение", "местонахождение"],
        "телефон": ["телефон", "номер", "связаться", "позвонить"],
        "график работы": ["график", "время работы", "часы работы", "когда работает"],
        "добраться": ["добраться", "как доехать", "маршрут", "проехать"],
        "отопление": ["отопление", "нет тепла", "холодно в квартире"],
        "дорога": ["дорога", "яма", "плохая дорога", "разбитая дорога"]
    };

    function replaceSynonyms(text) {
        let result = text;
        for (const key in synonyms) {
            synonyms[key].forEach(synonym => {
                result = result.replace(new RegExp(synonym, 'g'), key);
            });
        }
        return result;
    }

    const normalizedMessage = replaceSynonyms(userMessage);

    if (normalizedMessage.includes("мероприятия")) {
        return responses["какие мероприятия в этом месяце?"];
    } else if (normalizedMessage.includes("адрес")) {
        return responses["адрес администрации ленинского района"];
    } else if (normalizedMessage.includes("телефон")) {
        return responses["телефон администрации"];
    } else if (normalizedMessage.includes("график работы")) {
        return responses["график работы администрации"];
    } else if (normalizedMessage.includes("добраться") || normalizedMessage.includes("местонахождение")) {
        return responses["как добраться до администрации"];
    } else if (normalizedMessage.includes("отопление")) {
        return responses["сообщить о проблеме с отоплением"];
    } else if (normalizedMessage.includes("дорога")) {
        return responses["сообщить о яме на дороге"];
    }

    return responses[normalizedMessage] || responses["default"];
}

window.onload = function() {
    setTimeout(() => addMessage("Здравствуйте! Я чат-бот Администрации Ленинского района. Выберите интересующую вас тему:", false), 500);
    setTimeout(() => addMessage(responses["привет"], false), 1000);
}

const chatContainer = document.getElementById('chat-container');
const resizeHandle = document.getElementById('resize-handle');
let isResizing = false;
let startX, startY, startWidth, startHeight;

resizeHandle.addEventListener('mousedown', function(e) {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = chatContainer.offsetWidth;
    startHeight = chatContainer.offsetHeight;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    if (!isResizing) {
        return;
    }
    const width = startWidth - (e.clientX - startX);
    const height = startHeight - (e.clientY - startY);

    const minWidth = 200;
    const minHeight = 200;

    chatContainer.style.width = Math.max(width, minWidth) + 'px';
    chatContainer.style.height = Math.max(height, minHeight) + 'px';
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}
