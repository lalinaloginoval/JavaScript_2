const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const makeGETRequest = (url, callback) => {

  return new Promise((res, rej) => {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(xhr.responseText);
          res('Done!');
        }
        else rej('Request returns an error!');
      }
    }

    xhr.open('GET', url, true);
    xhr.send();
  })
}

class GoodsItem {
  constructor(id_product, product_name, price) {
    this.id_product = id_product;
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    let data = {
      id_product: this.id_product,
      "price": this.price,
      "product_name": this.product_name,
    };

    data = JSON.stringify(data);

    return `<div class="goods-item">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
      <button data-product='${data}' id='add-btn-${this.id_product}'>В корзину</button>
    </div>`;
  }
}

class GoodsList {
  basket = new BasketList();

  constructor() {
    this.goods = [];
  }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;

    document.querySelector('.totalPrice').innerHTML = `Стоимость всех товаров в каталоге ${this.getTotalPrice()}`;
    this.basket.setAddListener(this.goods);
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

  render() {
    return `<div class="goods-item">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
      <button id='remove-btn-${this.id_product}'>Удалить из корзины</button>
    </div>`;
  }
}

class BasketList {
  constructor() {
    this.goods = [];
  }

  addItem({ target }) {
    let { product = {} } = target.dataset;
    this.goods.push(JSON.parse(product));
    this.render();
  }

  setAddListener(list = [{ id_product: 123 }, { id_product: 456 }]) {
    list.forEach((item) => {
      document.getElementById(`add-btn-${item.id_product}`).addEventListener('click', (e) => this.addItem(e));
    })
  }

  removeItem({ target }) {
    const { id } = target.dataset;
    this.goods = this.goods.filter((item) => String(item.id_product) !== String(id));
    this.render();
  }

  setRemoveListener() {
    this.goods.forEach((item) => {
      document.getElementById(`remove-btn-${item.id_product}`).addEventListener('click', (e) => this.removeItem(e));
    })
  }

  clearBasket() { this.goods = []; }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new BasketItem(good.id_product, good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.basket-list').innerHTML = listHtml;
    this.setRemoveListener();
  }
};

function showBasket() {
  let div = document.getElementById('basket');
  if (div.style.display === 'none')
    div.style.display = 'flex';
  else div.style.display = 'none';
};

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});