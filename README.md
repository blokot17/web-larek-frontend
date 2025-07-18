# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин (WEB-ларёк)

Интерактивное приложение интернет-магазина, реализованное с использованием архитектурного паттерна MVC (Model-View-Controller).
Реализовано на TypeScript с использованием классов и Webpack.

## Описание

Приложение позволяет:

- Просматривать каталог товаров
- Открывать подробную информацию о товаре в модальном окне
- Добавлять товары в корзину
- Оформлять заказ через пошаговую форму (доставка → контакты)
- Отправлять заказ на сервер

## Архитектура проекта

# MVC-подход

**Model** — управляет данными и бизнес-логикой. Отвечает за хранение состояния (например, каталог товаров, корзина, оформление заказа), работу с API и обработку данных.

**View** — отвечает за отображение пользовательского интерфейса: рендерит карточки товаров, корзину, модальные окна и формы.

**Controller** — принимает пользовательские события от View, обновляет Model и инициирует обновление View. Обеспечивает связь между Model и View.

**Взаимодействие компонентов**

Для слабой связанности и расширяемости реализован событийный брокер EventEmitter, через который происходит обмен сообщениями между частями приложения.

# Классы и их функциональность

**Класс EventEmitter**

Событийный брокер для связи между компонентами приложения. Обеспечивает loose coupling и масштабируемость.

Основные методы:

```
on(eventName, callback)           // Подписка на событие
emit(eventName, data?)            // Вызов события
trigger(eventName, context?)      // Возвращает функцию-триггер
onAll(callback)                   // Подписка на все события
off(eventName, callback)          // Удаление обработчика
offAll()                          // Очистка всех подписчиков
```
**Класс Api**

Модуль Api инкапсулирует всю логику сетевых запросов. Позволяет гибко взаимодействовать с REST API, обрабатывать ошибки и удобно переиспользуется во всех частях проекта.

Основные методы:

```
get(uri: string): Promise<object>
post(uri: string, data: object, method?: ApiPostMethods): Promise<object>
```

## Model

**Класс Product**

Представляет собой модель одного товара, реализует интерфейс IProduct.
**Поля:**
```
id: ProductID         // Уникальный идентификатор
title: string         // Название товара
description: string   // Описание
image: string         // URL изображения
category: string      // Категория
price: number | null  // Цена
```

**Класс Basket** 

Модель корзины, управляет добавлением/удалением товаров, подсчётом суммы.
**Поля:**
```
items: IBasketItem[]  // Массив товаров с количеством
```

**Методы:**
```
addProduct(product: Product): void           // Добавляет товар в корзину
removeProduct(productId: ProductID): void    // Удаляет товар из корзины
getTotal(): number                           // Возвращает итоговую стоимость всех товаров
```

## View

**Класс CatalogView**

Отображает каталог товаров.
**Методы:**
```
render(products: Product[]): void    // Отрисовывает карточки товаров
bindEvents(): void                   // Обрабатывает клики по товарам

```

**Класс ModalView**
Отвечает за отображение и скрытие модального окна.
**Методы:**
```
open(content: HTMLElement): void     // открыть модалку с содержимым
close(): void                        // закрыть модалку

```

**Класс BasketView**

Отображает корзину и сумму заказа
**Методы:**
```
render(items: IBasketItem[], total: number): void               // отрисовать корзину
bindRemove(handler: (productId: ProductID) => void): void       // удалить товар
bindCheckout(handler: () => void): void                         // оформить заказ
```

**Класс OrderView**

Форма оформления заказ
**Методы:**
```
renderDeliveryStep(): void                                               // отрисовать шаг с доставкой
renderContactsStep(): void                                               // отрисовать шаг с контактами
bindDeliveryComplete(handler: (data: IOrderDelivery) => void): void     // передать данные доставки
bindContactsComplete(handler: (data: IOrderContacts) => void): void     // передать контакты
showSuccess(): void                                                     // показать успешное оформление
```

## Controller

**Класс CatalogController**

Управляет действиями в каталоге.
**Поля**
```
api: Api                         // экземпляр API для загрузки товаров
view: CatalogView                // представление каталога
basket: Basket                   // модель корзины
emitter: EventEmitter            // брокер событий
```

**Методы:**
```
loadProducts(): void                        // загрузка и отображение товаров
handleItemClick(product: Product): void     // открыть модалку по клику на карточку
handleAddToBasket(product: Product): void   // добавить товар в корзину
```

**Класс BasketController**

Обрабатывает корзину
**Поля:**
```
basket: Basket                  // модель корзины
view: BasketView                // представление корзины
emitter: EventEmitter           // брокер событий
```

**Методы:**
```
addProduct(product: Product): void            // добавить товар в корзину
removeProduct(productId: ProductID): void     // удалить товар из корзины
checkout(): void                              // инициировать оформление заказа
```

**Класс OrderController**

Управляет шагами заказа
**Поля**
```
api: Api                        // экземпляр API для отправки заказа
view: OrderView                 // представление формы заказа
basket: Basket                  // модель корзины
emitter: EventEmitter           // брокер событий
```

**Методы**
```
handleDeliveryStep(data: IOrderDelivery): void     // сохранить введённые данные доставки
handleContactsStep(data: IOrderContacts): void     // сохранить введённые контактные данные
submitOrder(): void                                // собрать и отправить заказ на сервер
showSuccess(): void                                 // показать сообщение об успешной отправке
```

# Типы и интерфейсы

Описывают структуры данных, которые используются в приложении.

**Товары и корзина:**

```
export interface IProduct {
    id: ProductID;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
}

export interface IBasket {
    items: IBasketItem[];
    addProducts(product: IProduct): void;
    removeProduct(productId: ProductID): void;
    getTotal(): number;
}
```

**Оформление заказа:**

```
export interface IOrderDelivery {
    payment: PaymentOption;
    address: string;
}

export interface IOrderContacts {
    email: string;
    phone: string;
}
```

**События приложения:**

```
export type AppEvent =
    | { type: 'catalog:item-click'; payload: IProduct }
    | { type: 'basket:open' }
    | { type: 'basket:add'; payload: IProduct }
    | { type: 'basket:remove'; payload: ProductID }
    | { type: 'basket:checkout' }
    | { type: 'order:delivery-complete'; }
    | { type: 'order:contacts-complete' }
    | { type: 'order:submit'}
    | { type: 'order:success' }
    | { type: 'modal:open'; payload: HTMLElement }
    | { type: 'modal:close' };
```
