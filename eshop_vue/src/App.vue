<template>
  <div id="app">
    <Header @show-basket="showBasket" @filtered-goods="getFilteredGoods" />
    <main>
      <GoodsList :goods="filteredGoods" />
      <hr />
      <Basket :isVisibleCart="isVisibleCart" />
    </main>
  </div>
</template>

<script>
import GoodsList from "./components/GoodsList";
import Header from "./components/Header";
import Basket from "./components/Basket";

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

export default {
  components: {
    GoodsList,
    Header,
    Basket,
  },
  data: () => ({
    goods: [],
    filteredGoods: [],
    isVisibleCart: false,
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`);
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
