/* userMocks.js em backend/src/tests/mocks */
const bcrypt = require('bcrypt');

async function createMock() {
  const adminPassword = 'A1234567';
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  const adminMock = {
    name: 'Our Shop Admin',
    username: 'admin',
    email: 'adm@ourshop.com',
    get password() {
      return hashedAdminPassword;
    },
    role: 'administrator'
  };

  const userLoginMock = {
    email: 'adm@ourshop.com',
    password: 'A1234567'
  }

  return {
    adminMock,
    userLoginMock,
  };
}

module.exports = createMock;