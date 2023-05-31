"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}var QuantityInput=function(){function n(t,e){_classCallCheck(this,n),this.el=t,this.input=t.querySelector(".field"),this.defaultOptions={min:0,max:250,value:0},this.options=Object.assign({},this.defaultOptions,e),this.setup(),this.events()}return _createClass(n,[{key:"setup",value:function(){this.el.value=this.options.value,this.max=this.options.max,this.min=this.options.min;var t=document.createElement("div"),e=document.createElement("div"),n=document.createElement("div");t.setAttribute("class","quantity__nav"),e.setAttribute("class","quantity__button--up"),n.setAttribute("class","quantity__button--down"),this.input.setAttribute("value",this.el.value),t.appendChild(e),t.appendChild(n),this.el.appendChild(t),this.btnUp=this.el.querySelector(".quantity__button--up"),this.btnDown=this.el.querySelector(".quantity__button--down")}},{key:"events",value:function(){var n=this;this.btnUp.addEventListener("click",function(){var t=parseFloat(n.el.value),e=t>=n.max?t:t+1;n.el.value=e,n.input.setAttribute("value",e)}),this.btnDown.addEventListener("click",function(){var t=parseFloat(n.el.value),e=t<=n.min?t:t-1;n.el.value=e,n.input.setAttribute("value",e)})}}]),n}();