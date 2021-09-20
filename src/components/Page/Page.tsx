import type { PageFields } from '../../types'
import ComponentMap from '../ComponentMap'

export interface PageProps {
  page: PageFields
}

export default function Page({ page }: PageProps): JSX.Element {
  return (
    <>
      {page.components?.map((component, index) => {
        if (component.sys.contentType.sys.id) {
          const Component = ComponentMap.get(component.sys.contentType.sys.id)
          return <Component {...component.fields} key={index} />
        }
      })}
    </>
  )
}
