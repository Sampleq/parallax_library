const btn = document.querySelector('.btn');
const btnFixGlith = document.querySelector('.main__btn_fix_glitch');

// const switchableScript = document.getElementById('switchableScript');
const descr = document.querySelector('.main__desc_3');

// выбираем элемент (это будет тег script), аттрибут которого содержит my-rellax-analog и записываем значение его аттрибута (т.е. полный путь к скрипту) в переменную initialJSLib
// ^= - filters Elements where src (or any other attr) starts with "keyword"
// *= - filters Elements where src (or any other attr) containss "keyword"
const initialJSLib = document.querySelector('[src*="my-rellax-analog"]').src;
// console.log(document.querySelector('[src*="my-rellax-analog"]'));
// console.log(initialJSLib);

let currentJSLib = initialJSLib;

// задаём переменные, чтобы мы могли включать/отключать библиотеки rellax.js
let rellax;
let horellax;

btn.onclick = () => {
    if (currentJSLib === initialJSLib) {
        // if (currentJSLib.includes('my-rellax-analog')) {
        // document.body.style.backgroundColor = 'red';

        const biasedUnits = document.querySelectorAll('.rellax');

        for (let el of biasedUnits) {
            el.style.transition = 'unset';
            el.style.willChange = 'unset';
        }
        window.onscroll = undefined;

        // switchableScript.remove();
        document.querySelector('[src*="my-rellax-analog"]').remove();
        console.warn('my-rellax-analog.js - stopped and removed!')

        let newScriptTag = document.createElement('script');
        // let newScriptTag2 = document.createElement('script');
        newScriptTag.src = './js/js-libs/rellax.js';
        document.body.appendChild(newScriptTag);
        // newScriptTag2.src = './js/test-outer-script.js';
        // document.body.appendChild(newScriptTag2);


        // setTimeout(() => {
        newScriptTag.onload = () => {
            // document.body.style.backgroundColor = 'red';

            rellax = new Rellax('.rellax');
            console.warn('rellax.js - running!');

            horellax = new Rellax('.horellax', {
                horizontal: true
            })

            // alert(`
            //     my-rellax-analog.js - stopped and removed!

            //     now rellax.js - is running!`);

            currentJSLib = newScriptTag.src;

            // console.log(currentJSLib);

            btn.innerHTML = `switch to <b>my-rellax-analog.js</b>`;
            descr.innerHTML = `Using <br> rellax.js`;
            descr.classList.toggle('main__desc_3_corr-pos');


            btnFixGlith.style.display = 'block';
            btnFixGlith.onclick = () => {

                document.body.parentNode.classList.toggle('hidden');
                document.body.classList.toggle('fixed');
                // window.scrollTo(0, 0);
                setTimeout(() => {
                    btnFixGlith.scrollIntoView({ block: "center" });
                }, 33);
                rellax.destroy();
                horellax.destroy();
                // Set rellax's wrapper to custom-element (body) instead of the html

                if (!btnFixGlith.innerHTML.includes('Unfix')) {
                    rellax = new Rellax('.rellax', {
                        wrapper: 'body'
                    });
                    horellax = new Rellax('.horellax', {
                        wrapper: 'body',
                        horizontal: true
                    });
                    btnFixGlith.innerHTML = 'Unfix addres-tab glitch of rellax.js'
                } else {
                    rellax = new Rellax('.rellax');
                    btnFixGlith.innerHTML = 'Fix addres-tab glitch of rellax.js'
                }
            }
            // }, 33);
        };

    } else if (currentJSLib.includes('rellax.js')) {
        // alert('already switched forward  - need to finish code for switching back)');
        // document.body.style.backgroundColor = 'green';

        if (btnFixGlith.innerHTML.includes('Unfix')) {
            document.body.parentNode.classList.remove('hidden');
            document.body.classList.remove('fixed');
        }
        btnFixGlith.style.display = 'none';
        btnFixGlith.innerHTML = 'Fix addres-tab glitch of rellax.js';

        rellax.destroy();
        horellax.destroy();
        console.warn('rellax.js - destroyed!');
        // console.log(document.querySelector('[src="./js/js-libs/rellax.js"]'));
        document.querySelector('[src="./js/js-libs/rellax.js"]').remove();
        console.warn('rellax.js - removed!');

        let newScriptTag = document.createElement('script');
        newScriptTag.src = initialJSLib;
        document.body.appendChild(newScriptTag);

        currentJSLib = newScriptTag.src;

        btn.innerHTML = `switch to <b>rellax.js</b>`;
        descr.innerHTML = `Using <br> my-rellax-analog.js`;
        descr.classList.toggle('main__desc_3_corr-pos');

        btn.scrollIntoView({ block: 'center' });

        // alert(`
        // rellax.js - stopped and removed!

        // now my-rellax-analog.js - is running!`);
    }
}