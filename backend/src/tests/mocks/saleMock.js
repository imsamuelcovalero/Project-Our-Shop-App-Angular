const salesUserMock = [
  {
    id: 1,
    userId: 3,
    sellerId: 1,
    totalPrice: 190.56,
    deliveryAddress: 'Rua da Pamonha',
    deliveryNumber: '27',
    saleDate: '2022-10-29T05:04:07.000Z',
    status: 'Pendente'
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: 190.56,
    deliveryAddress: 'Rua da Pamonha',
    deliveryNumber: '27',
    saleDate: '2022-10-29T05:06:34.000Z',
    status: 'Pendente'
  },
  {
    id: 3,
    userId: 3,
    sellerId: 3,
    totalPrice: 190.56,
    deliveryAddress: 'Rua da Pamonha',
    deliveryNumber: '27',
    saleDate:'2022-10-29T05:08:21.000Z',
    status: 'Pendente'
  },
];

const saleMock = {
  id: 4,
  userId: 3,
  sellerId: 2,
  totalPrice: 190.56,
  deliveryAddress: 'Rua da Pamonha',
  deliveryNumber: '27',
  saleDate: '2022-10-29T05:04:07.000Z',
  status: 'Pendente',
};

const createSaleDataMock = {
  id: 4,
  userId: 3,
  sellerId: 2,
  totalPrice: 190.56,
  deliveryAddress: 'Rua da Pamonha',
  deliveryNumber: '27',
  products: [
    { id: 1, price:  2.2, quantity: 3 },
    { id: 1, price: 7.5, quantity: 6 }
  ]
};

const saleUpdated = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 190.56,
  deliveryAddress: 'Rua da Pamonha',
  deliveryNumber: '27',
  saleDate: '2022-10-29T05:04:07.000Z',
  status: 'Entregue'
}

module.exports = {
  salesUserMock,
  saleMock,
  createSaleDataMock,
  saleUpdated,
};
