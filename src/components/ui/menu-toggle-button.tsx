import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { KeyboardEvent } from 'react'
import styled from 'styled-components'

const ToggleButtonContainer = styled.button`
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: center;
  background: #132644;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: background-color 0.2s ease-in-out;
  color: white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid white;
    border-radius: 0.5rem;
    outline-offset: -2px;
  }
`

interface ToggleButtonProps {
  isExpanded: boolean
  onClick: () => void
}

export default function ToggleButton({ isExpanded, onClick }: ToggleButtonProps) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <ToggleButtonContainer 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={isExpanded ? "Recolher menu" : "Expandir menu"}
      aria-expanded={isExpanded}
      tabIndex={0}
    >
      {isExpanded ? 
        <ChevronLeft color="white" size={22} /> :
        <ChevronRight color="white" size={22} />
      }
    </ToggleButtonContainer>
  )
} 