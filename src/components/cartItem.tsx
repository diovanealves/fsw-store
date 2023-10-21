import { CartContext, CartProduct } from '@/providers/cart'
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'
import { Button } from './ui/button'

interface CartItemProps {
  product: CartProduct
}
export default function CartItem({ product }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext)

  function handleDecreaseProductQuantityClick() {
    decreaseProductQuantity(product.id)
  }

  function handleIncreaseProductQuantityClick() {
    increaseProductQuantity(product.id)
  }

  function handleRemoveProductClick() {
    removeProductFromCart(product.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[75px] w-[75px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={`Imagem ilustrativa do produto ${product.name}`}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercent > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size="icon" variant="outline" onClick={handleRemoveProductClick}>
        <TrashIcon size={16}></TrashIcon>
      </Button>
    </div>
  )
}
