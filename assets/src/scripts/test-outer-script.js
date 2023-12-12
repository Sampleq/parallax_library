// just a temporary dev test outer js file to run newly added (by clicking btn) script rellax.js

setTimeout(() => {
    document.body.style.backgroundColor = 'red';

    // < !--убираем скрытие address - bar в мобильных браузерах - через body   position: fixed; и библиотекой Rellax смотрим за скроллом body.
    //     Без этого на iPhone(iOS 15.7.7 15.3.1) глюк - при появлении / скрытии address - bar изменяется положение элементов(translateY), смещаемых с помощью  Rellax.Такой же глюк присутствует на https://coolbackgrounds.io/ . 
    //     А на демо сайте библиотеки https://dixonandmoe.com/rellax/  - глюка при появлении/скрытии address-bar нет!
    // -->
    var rellax = new Rellax('.rellax');
}, 1000);

// document.body.style.backgroundColor = 'red';

