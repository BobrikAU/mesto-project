# "Mesto Russia" (учебный проект Яндекс.Практикума)

## Цель проекта

Настоящий проект - это интерактивная web-страница, позволяющая пользователю
создавать галереи фотографий и удалять их. Посетители web-страницы могут отмечать понравившиеся
фотографии лайками.

Являясь учебным, проект имеет также цель закрепить навыки и знания в области верстки
адаптивных web-страниц по представленному макету, оформлению кода в соответствии с требованиями
БЭМ, а также применению начальных знаний JavaScript с целью обеспечения интерактивности страницы.

## Использованные технологии

При разработке использовались флексбокс-вёрстка и Grid Layout, псевдоклассы, абсолютное
позиционирование html-элементов. Страница адаптирована к экранам шириной от 320 пикселей.
При организации файловой структуры использовалась методология БЭМ. Шрифты сглажены.
Интерактивные функции реализованы с помощью JavaScript. Валидация форм и полей ввода осуществляется
с помощью JavaScript с использованием встроенной браузерной валидации.

Представленная web-страница разработана с использованием HTML5, CSS, JavaScript. Используется шрифт
Inter.

В проекте установлены webpack, webpack-cli, webpack-dev-server. В файле package.json создано два
скрипта build и dev, с помощью которых осуществляются соответствующие варианты сборки проекта.
Осуществлена настройка минификации и транспиляции JS-бабелем html-файла, css-файлов (с добавлением 
вендорных префиксов), js-файлов. 

## Планы по дальнейшей разработке
На сегодняшний день проект не закончен, так как не реализовано взаимодействие пользователя с
сервером. Вся функциональность реализуется только в браузере.
В дальнейшем планируется организовать взаимодействие пользователя с сервером, в том
числе с сохранением на сервере определенной ифнормации (ссылок на изображения, информации о
пользователе, о лайках и т.д.), а также редактирование и удаление данной информации. Целью
реализации данной функциональности будет отработка навыков организации взаимодействия серверной
и клиентской частей проекта.