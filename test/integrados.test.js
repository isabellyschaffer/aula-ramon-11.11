const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../index'); 

const userToken = jwt.sign({ id: 'user-id', admin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });

const res = await request(app).get('/users');  


 

describe('Testes de integração para Usuários', () => {
  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${userToken}`) 
      .send({ nome: 'João', email: 'joao@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

 
});


describe('Testes de integração para Usuários', () => {
  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/users')
      .send({ nome: 'João', email: 'joao@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Deve retornar todos os usuários', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve retornar um usuário pelo ID', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });
});


describe('Testes de integração para Projetos', () => {
    it('Deve criar um novo projeto', async () => {
      const res = await request(app)
        .post('/projects')
        .send({ nome: 'Novo Projeto' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
    });
  
    it('Deve retornar todos os projetos', async () => {
      const res = await request(app).get('/projects');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  
    it('Deve retornar um projeto pelo ID', async () => {
      const res = await request(app).get('/projects/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });
  });
  

  describe('Testes de integração para Comentários', () => {
    let userToken;
    let projectId;
  
    beforeAll(async () => {
      // Criar e autenticar usuário
      const userRes = await request(app)
        .post('/users')
        .send({ nome: 'Ana', email: 'ana@example.com', senha: '123456' });
      userToken = userRes.body.token;
  
      // Criar um projeto para comentar
      const projectRes = await request(app)
        .post('/projects')
        .send({ nome: 'Projeto Comentários' })
        .set('Authorization', `Bearer ${userToken}`);
      projectId = projectRes.body.id;
    });
  
    it('Deve adicionar um comentário a um projeto', async () => {
      const res = await request(app)
        .post(`/projects/${projectId}/comments`)
        .send({ texto: 'Este é um comentário' })
        .set('Authorization', `Bearer ${userToken}`);
  
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.texto).toBe('Este é um comentário');
    });
  
    it('Deve retornar todos os comentários de um projeto', async () => {
      const res = await request(app)
        .get(`/projects/${projectId}/comments`)
        .set('Authorization', `Bearer ${userToken}`);
  
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  
    it('Deve retornar um comentário específico pelo ID', async () => {
      const res = await request(app)
        .get(`/projects/${projectId}/comments/1`)
        .set('Authorization', `Bearer ${userToken}`);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });
  });
  
