import {Author} from '@interfaces/index'
import {baseApiPath} from '../config'
import fetch from 'isomorphic-unfetch'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fetcher(url: string): Promise<any> {
  return fetch(url).then(r => r.json())
}

export function url(path: string): string {
  return `${baseApiPath}/${path}`
}

export function formattedBornDie(author: Author): string {
  const formattedBirthDate = new Date(author.birth_date).toLocaleDateString()

  if (!author.death_date) {
    return formattedBirthDate
  }

  const formattedDeathDate = new Date(author.death_date).toLocaleDateString()

  return `${formattedBirthDate} – ${formattedDeathDate}`
}
