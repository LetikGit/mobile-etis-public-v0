# Mobile ETIS Public v0

Мини презентация - https://disk.yandex.ru/d/nAmcKVIQQozlSA

# Наша позиция

Мы гордимся тем, что мы сделали и хотим, чтобы студенты пользовались качественным продуктом, который может конкурировать с официальными разработками университета. Конкуреция - неотъемлимая часть прогресса и развития, университет должен разрешать студентам делать такие разработки, чтобы становиться лучше, а не тормозить и наказывать их за такое.
Приложение является абсолютно безопасным и уже 2 года мы пытаемся решить этот вопрос официально с администрацией университета, но нас кормят бесконечными завтраками и перенаправлением друг к другу от представителей университета. На официальные запросы не отвечают, формальные запросы на почту так же игнорируют. Университет сам не может предоставить для студентов комфортное приложение и не дает предоставить его нам. Мы прошли через службу безопасности, бюррократические круги и следственный комитет (привет Макарихину и 137 УК РФ) и планируем достигнуть своей цели.

## Зачем это университету и студентам? Какую проблему решает приложение?

### А что сейчас не так?

ЕТИС существует множество лет и устарел, в текущем виде ЕТИС пользоваться некомфортно. В эпоху "mobile first" у основного информационного инструмента университета нет мобильного приложения, тысячи студентов не могут комфортно использовать систему университету из-за отсутствия приложения. В текущем виде на сайте student.psu.ru в мобильном браузере на телефоне невозможно комфортно пользоваться, бесконечная повторная авторизация в системе, неадаптированная верстка, трудности с получением информации из-за чего желания находиться в системе нет, лишь бы получить побыстрее расписание и не заходить туда как можно дольше. Студента оттлакивает ЕТИС из-за того что он неудобен, отличная информационная система (НЕ с точки зрения реализации) не использует потенциал и возможности. 

### Какую же проблему решает приложение?

![](https://sun9-28.userapi.com/impg/vBqyYcpJOkLQRCr8i5VPq6ajL9u0mzlg2npuzw/b5a_54taHyg.jpg?size=1846x1315&quality=96&sign=0d9c019d3c6f267335b03628eee145f6&type=album)

Комфортности использования. Да, основная идея приложения - переработка текущего интерфейса и отображение данные в приятном интерфейсе, повышение комфортности использования для студентов. В приложении не нужно перелогиниваться каждый раз, когда ты хочешь посмотреть расписание. Достаточно ввести данные 1 раз и оно все будет делать автоматически, сохраняя твой логин и пароль на твоем телефоне в защищенном виде с помощью [SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/). 
Помимо этого приложение сохраняет UI/UX пользователей и предоставляет им информацию в визуально-приятных интерфейсах, в которых можно легко разобраться и видеть только самую нужную тебе информацию. Так же одним из главных преимуществ приложения является, то что с помощью него можно сохранять расписание в храналище на устройстве и если ЕТИС упадет, то тебе не придется бегать по личкам одногруппников и узнавать какие пары, ведь в приложении будет сохранено последнее запрошенное тобой расписание и ты сможешь его увидеть без доступа к лежащему вновь ЕТИС.

Поэтому это одно из преимуществ приложения, так же можно выделить то что приложение дает намного больше возможностей для реализации новых функций, например некоторые из идей, которые мы хотели реализовать:

* возможность старостам отправлять уведомления своим одногруппникам
* уведомления об изменениях в расписании
* уведомления о новых выставленных контрольных точках
* справочная информация
* новости из официальной группы ПГНИУ ВКонтакте
* возможность старостам редактировать для одногруппников информацию о преподавателе (например староста может указать почту преподавателя или телефон, только для своих одногруппников)
* возможность добавлять заметки, как для себя так и для одногруппников (например о том что скоро контрольная точка или нужно сдать лабораторную)
* возможность студенческим сообществам создавать свои страницы с информацией о приложении
* отображения событий, которые будут происходить в университете (студвесна, квн и прочее)

Помимо нового функционала приложение защищает от ряда существующих уязвиомстей в ЕТИС. Как это? В ЕТИС есть ряд [XSS уязвимостей](https://habr.com/ru/post/511318/).
Если кратко: ваш логин и пароль могут украсть. Что делает приложение? Оно "парсит данные", поэтому такая атака через приложение просто не пройдет. Подробнее о том как это происходит будет ниже.


## А как вы решаете эту проблему?

В текущей реализации мы используем React Native с Expo. 
В следующей версии приложения мы планируем использовать: React Native, Expo, MobX.

Благодаря этим технологиям мы разрабатываем в быстрые сроки и кроссплатформено (сразу на iOS и Android). 
Пароли и логины мы храним только локально на устройстве с помощью защищенного храналища [SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/). 

### А как вообще работает приложение?

Вы вводите логин и пароль, приложение отправляет запрос к ЕТИС с данными и пытается логиниться с ними. Если логин прошел успешно, то сохраняет эти данные локально на вашем телефоне. Приложение получает сессию от вашего аккаунта, это такой ключик, с помощью которого можно ограниченное время (пару часов) получать данные из ЕТИС без логина и пароля. С помощью этой сессии приложение получает HTML код страниц и парсит его, достает из этих страниц нужные данные и отображает их вам. А когда сессия просрочится, то приложение возьмет ваш сохраненный логин и пароль и получит новую сессию, благодаря этому не нужно вводить каждый раз логин и пароль заново, приложение умное и все знает, оно все сделает за тебя.
В чем плюс такого подхода? У нас нет сервера и мы не храним ваши данные у нас, вы работаете напрямую с ЕТИС, как будто вы делаете это с браузера, но на самом деле делаете это через крутое мобильное приложение с приятным интерфейсом. 

## Статистика

![image](https://user-images.githubusercontent.com/48149254/137600116-519ba039-8746-4643-989d-130f3931302b.png)

[Excel файл с опросом](https://disk.yandex.ru/i/Vndco0iRGnwcxg)

* Более 97% студентов хотят мобильное приложение (опрошено 583 студента; 566 из них сказали, что мобильное приложение нужно)
* За первую неделю приложение скачали более 1000 человек и оно стало топ-8 в "Популярных" в категории "Образование" в Google Play.
* 0 паролей и логинов украдено нами
* 28 отзывов на 5 звезд в Google Play, средняя оценка 4.97
* 2 объяснительные

# [Сейчас приложение не работает]

В ЕТИС добавили капчу, которая мешает приложению авторизовываться. Поэтому сейчас приложение не работает корректно.

### Как запустить у себя?

Установите [Expo](https://docs.expo.dev/get-started/installation/)

Далее скачайте этот репозиторий и передайте в папку

```js
git clone https://github.com/LetikGit/mobile-etis-public-v0
cd mobile-etis-ublic-v0/mobile-etis
```

Установите зависимости

```js
npm install
expo install
```

Запустите локальный сервер с помощью Expo

```js
expo start
```

[Как сбилдить?](https://docs.expo.dev/build/setup/)
