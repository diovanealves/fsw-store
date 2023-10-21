import ProductItem from '@/components/productItem'
import { ComputeProductTotalPrice } from '@/helpers/product'
import { Product } from '@prisma/client'

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <div key={product.id} className="w-[170px] max-w-[170px]">
          <ProductItem product={ComputeProductTotalPrice(product)} />
        </div>
      ))}
    </div>
  )
}
