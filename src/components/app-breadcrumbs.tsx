import { useMatches } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './ui/breadcrumb'

export default function AppBreadcrumbs() {
  const matches = useMatches()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matches.map((match, idx) => {
          if (match?.handle?.breadcrumb) {
            return idx != matches.length - 1  ? (
              <>
                <BreadcrumbItem key={idx}>
                  <BreadcrumbLink href={match.pathname}>
                    {match.handle.breadcrumb}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator key={idx*length} />
              </>
            ) : (
              <BreadcrumbItem key={idx}>
                <BreadcrumbPage>{match.handle.breadcrumb}</BreadcrumbPage>
              </BreadcrumbItem>
            )
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
