if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  var PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "E:/HBuilderProjects/waste_recycling/pages/home/home.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    onLoad() {
    },
    methods: {
      login() {
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createElementVNode("view", null, [
        vue.createElementVNode("text", null, "\u767B\u5F55\u9875\u9762\u7B80\u5316\u7248")
      ]),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.login && $options.login(...args))
        }, "\u8BF7\u70B9\u51FB\u8FDB\u884C\u767B\u5F55")
      ])
    ], 64);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/HBuilderProjects/waste_recycling/pages/index/index.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    onLoad() {
    },
    methods: {
      login() {
        uni.switchTab({
          url: "/pages/home/home"
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createElementVNode("view", null, [
        vue.createElementVNode("text", null, "\u767B\u9646\u9875\u9762")
      ]),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.login && $options.login(...args))
        }, "\u767B\u5F55")
      ])
    ], 64);
  }
  var PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/HBuilderProjects/waste_recycling/pages/login/login.vue"]]);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/HBuilderProjects/waste_recycling/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
