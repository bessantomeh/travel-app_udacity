const request = require('supertest');
const server = require('../src/server/server.js'); 

describe('Test the root path', () => {
    it('should respond with a status of 200 on the root path', async () => {
        const response = await request(server).get('/'); 
        expect(response.statusCode).toBe(200);
    });
});

afterAll((done) => {
    server.close();   
    done();
});
