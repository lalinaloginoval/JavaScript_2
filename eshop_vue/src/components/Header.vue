<template>
  <div>
    <header>
      <div>
        <input v-model="searchLine" type="text" class="goods-search" />
        <button class="search-button" type="button" @click="getFilteredGoods">
          Искать
        </button>
      </div>
      <button class="cart-button" type="button" @click="$emit('show-basket')">
        Перейти в корзину
      </button>
    </header>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchLine: "",
  }),
  methods: {
    getFilteredGoods() {
      this.$emit("filtered-goods", this.searchLine);
    },
  },
  watch: {
    searchLine: function () {
      this.getFilteredGoods();
    },
  },
};
</script>

<style scoped>
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

.goods-search,
.search-button {
  height: 100%;
}
</style>