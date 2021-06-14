<template>
  <div>
    <div v-show="isVisibleCart">
      <h3>Корзина:</h3>
      <div class="basket-list">
        <div
          v-for="item in basketGoods"
          :key="item.id_product"
          class="goods-item"
        >
          <h3>{{ item.product_name }}</h3>
          <p>{{ item.price }}</p>
          <button @click="removeItem(item)">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisibleCart: {
      type: Boolean,
      default: false,
    },
    basketGoods: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    removeItem(item) {
      this.$emit("remove-to-cart", item);
    },
  },
};
</script>

<style>
.basket-list {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  flex-flow: row wrap;
}
</style>