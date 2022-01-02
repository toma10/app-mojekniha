import {buildQueryString, formattedBornDie} from '../../utils'

describe('utils', () => {
  test('building query string', () => {
    expect(buildQueryString('1')).toEqual('page=1')
    expect(buildQueryString('2', {'author.id': 1})).toEqual(
      'filter[author.id]=1&page=2',
    )
    expect(buildQueryString('3', {'author.id': 1, 'genre.id': 4})).toEqual(
      'filter[author.id]=1&filter[genre.id]=4&page=3',
    )
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
