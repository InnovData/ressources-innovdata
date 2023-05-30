"use strict";

function quantityInput(element, options) {
  var spinner = element;
  var defaultOptions = {
    min: 1,
    max: 250,
    value: 1
  };
  options = Object.assign({}, defaultOptions, options);
  var obj = {
    input: spinner.querySelector('input[type="number"]'),
    init: function init() {
      this.setup();
      this.events();
      return this;
    },
    setup: function setup() {
      this.input.value = options.value;
      this.max = options.max;
      this.min = options.min;
      var qNav = document.createElement("div");
      var qUp = document.createElement("div");
      var qDown = document.createElement("div");
      qNav.setAttribute("class", "quantity-nav");
      qUp.setAttribute("class", "quantity-button quantity-button--up");
      qDown.setAttribute("class", "quantity-button quantity-button--down");
      qUp.innerHTML = "+";
      qDown.innerHTML = "-";
      qNav.appendChild(qUp);
      qNav.appendChild(qDown);
      spinner.appendChild(qNav);
      this.btnUp = spinner.querySelector(".quantity-button--up");
      this.btnDown = spinner.querySelector(".quantity-button--down");
    },
    trigger: function trigger() {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("change", true, false);
      return event;
    },
    events: function events() {
      var _this = this;

      this.btnUp.addEventListener("click", function () {
        var oldValue = parseFloat(_this.input.value);
        var newVal;

        if (oldValue >= _this.max) {
          newVal = oldValue;
        } else {
          newVal = oldValue + 1;
        }

        _this.input.value = newVal;

        _this.input.dispatchEvent(_this.trigger());
      });
      this.btnDown.addEventListener("click", function () {
        var oldValue = parseFloat(_this.input.value);
        var newVal;

        if (oldValue <= _this.min) {
          newVal = oldValue;
        } else {
          newVal = oldValue - 1;
        }

        _this.input.value = newVal;

        _this.input.dispatchEvent(_this.trigger());
      });
      this.input.addEventListener("change", function () {
        if (parseInt(_this.input.value, 16) < _this.min) {
          _this.input.value = _this.min;
        }

        if (parseInt(_this.input.value, 16) > _this.max) {
          _this.input.value = _this.max;
        }
      });
    }
  };
  return obj.init();
}