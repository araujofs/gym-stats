import { Outlet } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import AppBreadcrumbs from '@/components/app-breadcrumbs'

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='!ml-0 !px-3'>
          <header className="flex items-center gap-2 h-14 shrink-0 transition-[width,height] group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <SidebarTrigger size={'lg'} />
            <Separator orientation="vertical" className="!h-5" />
            <AppBreadcrumbs />
          </header>
          <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
