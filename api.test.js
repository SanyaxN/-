import request from 'supertest';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API Tests', () => {
  // GET all
  test('GET /posts returns 100 items', async () => {
    const res = await request(BASE_URL).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(100);
  });

  test('GET /posts contains userId', async () => {
    const res = await request(BASE_URL).get('/posts');
    expect(res.body[0]).toHaveProperty('userId');
  });

  test('GET /posts returns array', async () => {
    const res = await request(BASE_URL).get('/posts');
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /posts contains title', async () => {
    const res = await request(BASE_URL).get('/posts');
    expect(res.body[0]).toHaveProperty('title');
  });

  test('GET /posts contains id', async () => {
    const res = await request(BASE_URL).get('/posts');
    expect(res.body[0]).toHaveProperty('id');
  });

  
  test('GET /posts/1 returns correct item', async () => {
    const res = await request(BASE_URL).get('/posts/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

 test('GET /posts/999 returns 404', async () => {
  const res = await request(BASE_URL).get('/posts/999');
  expect(res.status).toBe(404);
});


  test('GET /posts/1 contains userId and title', async () => {
    const res = await request(BASE_URL).get('/posts/1');
    expect(res.body).toHaveProperty('userId');
    expect(res.body).toHaveProperty('title');
  });

  test('GET /posts/1 returns object', async () => {
    const res = await request(BASE_URL).get('/posts/1');
    expect(typeof res.body).toBe('object');
  });

  test('GET /posts/0 returns {}', async () => {
    const res = await request(BASE_URL).get('/posts/0');
    expect(res.body).toEqual({});
  });

  
  test('POST /posts creates new post', async () => {
    const res = await request(BASE_URL)
      .post('/posts')
      .send({ title: 'Test', body: 'Content', userId: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('POST /posts with empty body', async () => {
    const res = await request(BASE_URL).post('/posts').send({});
    expect(res.status).toBe(201);
  });

  test('POST /posts with string userId', async () => {
    const res = await request(BASE_URL)
      .post('/posts')
      .send({ userId: 'abc', title: 'Title' });
    expect(res.status).toBe(201);
  });

  test('POST /posts response has title', async () => {
    const res = await request(BASE_URL)
      .post('/posts')
      .send({ title: 'New', body: 'Test', userId: 10 });
    expect(res.body).toHaveProperty('title', 'New');
  });

  test('POST /posts response has userId', async () => {
    const res = await request(BASE_URL)
      .post('/posts')
      .send({ title: 'New', body: 'Test', userId: 99 });
    expect(res.body.userId).toBe(99);
  });

 
  test('PUT /posts/1 updates post', async () => {
    const res = await request(BASE_URL)
      .put('/posts/1')
      .send({ id: 1, title: 'Updated', body: 'Body', userId: 1 });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated');
  });

  test('PUT /posts/1 with partial data', async () => {
    const res = await request(BASE_URL)
      .put('/posts/1')
      .send({ title: 'Only Title' });
    expect(res.status).toBe(200);
  });

  test('PUT /posts/0 returns object', async () => {
    const res = await request(BASE_URL)
      .put('/posts/0')
      .send({ title: 'Invalid ID' });
    expect(typeof res.body).toBe('object');
  });

  test('PUT /posts/1 preserves id', async () => {
    const res = await request(BASE_URL)
      .put('/posts/1')
      .send({ id: 1, title: 'Test' });
    expect(res.body.id).toBe(1);
  });

  test('PUT /posts/1 changes title', async () => {
    const res = await request(BASE_URL)
      .put('/posts/1')
      .send({ title: 'PUT Title' });
    expect(res.body.title).toBe('PUT Title');
  });

  
  test('DELETE /posts/1 returns empty body', async () => {
    const res = await request(BASE_URL).delete('/posts/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  test('DELETE /posts/999 returns status 200', async () => {
    const res = await request(BASE_URL).delete('/posts/999');
    expect(res.status).toBe(200);
  });

  test('DELETE /posts/1 is idempotent', async () => {
    await request(BASE_URL).delete('/posts/1');
    const res = await request(BASE_URL).delete('/posts/1');
    expect(res.status).toBe(200);
  });

  test('DELETE /posts/0 returns 200', async () => {
    const res = await request(BASE_URL).delete('/posts/0');
    expect(res.status).toBe(200);
  });

  test('DELETE /posts/abc returns 200', async () => {
    const res = await request(BASE_URL).delete('/posts/abc');
    expect(res.status).toBe(200);
  });
});
