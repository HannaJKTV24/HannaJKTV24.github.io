//Глобальные переменные:
var FIELD_SIZE_X = 20; //строки
var FIELD_SIZE_Y = 20; //столбцы
var SNAKE_SPEED = 300; //Интервал между перемещениями змейки
var snake = []; //сама змейка
var direction = 'y+'; // направление движения змейки 
var gameIsRunning = false; //запущена ли игра
var snake_timer; //таймер змейки
var food_timer; //таймер для еды
var score = 0; // результат

function init() {
    prepareGameField(); //генерация поля

    var wrap = document.getElementsByClassName('wrap')[0];

    wrap.style.width = '400px';
    //события кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    //отслеживания клавиш клавиатуры
    addEventListener('keydown', changeDirection);  
}

// Функция генерации игрового поля

function prepareGameField() {
    //создаем таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');
    //Генерация ячеек игровой таблицы
    for (var i=0; i<FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j=0; j<FIELD_SIZE_Y; j++) {
            //Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' +j;
            row.appendChild(cell);  //Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); //Добавление таблицы
}

// Старт игры 

function startGame() {
    gameIsRunning = true;
    respawn(); //Создами змейку

    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 500);
}

//  Функция расположения змкйки на игровом поле
function respawn() {
    // Змейка массив - td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y -1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}

// Движение змейки

function move() {
    // console.log('move', direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length -1].getAttribute('class').split('');

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');
    var start_coord_y = parseInt(snake_coords[1]);
    var start_coord_x = parseInt(snake_coords[2]);

    // Определяем новую точку
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y -1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y+1) + '-' + (coord_x))[0];
    }
}