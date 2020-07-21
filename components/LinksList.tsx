import React from 'react'

interface Item {
  id: number
  name: string
}

type ListProps<T> = {
  items: T[]
  renderItem: (item: T) => JSX.Element
}

function LinksList<T>({items, renderItem}: ListProps<T>): JSX.Element {
  const links = items.map(item => renderItem(item))

  if (links.length > 0) {
    return links.reduce((result, item) => (
      <React.Fragment>
        {result}
        {', '}
        {item}
      </React.Fragment>
    ))
  }

  return null
}

export default LinksList
