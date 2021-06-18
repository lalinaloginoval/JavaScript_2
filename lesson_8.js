1) в файл webpack.config.js в module.exports добавить
optimization: {
    minimize: false
},

2) "scripts": {
    "build": "webpack --mode production ./src/index.js --output ./dist/main.js --watch"
}

4) Не особо поняла, что требовалось в итоге.Перечитала много всего.
Нашла только


const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Output",
        }),
    ],
};

Здесь плагин автоматически создает обновленный файл index.html