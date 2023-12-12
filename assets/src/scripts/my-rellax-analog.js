function translateOnScroll(array) {
    const biasedUnits = document.querySelectorAll(array);

    for (let el of biasedUnits) {
        el.style.transition = '0.033s linear';
        el.style.willChange = 'transform';
    }

    window.onscroll = () => {
        // console.warn('window.onscroll');
        // console.log(biasedUnits)

        for (let el of biasedUnits) {
            // console.log(el.getAttribute('data-rellax-speed'))
            let speedCoeff
            if (window.innerWidth <= 425 && el.getAttribute('data-rellax-mobile-speed')) {
                speedCoeff = el.getAttribute('data-rellax-mobile-speed')
            } else {
                speedCoeff = el.getAttribute('data-rellax-speed')
            }
            el.style.transform = `translate3d(0, ${(-Math.sin(speedCoeff / 10) * window.scrollY) * 0.6}px, 0)`;
        }
    }

    // смотрим - не меняется ли позиция значение window.scrollY при появлении/скрытии address-bar в мобильных браузерах
    // setInterval(() => {
    //     console.log(window.scrollY)
    // }, 1000);
}

translateOnScroll('.rellax');