(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/goods_details/goods_details"],{"2b26":function(t,o,e){},"2f2a":function(t,o,e){"use strict";e.r(o);var n=e("d8d3"),r=e.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){e.d(o,t,(function(){return n[t]}))}(a);o["default"]=r.a},"4f4a":function(t,o,e){"use strict";e.r(o);var n=e("a51e"),r=e("2f2a");for(var a in r)["default"].indexOf(a)<0&&function(t){e.d(o,t,(function(){return r[t]}))}(a);e("545a");var i=e("f0c5"),s=Object(i["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);o["default"]=s.exports},"545a":function(t,o,e){"use strict";var n=e("2b26"),r=e.n(n);r.a},5850:function(t,o,e){"use strict";(function(t){var o=e("4ea4");e("7d3d");o(e("66fd"));var n=o(e("4f4a"));wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},a51e:function(t,o,e){"use strict";e.d(o,"b",(function(){return r})),e.d(o,"c",(function(){return a})),e.d(o,"a",(function(){return n}));var n={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"d521"))},uniGoodsNav:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav")]).then(e.bind(null,"8100"))}},r=function(){var t=this.$createElement;this._self._c},a=[]},d8d3:function(t,o,e){"use strict";(function(t){var n=e("4ea4");Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var r=n(e("2eee")),a=n(e("c973")),i=n(e("9523")),s=e("26cb");function c(t,o){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable}))),e.push.apply(e,n)}return e}function u(t){for(var o=1;o<arguments.length;o++){var e=null!=arguments[o]?arguments[o]:{};o%2?c(Object(e),!0).forEach((function(o){(0,i.default)(t,o,e[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):c(Object(e)).forEach((function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(e,o))}))}return t}var d={computed:u(u({},(0,s.mapState)("cart",["cart"])),(0,s.mapGetters)("cart",["total"])),watch:{total:{handler:function(t){var o=this.options.find((function(t){return"购物车"==t.text}));o&&(o.info=t)},immediate:!0}},data:function(){return{goodsInfo:{},options:[{icon:"shop",text:"店铺"},{icon:"cart",text:"购物车",info:0}],buttonGroup:[{text:"加入购物车",backgroundColor:"#ff0000",color:"#fff"},{text:"立即购买",backgroundColor:"#ffa200",color:"#fff"}]}},onLoad:function(t){var o=t.goods_id;console.log(t),this.getGoodsDetail(o)},methods:u(u({},(0,s.mapMutations)("cart",["addCart"])),{},{getGoodsDetail:function(o){var e=this;return(0,a.default)(r.default.mark((function n(){var a,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$http.get("/api/public/v1/goods/detail",{goods_id:o});case 2:if(a=n.sent,i=a.data,200==i.meta.status){n.next=6;break}return n.abrupt("return",t.$showMsg());case 6:i.message.goods_introduce=i.message.goods_introduce.replace(/<img /g,'<img style="display:block;" '),i.message.goods_introduce=i.message.goods_introduce.replace(/<img /g,'<img style="display:block;" ').replace(/webp/g,"jpg"),e.goodsInfo=i.message;case 9:case"end":return n.stop()}}),n)})))()},preview:function(o){t.previewImage({current:o,urls:this.goodsInfo.pics.map((function(t){return t.pics_big}))})},onClick:function(o){console.log(o),"购物车"==o.content.text&&t.switchTab({url:"/pages/cart/cart"})},buttonClick:function(t){if("加入购物车"==t.content.text){var o={goods_id:this.goodsInfo.goods_id,goods_name:this.goodsInfo.goods_name,goods_price:this.goodsInfo.goods_price,goods_count:1,goods_small_logo:this.goodsInfo.goods_small_logo,goods_state:!0};this.addCart(o)}}})};o.default=d}).call(this,e("543d")["default"])}},[["5850","common/runtime","common/vendor"]]]);