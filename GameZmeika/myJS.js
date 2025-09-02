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

