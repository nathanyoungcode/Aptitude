'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  Menu,
  MessageCircle,
  Settings,
  User,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  ExternalLink,
  Zap,
} from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'Setup', href: null, icon: BookOpen, isPopover: true },
]

interface SidebarContentProps {
  isOpen?: boolean
  onToggle?: () => void
}

function SidebarContent({ isOpen = true, onToggle }: SidebarContentProps) {
  const { data: session, status } = useSession()
  return (
    <div className={cn(
      "flex h-full flex-col bg-card border-r transition-all duration-300 ease-in-out",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex h-14 items-center justify-between border-b px-4">
        <h1 className={cn(
          "text-lg font-semibold transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
        )}>
          Aptitude
        </h1>
{onToggle && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggle}
            className={cn(
              "h-8 w-8 transition-all duration-300",
              !isOpen && "ml-0"
            )}
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      <div className="flex flex-col flex-1 py-4">
<nav className="space-y-1 px-3">
          {navigation.map((item) => (
            item.isPopover ? (
              // Setup Popover
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full transition-all duration-300",
                      isOpen ? "justify-start" : "justify-center px-3"
                    )}
                    title={!isOpen ? item.name : undefined}
                  >
                    <item.icon className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isOpen ? "mr-2" : "mr-0"
                    )} />
                    <span className={cn(
                      "transition-opacity duration-300",
                      isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                    )}>
                      {item.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align={isOpen ? "end" : "center"} forceMount>
                  <DropdownMenuLabel>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Quick Start</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-3 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Create n8n Workflow</p>
                          <p className="text-xs text-muted-foreground">Build any automation workflow in n8n with your preferred tools</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Add Webhook Trigger</p>
                          <p className="text-xs text-muted-foreground">Configure a webhook trigger to receive chat messages</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Start Chatting</p>
                          <p className="text-xs text-muted-foreground">Connect your webhook URL and start conversing</p>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenuSeparator />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                        <a href="https://n8n.io/templates" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          n8n Templates
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                        <Link href="/setup">
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Regular Navigation Links
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full transition-all duration-300",
                  isOpen ? "justify-start" : "justify-center px-3"
                )}
                asChild
              >
                <Link href={item.href} title={!isOpen ? item.name : undefined}>
                  <item.icon className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isOpen ? "mr-2" : "mr-0"
                  )} />
                  <span className={cn(
                    "transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}>
                    {item.name}
                  </span>
                </Link>
              </Button>
            )
          ))}
        </nav>
        
        <div className="flex-1" />
        
        <div className="px-3">
          <Separator className="mb-4" />
          
          {/* Profile Section */}
          {status === 'loading' ? (
            <div className={cn(
              "transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0"
            )}>
              {isOpen && <div className="h-12 rounded-lg bg-muted animate-pulse" />}
            </div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full transition-all duration-300",
                    isOpen ? "justify-start p-3" : "justify-center p-2"
                  )}
                >
                  <Avatar className={cn(
                    "transition-all duration-300",
                    isOpen ? "h-8 w-8 mr-3" : "h-6 w-6"
                  )}>
                    <AvatarImage
                      src={session.user?.image || ''}
                      alt={session.user?.name || 'User'}
                    />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isOpen && (
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none truncate">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align={isOpen ? "end" : "center"} forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary" />
                      <span className="text-xs">Usage</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Pro</Badge>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Credits used</span>
                      <span>450 / 1000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full"
                        style={{ width: '45%' }}
                      />
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()} className="w-full">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <SidebarContent isOpen={isOpen} onToggle={onToggle} />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-3 left-3 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent isOpen={true} />
        </SheetContent>
      </Sheet>
    </>
  )
}
