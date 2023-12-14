let biasedUnits;

function setSpeedCoeff() {
    // biasedUnits = document.querySelectorAll(array);
    for (let el of biasedUnits) {
        el.style.transition = '0.033s linear';
        el.style.willChange = 'transform';

        // console.log(el.getAttribute('data-rellax-speed'))
        // сохраняем значение скорости в свойство speedCoeff каждого el-а - чтобы при скролле только двигать элементы, но не обращаться к DOM
        if (window.innerWidth <= 425 && el.getAttribute('data-rellax-mobile-speed')) {
            el.speedCoeff = el.getAttribute('data-rellax-mobile-speed')
        } else {
            el.speedCoeff = el.getAttribute('data-rellax-speed')
        }
        // set default speedCoeff = 2
        if (typeof (el.speedCoeff) !== 'string') {
            el.speedCoeff = 2;
        }
        // console.log(typeof (el.speedCoeff));
        // console.log(el);
    }
}

function translateOnScroll(array) {
    biasedUnits = document.querySelectorAll(array);

    setSpeedCoeff();

    window.onscroll = () => {
        // console.warn('window.onscroll');
        // console.log(biasedUnits)

        for (let el of biasedUnits) {
            el.style.transform = `translate3d(0, ${(-Math.sin(1.6 * el.speedCoeff / 10) * window.scrollY) * 0.4}px, 0)`;
        }
    }

    // смотрим - не меняется ли позиция значение window.scrollY при появлении/скрытии address-bar в мобильных браузерах
    // setInterval(() => {
    //     console.log(window.scrollY)
    // }, 1000);
}

translateOnScroll('.rellax');

window.onresize = setSpeedCoeff;