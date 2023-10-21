import ProductList from '@/components/productList'
import SectionTitle from '@/components/sectionTitle'
import { ComputeProductTotalPrice } from '@/helpers/product'
import { prismaClient } from '@/lib/prisma'
import ProductImages from './components/productImages'
import ProductInfo from './components/productInfo'

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
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  })

  if (!product) return null

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages imagesUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={ComputeProductTotalPrice(product)} />

      <div>
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <ProductList products={product.category.products} />
      </div>
    </div>
  )
}
