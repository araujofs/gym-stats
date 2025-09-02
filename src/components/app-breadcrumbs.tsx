import { useMatches, type UIMatch } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './ui/breadcrumb'
import { Fragment } from 'react/jsx-runtime'

interface Handle {
  breadcrumb: string
}

export default function AppBreadcrumbs() {
  const matches = useMatches() as UIMatch<unknown, Handle>[]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matches.map((match, idx) => {
          const breadcrumb = match?.handle?.breadcrumb

          console.log(matches)

          if (!breadcrumb) return

          if (idx === matches.length - 1)
            return (
              <BreadcrumbItem key={idx}>
                <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
              </BreadcrumbItem>
            )

          // if (breadcrumb === 'Home') return

          return (
            <Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink href={match.pathname}>
                  {breadcrumb}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
