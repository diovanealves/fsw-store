import { prismaClient } from '@/lib/prisma'

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

  return <h1>{product.name}</h1>
}
