<template>
  <div id="app">
    <Header @show-basket="showBasket" @filtered-goods="getFilteredGoods" />
    <main>
      <GoodsList @add-to-cart="addToCart" :goods="filteredGoods" />
      <hr />
      <Basket
        @remove-to-cart="removeFromCart"
        :basketGoods="basketGoods"
        :isVisibleCart="isVisibleCart"
      />
    </main>
  </div>
</template>

<script>
import GoodsList from "./components/GoodsList";
import Header from "./components/Header";
import Basket from "./components/Basket";

const API_URL = "http://localhost:3000";

export default {
  components: {
    GoodsList,
    Header,
    Basket,
  },
  data: () => ({
    goods: [],
    basketGoods: [],
    filteredGoods: [],
    isVisibleCart: false,
  }),
  mounted() {
    this.getGoods();
    this.getCart();
  },
  methods: {
    addToCart(item) {
      this.makePOSTRequest(`${API_URL}/addToCart`, item).then(() =>
        this.getCart()
      );
    },
    removeFromCart(item) {
      this.makePOSTRequest(`${API_URL}/removeFromCart`, item).then(() =>
        this.getCart()
      );
    },
    makeGETRequest(url) {
      return fetch(url).then((data) => data.json());
    },
    makePOSTRequest(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());
    },
    getGoods() {
      this.makeGETRequest(`${API_URL}/catalogData`).then((data) => {
        this.goods = data;
        this.filteredGoods = data;
      });
    },
    getCart() {
      this.makeGETRequest(`${API_URL}/cartData`).then((data) => {
        this.basketGoods = data;
      });
    },
    getFilteredGoods(value) {
      const regexp = new RegExp(value, "i");
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
</style>
