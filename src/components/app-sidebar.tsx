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
import {
  BarChart,
  BarChart2,
  ChevronRight,
  Dumbbell,
  NotebookPen,
  NotebookText
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import '@/styles/sidebar.css'
import { useState } from 'react'
import { Tooltip, TooltipContent } from './ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

export function AppSidebar() {
  const { open, setOpen } = useSidebar()

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      onClick={() => {
        if (!open) {
          setOpen(true)
        }
      }}
      className={`${!open && 'hover:cursor-e-resize'}`}
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

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <BarChart />
                      <span>Peso</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton>
                        <span>Exercícios</span>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton>
                        <span>Corporal</span>
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
          <SidebarGroupContent>
            <SidebarMenu>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NotebookText />
                      <span>Treinos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  Registrar e consultar treinos
                </TooltipContent>
              </Tooltip>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <NotebookPen />
                  <span>Peso</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
