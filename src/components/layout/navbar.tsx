'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import ThemeToggle from '../ThemeToggle'

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            EventPlatform
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link 
                  href="/events" 
                  className={`px-4 py-2 rounded-md transition-colors ${
                    pathname === '/events' ? 'bg-accent' : 'hover:bg-accent/50'
                  }`}
                >
                  Events
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <ThemeToggle></ThemeToggle>
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}