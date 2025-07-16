// Тип идентификатора товара
export type ProductID = string;

// Товар в каталоге и в модальном окне
export interface IProduct {
    id: ProductID;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
}

// Корзина с товарами и методами
export interface IBasket {
    items: IBasketItem[];
    totalPrice: number;
    addProducts(product: IProduct): void;
    removeProduct(productId: ProductID): void;
    getTotal(): number;
}

// Товар в корзине
export interface IBasketItem {
    product: IProduct;
    quantity: number;
}

// Шаг 1 оформление заказа
export type PaymentOption = 'card' | 'cash';

export interface IOrderDelivery {
    payment: PaymentOption;
    address: string;
}

// Шаг 2 оформление заказа
export interface IOrderContacts {
    email: string;
    phone: string;
}

// Данные заказа (отправляется на сервер)
export interface IOrderForm {
    products: IBasketItem[];
    total: number;
    delivery: IOrderDelivery;
    contacts: IOrderContacts;
}

// Интерфейс модального окна с методами открытия и закрытия
export interface IModal {
    open(content: HTMLElement): void;
    close(): void;
}

// API клиента для загрузки товаров и отправки заказа
export interface IApiClient {
    fetchProducts(): Promise<IProduct[]>;
    submitOrder(order: IOrderForm): Promise<void>;
}

// Типы событий для EventEmitter
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