# News-Explorer API
***
Версия 0.0.1

## Описание:
В данном репозитории находится бэкенд дипломного проекта News-Explorer.

## Адрес сервера
- 178.154.226.5
- [https://news-explorer-api.ml](https://news-explorer-api.ml)
- [http://news-explorer-api.ml](http://news-explorer-api.ml)

## Основной функционал: 
- REST API:
  - по запросу `GET [адрес сервера]/articles` 
  возвращает все сохраненные статьи пользователя
  - по запросу `GET [адрес сервера]/users/me` 
  возвращает информацию о пользователе
  - по запросу `POST [адрес сервера]/signup` создаёт пользователя с переданными в теле email, password и name
  - по запросу `POST [адрес сервера]/signip` регистрирует пользователя в системе
  - по запросу `POST [адрес сервера]POST /articles` создаёт статью с переданными в теле keyword, title, text, date, source, link и image
  - по запросу `DELETE [адрес сервера]DELETE /articles/articleId` убрать лайк с карточки удаляет сохранённую статью  по _id
  

## Стэк технологий:
- node.js
- express.js
- mongoDB

## Пакеты в сборке:
- [nodemon](https://www.npmjs.com/package/nodemon)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [eslint](https://www.npmjs.com/package/eslint)
- [mongoose](https://mongoosejs.com/)
- [Helmet](https://www.npmjs.com/package/helmet)
- [cookie-parser](http://expressjs.com/en/resources/middleware/cookie-parser.html)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [celebrate](https://www.npmjs.com/package/celebrate)
- [winston](https://www.npmjs.com/package/winston)
- [express-winston](https://www.npmjs.com/package/express-winston)
- [dotenv](https://www.npmjs.com/package/dotenv)


## Инструкция по запуску:
Сервер запущен по адресу:
- [https://news-explorer-api.ml](https://news-explorer-api.ml)
- [http://news-explorer-api.ml](http://news-explorer-api.ml)

Если хотите установить локально, тогда:
1. Скачать или склонировать репозиторий
2. Установить зависимости при помощи npm - `npm i`
3. Запуск:
    - Запуск сервера на localhost:3000 - `npm run start`
    - Запуск сервера на localhost:3000 с хот релоудом - `npm run dev`

## Github:
https://github.com/AIMoiseyev/news-explorer-api/tree/level-1

