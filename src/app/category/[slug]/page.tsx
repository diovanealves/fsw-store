import ProductItem from '@/components/productItem'
import { Badge } from '@/components/ui/badge'
import { CATEGORY_ICON } from '@/constants/categoryItem'
import { ComputeProductTotalPrice } from '@/helpers/product'
import { prismaClient } from '@/lib/prisma'

export default async function CategoryProducts({ params }: any) {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  })

  if (!category) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.365rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category?.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {category?.products.map((product) => (
          <ProductItem
            key={product.id}
            product={ComputeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  )
}
