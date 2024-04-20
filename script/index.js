// khởi tạo các hằng số row, collum, kích thước block, color
const COL = 10;
const ROW = 20;
const BlOCK_SIZE = 20;
const COLOR_MAPPING = [
    'red', 'blue', 'yellow', 'green', 'orange', 'purple', 'cyan', 'white',
];

//LAYOUT các viên gạch
const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];

//biến chứa các trạng thái
const KEY_CODE = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    Down: 'ArrowDown'
}

const WHITE_ID = 7;

const canvas = document.getElementById('board');
//thiết lập ngữ cảnh 2 chiều cho phần tử canvas
const ctx = canvas.getContext('2d');

//thiết lập độ dài chiều ngang và dọc cho canvas
ctx.canvas.width = COL * BlOCK_SIZE; //10 cột mỗi cột chứa 1 block = 10 cột * 1 block (30)
ctx.canvas.height = ROW * BlOCK_SIZE; //20 hàng mỗi hàng chứa 1 block = 20 hàng * 1 block (30)

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.createWhiteBoard();
    }

    //phương thức xây dựng mảng 2 chiều 10 cột 20 dòng
    createWhiteBoard() {
        //trả về mảng 20 phần tử (20 hàng), mỗi hàng là mảng 10 phần tử (10 cột)
        return Array.from({length: ROW}, () => Array(COL).fill(WHITE_ID));
    }

    //Xoá ô (nhận vào toạ độ x,y)
    clearCell(x, y) {
        this.ctx.fillStyle = COLOR_MAPPING[WHITE_ID];
        this.ctx.clearRect((x * BlOCK_SIZE) - 1, (y * BlOCK_SIZE) - 1, BlOCK_SIZE + 2, BlOCK_SIZE + 2);
    }

    //phương thức vẽ ô nhận vào toạ độ trục x,y và id màu
    drawCell(x, y, colorID) {
        //gán màu
        this.ctx.fillStyle = COLOR_MAPPING[colorID] || COLOR_MAPPING[WHITE_ID];
        //vẽ ô theo toạ độ x,y
        this.ctx.fillRect(x * BlOCK_SIZE, y * BlOCK_SIZE, BlOCK_SIZE, BlOCK_SIZE);
        //vẽ viền cho ô
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(x * BlOCK_SIZE, y * BlOCK_SIZE, BlOCK_SIZE, BlOCK_SIZE);
    }
    drawNewBoard(x, y, colorID) {
        //gán màu
        this.ctx.fillStyle = COLOR_MAPPING[colorID] || COLOR_MAPPING[WHITE_ID];
        //vẽ ô theo toạ độ x,y
        this.ctx.fillRect(x * BlOCK_SIZE, y * BlOCK_SIZE, BlOCK_SIZE, BlOCK_SIZE);
    }

    drawBoad() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawNewBoard(col, row, this.grid[row][col]);
                if (this.grid[row][col] !== WHITE_ID) {
                    this.drawCell(col, row, this.grid[row][col])
                }
            }
        }
    }

    //adsfdg
    fullRow() {
        const unfullGrid = board.grid.filter((row) => { //load qua các dòng với mỗi dòng là mảng row => [] 10 phần tử (cột) để lọc ra những dòng chưa đầy
            return row.some(col => col === WHITE_ID); //trả về những dòng chưa đầy
        });

        const newScore = ROW - unfullGrid.length; //tổng (20) dòng - số dòng chưa đầy = điểm (dòng đã đầy)
        const newRows = Array.from({ length: newScore }, () => Array(COL).fill(WHITE_ID));

        //cập nhật lại những dòng chưa đầy và chèn vào những dòng trắng mới lên trên cùng
        board.grid = [...newRows, ...unfullGrid];
    }
}

//tương tự như Board để tạo ra nextShape
const nextShape = document.getElementById('next_shape');
const nextShapeCtx = nextShape.getContext('2d');
nextShapeCtx.canvas.width = 10 * BlOCK_SIZE;
nextShapeCtx.canvas.height = 10 * BlOCK_SIZE;

class nextShapeBoard {
    constructor(nextShapeCtx) {
        this.nextShapeCtx = nextShapeCtx;
        this.grid = this.generateNextShape();
    }

    generateNextShape() {
        return Array.from({length: 10}, () => Array(10).fill(WHITE_ID));
    }

    //phương thức vẽ ô nhận vào toạ độ trục x,y và id màu
    drawCell(x, y, colorID) {
        //gán màu
        this.nextShapeCtx.fillStyle = COLOR_MAPPING[colorID] || COLOR_MAPPING[WHITE_ID];
        //vẽ ô theo toạ độ x,y
        this.nextShapeCtx.fillRect(x * BlOCK_SIZE, y * BlOCK_SIZE, BlOCK_SIZE, BlOCK_SIZE);
        //vẽ viền cho ô
        this.nextShapeCtx.fillStyle = 'black';
        this.nextShapeCtx.strokeRect(x * BlOCK_SIZE, y * BlOCK_SIZE, BlOCK_SIZE, BlOCK_SIZE);
    }

    drawNextShape() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawNewBoard(col, row, this.grid[row][col]);
                if (this.grid[row][col] !== WHITE_ID) {
                    this.drawCell(col, row, this.grid[row][col])
                }
            }
        }
    }

}



//lớp tạo viên gạch
class Brick {
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        // trạng thái của viên gạch
        this.state = 0;
        //vị trí viên gạch xuất hiện
        this.colPos = 3;
        this.rowPos = 0;
    }

    drawNextBrick() {
        for (let row = 0; row < this.layout[this.state].length; row++) {
            for (let col = 0; col < this.layout[this.state][0].length; col++) {
                //kiểm tra tại vị trí hàng row và cột col, nếu id khác màu trắng thì vẽ
                if (this.layout[this.state][row][col] !== WHITE_ID) {
                    //để vẽ được ô gạch vị trí hàng row và cột col => vị trí colPos của mảng + vị trí col của ô gạch trong mảng, tương tự với rowPos và row
                    nextShape.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    }

    //Phương thức vẽ viên gạch
    drawBrick() {
        for (let row = 0; row < this.layout[this.state].length; row++) {
            for (let col = 0; col < this.layout[this.state][0].length; col++) {
                //kiểm tra tại vị trí hàng row và cột col, nếu id khác màu trắng thì vẽ
                if (this.layout[this.state][row][col] !== WHITE_ID) {
                    //để vẽ được ô gạch vị trí hàng row và cột col => vị trí colPos của mảng + vị trí col của ô gạch trong mảng, tương tự với rowPos và row
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    }

    //xoá viên gạch
    clear() {
        for (let row = 0; row < this.layout[this.state].length; row++) {
            for (let col = 0; col < this.layout[this.state][0].length; col++) {
                //kiểm tra tại vị trí hàng row và cột col, nếu id khác màu trắng thì vẽ
                // if (this.layout[this.state][row][col]) {
                    board.clearCell(col + this.colPos, row + this.rowPos);
                // }
            }
        }
    }

    //di chuyển gạch sang trái
    moveLeft() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.state])) {
            this.clear();
            this.colPos--;
            this.drawBrick();
        }
    }

    //di chuyển gạch sang phải
    moveRight() {
        if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.state])) {
            this.clear();
            this.colPos++;
            this.drawBrick();
        }
    }


    //di chuyển gạch xuống dưới
    moveDown() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.state])) {
            this.clear();
            this.rowPos++;
            this.drawBrick();
            return;
        }

        this.handleLanded();
        createNextBrick();
        this.drawNextBrick();
        this.drawBrick();
        // createNewBrick();
    }

    //xoay gạch
    rotate() {
        if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.state + 1) % 4])) {
            this.clear();
            //cập nhật trạng thái của viên gạch
            this.state = (this.state + 1) % 4;
            /**
             * state = 0
             * (0 + 1) % 4 = 1 % 4 = 1
             *
             * state = 3
             * (3 + 1) % 4 = 4 % 4 = 0
             **/
            this.drawBrick();
        }
    }

    //xử lí va chạm
    checkCollision(nextRow, nextCol, nextLayout) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                //kiểm tra tại vị trí hàng row và cột col, nếu id khác màu trắng thì vẽ
                if (nextLayout[row][col] !== WHITE_ID) {
                    //kiểm tra cột kế tiếp khi di chuyển sang phải
                    if (col + nextCol >= COL) {
                        return true;
                    }
                    //kiểm tra dòng kế tiếp khi di chuyển xuống
                    else if (row + nextRow >= ROW) {
                        return true;
                    }
                    //kiểm tra cột kế tiếp khi di chuyển sang trái
                    else if (col + nextCol < 0) {
                        return  true;
                    }
                    //kiểm tra vị trí tiếp theo có viên gạch nào không
                    else if (board.grid[row+nextRow][col+nextCol] !== WHITE_ID) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    //Lưu lại vị trí của viên gạch khi chạm đáy
    handleLanded() {
        for (let row = 0; row < this.layout[this.state].length; row++) {
            for (let col = 0; col < this.layout[this.state][0].length; col++) {
                if (this.layout[this.state][row][col] !== WHITE_ID) {
                    board.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }

        board.fullRow();
        board.drawBoad();
    }
}
function createNewBrick() {
    //tạo một mảng chứa 6 id viên gạch

    brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length);
}

//Phương thức vẽ viên gạch tiếp theo
function createNextBrick() {
    createNewBrick();
}

//cứ mỗi 1 giây viên gạch sẽ di chuyển xuống dưới
setInterval(() => {
    brick.moveDown();
}, 1000);

//xử lí các sự kiện di chuyển của viên gạch
document.addEventListener('keydown', (e) => {
   switch (e.code) {
       case KEY_CODE.LEFT:
           brick.moveLeft();
           break;
       case KEY_CODE.RIGHT:
           brick.moveRight();
           break;
       case KEY_CODE.Down:
           brick.moveDown();
           break;
       case KEY_CODE.UP:
           brick.rotate();
           break;
       default:
           break;
   }
});

board = new Board(ctx);
nextshape = new nextShapeBoard(nextShapeCtx);

createNextBrick();
brick.drawNextBrick();
// board.drawCell(1, 1, 1);
// brick = new Brick(0);
// createNewBrick();
// brick.drawNextBrick();
brick.drawBrick();
