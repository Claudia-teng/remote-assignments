function avg(data) {
  if (data.size === 0) return 0;
  let total = data.products
    .reduce((acc, obj) => {
      return acc + obj.price;
    }, 0);
  return total/data.size;
}

let data1 = {
  size: 3, 
  products: [
    {
      name: 'Product 1',
      price: 100
    },
    {
      name: 'Product 2',
      price: 700
    },
    {
      name: 'Product 3',
      price: 250
    },
  ]
}

let data2 = {
  size: 0,
  products: []
}

let data3 = {
  size: 1,
  products: [
    {
      name: 'Product 1',
      price: 100
    }
  ]
}

let data4 = {
  size: 2,
  products: [
    {
      name: 'Product 1',
      price: 100
    },
    {
      name: 'Product 2',
      price: 700
    }
  ]
}