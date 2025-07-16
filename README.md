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

Интерактивное приложение интернет-магазина, выполненное с использованием архитектурного подхода и событийной модели. Проект реализован с использованием TypeScript, модульной структуры и системы сборки Webpack.

## Описание

Приложение позволяет:

- Просматривать каталог товаров
- Открывать подробную информацию о товаре в модальном окне
- Добавлять товары в корзину
- Оформлять заказ через пошаговую форму (доставка → контакты)
- Отправлять заказ на сервер

Все компоненты взаимодействуют между собой через событийный брокер `EventEmitter`, что обеспечивает слабую связанность и расширяемость архитектуры.

# Классы и их функциональность

## Класс EventEmitter 

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

## Класс Api

Модуль Api инкапсулирует всю логику сетевых запросов. Позволяет гибко взаимодействовать с REST API, обрабатывать ошибки и удобно переиспользуется во всех частях проекта.

Основные методы:

```
get(uri: string): Promise<object>
post(uri: string, data: object, method?: ApiPostMethods): Promise<object>
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
    totalPrice: number;
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
    | { type: 'order:delivery-complete'; payload: IOrderDelivery }
    | { type: 'order:contacts-complete'; payload: IOrderContacts }
    | { type: 'order:submit'; payload: IOrderForm }
    | { type: 'order:success' }
    | { type: 'modal:open'; payload: HTMLElement }
    | { type: 'modal:close' };
```