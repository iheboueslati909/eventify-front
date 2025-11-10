'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
  Menu,
  Calendar,
  Lightbulb,
  User,
  LogOut,
} from 'lucide-react'

const sidebarItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: User,
  },
  {
    name: 'My Events',
    href: '/dashboard/events',
    icon: Calendar,
  },
  {
    name: 'My Concepts',
    href: '/dashboard/concepts',
    icon: Lightbulb,
  },
  {
    name: 'My Artists',
    href: '/dashboard/artists',
    icon: User,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <span className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-4 w-4" />
          </span>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SidebarContent pathname={pathname} onItemClick={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className=" hidden md:flex w-64 flex-col fixed inset-y-0 z-50  border-r bg-background">
        <SidebarContent pathname={pathname} />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarContent({ 
  pathname, 
  onItemClick 
}: { 
  pathname: string 
  onItemClick?: () => void 
}) {
  return (
    <>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span>EventPlatform</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start" >
          <Link href="/">
            <LogOut className="h-4 w-4 mr-2" />
            Back to Site
          </Link>
        </Button>
      </div>
    </>
  )
}