'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductWithTotalPrice } from '@/helpers/product'
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from 'lucide-react'
import { useState } from 'react'

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    'basePrice' | 'description' | 'discountPercent' | 'totalPrice' | 'name'
  >
}
export default function ProductInfo({
  product: { basePrice, description, discountPercent, totalPrice, name },
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  function handleDecreaseQuantityClick() {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
  }

  function handleIncreaseQuantityClick() {
    setQuantity((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
        {discountPercent > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14} /> {discountPercent}%
          </Badge>
        )}
      </div>

      {discountPercent > 0 && (
        <p className="text-sm opacity-75">
          De{' '}
          <span className="line-through">
            R$ {Number(basePrice).toFixed(2)}
          </span>
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <Button className="mt-8 font-bold uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div>
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo brasil</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  )
}
