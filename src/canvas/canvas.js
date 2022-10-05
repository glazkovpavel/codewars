// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');
//
// context.fillStyle = 'red';
// context.strokeStyle = 'black'; // Для бордера канваса
// let x = 10;
// context.fillRect(x, 10, 260, 180) ;// Для заполнения всего контекста
// context.lineWidth = 10;
// context.strokeRect(x, 10, 260, 180); // Для обводки канваса
//
// // Делаем круг
// const canvas2 = document.getElementById('canvas2');
// const ctx = canvas2.getContext('2d');
// canvas2.width = '800';
// canvas2.height = '600';
//
// ctx.arc(canvas2.width / 2, canvas2.height / 2, 100, 0, Math.PI*2);
// ctx.fillStyle = 'magenta';
// ctx.fill();
//
// // Делаем треугольник
// const canvas3 = document.getElementById('canvas3');
// const ctx3 = canvas3.getContext('2d');
// canvas3.width = '600';
// canvas3.height = '400';
//
// ctx3.strokeStyle = 'blue'; // Цвет бордера
// ctx3.lineWidth = 5; // Толщины бордера
//
// ctx3.scale(2,2); // Увеличивает от исходного состояния
// ctx3.rotate(10 * Math.PI/180) // Поворачивает на n градусов от исходного состояния
//
// ctx3.beginPath();
// ctx3.moveTo(50, 50);
// ctx3.lineTo(25, 100);
// ctx3.lineTo(75, 100);
// ctx3.closePath() // Возвращает на исходную позицию или можно так ctx3.lineTo(50, 50);
// ctx3.stroke();
//
//
// // Работа с текстом
// const canvas4 = document.getElementById('canvas4');
// const ctx4 = canvas4.getContext('2d');
// canvas4.width = '600';
// canvas4.height = '400';
// const grad = ctx4.createLinearGradient(0, 0, 300, 0);
// grad.addColorStop('0', 'magenta');
// grad.addColorStop('.5', 'blue');
// grad.addColorStop('1', 'red');
// ctx4.fillStyle = grad; // Цвет текста
// ctx4.font = 'bold 40px Georgia'; // Толщины текста
// ctx4.fillText('Hello World!', 50, 70);

// Делаем приложение для рисования
const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
const x = 10; // Ширина линии ориентируется на радиус круга, ширина линии должна быть в 2 раза больше
canvas5.width = '1200';
canvas5.height = '1000';

let isMouseDown = false;
ctx5.lineWidth = x * 2;
let coords = [];

canvas5.addEventListener('mousedown', () => {
    isMouseDown = true;
})
canvas5.addEventListener('mouseup', () => {
    isMouseDown = false;
    ctx5.beginPath(); // обрываем связь когда подняли кнопку
    coords.push('mouseup');
})
canvas5.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        coords.push([event.clientX, event.clientY]);
        ctx5.lineTo(event.clientX, event.clientY); // Для того чтобы не было пробелов при быстром перемещении мыши
        ctx5.stroke();

        ctx5.beginPath();
        ctx5.arc(event.clientX, event.clientY, x, 0, Math.PI*2);
        ctx5.fill();

        ctx5.beginPath(); // вернуть назад, Для того чтобы не было пробелов при быстром перемещении мыши
        ctx5.moveTo(event.clientX, event.clientY);
    }

    const clear = () => {
        ctx5.fillStyle = 'white';
        ctx5.fillRect(0,0,canvas5.width, canvas5.height);
        ctx5.beginPath();
        ctx5.fillStyle = 'black';
    }

    const save = () => {
        localStorage.setItem('coords', JSON.stringify(coords));
    }

    const replay = () => {
        const timer = setInterval(() => {
            if (!coords.length) {
                clearInterval(timer);
                ctx5.beginPath();
                return;
            }
            const crd = coords.shift();
            const e = {
                clientX: crd["0"],
                clientY: crd["1"]
            }
            ctx5.lineTo(e.clientX, e.clientY); // Для того чтобы не было пробелов при быстром перемещении мыши
            ctx5.stroke();

            ctx5.beginPath();
            ctx5.arc(e.clientX, e.clientY, x, 0, Math.PI*2);
            ctx5.fill();

            ctx5.beginPath(); // вернуть назад, Для того чтобы не было пробелов при быстром перемещении мыши
            ctx5.moveTo(e.clientX, e.clientY);
        }, 80)
    }

    document.addEventListener('keydown', (e) => {
        event.preventDefault();
        if(e.keyCode === 83) { // S - save
            save();
            console.log('Saved')
        }
        if(e.keyCode === 82) { // R - replay
            console.log('ReplayIn....')
            coords = JSON.parse(localStorage.getItem('coords'));
            clear();
            replay();
        }
        if(e.keyCode === 67) { // C - clear
            clear();
            console.log('Clear')
        }
    })
})


