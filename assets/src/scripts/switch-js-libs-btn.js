const btn = document.querySelector('.btn');

let currentJSLib = 'my-rellax-analog.js';

btn.onclick = () => {
    if (currentJSLib === 'my-rellax-analog.js') {
        // document.body.style.backgroundColor = 'red';

        const biasedUnits = document.querySelectorAll('.rellax');

        for (let el of biasedUnits) {
            el.style.transition = 'unset';
            el.style.willChange = 'unset';
        }
        window.onscroll = undefined;

        switchableScript.remove();
        console.warn('my-rellax-analog.js - stoped!')

        let newScriptTag = document.createElement('script');
        // let newScriptTag2 = document.createElement('script');
        newScriptTag.src = './js/js-libs/rellax.js';
        document.body.appendChild(newScriptTag);
        // newScriptTag2.src = './js/test-outer-script.js';
        // document.body.appendChild(newScriptTag2);

        setTimeout(() => {
            // document.body.style.backgroundColor = 'red';
            var rellax = new Rellax('.rellax');


            console.warn('rellax.js - running!');

            alert(`
                my-rellax-analog.js - stoped!

                now rellax.js - running!`)
            // }, 1000);

            currentJSLib = newScriptTag.src;


        }, 16);
        btn.innerHTML = `switch to <b>my-rellax-analog.js </b>`;
    } else {
        alert('already switched forward  - need to finish code for switching back)');
    }
}