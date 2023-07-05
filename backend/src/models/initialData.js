/* initialData.js */
const bcrypt = require('bcrypt');
const { User, Product, WithdrawalPoint } = require('./models'); // Caminho para seus modelos
require('dotenv').config();

console.log('log de teste API_URL', process.env.API_URL);

const URL_IMG = process.env.API_URL || 'http://localhost:3000';

console.log('log de teste URL_IMG', URL_IMG);

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
    { name: 'Skol Lata 350ml', price: 2.20, url_image: `${URL_IMG}/images/skol_lata_350ml.jpg` },
    { name: 'Heineken 600ml', price: 7.50, url_image: `${URL_IMG}/images/heineken_600ml.jpg` },
    { name: 'Antarctica Pilsen 300ml', price: 2.49, url_image: `${URL_IMG}/images/antarctica_pilsen_300ml.jpg` },
    { name: 'Brahma 600ml', price: 7.50, url_image: `${URL_IMG}/images/brahma_600ml.jpg` },
    { name: 'Skol 269ml', price: 2.19, url_image: `${URL_IMG}/images/skol_269ml.jpg` },
    { name: 'Skol Beats Senses 313ml', price: 4.49, url_image: `${URL_IMG}/images/skol_beats_senses_313ml.jpg` },
    { name: 'Becks 330ml', price: 4.99, url_image: `${URL_IMG}/images/becks_330ml.jpg` },
    { name: 'Brahma Duplo Malte 350ml', price: 2.79, url_image: `${URL_IMG}/images/brahma_duplo_malte_350ml.jpg` },
    { name: 'Becks 600ml', price: 8.89, url_image: `${URL_IMG}/images/becks_600ml.jpg` },
    { name: 'Skol Beats Senses 269ml', price: 3.57, url_image: `${URL_IMG}/images/skol_beats_senses_269ml.jpg` },
    { name: 'Stella Artois 275ml', price: 3.49, url_image: `${URL_IMG}/images/stella_artois_275ml.jpg` },
  ];

  console.log('log de teste products', products);

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