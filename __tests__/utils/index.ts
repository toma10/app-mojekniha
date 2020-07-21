import {fetcher, formattedBornDie, url} from '../../utils'

import fetch from 'isomorphic-unfetch'

const fetchMock = fetch as jest.Mock

jest.mock('isomorphic-unfetch')
jest.mock('../../config', () => ({
  baseApiPath: 'test.dev/api',
}))

describe('utils', () => {
  test('fetching data from url', async () => {
    const mockJson = jest.fn(() => ({
      data: {
        books: [],
      },
    }))

    fetchMock.mockResolvedValueOnce(Promise.resolve({json: mockJson}))

    const result = await fetcher('test.dev/books')

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('test.dev/books')
    expect(mockJson).toHaveBeenCalledTimes(1)
    expect(result).toEqual({
      data: {
        books: [],
      },
    })
  })

  test('building url', () => {
    expect(url('books')).toEqual('test.dev/api/books')
  })

  test('formatting author born – die date', () => {
    const authorA = {
      id: 1,
      name: 'Author Name',
      birth_date: '1923-03-15',
      death_date: '2001-07-16',
      biography: 'biography',
      formatted_biography: '<p>biography</p>',
      portrait_url: 'http://mojekniha.test/images/portrait-image.jpg',
      nationality: {
        id: 1,
        name: 'americká',
      },
    }

    expect(formattedBornDie(authorA)).toEqual('15. 3. 1923 – 16. 7. 2001')

    const authorB = {
      id: 1,
      name: 'Author Name',
      birth_date: '1923-03-15',
      death_date: null,
      biography: 'biography',
      formatted_biography: '<p>biography</p>',
      portrait_url: 'http://mojekniha.test/images/portrait-image.jpg',
      nationality: {
        id: 1,
        name: 'americká',
      },
    }

    expect(formattedBornDie(authorB)).toEqual('15. 3. 1923')
  })
})
