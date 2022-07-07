const request = require('supertest')

const server = require('../server')
const db = require('../db/gallery')
const log = require('../logger')
const { getAdminToken } = require('./mockToken')

jest.mock('../db/gallery')
jest.mock('../logger')

const testAuthAdminHeader = {
  Authorization: `Bearer ${getAdminToken()}`,
}

describe('GET /api/v1/gallery/:id', () => {
  it('responds with the correct gallery', () => {
    db.getImages.mockImplementation(() => {
      return Promise.resolve([
        {
          id: 1,
          name: 'banana',
          mimetype: 'mimetype',
          image: 'theimage',
        },
      ])
    })

    return request(server)
      .get('/api/v1/gallery/3')
      .then((res) => {
        expect(res.body).toHaveLength(1)
        expect(res.body[0].id).toBe(1)
        expect(res.body[0].name).toBe('banana')
        expect(res.body[0].mimetype).toBe('mimetype')
        expect(res.body[0].image).toBe('theimage')
        return null
      })
  })

  it('responds with the status 500', () => {
    db.getImages.mockImplementation(() => {
      return Promise.reject(new Error('mock getImages error'))
    })

    return request(server)
      .get('/api/v1/gallery/3')
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock getImages error')
        expect(res.body.error.title).toBe('Unable to retrieve gallery images')
        return null
      })
  })
})

const mockImage = {
  name: 'banana',
  mimetype: 'mimetype',
  image: 'theimage',
  garden_id: 1,
}

describe('POST /api/v1/:gardenId', () => {
  it('responds with the correct gallery', () => {
    db.addImage.mockImplementation((image) => {
      expect(image.garden_id).toBe(1)
      expect(image.id).toBe(1)
      expect(image.mimetype).toMatch('mimetype')
      expect(image.image).toMatch('theimage')
      return Promise.resolve(mockImage)
    })
  })

  it('responds with the status 500', async () => {
    // db.addImage.mockImplementation(() => {
    //   return Promise.reject(new Error('mock addImage error'))
    // })
    return request(server)
      .post('/api/v1/gallery')
      .set(testAuthAdminHeader)
      .expect('Content-Type', 'application/json')
      .then((res) => {
        //expect(res.status).toBe(500)
        expect(log).toHaveBeenCalledWith('mock addImage error')
        expect(res.body.error.title).toBe('Unable to add gallery images')
        return null
      })
  })
})
// it('responds with the status 500', () => {
//     db.addImage.mockImplementation(() => {
//       return Promise.reject(new Error('mock addImage error'))
//     })
//   })
//it('responds with the status 500', () => {
//   db.addImage.mockImplementation((image) => {
//     return Promise.reject(new Error('mock addImage error'))
//   })
//   return request(server)
//     .post('/api/v1/gallery/2')
//     .send(mockImage)
//     .then((res) => {
//       expect(res.status).toBe(500)
//       return null
//     })
// })
