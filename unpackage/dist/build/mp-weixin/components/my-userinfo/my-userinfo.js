(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-userinfo/my-userinfo"],{"0285":function(e,t,n){"use strict";var r=n("455c"),u=n.n(r);u.a},"41e8":function(e,t,n){"use strict";n.r(t);var r=n("cbdd"),u=n("ad52");for(var o in u)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return u[e]}))}(o);n("0285");var c=n("f0c5"),a=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);t["default"]=a.exports},"455c":function(e,t,n){},"751c":function(e,t,n){"use strict";(function(e){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(n("2eee")),o=r(n("278c")),c=r(n("c973")),a=r(n("9523")),i=n("26cb");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,a.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d={name:"my-userinfo",computed:f({},(0,i.mapState)("user",["userInfo"])),data:function(){return{}},methods:f(f({},(0,i.mapMutations)("user",["updateUserInfo","updateToken","updateAddress"])),{},{logout:function(){var t=this;return(0,c.default)(u.default.mark((function n(){var r,c,a;return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.showModal({title:"提示",content:"确认退出登录吗？"}).catch((function(e){return e}));case 2:r=n.sent,c=(0,o.default)(r,2),c[0],a=c[1],a&&a.confirm&&(t.updateUserInfo({}),t.updateToken(""),t.updateAddress({}));case 7:case"end":return n.stop()}}),n)})))()}})};t.default=d}).call(this,n("543d")["default"])},ad52:function(e,t,n){"use strict";n.r(t);var r=n("751c"),u=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=u.a},cbdd:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"d521"))}},u=function(){var e=this.$createElement;this._self._c},o=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-userinfo/my-userinfo-create-component',
    {
        'components/my-userinfo/my-userinfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("41e8"))
        })
    },
    [['components/my-userinfo/my-userinfo-create-component']]
]);