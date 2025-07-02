import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar
} from '@/components/ui/sidebar'
import { BarChart2, ChevronRight, Dumbbell } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import '@/styles/sidebar.css'
import { useState } from 'react'

export function AppSidebar() {
  const { open, setOpen } = useSidebar()
  const [hovered, setHovered] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  return (
    <Sidebar
      variant='inset'
      collapsible="icon"
      onMouseEnter={() => {
        setTimeoutId(
          setTimeout(() => {
            if (!hovered && !open) {
              setOpen(true)
              setHovered(true)
            }
          }, 150)
        )
      }}
      onMouseLeave={() => {
        clearTimeout(timeoutId)
        if (hovered) {
          setOpen(false)
          setHovered(false)
        }
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-fit group-data-[collapsible=icon]:p-0!">
              <div className="bg-[#8833df] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Dumbbell />
              </div>
              <span className="sidebar-header-title">GymStats</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Estatísticas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <BarChart2 />
                      <span>Volume</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton>
                        <span>Semanal</span>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton>
                        <span>Por sessão</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Registros</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
