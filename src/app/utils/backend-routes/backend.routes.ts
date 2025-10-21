
const apiUrl = 'http://localhost:3001'

export const server = {
    api: {
        base: apiUrl,
        auth: {
            base:            apiUrl + `/auth`,
            login:           apiUrl + `/auth/login`,
            register:        apiUrl + `/auth/signin`,
            logout:          apiUrl + `/auth/logout`,
            refreshRotation: apiUrl + `/auth/refresh-rotation`,
        },
        user: {
            base: apiUrl + `/user`,
        },
        product: {
            base: apiUrl + `/product`,
            id: (id: string) => apiUrl + `/product/${id}`
        },
        store: {
            base: apiUrl + `/store`,
            storeId: (id: string) => apiUrl + `/store/${id}`
        },
        cart: {
            base: apiUrl + `/cart`,
            cartId: (id: string) => ({
                id: apiUrl + `/cart/${id}`,
                product: apiUrl + `/cart/${id}/product`,
            }),
            cartProduct: (id: string) => apiUrl + `/cart/product/${id}`
        }
    }
}