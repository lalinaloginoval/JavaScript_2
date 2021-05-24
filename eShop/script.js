class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;

    document.querySelector('.totalPrice').innerHTML = `Стоимость всех товаров в каталоге ${this.getTotalPrice()}`;
  }

  getTotalPrice() {
    return this.goods.reduce(function (totalPrice, good) { return totalPrice + good.price }, 0);
  }
}

class BasketItem extends GoodsItem {
  constructor(...args) {
    super(...args);
    this.quantity = 0;
  }
  add() { }
  remove() { }
}

class BasketList extends GoodsList {
  constructor(...args) {
    super(...args);
  }
  addItem() { }
  removeItem() { }
  clearBasket() { }
}

const list = new GoodsList();
list.fetchGoods();
list.render();