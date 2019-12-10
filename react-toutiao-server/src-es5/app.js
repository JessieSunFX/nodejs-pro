"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _list = _interopRequireDefault(require("./list"));

var _tab = _interopRequireDefault(require("./tab"));

var components = _interopRequireWildcard(require("./components/items"));

var _tabContext = _interopRequireDefault(require("./tab-context"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _detail = _interopRequireDefault(require("./detail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// class Lazy extends Component{
//     render() {
//         return <div>lazy</div>;
//     }
// }
// const SettingComponent = React.lazy(() => {
//     return import('./setting')
//         .then(Component => {
//             console.log('in-setting-component:', Component);
//             // return new Promise((resolve) => {
//             //     setTimeout(() => {
//             //         return resolve({
//             //             default: Lazy
//             //         });
//             //     }, 1000);
//             // });
//             return new Promise((resolve) => {
//                 setTimeout(() => {
//                     return resolve();
//                 }, 1000);
//             });
//             // return Component;
//         });
// });
var TABS = [{
  id: '__all__',
  name: '推荐'
}, {
  id: 'video',
  name: '视频'
}];
var ALL_TAB = [{
  id: '__all__',
  name: '推荐'
}, {
  id: 'video',
  name: '视频'
}, {
  id: 'sport',
  name: '体育'
}, {
  id: 'history',
  name: '历史'
}];

var Main =
/*#__PURE__*/
function (_Component) {
  _inherits(Main, _Component);

  function Main(props) {
    var _this;

    _classCallCheck(this, Main);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Main).call(this, props));
    _this.state = {
      list: [],
      showSetting: false
    };

    _this.reactiveList();

    return _this;
  }

  _createClass(Main, [{
    key: "getList",
    value: function getList() {
      // return Promise.resolve({
      //     data: []
      // });
      return fetch('http://localhost:9000/list').then(function (res) {
        return res.json();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log('i got props::', this.props);
      console.log('props:::::::', this.props.list);
      return _react["default"].createElement("div", {
        className: "container"
      }, _react["default"].createElement(_tabContext["default"].Provider, {
        value: ALL_TAB
      }, _react["default"].createElement(_tab["default"], {
        tabs: TABS
      }), _react["default"].createElement(_list["default"] // dataSource = {this.state.list}
      , {
        dataSource: this.props.list,
        renderItem: function renderItem(item) {
          var type = item.type.replace(/^\w/, function (code) {
            return code.toUpperCase();
          });
          var ItemComponent = components[type];

          if (!ItemComponent) {
            return null;
          }

          return _react["default"].createElement(ItemComponent, {
            onClick: _this2.skip.bind(_this2),
            data: item.data
          });
        }
      })));
    } // updateList() {
    //     return this.getList()
    //         .then(({data}) => {
    //            return {
    //                type: 'PUSH_LIST',
    //                data
    //            };
    //         });
    // }

  }, {
    key: "updateList",
    value: function updateList(dispatch) {
      // console.log('dispatch?????', dispatch);
      return this.getList().then(function (_ref) {
        var data = _ref.data;
        dispatch({
          type: 'PUSH_LIST',
          data: data
        });
      })["catch"](function (err) {
        return console.error(err);
      });
    }
  }, {
    key: "reactiveList",
    value: function reactiveList() {
      console.log('my-props::::', this.props); // redux问题1：不知道订阅哪些子集好，订阅需要条件，比如list改变时
      // 问题2：万一store位置改变改变了，要跟着变动
      // 解决方式：react-redux
      // store.subscribe(() => {
      //     console.log('state:::::', store.getState());
      //     this.setState({
      //         list: store.getState().list
      //     });
      // });
      // this.updateList()
      //     .then(data => {
      //         // store.dispatch({
      //         //     type: 'PUSH_LIST',
      //         //     data
      //         // });
      //         this.props.listUpdate(data);
      //     });
      // this.props.listUpdate(this.updateList());
      // setTimeout(() => {
      //     this.props.listUpdate(this.updateList.bind(this));
      // }, 2000);
      //     window.onscroll = () => {
      //         // this.updateList()
      //         //     .then(data => {
      //         //         // store.dispatch({
      //         //         //     type: 'PUSH_LIST',
      //         //         //     data
      //         //         // });
      //         //         this.props.listUpdate(data);
      //         //     });
      //         // this.props.listUpdate(this.updateList());
      //         this.props.listUpdate(this.updateList.bind(this));
      //    };
    }
  }, {
    key: "skip",
    value: function skip() {
      console.log('开始跳转！', this.props.history.push);
      this.props.history.push('/detail/' + 'i6727634212259643910' + Math.random() * 10);
    }
  }]);

  return Main;
}(_react.Component);

var App = (0, _reactRedux.connect)(function (state) {
  //mapStateToProps--类似于subscribe后把state放到context中
  console.log('state::::', state);
  return {
    list: state.list
  };
}, // 问题抛出：目前dispatch的都是同步方法，没有异步方法
// 引入：middleware(redux中的中间件叫enhancer)
// enhancer 让你封装reducer的处理
function (dispatch) {
  //mapDispatchToProps
  return {
    // listUpdate: data => {
    //     dispatch({
    //         type: 'PUSH_LIST',
    //         data
    //     });
    // }
    listUpdate: function listUpdate(task) {
      dispatch(task);
    }
  };
}, function mergeProps(stateProps, dispatchProps, ownProps) {
  console.log('stateProps, dispatchProps, ownProps', stateProps, dispatchProps, ownProps);
  return _objectSpread({}, stateProps, {}, dispatchProps, {}, ownProps);
})(Main);

var _default = function _default() {
  var TopBar = function TopBar() {
    return _react["default"].createElement("div", null, "\u6211\u662F404");
  };

  return _react["default"].createElement(_reactRouterDom.Switch, null, _react["default"].createElement(_reactRouterDom.Route, {
    path: "/home",
    component: App
  }), _react["default"].createElement(_reactRouterDom.Route, {
    path: "/detail/:id",
    component: _detail["default"]
  }), _react["default"].createElement(_reactRouterDom.Route, {
    component: TopBar
  }));
};

exports["default"] = _default;