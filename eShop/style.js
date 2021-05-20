let styleMainNav = () => {
    let style = 'display: flex; justify-content: flex-end; padding: 30px 50px; \
        margin-bottom: 30px; box-shadow: rgb(16 112 177 / 20%) 5px 20px 50px;'

    document.querySelector('header').style = style;
}

let styleButtonBasket = () => {
    let style = 'border-radius: 20px; padding: 5px 25px; box-shadow: rgb(16 112 177 / 20%) 5px 20px 50px; background: white;'

    document.querySelector('.cart-button').style = style;
}

let styleGoodsList = () => {
    let style = 'display: flex; justify-content: space-between; padding-top: 20px;'

    document.querySelector('.goods-list').style = style;
}

let styleGoodsItem = () => {
    let style = 'width: 200px; padding: 44px 32px; box-sizing: border-box; \
    box-shadow: 5px 20px 50px rgb(16 112 177 / 20%); border-radius: 10px; display: flex; flex-direction: column;'

    document.querySelectorAll('.goods-item').forEach((e) => e.style = style)
}

function callStyle() {
    styleMainNav();
    styleButtonBasket();
    styleGoodsList();
    styleGoodsItem();
}

callStyle();
