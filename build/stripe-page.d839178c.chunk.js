"use strict";
(self["webpackChunknotice"] = self["webpackChunknotice"] || []).push([[1092],{

/***/ 81202:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_Settings)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(364);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 40 modules
var axios = __webpack_require__(5466);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 19 modules
var helper_plugin_esm = __webpack_require__(2988);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/Layout.js
var Layout = __webpack_require__(9);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.js
var Main = __webpack_require__(65000);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js + 2 modules
var HeaderLayout = __webpack_require__(42925);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.js
var Button = __webpack_require__(6854);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.js
var ContentLayout = __webpack_require__(35750);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(68263);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/Grid.js
var Grid = __webpack_require__(86049);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/GridItem.js
var GridItem = __webpack_require__(25667);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextInput/TextInput.js
var TextInput = __webpack_require__(54095);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/Select.js
var Select = __webpack_require__(5007);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/Option.js
var Option = __webpack_require__(551);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Link/Link.js
var Link = __webpack_require__(28438);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Check.js
var Check = __webpack_require__(8766);
;// CONCATENATED MODULE: ./node_modules/strapi-chatgpt/admin/src/components/Settings/index.jsx







const AiModels = [
  {
    value: "text-davinci-003",
    label: "higher quality, longer output, better instruction following"
  },
  {
    value: "text-curie-001",
    label: "faster and lower cost, suited for Q&A, translation, service bot"
  }
];
const Settings = () => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const toggleNotification = (0,helper_plugin_esm/* useNotification */.lm)();
  const [loading, setLoading] = (0,react.useState)(false);
  const apiKeyRef = (0,react.useRef)("");
  const modelNameRef = (0,react.useRef)("text-davinci-003");
  const maxTokensRef = (0,react.useRef)(2048);
  const instance = axios["default"].create({
    baseURL: "",
    headers: {
      Authorization: `Bearer ${helper_plugin_esm/* auth */.I8.getToken()}`,
      "Content-Type": "application/json"
    }
  });
  const [chatGPTConfig, setChatGPTConfig] = (0,react.useState)({
    apiKey: "",
    modelName: "text-davinci-003",
    maxTokens: 2048
  });
  const setData = (data) => {
    setChatGPTConfig(data);
    apiKeyRef.current = data.apiKey;
    modelNameRef.current = data.modelName;
    maxTokensRef.current = data.maxTokens;
  };
  const handleChatGPTConfigChange = (key) => (e) => {
    console.log("key", e);
    if (key === "modelName") {
      setChatGPTConfig({
        ...chatGPTConfig,
        [key]: e
      });
    } else {
      setChatGPTConfig({
        ...chatGPTConfig,
        [key]: e.target.value
      });
    }
    switch (key) {
      case "apiKey":
        apiKeyRef.current = e.target.value;
        break;
      case "modelName":
        modelNameRef.current = e;
        break;
      case "maxTokens":
        maxTokensRef.current = e.target.value;
        break;
      default:
        break;
    }
  };
  (0,react.useEffect)(() => {
    setLoading(true);
    const fetchChatGPTConfig = async () => {
      try {
        const { data } = await instance.get("/strapi-chatgpt/config");
        setData(data);
      } catch (error) {
        console.log(error);
        toggleNotification({
          type: "warning",
          message: {
            id: "chatgpt-config-fetch-error",
            defaultMessage: "Error while fetching the chatGPT configurations"
          }
        });
      }
    };
    fetchChatGPTConfig();
    setLoading(false);
  }, []);
  const handelSave = async () => {
    const config = {
      apiKey: apiKeyRef.current,
      modelName: modelNameRef.current,
      maxTokens: maxTokensRef.current
    };
    if (!config.apiKey) {
      toggleNotification({
        type: "warning",
        message: {
          id: "chatgpt-config-api-key-required",
          defaultMessage: "Please enter the api key"
        }
      });
      return;
    }
    setLoading(true);
    try {
      const { data } = await instance.post("/strapi-chatgpt/config/update", {
        ...chatGPTConfig
      });
      if (data && data.value) {
        setData(JSON.parse(data.value));
      }
      setLoading(false);
      toggleNotification({
        type: "success",
        message: {
          id: "chatgpt-config-save-success",
          defaultMessage: "ChatGPT configurations saved successfully"
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      toggleNotification({
        type: "warning",
        message: {
          id: "chatgpt-config-save-error",
          defaultMessage: "Error while saving the chatGPT configurations"
        }
      });
    }
  };
  return /* @__PURE__ */ react.createElement(Layout/* Layout */.A, null, /* @__PURE__ */ react.createElement(Helmet/* Helmet */.q, { title: "Strapi ChatGPT Configuration" }), /* @__PURE__ */ react.createElement(Main/* Main */.o, { "aria-busy": false }, /* @__PURE__ */ react.createElement(
    HeaderLayout/* HeaderLayout */.T,
    {
      title: "ChatGPT Configurations",
      subtitle: formatMessage({
        id: "chatgpt-config-headder",
        defaultMessage: "Configure the api key, model name and other parameters"
      }),
      primaryAction: /* @__PURE__ */ react.createElement(
        Button/* Button */.z,
        {
          startIcon: /* @__PURE__ */ react.createElement(Check/* default */.Z, null),
          onClick: handelSave,
          loading
        },
        "Save"
      )
    }
  ), /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, /* @__PURE__ */ react.createElement(
    Box/* Box */.x,
    {
      shadow: "tableShadow",
      background: "neutral0",
      paddingTop: 6,
      paddingLeft: 7,
      paddingRight: 7,
      paddingBottom: 6,
      hasRadius: true
    },
    /* @__PURE__ */ react.createElement(Grid/* Grid */.r, { gap: 6 }, /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6 }, /* @__PURE__ */ react.createElement(
      TextInput/* TextInput */.o,
      {
        type: "text",
        id: "apiKey",
        name: "apiKey",
        placeholder: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        label: "API Key",
        refs: apiKeyRef,
        value: chatGPTConfig.apiKey,
        onChange: handleChatGPTConfigChange("apiKey")
      }
    )), /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6 }, /* @__PURE__ */ react.createElement(
      TextInput/* TextInput */.o,
      {
        type: "text",
        id: "maxTokens",
        name: "maxTokens",
        label: "Max Tokens",
        placeholder: "2048",
        refs: maxTokensRef,
        value: chatGPTConfig.maxTokens,
        onChange: handleChatGPTConfigChange("maxTokens")
      }
    )), /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, null, /* @__PURE__ */ react.createElement(
      Select/* Select */.P,
      {
        name: "modelName",
        id: "modelName",
        label: "Model Name",
        placeholder: "Select a model",
        refs: modelNameRef,
        value: chatGPTConfig.modelName,
        onChange: handleChatGPTConfigChange("modelName")
      },
      AiModels.map((model) => /* @__PURE__ */ react.createElement(Option/* Option */.W, { key: model.value, value: model.value }, model.value, " - ", model.label))
    ))),
    /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 5 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, "You can set additional parameters", " (", /* @__PURE__ */ react.createElement("span", null, /* @__PURE__ */ react.createElement(
      Link/* Link */.r,
      {
        href: "https://platform.openai.com/docs/api-reference/completions",
        target: "_blank"
      },
      "ChatGPT doc"
    )), ") ", "with the API Integration, available from Plugin > ChatGPT menu."))
  ))));
};
/* harmony default export */ const components_Settings = (Settings);

;// CONCATENATED MODULE: ./node_modules/strapi-chatgpt/admin/src/pages/Settings/index.jsx


const SettingsPage = () => {
  return /* @__PURE__ */ react.createElement(components_Settings, null);
};
/* harmony default export */ const pages_Settings = (SettingsPage);


/***/ }),

/***/ 35750:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68263);


const d = ({ children: t }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_1__/* .Box */ .x, { paddingLeft: 10, paddingRight: 10, children: t });



/***/ }),

/***/ 42925:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ p),
  T: () => (/* binding */ HeaderLayout_b)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(74081);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(72450);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useElementOnScreen.js

const b = (t) => {
  const e = (0,react.useRef)(null), [s, c] = (0,react.useState)(true), i = ([n]) => {
    c(n.isIntersecting);
  };
  return (0,react.useEffect)(() => {
    const n = e.current, r = new IntersectionObserver(i, t);
    return n && r.observe(e.current), () => {
      n && r.disconnect();
    };
  }, [e, t]), [e, s];
};


// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var dist = __webpack_require__(66705);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useResizeObserver.js


const c = (e, i) => {
  const t = (0,dist/* useCallbackRef */.W)(i);
  (0,react.useLayoutEffect)(() => {
    const r = new ResizeObserver(t);
    return Array.isArray(e) ? e.forEach((n) => {
      n.current && r.observe(n.current);
    }) : e.current && r.observe(e.current), () => {
      r.disconnect();
    };
  }, [e, t]);
};


// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(68263);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js








const HeaderLayout_b = (r) => {
  const t = (0,react.useRef)(null), [i, d] = (0,react.useState)(null), [a, h] = b({
    root: null,
    rootMargin: "0px",
    threshold: 0
  });
  return c(a, () => {
    a.current && d(a.current.getBoundingClientRect());
  }), (0,react.useEffect)(() => {
    t.current && d(t.current.getBoundingClientRect());
  }, [t]), (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)("div", { style: { height: i?.height }, ref: a, children: h && (0,jsx_runtime.jsx)(p, { ref: t, ...r }) }), !h && (0,jsx_runtime.jsx)(p, { ...r, sticky: true, width: i?.width })] });
};
HeaderLayout_b.displayName = "HeaderLayout";
const C = (0,styled_components_browser_esm/* default */.ZP)((0,Box/* Box */.x))`
  width: ${({ width: r }) => r ? `${r / 16}rem` : void 0};
  z-index: ${({ theme: r }) => r.zIndices[1]};
`, p = react.forwardRef(({ navigationAction: r, primaryAction: t, secondaryAction: i, subtitle: d, title: a, sticky: h, width: c, ...s }, g) => {
  const f = typeof d == "string";
  return h ? (0,jsx_runtime.jsx)(C, { paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, position: "fixed", top: 0, right: 0, background: "neutral0", shadow: "tableShadow", width: c, "data-strapi-header-sticky": true, children: (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { justifyContent: "space-between", children: [(0,jsx_runtime.jsxs)(Flex/* Flex */.k, { children: [r && (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingRight: 3, children: r }), (0,jsx_runtime.jsxs)(Box/* Box */.x, { children: [(0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "beta", as: "h1", ...s, children: a }), f ? (0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "pi", textColor: "neutral600", children: d }) : d] }), i ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 4, children: i }) : null] }), (0,jsx_runtime.jsx)(Flex/* Flex */.k, { children: t ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 2, children: t }) : void 0 })] }) }) : (0,jsx_runtime.jsxs)(Box/* Box */.x, { ref: g, paddingLeft: 10, paddingRight: 10, paddingBottom: 8, paddingTop: r ? 6 : 8, background: "neutral100", "data-strapi-header": true, children: [r ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingBottom: 2, children: r }) : null, (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { justifyContent: "space-between", children: [(0,jsx_runtime.jsxs)(Flex/* Flex */.k, { minWidth: 0, children: [(0,jsx_runtime.jsx)(Typography/* Typography */.Z, { as: "h1", variant: "alpha", ...s, children: a }), i ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 4, children: i }) : null] }), t] }), f ? (0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "epsilon", textColor: "neutral600", as: "p", children: d }) : d] });
});



/***/ }),

/***/ 9:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72450);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68263);



const d = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  display: grid;
  grid-template-columns: ${({ hasSideNav: o }) => o ? "auto 1fr" : "1fr"};
`, m = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  overflow-x: hidden;
`, f = ({ sideNav: o, children: e }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(d, { hasSideNav: !!o, children: [o, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(m, { paddingBottom: 10, children: e })] });



/***/ }),

/***/ 28438:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ z)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27279);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(48698);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47533);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(72450);
/* harmony import */ var _themes_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19571);
/* harmony import */ var _Typography_Typography_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19915);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(68263);








const x = styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  pointer-events: ${({ disabled: r }) => r ? "none" : void 0};
  color: ${({ disabled: r, theme: o }) => r ? o.colors.neutral600 : o.colors.primary600};

  svg path {
    transition: fill 150ms ease-out;
    fill: currentColor;
  }

  svg {
    font-size: ${10 / 16}rem;
  }

  ${_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_3__/* .Typography */ .Z} {
    transition: color 150ms ease-out;
    color: currentColor;
  }

  &:hover {
    color: ${({ theme: r }) => r.colors.primary500};
  }

  &:active {
    color: ${({ theme: r }) => r.colors.primary700};
  }

  ${_themes_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .buttonFocusStyle */ .BF};
`, t = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_5__/* .Box */ .x))`
  display: flex;
`, z = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ children: r, href: o, to: i, disabled: n = false, startIcon: a, endIcon: l, ...c }, d) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(x, { as: i && !n ? react_router_dom__WEBPACK_IMPORTED_MODULE_6__/* .NavLink */ .OL : "a", target: o ? "_blank" : void 0, rel: o ? "noreferrer noopener" : void 0, to: n ? void 0 : i, href: n ? "#" : o, disabled: n, ref: d, ...c, children: [a && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(t, { as: "span", "aria-hidden": true, paddingRight: 2, children: a }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_3__/* .Typography */ .Z, { children: r }), l && !o && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(t, { as: "span", "aria-hidden": true, paddingLeft: 2, children: l }), o && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(t, { as: "span", "aria-hidden": true, paddingLeft: 2, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_icons__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {}) })] }));



/***/ }),

/***/ 65000:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72450);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68263);



const a = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`, m = ({ labelledBy: o = "main-content-title", ...n }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(a, { "aria-labelledby": o, as: "main", id: "main-content", tabIndex: -1, ...n });



/***/ })

}]);