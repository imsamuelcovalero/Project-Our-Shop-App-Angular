/* userService.test.js em backend/src/tests/unit */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const expect = chai.expect;
chai.use(chaiAsPromised);

const { User } = require('../../models/models');
const userService = require('../../services/userService');
const createMock = require('../mocks/userMocks');
const createStub = sinon.stub(User, 'create');

describe('UserService', () => {
  let findOneStub;
  let adminMock;
  let userLoginMock;

  before(async () => {
    const mock = await createMock();
    adminMock = mock.adminMock;
    userLoginMock = mock.userLoginMock;

    findOneStub = sinon.stub(User, 'findOne');
  });

  after(() => {
    findOneStub.restore();
  });

  describe('login', () => {
    describe('Sucesso', () => {
      before(() => {
        findOneStub.resolves(adminMock);
      });

      it('3. Deve retornar um token', async () => {
        const userData = {
          identifier: 'admin',
          password: userLoginMock.password
        };
    
        await expect(userService.login(userData)).to.eventually.have.property('token');
      });
    });

    describe('Falha', () => {
      it('4. Deve lançar um erro - usuário não encontrado', async () => {
        findOneStub.resolves(null);
        const userData = {
          identifier: 'admin',
          password: userLoginMock.password
        };
    
        await expect(userService.login(userData)).to.eventually.to.be.rejectedWith('User not found');
      });

      it('5. Deve lançar um erro - senha incorreta', async () => {
        findOneStub.resolves(adminMock);
        const userData = {
          identifier: 'admin',
          password: 'wrongpassword'
        };
    
        await expect(userService.login(userData)).to.eventually.to.be.rejectedWith('Incorrect password');
      });
    });
  });

  describe('createNewUser', () => {
    describe('Sucesso', () => {
      before(() => {
        findOneStub.resolves(null);
        createStub.resolves({
          name: 'First User',
          username: 'user1',
          email: 'teste@ourshop.com',
          password: 'A1234567',
          role: 'customer'
        });
      });

      after(() => {
        createStub.restore();
      });

      it('6. Deve retornar um objeto usuário', async () => {
        const userData = {
          name: 'First User',
          username: 'user1',
          email: 'teste@ourshop.com',
          password: 'A1234567',
          role: 'customer'
        };
          
        await expect(userService.createNewUser(userData)).to.eventually.to.be.an('object');
      });
    });

    describe('Falha', () => {
      before(() => findOneStub.resolves(adminMock));

      it('7. Deve lançar um erro - usuário já existe', async () => {
        findOneStub.resolves(adminMock);
        const userData = {
          name: 'Our Shop Admin',
          username: 'admin',
          email: 'adm@ourshop.com',
          password: 'A1234567',
          role: 'administrator'
        };
    
        await expect(userService.createNewUser(userData)).to.eventually.to.be.rejectedWith('User already exists');
      });

      it('8. Deve lançar um erro - falha ao criar usuário', async () => {
        findOneStub.resolves(null);
        const userData = {
          name: 'Failure Test',
          username: 'fail',
          email: 'fail@ourshop.com',
          password: 'Fail123',
          role: 'administrator'
        };
    
        // Simule uma falha na criação do usuário
        const createStub = sinon.stub(User, 'create').throws(new Error('Failed to create user'));
    
        await expect(userService.createNewUser(userData)).to.eventually.to.be.rejectedWith('Failed to create user');
        
        // Restaure o stub da função 'create' após o teste
        createStub.restore();
      });
    });
  });
});