// src/orders/orders.routes.ts

export const ORDERS = {
    CONTROLLER: 'orders',
    ROUTES:
        {
            CREATE: '',
            UPDATE: ':id',
            DELETE: ':id',
        }
} as const;