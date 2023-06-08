/* userController.test.js em backend/src/tests/unit */
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const { userService } = require('../../services');
const tokenFunctions = require('../../middlewares/tokenFunctions');
const testController = require('../helpers/testController');
const { login, register } = require('../../controllers/userController');
// const { adminMock, userLoginMock } = require('../mocks/userMocks');

describe('UserController', () => {
  let loginStub;
  let createStub;
  // let token;
  let adminMock; 
  let userLoginMock;

  before(async () => {
    const mock = await require('../mocks/userMocks')();
    adminMock = mock.adminMock;
    userLoginMock = mock.userLoginMock;
    
    loginStub = sinon.stub(userService, 'login');
    createStub = sinon.stub(userService, 'createNewUser');
    token = tokenFunctions.generateToken({
      email: 'adm@ourshop.com',
      password: 'A1234567',
      role: 'administrator',
    });
  });

  after(() => {
    loginStub.restore();
    createStub.restore();
  });

  // afterEach(function(done) {
  //   this.timeout(5000);  // aumenta o tempo limite para 5000ms
  //   // Limpe o banco de dados ou redefina os stubs após cada teste
  //   User.deleteMany({})
  //     .then(() => done())
  //     .catch(done);
  // });

  describe('login', () => {
    before(() => loginStub.resolves({ token, id: adminMock.id, email: adminMock.email }));

    describe('Sucesso', () => {
      it('1. Deve retornar status 200 e um token no corpo da resposta', async () => {
        const loginData = { ...userLoginMock };
        const response = await testController(login, { body: loginData });
    
        expect(response.status).to.be.equal(200);
        expect(response.body).to.haveOwnProperty('token', token);
      });
    });
  });

  describe('register', () => {
    before(() => createStub.resolves({
      id: adminMock.id,
      name: adminMock.name,
      username: adminMock.username,
      email: adminMock.email,
      role: adminMock.role,
    }));

    describe('Sucesso', () => {
  
      it('2. Deve retornar status 201 e os dados do usuário no corpo da resposta', async () => {
        const userData = { ...adminMock };
        delete userData.id;
        const response = await testController(register, { body: userData });
        
        expect(response.status).to.be.equal(201);
        expect(response.body).to.haveOwnProperty('id', adminMock.id);
        expect(response.body).to.haveOwnProperty('name', adminMock.name);
        expect(response.body).to.haveOwnProperty('email', adminMock.email);
        expect(response.body).to.haveOwnProperty('role', adminMock.role);
      });
    });
  });
});