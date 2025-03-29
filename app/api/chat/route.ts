import { NextResponse } from 'next/server';

interface BotResponse {
  [key: string]: string;
}

// Объект с ответами бота
const botResponses: BotResponse = {
  "привет": generateTopicButtons(),
  "какие мероприятия в этом месяце?": "С афишей мероприятий в Ленинском районе вы можете ознакомиться здесь: <br><a href='https://afisha.yandex.ru/nizhny-novgorod' target='_blank'>Ознакомиться можете здесь</a>. Например, 15 июля в парке состоится фестиваль.",
  "адрес администрации ленинского района": "Администрация Ленинского района находится по адресу: проспект Ленина, 1, Нижний Новгород, 603000. <br>Посмотреть на карте: <a href='https://yandex.ru/profile/1140021248?lang=ru' target='_blank'>Яндекс.Карты</a>",
  "телефон администрации": "Телефоны для справок:<br>- Общий: +7 (831) 123-45-67<br>- Отдел по работе с обращениями граждан: +7 (831) 987-65-43",
  "как связаться с администрацией": "Вы можете связаться с нами:<br>- По телефону: +7 (831) 123-45-67<br>- По электронной почте: lenadmin@example.com",
  "какие услуги предоставляет администрация": "Администрация Ленинского района предоставляет следующие услуги:<br>- Выдача разрешений на строительство<br>- Прием заявлений на улучшение жилищных условий<br>- Выдача справок населению<br>- Организация мероприятий",
  "как получить справку": "Для получения справки (например, о составе семьи) вам необходимо обратиться в кабинет №10 по адресу проспект Ленина, 1 в часы приема: понедельник и среда с 9:00 до 12:00. Необходимые документы: паспорт, свидетельство о рождении (если есть дети). Телефон для справок: +7 (831) 111-22-33",
  "график работы администрации": "Администрация Ленинского района работает с понедельника по пятницу с 9:00 до 18:00, перерыв с 13:00 до 14:00.",
  "как добраться до администрации": "Администрация Ленинского района находится по адресу: проспект Ленина, 1, Нижний Новгород, 603000. <br>Как добраться:<br>- Автобусом №1 до остановки 'Администрация Ленинского района'<br>- Маршрутным такси №2 до остановки 'Площадь'<br><a href='https://yandex.ru/maps/47/nizhny-novgorod/house/prospekt_lenina_46/YEoYfwVlTE0AQFtsfX55cXRlYg==' target='_blank'>Посмотреть на карте</a>",
  "сообщить о проблеме с отоплением": "По вопросам отопления обращайтесь в домоуправляющую компанию (ДУК) по телефону +7 (831) 555-66-77",
  "сообщить о яме на дороге": "Пожалуйста, оставьте заявку на сайте 'Наш Нижний' (ссылка)",
  "default": "Извините, я не понимаю ваш вопрос. Пожалуйста, сформулируйте его иначе или попробуйте обратиться к разделам сайта."
};

// Генерирует HTML-кнопки для выбора темы
function generateTopicButtons(): string {
  const topics = [
    "какие мероприятия в этом месяце?",
    "адрес администрации ленинского района",
    "телефон администрации",
    "график работы администрации",
    "как добраться до администрации",
    "сообщить о проблеме с отоплением",
    "сообщить о яме на дороге"
  ];

  const topicButtons = topics.map(topic => {
    const buttonText = getButtonText(topic);
    return { id: topic, text: buttonText };
  });

  return JSON.stringify(topicButtons);
}

// Возвращает сокращенный текст для кнопки
function getButtonText(topic: string): string {
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

// Обрабатывает сообщение пользователя и возвращает ответ бота
function getBotResponse(userMessage: string): string {
  const normalizedMessage = userMessage.toLowerCase();
  
  const synonyms: { [key: string]: string[] } = {
    "мероприятия": ["мероприятия", "события", "афиша", "куда сходить", "что проходит"],
    "адрес": ["адрес", "где находится", "расположение", "местонахождение"],
    "телефон": ["телефон", "номер", "связаться", "позвонить"],
    "график работы": ["график", "время работы", "часы работы", "когда работает"],
    "добраться": ["добраться", "как доехать", "маршрут", "проехать"],
    "отопление": ["отопление", "нет тепла", "холодно в квартире"],
    "дорога": ["дорога", "яма", "плохая дорога", "разбитая дорога"]
  };

  function replaceSynonyms(text: string): string {
    let result = text;
    for (const key in synonyms) {
      synonyms[key].forEach(synonym => {
        result = result.replace(new RegExp(synonym, 'g'), key);
      });
    }
    return result;
  }

  const processedMessage = replaceSynonyms(normalizedMessage);

  if (processedMessage.includes("мероприятия")) {
    return botResponses["какие мероприятия в этом месяце?"];
  } else if (processedMessage.includes("адрес")) {
    return botResponses["адрес администрации ленинского района"];
  } else if (processedMessage.includes("телефон")) {
    return botResponses["телефон администрации"];
  } else if (processedMessage.includes("график работы")) {
    return botResponses["график работы администрации"];
  } else if (processedMessage.includes("добраться") || processedMessage.includes("местонахождение")) {
    return botResponses["как добраться до администрации"];
  } else if (processedMessage.includes("отопление")) {
    return botResponses["сообщить о проблеме с отоплением"];
  } else if (processedMessage.includes("дорога")) {
    return botResponses["сообщить о яме на дороге"];
  }

  return botResponses[processedMessage] || botResponses["default"];
}

export async function POST(request: Request) {
  // Получаем данные запроса
  const { message } = await request.json();
  
  // Если запрос - первое сообщение при загрузке страницы
  if (message === 'INITIAL_MESSAGE') {
    return NextResponse.json({
      response: "Здравствуйте! Я чат-бот Администрации Ленинского района. Выберите интересующую вас тему:",
      topics: JSON.parse(botResponses["привет"])
    });
  }
  
  // Обрабатываем сообщение пользователя
  const botResponse = getBotResponse(message);
  
  // Возвращаем ответ
  return NextResponse.json({ response: botResponse });
} 