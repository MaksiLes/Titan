TESTER = document.getElementById('tester');

function getY1(map) {
    let keys = Array.from(map.keys());
    keys.sort((a, b) => a - b);
    console.log("отсортированные ключи мап");
    console.log(keys);

    let arrayValueY = [];
    for (let i = 0; i < keys.length; i++) {
        let mapKey = keys[i];
        console.log("Итерация №" + i);
        console.log(mapKey);

        let value = map.get(mapKey);
        console.log("Получение значений из ключа");
        console.log(value.y);

        if (i == 0) {
            arrayValueY.push(value.y)
        } else {
            let predMapKey = keys[i - 1];
            let predValue = map.get(predMapKey);
            arrayValueY.push(value.y - predValue.y);
        }
    }

    return { x: keys, y: arrayValueY }
}

function getY2(map) {
    let keys = Array.from(map.keys());
    keys.sort((a, b) => a - b);
    console.log("отсортированные ключи мап");
    console.log(keys);

    let arrayValueY = [];
    for (let i = 0; i < keys.length; i++) {
        let mapKey = keys[i];
        console.log("Итерация №" + i);
        console.log(mapKey);

        let value = map.get(mapKey);
        console.log("Получение значений из ключа");
        console.log(value.y);

        arrayValueY.push(value.y);
    }

    return { x: keys, y: arrayValueY }
}

function draw(map) {
    let obj1 = getY1(map);
    console.log("obj1: ", obj1)
    let obj2 = getY2(map);
    console.log("obj2: ", obj2)

    let trace1 = {
        x: obj1.x,
        y: obj1.y,
        type: 'bar',
        name: 'Добыто(час)',
        marker: {
            color: '#84E900',

        },

        hovertemplate: '<i>Пятница, Июнь 15</i>, %{x:.2f}' + '<br><b>Добыто (час)</b>: %{y} тыс.м<br>'

    }

    let trace2 = {
        x: obj2.x,
        y: obj2.y,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Добыто(сутки)',
        line: {
            color: '#CD0074',
            width: 5
        },
        marker: {
            color: '#E667AF',
            size: [10, 10, 10, 10, 10],
        },
        hovertemplate: '<i>Пятница, Июнь 15</i>, %{x:.2f}' + '<br><b>Добыто (сутки)</b>: %{y} тыс.м<br>'
    }

    let trace3 = {
        x: [9, 24],
        y: [37.5, 110],
        mode: 'lines+markers',
        type: 'scatter',
        name: 'Прогноз добычи',
        line: {
            dash: 'dot',
            width: 4,
            color: 'orange'
        },
        marker: {
            color: '#FF9640',
            size: [10, 10, 10, 10, 10],
        },
        hovertemplate: '<i>Пятница, Июнь 15</i>, %{x:.2f}' + '<br><b>Прогноз добычи</b>: %{y} тыс.м<br>'

    }

    let trace4 = {
        x: [0, 24],
        y: [100, 100],
        fill: 'tozeroy',
        type: 'scatter',
        name: 'План добычи',
        line: {
            color: 'rgba(189, 223, 255, 1)',
        }

    };

    let data = [trace1, trace2, trace3, trace4];

    let layout = {
        title: 'Скважина 1-1',
        font: {
            size: 18
        },
        showlegend: true,
        legend: {
            "orientation": "h",
        },

        width: 1200,
        height: 700,

        xaxis: {
            ticmode: "array",
            tickvals: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
            ticktext: ['3.Мая', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '4.Мая',]
        },
        yaxis: {
            ticmode: "array",
            tickvals: [0, 20, 40, 60, 80, 100, 120, 140],
            ticktext: ['0тыс.м', '20тыс.м', '40тыс.м', '60тыс.м', '80тыс.м', '100тыс.м', '120тыс.м', '140тыс.м'],

        }
    };

    let config = {
        responsive: true,
        scrollZoom: true
    }

    Plotly.newPlot('tester', data, layout, config);
}

let map = new Map();

map.set(5, { ts: 1651543200, y: 17 });
map.set(6, { ts: 1651546800, y: 18 });
map.set(7, { ts: 1651550400, y: 31 });
map.set(8, { ts: 1651554000, y: 32 });
map.set(9, { ts: 1651557600, y: 37 });

draw(map)

// ----------------------------------

let button = document.getElementById('add');

button.addEventListener('click', function () {

    let x = Number(document.getElementById('axisX').value);

    let y = Number(document.getElementById('axisY').value);

    let inputDate = new Date(x * 1000);
    console.log("дата в обычном формате");
    console.log(inputDate);

    let inputHour = Number(inputDate.getHours());
    console.log("Дата в коротком формате");
    console.log(inputHour);

    // console.log(x, timestamp);

    let obj = { ts: x, y: y };

    let hourValue = map.get(inputHour);
    console.log("значение по ключу")
    console.log(hourValue);


    if (hourValue == null) {
        map.set(inputHour, obj);
    } else {
        let oldTs = hourValue.ts;

        if (obj.x > oldTs) {
            map.set(inputHour, obj);
        }

        console.log("временная метка значения, новая и старая");
        console.log(obj.x);
        console.log(oldTs);
    }

    console.log("мап после всех изменений");
    console.log(map);

    draw(map)

    // console.log("массив с ключами");
    // console.log(keys);
    // console.log('Массив со значениями Y1');
    // console.log(arrayValueY1);
    // console.log('Массив со значениями Y2');
    // console.log(arrayValueY2);
});


