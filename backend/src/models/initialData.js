/* initialData.js */
const bcrypt = require('bcrypt');
const { User, Product, WithdrawalPoint } = require('./models'); // Caminho para seus modelos

async function insertInitialData() {
  // Inserir usuário administrador
  const adminPassword = 'A1234567';
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  // Verifica se o usuário administrador já existe
  const adminExists = await User.findOne({ email: 'adm@ourshop.com' });

  // Se o usuário administrador não existir, cria-o
  if (!adminExists) {
    const adminUser = new User({
      name: 'Our Shop Admin',
      username: 'admin',
      email: 'adm@ourshop.com',
      password: hashedAdminPassword,
      role: 'administrator',
      cashback_value: 0
    });

    await adminUser.save();
  }

  // Inserir produtos
  const products = [
    { name: 'Skol Lata 350ml', price: 2.20, url_image: 'http://localhost:3000/images/skol_lata_350ml.jpg' },
    { name: 'Heineken 600ml', price: 7.50, url_image: 'http://localhost:3000/images/heineken_600ml.jpg' },
    { name: 'Antarctica Pilsen 300ml', price: 2.49, url_image: 'http://localhost:3000/images/antarctica_pilsen_300ml.jpg' },
    { name: 'Brahma 600ml', price: 7.50, url_image: 'http://localhost:3000/images/brahma_600ml.jpg' },
    { name: 'Skol 269ml', price: 2.19, url_image: 'http://localhost:3000/images/skol_269ml.jpg' },
    { name: 'Skol Beats Senses 313ml', price: 4.49, url_image: 'http://localhost:3000/images/skol_beats_senses_313ml.jpg' },
    { name: 'Becks 330ml', price: 4.99, url_image: 'http://localhost:3000/images/becks_330ml.jpg' },
    { name: 'Brahma Duplo Malte 350ml', price: 2.79, url_image: 'http://localhost:3000/images/brahma_duplo_malte_350ml.jpg' },
    { name: 'Becks 600ml', price: 8.89, url_image: 'http://localhost:3000/images/becks_600ml.jpg' },
    { name: 'Skol Beats Senses 269ml', price: 3.57, url_image: 'http://localhost:3000/images/skol_beats_senses_269ml.jpg' },
    { name: 'Stella Artois 275ml', price: 3.49, url_image: 'http://localhost:3000/images/stella_artois_275ml.jpg' }
  ];

  // Verifica se os produtos já existem
  const productsExist = await Product.find().exec();

  // Se não existem produtos, insere-os
  if (productsExist.length === 0) {
    for (let productData of products) {
      const product = new Product(productData);
      await product.save();
    }
  }

  // Inserir  WithdrawalPoints
  const withdrawalPoints = [
    { name: 'Padaria do Zé', address: 'Avenida Trabalhador São Calense, 525' },
    { name: 'Quintanda da Felicidade', address: 'Rua Miguel Petroni, 627' },
    { name: 'Posto Vá com Deus', address: 'Avenida Comendador Alfredo Maffei, 138' }
  ];

  // Verifica se os pontos de retirada já existem
  const withdrawalPointsExist = await WithdrawalPoint.find().exec();

  // Se não existem pontos de retirada, insere-os
  if (withdrawalPointsExist.length === 0) {
    for (let withdrawalPointData of withdrawalPoints) {
      const withdrawalPoint = new WithdrawalPoint(withdrawalPointData);
      await withdrawalPoint.save();
    }
  }
}

module.exports = insertInitialData;