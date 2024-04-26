import { throttle } from "./_throtlingDecorator";

let biasedUnits;

function setSpeedCoeff() {
    // biasedUnits = document.querySelectorAll(array);
    for (let el of biasedUnits) {
        el.style.transition = '0.0333s linear';
        el.style.willChange = 'transform';

        // console.log(el.getAttribute('data-rellax-speed'))
        // сохраняем значение скорости в свойство speedCoeff каждого el-а - чтобы при скролле только двигать элементы, но не обращаться к DOM
        // if (window.innerWidth <= 425) {
        //     if (el.getAttribute('data-rellax-mobile-speed')) {
        //         el.speedCoeff = el.getAttribute('data-rellax-mobile-speed');
        //     }
        // } else {

        if (window.innerWidth <= 425) {
            if (el.getAttribute('data-rellax-mobile-speed')) {
                el.speedCoeff = el.getAttribute('data-rellax-mobile-speed');
            } else {
                el.speedCoeff = el.getAttribute('data-rellax-speed');
                // console.log(el.speedCoeff);
            }
            if (el.getAttribute('data-rellax-mobile-horizontal-speed')) {
                el.horSpeedCoeff = el.getAttribute('data-rellax-mobile-horizontal-speed');
            } else {
                el.horSpeedCoeff = el.getAttribute('data-rellax-horizontal-speed');
            }
            // console.log(el.horSpeedCoeff);
        } else {

            if (el.getAttribute('data-rellax-speed')) {
                el.speedCoeff = el.getAttribute('data-rellax-speed');
                // console.log(el.speedCoeff);
            }

            if (el.getAttribute('data-rellax-horizontal-speed')) {
                el.horSpeedCoeff = el.getAttribute('data-rellax-horizontal-speed');
                // console.log(el.horSpeedCoeff);
            }
        }

        // }
        // set default speedCoeff = 0 - no effect without a attribute!
        if (typeof (el.speedCoeff) !== 'string') {
            el.speedCoeff = 0;
        }
        if (typeof (el.horSpeedCoeff) !== 'string') {
            el.horSpeedCoeff = 0;
            // console.log(el.horSpeedCoeff);
        }
        // console.log(typeof (el.speedCoeff));
        // console.log(el);
    }
}


function biasUnits(units) {
    for (let unit of units) {
        unit.style.transform = `translate3d(${(-Math.sin(1.55 * unit.horSpeedCoeff / 30) * window.scrollY) * 1.4}px, ${(-Math.sin(1.55 * unit.speedCoeff / 10) * window.scrollY) * 0.4}px, 0)`;
    }

    console.log('biasUnits(units)');
}

// add throtling decorator - we'll fire biasUnits only once in 33ms - it's 30FPS
// with 33ms we have 19 calls instead 42 - it's ~50% of load or up to 2x faster
biasUnits = throttle(biasUnits, 33);

function translateOnScroll(arrays) {
    biasedUnits = document.querySelectorAll(arrays);

    setSpeedCoeff();

    window.onscroll = () => {
        // console.warn('window.onscroll');
        // console.log(biasedUnits)

        biasUnits(biasedUnits);
    }

    // смотрим - не меняется ли позиция значение window.scrollY при появлении/скрытии address-bar в мобильных браузерах
    // setInterval(() => {
    //     console.log(window.scrollY)
    // }, 1000);
}

translateOnScroll('.rellax, .horellax');

window.onresize = setSpeedCoeff;