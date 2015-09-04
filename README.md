# Watermark
> Команда №4

## Установка

0. Убедитесь что у вас установлены [node.js](http://nodejs.org/), [compass](http://compass-style.org/), [npm](http://npmjs.org/) и [bower](http://bower.io.);

1. Клонируйте репозиторий;

  ```sh
$ git clone https://github.com/Lefff/watermark_ls.git
  ```

2. Перейдите в папку с проектом и установите все зависимости;

  ```sh
  $ npm install && bower install
  ```

## Использование

  ```sh
  #Запуск сборщика проекта (задача по умолчанию)
  $ gulp

  #Запуск локального сервера для разработки с отслеживанием изменений (browser sync)
  $ gulp servlive

  #Добавление путей bower зависимостей в проект
  $ gulp bowerdep

  #Компиляция JADE
  $ gulp jade

  #Компиляция SASS
  $ gulp compass
  ```