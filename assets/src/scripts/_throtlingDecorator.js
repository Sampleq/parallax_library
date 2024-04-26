export function throttle(fnc, ms) {

    let isThrottled; // был ли "досрочный" вызов - "заторможена" ли функция;
    let lastArgs; // сохраняем последние переданные аргументы

    function wrapper(...args) {

        if (!isThrottled) { //выполнится только если вызов после интервала - т.е не "досрочный"
            fnc.apply(this, args);

            isThrottled = true;

            const launch = () => { // объявляем именно стрелочную функцию, чтобы не терять this - стрелочные функции "прозрачны" для this и берут его из внешней "нормальной" функции - т.е. в данном случае wrapper
                setTimeout(() => {
                    // выполним функцию только если была попытка "досрочного" вызова - и сохранились аргументы в lastArgs
                    if (lastArgs) {
                        fnc.apply(this, lastArgs);
                        lastArgs = null;

                        launch(); // рекурсивно выполним launch() которая снова через timeout запустит исходную функцию fnc , если её (fnc) вызывали - т.е. lastArgs присвоены аргументы
                    } else { // иначе отменим флаг "досрочного" вызова 
                        isThrottled = false;
                    }
                }, ms);
            }

            launch();
        } else { // для "досрочных" вызовов просто обновляем аргументы с которыми выполнится функция
            lastArgs = args;
        }

    }

    return wrapper;
}