class QuantityInput {
    constructor(element, options) {
        // Stocke l'élément et les options passées en paramètre
        this.el = element;
        this.input = element.querySelector('.field');
        this.defaultOptions = {
            min: 0,
            max: 250,
            value: 0,
        };
        this.options = Object.assign({}, this.defaultOptions, options);
         // Initialise le champ de quantité et les boutons
        this.setup();
         // Gère les événements des boutons
        this.events();
    }
    setup() {
        // Initialise la valeur, le minimum et le maximum du champ de quantité
        this.el.value = this.options.value;
        this.max = this.options.max;
        this.min = this.options.min;
         // Crée les éléments HTML pour les boutons
        const qNav = document.createElement('div');
        const qUp = document.createElement('div');
        const qDown = document.createElement('div');
         // Ajoute les classes CSS aux éléments HTML
        qNav.setAttribute('class', 'quantity__nav');
        qUp.setAttribute('class', 'quantity__button--up');
        qDown.setAttribute('class', 'quantity__button--down');
         // Initialise la valeur du champ de quantité
        this.input.setAttribute('value', this.el.value);
         // Ajoute les boutons à l'élément HTML
        qNav.appendChild(qUp);
        qNav.appendChild(qDown);
        this.el.appendChild(qNav);
         // Stocke les boutons pour pouvoir y accéder plus facilement
        this.btnUp = this.el.querySelector('.quantity__button--up');
        this.btnDown = this.el.querySelector('.quantity__button--down');
    }
    events() {
        // Ajoute un événement au bouton "up"
        this.btnUp.addEventListener('click', () => {
            const oldValue = parseFloat(this.el.value);
            let newVal;
             // Incrémente la valeur du champ de quantité si elle est inférieure au maximum
            if (oldValue >= this.max) {
                newVal = oldValue;
            } else {
                newVal = oldValue + 1;
            }
             // Met à jour la valeur du champ de quantité et de l'input caché
            this.el.value = newVal;
            this.input.setAttribute('value', newVal);
        });
         // Ajoute un événement au bouton "down"
        this.btnDown.addEventListener('click', () => {
            const oldValue = parseFloat(this.el.value);
            let newVal;
             // Décrémente la valeur du champ de quantité si elle est supérieure au minimum
            if (oldValue <= this.min) {
                newVal = oldValue;
            } else {
                newVal = oldValue - 1;
            }
             // Met à jour la valeur du champ de quantité et de l'input caché
            this.el.value = newVal;
            this.input.setAttribute('value', newVal);
        });
    }
}