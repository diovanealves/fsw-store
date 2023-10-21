import { prismaClient } from '@/lib/prisma'
import ProductImages from './components/productImages'

interface ProductDetailsProps {
  params: {
    slug: string
  }
}
export default async function ProductDetails({
  params: { slug },
}: ProductDetailsProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
  })

  if (!product) return null

  return (
    <div>
      <ProductImages imagesUrls={product.imageUrls} name={product.name} />
    </div>
  )
}
