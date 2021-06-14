<template>
  <div>
    <h3>Каталог:</h3>
    <div class="goods-list">
      <div v-for="item in goods" :key="item.id_product" class="goods-item">
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
        <button>В корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
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
</style>