import { Badge } from '@/components/ui/badge'
import { prismaClient } from '@/lib/prisma'
import { ShapesIcon } from 'lucide-react'
import Categoryitem from './components/categoryItem'

export default async function CatalogPage() {
  const categories = await prismaClient.category.findMany({})

  return (
    <div className="space-y-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.365rem] text-base uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => (
          <Categoryitem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
