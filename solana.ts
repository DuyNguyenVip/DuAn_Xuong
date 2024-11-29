/*** CONSTANT ***/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING: string[] = [
  'red',
  'orange',
  'green',
  'purple',
  'blue',
  'cyan',
  'yellow',
  'white',
];

const BRICK_LAYOUT: number[][][][] = [
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

const KEY_CODES = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
};

const WHITE_COLOR_ID = 7;

const canvas = document.getElementById('board') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

class Board {
  ctx: CanvasRenderingContext2D;
  grid: number[][];
  score: number;
  gameOver: boolean;
  isPlaying: boolean;
  clearAudio: HTMLAudioElement;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = false;

    this.clearAudio = new Audio('../sounds/clear.wav');
  }

  reset() {
    this.score = 0;
    this.grid = this.generateWhiteBoard();
    this.gameOver = false;
    this.drawBoard();
  }

  generateWhiteBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
  }

  drawCell(xAxis: number, yAxis: number, colorId: number) {
    this.ctx.fillStyle =
      COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
    this.ctx.fillRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }

  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  handleCompleteRows() {
    const latestGrid = board.grid.filter((row) => {
      return row.some((col) => col === WHITE_COLOR_ID);
    });

    const newScore = ROWS - latestGrid.length;
    const newRows = Array.from({ length: newScore }, () =>
      Array(COLS).fill(WHITE_COLOR_ID)
    );

    if (newScore) {
      board.grid = [...newRows, ...latestGrid];
      this.handleScore(newScore * 10);

      this.clearAudio.play();
      console.log({ latestGrid });
    }
  }

  handleScore(newScore: number) {
    this.score += newScore;
    document.getElementById('score')!.innerHTML = this.score.toString();
  }

  handleGameOver() {
    this.gameOver = true;
    this.isPlaying = false;
    alert('GAME OVER!!!');
  }
}

class Brick {
  id: number;
  layout: number[][][];
  activeIndex: number;
  colPos: number;
  rowPos: number;

  constructor(id: number) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id];
    this.activeIndex = 0;
    this.colPos = 3;
    this.rowPos = -2;
  }

  draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id);
        }
      }
    }
  }

  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
        }
      }
    }
  }

  moveLeft() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos - 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos--;
      this.draw();
    }
  }

  moveRight() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos + 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos++;
      this.draw();
    }
  }

  moveDown() {
    if (
      !this.checkCollision(
        this.rowPos + 1,
        this.colPos,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.rowPos++;
      this.draw();

      return;
    }

    this.handleLanded();
    generateNewBrick();
  }

  rotate() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos,
        this.layout[(this.activeIndex + 1) % 4]
      )
    ) {
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      this.draw();
    }
  }

  checkCollision(nextRow: number, nextCol: number, nextLayout: number[][]): boolean {
    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= COLS ||
            row + nextRow >= ROWS ||
            board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
          )
            return true;
        }
      }
    }

    return false;
  }

  handleLanded() {
    if (this.rowPos <= 0) {
      board.handleGameOver();
      return;
    }

    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id;
        }
      }
    }

    board.handleCompleteRows();
    board.drawBoard();
  }
}

function generateNewBrick() {
  brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length); 
}

let brick: Brick;
let board = new Board(ctx);
board.drawBoard();

document.getElementById('play')?.addEventListener('click', () => {
  board.reset();

  board.isPlaying = true;

  generateNewBrick();

  const refresh = setInterval(() => {
    if (!board.gameOver) {
      brick.moveDown();
    } else {
      clearInterval(refresh);
    }
  }, 1000);
});

document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (!board.gameOver && board.isPlaying) {
    switch (e.code) {
      case KEY_CODES.LEFT:
        brick.moveLeft();
        break;
      case KEY_CODES.RIGHT:
        brick.moveRight();
        break;
      case KEY_CODES.DOWN:
        brick.moveDown();
        break;
      case KEY_CODES.UP:
        brick.rotate();
        break;
      default:
        break;
    }
  }
});
declare global {
  interface Window {
    phantom: {
      solana: {
        connect: () => Promise<void>;
        publicKey: {
          toBase58: () => string;
        };
      };
    };
  }
}

// Type for the response object
interface ApiResponse {
  // Add specific properties depending on the actual structure of the response
  success: boolean;
  data?: any;
  error?: string;
}

let publicKey: string;

// 1: AUTO CONNECT
(async () => {
  await window.phantom.solana.connect();
  publicKey = window.phantom.solana.publicKey.toBase58();
  console.log(publicKey);
})();

// 2. Manual connect
const connectWallet = async (): Promise<void> => {
  await window.phantom.solana.connect();
  publicKey = window.phantom.solana.publicKey.toBase58();
  console.log(publicKey);
};

//====[Mint NFT] ====
const PRIV_KEY: string = "wss://devnet-rpc.shyft.to?api_key=36D8I6tAv8mc98-o";

// Define the mintNft function
const mintNft = async (): Promise<void> => {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", PRIV_KEY);

  const fileInput = document.querySelector("#fileInput") as HTMLInputElement;

  if (!fileInput.files?.[0]) {
    console.error("No file selected");
    return;
  }

  const formdata = new FormData();
  formdata.append("network", "devnet");
  formdata.append("wallet", publicKey);
  formdata.append("name", "FPOLY NFT");
  formdata.append("symbol", "FPL");
  formdata.append("description", "FPL Token makes Web3 so easy!");
  formdata.append("attributes", '[{"trait_type":"dev power","value":"over 900"}]');
  formdata.append("external_url", "https://shyft.to");
  formdata.append("max_supply", "1");
  formdata.append("royalty", "5");
  formdata.append("file", fileInput.files[0]);
  formdata.append("data", fileInput.files[0]);
  formdata.append("receiver", publicKey);
  formdata.append(
    "service_charge",
    '{ "receiver": "499qpPLdqgvVeGvvNjsWi27QHpC8GPkPfuL5Cn2DtZJe",  "token": "DjMA5cCK95X333t7SgkpsG5vC9wMk7u9JV4w8qipvFE8",  "amount": 0.01}'
  );

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch("https://api.shyft.to/sol/v1/nft/create_detach", requestOptions);
    const res: ApiResponse = await response.json();
    
    if (res.success) {
      console.log("NFT created successfully", res);
    } else {
      console.error("Error creating NFT", res.error);
    }
  } catch (error) {
    console.error("Error in fetch:", error);
  }
};
