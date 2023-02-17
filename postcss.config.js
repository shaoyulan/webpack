/**
 * PostCSS
 * 1/ 加入瀏覽器的前綴詞（prefix），例如：-webkit-、-moz-。
 * 2/ 將先進的功能轉為目前主流瀏覽器所能支援的語法
 * 3/ 可使用新穎語法或加上自己撰寫的功能
 * 4/ 並非用來取代 SASS 這些預處理器的，而是用於結合、有彈性地擴充功能
 * 
 * 安裝 PostCSS 與相關套件。
 * 1/ npm install postcss postcss-loader autoprefixer precss --save-dev
 * 1-1/autoprefixer 用於加上各家瀏覽器的前綴詞
 * 1-2/precss 讓開發者可使用類似 SASS 的功能。
 */
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}