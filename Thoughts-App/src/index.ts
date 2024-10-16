import { Hono } from 'hono'

const app = new Hono()

//we need file based routing for the app

app.post('/api/v1/user/signup', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/user/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/user/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/user/blog/blog', (c) => {
  return c.text('Hello Hono!')
})

export default app

//but we also need prisma to create a connection pool to access the database
//since we are creting a serverless application so it will create multiple instances of an application around the world
//it is wrong approach when multiple mini machines connect to db it is good practice to connect to a connection pool first.

