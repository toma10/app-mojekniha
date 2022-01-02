import {Author} from '@interfaces/index'

export function buildQueryString(
  page = '1',
  filters: Record<string, string | number> = null,
): string {
  if (filters) {
    const filtersQueryString = Object.entries(filters)
      .filter(Boolean)
      .reduce(
        (queryString, [key, value]) =>
          queryString.length === 0
            ? `filter[${key}]=${value}`
            : `${queryString}&filter[${key}]=${value}`,
        '',
      )

    return `${filtersQueryString}&page=${page}`
  }

  return `page=${page}`
}

export function formattedBornDie(author: Author): string {
  const formattedBirthDate = new Date(author.birth_date).toLocaleDateString()

  if (!author.death_date) {
    return formattedBirthDate
  }

  const formattedDeathDate = new Date(author.death_date).toLocaleDateString()

  return `${formattedBirthDate} – ${formattedDeathDate}`
}
