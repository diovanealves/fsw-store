'use client'

import { Product } from '@prisma/client'
import { ReactNode, createContext } from 'react'

interface CartProduct extends Product {
  quantity: number
}

interface ICardContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
}
const CardContext = createContext<ICardContext>({
  products: [],
  cartTotalDiscount: 0,
  cartBasePrice: 0,
  cartTotalPrice: 0,
})

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <CardContext.Provider
      value={{
        products: [],
        cartTotalDiscount: 0,
        cartBasePrice: 0,
        cartTotalPrice: 0,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}
