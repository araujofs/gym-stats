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
  BadgeCheck,
  BarChart2,
  ChevronRight,
  ChevronsUpDown,
  Dumbbell,
  LogOut,
  NotebookPen,
  Plus,
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import '@/styles/sidebar.css'
import { Tooltip, TooltipContent } from '@/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useAuth } from '@/providers/auth-context'
import { Link } from 'react-router'

export function AppSidebar() {
  const { open, setOpen, isMobile } = useSidebar()
  const { user, logout } = useAuth()

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
          <Link to="/">
            <SidebarMenuItem>
              <SidebarMenuButton className="h-fit group-data-[collapsible=icon]:p-0!">
                <div className="bg-[#8833df] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Dumbbell />
                </div>
                <span className="sidebar-header-title">GymStats</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Create</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Link to='workout/create'>
                    <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Plus />
                      <span>Workout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Create workouts</TooltipContent>
              </Tooltip>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Register</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NotebookPen />
                      <span>Workouts</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </TooltipTrigger>
                <TooltipContent>Register workouts</TooltipContent>
              </Tooltip>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <NotebookPen />
                  <span>Weight</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Stats</SidebarGroupLabel>
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
                        <span>Weekly</span>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton>
                        <span>Per session</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <BarChart2 />
                      <span>Weight</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton>
                        <span>Exercises</span>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton>
                        <span>Body weight</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {user
                        ? user.user_metadata.name
                            .split(' ')
                            .slice(0, 2)
                            .map((n: string) => n[0].toUpperCase())
                        : 'NF'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.user_metadata.name}
                    </span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {user
                          ? user.user_metadata.name
                              .split(' ')
                              .slice(0, 2)
                              .map((n: string) => n[0].toUpperCase())
                          : 'GS'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.user_metadata.name}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
