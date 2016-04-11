# Задание «Яндекс.Карты» на «DUMP 2016» ♥︎ ♣︎ ♦︎

Предлагаем попробовать свои силы в создании карточной игры для тренировки памяти.

Перед участником раскладывается набор карт, в котором каждая карта встречается дважды.
Короткое время участник смотрит на карты и запоминает их расположение. Затем карты переворачиваются картинками вниз, и участник, переворачивая по две, находит пары.

Условия:

Вы можете использовать только CSS и HTML, никакого JS!
При этом разрешено использовать любые препроцессоры – jade или stylus, например.

Подходите к нам, когда решите задание. Первые восемь решивших получат подарки!

По окончании DUMP, мы обязательно опубликуем пример решения

Подробнее: http://yandex-dump-2016.surge.sh/

## Идея решения

Будем генерировать каждое возможное состояние в html разметку и перемещаться
по этим состояниям с помощью якорей (#sXXX).

С точки зрения игры состояние это новый экран.

В html состояние это div контейнер с абсолютным позиционированием и 100% шириной и высотой.

По условиию задачи можно использовать любые препроцессоры, поэтому ничего не мешает
написать свой велосипед, который будет генерировать игру  по заданному шаблону.


## yaCardsjs

препроцессор для генерации игры Яндекс.Карты DUMP2016 по шаблону

### Сборка игры

Шаблон можно передать в модуле yaCards.js методу model.init(). 

После чего выполнить из терминала команду **make**.

Проект соберется в папку build

### Формат шаблона

Шаблон содержит следующие пары символы:

* h - heart ♥︎ 
* d - diamond ♦︎ 
* c - club ♣
* s - sparks ♠ 

Другие символы будут удалены из шаблоны.

Максимальное количество пар - 4. 
Минимальное количество пар - 1.


### примеры шаблона

* 'hcd chd'
* 'hh dd cc ss'
* 'hddh'
* 'hh'