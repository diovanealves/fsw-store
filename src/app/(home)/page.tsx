import { prismaClient } from '@/lib/prisma'
import Image from 'next/image'
import Categories from './components/category'
import ProductList from './components/productList'

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      },
    },
  })

  return (
    <div>
      <Image
        src="/BannerHome01.png"
        height={0}
        width={0}
        className="h-auto w-full p-5"
        sizes="100vw"
        alt="Até 55% de desconto esse mês!"
      />

      <div className="mt-8 p-5">
        <Categories />
      </div>

      <div className="mt-8">
        <ProductList products={deals} />
      </div>
    </div>
  )
}
