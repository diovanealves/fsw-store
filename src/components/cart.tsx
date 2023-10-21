import { ComputeProductTotalPrice } from '@/helpers/product'
import { CartContext } from '@/providers/cart'
import { ShoppingCartIcon } from 'lucide-react'
import { useContext } from 'react'
import CartItem from './cartItem'
import { Badge } from './ui/badge'

export default function Cart() {
  const { products } = useContext(CartContext)
  return (
    <div className="flex flex-col gap-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.365rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <CartItem
            key={product.id}
            product={ComputeProductTotalPrice(product as any) as any}
          />
        ))}
      </div>
    </div>
  )
}
