'use client'

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'

export default function Header() {
  const { status, data } = useSession()

  const handleLoginClick = async () => {
    await signIn()
  }

  const handleLogoutClick = async () => {
    await signOut()
  }

  return (
    <Card className="flex items-center justify-between p-[1.87rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="mb-3 text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === 'authenticated' && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-3">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <p className="font-medium">{data.user.name}</p>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 space-y-3">
            {status === 'unauthenticated' ? (
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleLoginClick}
              >
                <LogInIcon size={16} />
                Fazer login
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleLogoutClick}
              >
                <LogOutIcon size={16} />
                Fazer Logout
              </Button>
            )}

            <SheetClose asChild>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Início
                </Button>
              </Link>
            </SheetClose>

            <Button variant="outline" className="w-full justify-start gap-2">
              <PercentIcon size={16} />
              Ofertas
            </Button>

            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/">
        <h1 className="text-lg font-semibold ">
          <span className="text-primary">FSW</span> Store
        </h1>
      </Link>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  )
}
