export interface Cart {
    createdAt: Date
    id: string
    name: string
    updatedAt: Date
}

export type FetchUserCarts = Cart[]


export interface CartItem {
    id: string
    amount: number
    product: Product
}
      
export interface Product {
    id: string
    name: string
    price: number
    available: boolean
    store: {
        id: string
        name: string
    }
}

export type FetchCart = CartItem[]