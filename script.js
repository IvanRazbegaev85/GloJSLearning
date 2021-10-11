'use strict';

//блок объявления переменных

let appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    rollback: 20,
    services: {},
    asking: function () {
        do {
            this.title = prompt("Как называется наш проект?", "Калькулятор верстки");
        } while (this.isNumber(this.title));

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (this.isNumber(name));

            let price = 0;
            do {
                price = +prompt("Сколько будет стоить данная работа?");

            } while (!this.isNumber(price));
            this.screens.push({id: i, name: name, price: price});
            }
        for (let i = 0; i < 2; i++){
            let name;
            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while (this.isNumber(name));
            let price = 0;
            do {
                price = prompt("Сколько это будет стоить?");
            } while (!this.isNumber(price));
            this.services[name + i] = +price;
        }

        this.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    addPrices: function () {
        this.screenPrice = this.screens.reduce((previousValue, currentValue) => {
            return previousValue.price += +currentValue.price;
        });

        for (let key in this.services){
            this.allServicePrices += this.services[key];
        }
        /*
        Оставил данный код, поскольку в задании к уроку 8 нет задачи на переделку на reduce, а в видео - есть
         */
        // for (let screen of this.screens){
        //     this.screenPrice += +screen.price
        // }
    },
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getFullPrice: function () {
        this.fullPrice = this.screenPrice + this.allServicePrices;
    },
    getTitle: function () {
        this.title = this.title.trim().split("").map((value, index) => {
            return index == 0 ? value.toUpperCase() : value.toLowerCase();
        }).join("");
    },
    getServicePercentPrices: function () {
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * this.rollback/100);
    },
    getRollbackMessage: function (price) {
        if(price >= 30000){
            return "Даем скидку 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 5%";
        } else if (price >= 0 && price < 15000) {
            return "Скидка не предусмотрена";
        } else {
            return "Что-то пошло не так...";
        }
    },
    start: function (){
        this.asking();
        this.addPrices();
        this.getFullPrice();
        this.getServicePercentPrices();
        this.getTitle();

        this.logger();
    },
    logger: function () {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
        console.log(this.services)
    },
};
//блок описания функций
// блок функционала
appData.start();
// мусорный блок

