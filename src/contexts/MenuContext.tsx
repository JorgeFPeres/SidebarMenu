import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface MenuContextData {
  isExpanded: boolean
  toggleSidebar: () => void
  openDropdowns: string[]
  toggleDropdown: (itemId: string) => void
  isDropdownOpen: (itemId: string) => boolean
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData)

interface MenuProviderProps {
  children: ReactNode
}

export function MenuProvider({ children }: MenuProviderProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])

  const toggleSidebar = useCallback(() => {
    setIsExpanded(prev => !prev)
    if (isExpanded) {
      setOpenDropdowns([])
    }
  }, [isExpanded])

  const toggleDropdown = useCallback((itemId: string) => {
    setOpenDropdowns(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }, [])

  const isDropdownOpen = useCallback((itemId: string) => {
    return openDropdowns.includes(itemId)
  }, [openDropdowns])

  return (
    <MenuContext.Provider 
      value={{
        isExpanded,
        toggleSidebar,
        openDropdowns,
        toggleDropdown,
        isDropdownOpen
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const context = useContext(MenuContext)

  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }

  return context
} 