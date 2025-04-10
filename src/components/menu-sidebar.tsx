import {  ChartPie, File, Monitor, UserRound, Users } from 'lucide-react'
import MenuItem from './ui/menu-item'
import ToggleButton from './ui/menu-toggle-button'
import { MenuSection } from './ui/menu-section'
import { useMenu } from '../contexts/MenuContext'
import { MenuContainer } from './ui/menu-container'
import { MenuLogo } from './ui/menu-logo'



export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useMenu()
  const collapsed = !isExpanded

  return (
    <MenuContainer collapsed={collapsed}>
     <MenuSection>
      <MenuLogo/>
      <MenuItem 
        id="option1"
        icon={ChartPie}
        label="Option 1"
      />
      <MenuItem 
        id="option2"
        icon={Monitor}
        label="Option 2"
      />
      <MenuItem 
        id="users"
        icon={UserRound}
        label="User"
        subItems={[
          { label: "user 1", onClick: () => console.log("User 1") },
          { label: "user 2", onClick: () => console.log("User 2") }
        ]}
      />
      <MenuItem 
        id="team"
        icon={Users}
        label="Teams"
        subItems={[
          { label: "Team 1", onClick: () => console.log("Team 1") },
          { label: "Team 2", onClick: () => console.log("Team 2") }
        ]}
      />
      <MenuItem 
        id="reports"
        icon={File}
        label="Files"
      />
     </MenuSection>
      <ToggleButton 
        isExpanded={isExpanded} 
        onClick={toggleSidebar}
      />
    </MenuContainer>
  )
}
