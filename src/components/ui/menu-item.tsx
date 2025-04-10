import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react'
import React, { KeyboardEvent } from 'react'
import styled from 'styled-components'
import { useMenu } from '../../contexts/MenuContext'

const MenuItemContainer = styled.button<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isExpanded }) => isExpanded ? 'flex-start' : 'center'};
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  min-height: 1.25rem;
  transition: background-color 0.2s ease-in-out;
  margin: 0 1rem;
  border-radius: 0.5rem;
  color: white;
  opacity: 0.8;
  background: none;
  border: none;
  width: calc(100% - 2rem);
  text-align: left;

  &:hover {
    background-color: #1777ff;
    border-radius: 0.5rem;
    opacity: 1;
    outline: none;
  }

  &:focus {
    border-radius: 0.5rem;
    opacity: 1;
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: -2px;
  }
`

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const SubMenuItemWrapper = styled.div<{ isExpanded: boolean }>`
  padding-left: ${({ isExpanded }) => isExpanded ? '48px' : '0px'};
  cursor: pointer;
  min-height: 1.25rem;
`

const SubMenuItemButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #ccc;
  transition: all 0.2s ease-in-out;
  border-radius: 0.5rem;
  margin-right: 1rem;
  background: none;
  border: none;
  width: calc(100% - 1rem);
  text-align: left;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #1777ff;
    outline: none;
  }

  &:focus {
    color: white;
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: -2px;
  }
`

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

interface SubItemProps {
  label: string
  onClick?: () => void
}

interface MenuItemProps {
  id: string
  icon: LucideIcon
  label: string
  onClick?: () => void
  subItems?: SubItemProps[]
}

export default function MenuItem({ 
  id,
  icon: Icon, 
  label, 
  onClick,
  subItems 
}: MenuItemProps) {
  const { isExpanded, toggleDropdown, isDropdownOpen } = useMenu()
  const hasSubItems = subItems && subItems.length > 0
  const isOpen = isDropdownOpen(id)

  const handleClick = () => {
    if (hasSubItems) {
      toggleDropdown(id)
    }
    onClick?.()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <>
      <MenuItemContainer 
        isExpanded={isExpanded} 
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        aria-expanded={hasSubItems ? isOpen : undefined}
        aria-haspopup={hasSubItems ? "true" : undefined}
        tabIndex={0}
      >
        <Icon color="white" size={16} />
        {isExpanded && (
          <LabelContainer>
            <span>{label}</span>
            {hasSubItems && (
              isOpen ? 
                <ChevronUp size={16} /> : 
                <ChevronDown size={16} />
            )}
          </LabelContainer>
        )}
      </MenuItemContainer>

      {isOpen && isExpanded && hasSubItems && (
        <SubMenu role="menu">
          {subItems.map((item, index) => (
            <SubMenuItemWrapper 
              key={index} 
              isExpanded={isExpanded}
            >
              <SubMenuItemButton
                onClick={item.onClick}
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    item.onClick?.()
                  }
                }}
              >
                <span>{item.label}</span>
              </SubMenuItemButton>
            </SubMenuItemWrapper>
          ))}
        </SubMenu>
      )}
    </>
  )
}

