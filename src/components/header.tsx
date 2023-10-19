import { MenuIcon, ShoppingCartIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'

export default function Header() {
  return (
    <Card className="flex items-center justify-between p-[1.87rem]">
      <Button size="icon" variant="outline">
        <MenuIcon />
      </Button>

      <h1 className="text-lg font-semibold ">
        <span className="text-primary">FSW</span> Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  )
}
