export type ManyProducts = FetchProduct[]

export interface FetchProduct {
  id: string
  name: string
  description: string
  available: boolean
  price: number
  createdAt: string
  updatedAt: string
  store: {
    id: string
    name: string
  }
}

export interface FetchProductById extends FetchProduct {
    stock: {
        amount: number
    }
}

/**
 * Serve as a default temporary value for an product to prevent object error
 * while the page is being rendered and the requested product is being fetched
 */
export const emptyFetchProductById: FetchProductById = {
  stock: {
    amount: 0
  },
  id: '',
  name: '',
  description: '',
  available: false,
  price: 0,
  createdAt: '',
  updatedAt: '',
  store: {
    id: '',
    name: ''
  }
}