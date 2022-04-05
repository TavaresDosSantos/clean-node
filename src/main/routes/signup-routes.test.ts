import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should return an account on success', async () => {
    await request(app).post('/api/signup').send({
      name: 'euller',
      email: 'euller.tavares@mail.com',
      password: '123456',
      passwordConfirmation: '123456'
    }).expect(200)
  })
})
