import SectionTitle from '@/components/sectionTitle'
import { prismaClient } from '@/lib/prisma'
import Categories from './components/category'
import ProductList from './components/productList'
import PromoBanner from './components/promoBanner'

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      },
    },
  })

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'mouses',
      },
    },
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards',
      },
    },
  })

  return (
    <div>
      <PromoBanner
        src="/BannerHome01.png"
        alt="Até 55% de desconto esse mês!"
      />

      <div className="mt-8 p-5">
        <Categories />
      </div>

      <div className="mt-8">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/BannerHome02.png"
        alt="Até 55% de desconto em mouses!"
      />

      <div className="mt-8">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>

      <PromoBanner
        src="/BannerHome03.png"
        alt="Até 55% de desconto em mouses!"
      />

      <div className="mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  )
}
