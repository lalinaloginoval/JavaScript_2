<template>
  <div id="app">
    <header>
      <div>
        <input v-model="searchLine" type="text" class="goods-search" />
        <button class="search-button" type="button" @click="getFilteredGoods">
          Искать
        </button>
      </div>
      <button class="cart-button" type="button" @click="showBasket">
        Перейти в корзину
      </button>
    </header>
    <main>
      <h3>Каталог:</h3>
      <div class="goods-list">
        <div
          v-for="item in filteredGoods"
          :key="item.id_product"
          class="goods-item"
        >
          <h3>{{ item.product_name }}</h3>
          <p>{{ item.price }}</p>
          <button>В корзину</button>
        </div>
      </div>
      <hr />
      <div v-show="isVisibleCart">
        <h3>Корзина:</h3>
        <div class="basket-list"></div>
      </div>
    </main>
  </div>
</template>

<script>
const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

export default {
  data: () => ({
    goods: [],
    filteredGoods: [],
    searchLine: "",
    isVisibleCart: false,
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`);
  },
  watch: {
    searchLine: function () {
      this.getFilteredGoods();
    },
  },
  methods: {
    makeGETRequest(url) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        });
    },
    getFilteredGoods() {
      const regexp = new RegExp(this.searchLine, "i");
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },
    showBasket() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  padding: 30px 50px;
  margin-bottom: 30px;
  box-shadow: rgb(16 112 177 / 20%) 5px 20px 50px;
}

.card-button {
  border-radius: 20px;
  padding: 5px 25px;
  box-shadow: rgb(16 112 177 / 20%) 5px 20px 50px;
  background: white;
}

.goods-list {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  flex-flow: row wrap;
}

.goods-item {
  width: 200px;
  max-width: 200px;
  padding: 44px 32px;
  box-sizing: border-box;
  box-shadow: 5px 20px 50px rgb(16 112 177 / 20%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 50px;
}

.basket-list {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  flex-flow: row wrap;
}

.goods-search,
.search-button {
  height: 100%;
}
</style>
