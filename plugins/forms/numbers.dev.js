"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QuantityInput =
/*#__PURE__*/
function () {
  function QuantityInput(element, options) {
    _classCallCheck(this, QuantityInput);

    // Stocke l'élément et les options passées en paramètre
    this.el = element;
    this.input = element.querySelector('.field');
    this.defaultOptions = {
      min: 0,
      max: 250,
      value: 0
    };
    this.options = Object.assign({}, this.defaultOptions, options); // Initialise le champ de quantité et les boutons

    this.setup(); // Gère les événements des boutons

    this.events();
  }

  _createClass(QuantityInput, [{
    key: "setup",
    value: function setup() {
      // Initialise la valeur, le minimum et le maximum du champ de quantité
      this.el.value = this.options.value;
      this.max = this.options.max;
      this.min = this.options.min; // Crée les éléments HTML pour les boutons

      var qNav = document.createElement('div');
      var qUp = document.createElement('div');
      var qDown = document.createElement('div'); // Ajoute les classes CSS aux éléments HTML

      qNav.setAttribute('class', 'quantity__nav');
      qUp.setAttribute('class', 'quantity__button--up');
      qDown.setAttribute('class', 'quantity__button--down'); // Initialise la valeur du champ de quantité

      this.input.setAttribute('value', this.el.value); // Ajoute les boutons à l'élément HTML

      qNav.appendChild(qUp);
      qNav.appendChild(qDown);
      this.el.appendChild(qNav); // Stocke les boutons pour pouvoir y accéder plus facilement

      this.btnUp = this.el.querySelector('.quantity__button--up');
      this.btnDown = this.el.querySelector('.quantity__button--down');
    }
  }, {
    key: "events",
    value: function events() {
      var _this = this;

      // Ajoute un événement au bouton "up"
      this.btnUp.addEventListener('click', function () {
        var oldValue = parseFloat(_this.el.value);
        var newVal; // Incrémente la valeur du champ de quantité si elle est inférieure au maximum

        if (oldValue >= _this.max) {
          newVal = oldValue;
        } else {
          newVal = oldValue + 1;
        } // Met à jour la valeur du champ de quantité et de l'input caché


        _this.el.value = newVal;

        _this.input.setAttribute('value', newVal);
      }); // Ajoute un événement au bouton "down"

      this.btnDown.addEventListener('click', function () {
        var oldValue = parseFloat(_this.el.value);
        var newVal; // Décrémente la valeur du champ de quantité si elle est supérieure au minimum

        if (oldValue <= _this.min) {
          newVal = oldValue;
        } else {
          newVal = oldValue - 1;
        } // Met à jour la valeur du champ de quantité et de l'input caché


        _this.el.value = newVal;

        _this.input.setAttribute('value', newVal);
      });
    }
  }]);

  return QuantityInput;
}();