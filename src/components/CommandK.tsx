'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import {
  Calculator,
  Calendar,
  FileText,
  Home,
  MessageCircle,
  Search,
  Settings,
  User,
} from 'lucide-react'

import { Dialog, DialogContent } from '@/components/ui/dialog'

const commands = [
  {
    group: 'Navigation',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home, action: '/dashboard' },
      { id: 'chat', label: 'Chat', icon: MessageCircle, action: '/chat' },
      { id: 'profile', label: 'Profile', icon: User, action: '/profile' },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        action: '/settings',
      },
    ],
  },
  {
    group: 'Actions',
    items: [
      { id: 'search', label: 'Search...', icon: Search, action: 'search' },
      {
        id: 'new-file',
        label: 'Create New File',
        icon: FileText,
        action: 'new-file',
      },
      {
        id: 'calculator',
        label: 'Calculator',
        icon: Calculator,
        action: 'calculator',
      },
      { id: 'calendar', label: 'Calendar', icon: Calendar, action: 'calendar' },
    ],
  },
]

export function CommandK() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (action: string) => {
    setOpen(false)

    if (action.startsWith('/')) {
      router.push(action)
    } else {
      // Handle other actions
      switch (action) {
        case 'search':
          console.log('Search action')
          break
        case 'new-file':
          console.log('New file action')
          break
        case 'calculator':
          console.log('Calculator action')
          break
        case 'calendar':
          console.log('Calendar action')
          break
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <Command.Empty className="py-6 text-center text-sm">
              No results found.
            </Command.Empty>

            {commands.map((group) => (
              <Command.Group key={group.group} heading={group.group}>
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <Command.Item
                      key={item.id}
                      onSelect={() => handleSelect(item.action)}
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Command.Item>
                  )
                })}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
