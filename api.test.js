import request from 'supertest';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('Lab 5 - Extended API Tests', () => {

  test('GET /posts/1 should return status 200 and valid post', async () => {
    const res = await request(BASE_URL).get('/posts/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });


  test('GET /posts/99999 should return 404', async () => {
    const res = await request(BASE_URL).get('/posts/99999');
    expect(res.status).toBe(404);
  });

  
  test('POST /posts should create post', async () => {
    const newPost = { title: 'Test Title', body: 'Test Body', userId: 1 };
    const res = await request(BASE_URL).post('/posts').send(newPost);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newPost);
    expect(res.body).toHaveProperty('id');
  });

 
  test('POST /posts without title should still return 201 but missing title', async () => {
    const res = await request(BASE_URL).post('/posts').send({ body: 'No title', userId: 1 });
    expect(res.status).toBe(201);
    expect(res.body).not.toHaveProperty('title');
  });


  test('PUT /posts/1 should update title', async () => {
    const update = { id: 1, title: 'Updated Title' };
    const res = await request(BASE_URL).put('/posts/1').send(update);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

test('PUT /posts/99999 returns 500 error', async () => {
  const res = await request(BASE_URL).put('/posts/99999').send({ title: 'Does not exist' });
  expect(res.status).toBe(500);
});



  test('DELETE /posts/1 should return empty object and status 200', async () => {
    const res = await request(BASE_URL).delete('/posts/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

 
  test('DELETE /posts/99999 should return 200 and empty object', async () => {
    const res = await request(BASE_URL).delete('/posts/99999');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  
  test('GET /posts should return array of posts with userId, id, title, body', async () => {
    const res = await request(BASE_URL).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).toHaveProperty('body');
  });

 
  test('GET /invalidpath should return 404', async () => {
    const res = await request(BASE_URL).get('/invalidpath');
    expect(res.status).toBe(404);
  });
});
