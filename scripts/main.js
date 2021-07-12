function gameBoardFactory()
{
	let turn;
	let boardSign = [];
	let gameOver;
	let number_of_turns;
	function createGrid()
	{
		const main = document.getElementById("main");
		let children = [...main.childNodes];
		for (let i = 0; i < children.length; i++)
			if (children[i].id != "topbar")
				main.removeChild(children[i]);

		let grid = document.createElement("div");
		grid.id = "game-grid";
		main.append(grid);

		for (let i = 0; i < 9; i++)
		{
			let div = document.createElement("div");
			div.classList.add("grid-card");
			
			hidden = document.createElement("div");
			hidden.innerText = i;
			hidden.style.display = "none";
			div.append(hidden);

			div.addEventListener("click", addSymbol);
			grid.append(div);
		}

		let turn_ind = document.createElement("div");
		turn_ind.id = "turn-indicator";
		turn_ind.style.backgroundColor = "rgb(0,0,255)";
		turn_ind.innerText = "Player 1's turn!";
		turn = 1;
		main.append(turn_ind);

		let restart = document.createElement("button");
		restart.type = "button";
		restart.id = "restart-btn";
		restart.innerText = "RESTART";
		restart.addEventListener("click", createGrid);
		main.append(restart);

		gameOver = 0;
		number_of_turns = 0;
		boardSign = [];
		for (let i = 0; i < 9; i++)
			boardSign.push(-1);
	}

	function addSymbol(event)
	{
		if (gameOver == 1)
			return;

		let target = event.currentTarget;
		let id = target.firstChild.innerText;
		
		if (boardSign[id] == -1)
		{
			boardSign[id] = turn;
			number_of_turns++;

			if (turn == 1)
			{
				target.innerText = "o";
				target.style.color = "rgb(0,0, 255)";
				turn = 2;
			}

			else
			{
				target.innerText = "x";
				target.style.color = "rgb(255,0, 0)";
				turn = 1;
			}

			checkWin();
			changeTurnIndicator();
		}
	}

	function changeTurnIndicator()
	{
		if (gameOver == 1)
			return;

		let turn_ind = document.getElementById("turn-indicator");

		if (turn == 1)
			turn_ind.style.backgroundColor = "rgb(0,0, 255)";

		else
			turn_ind.style.backgroundColor = "rgb(255,0, 0)";

		turn_ind.innerText = `Player ${turn}'s turn!`;
	}

	function checkWin()
	{
		if (boardSign[4] != -1 && ((boardSign[0] == boardSign[4] && boardSign[4] == boardSign[8]) || (boardSign[2] == boardSign[4] && boardSign[4] == boardSign[6])))
		{
			printWin();
			return;
		}

		for (let i = 0; i < 9; i += 3)
		{
			if (boardSign[i] != -1 && boardSign[i] == boardSign[i + 1] && boardSign[i + 1] == boardSign[i + 2])
			{
				printWin();
				return;
			}
		}

		for (let i = 0; i < 3; i++)
		{
			if (boardSign[i] != -1 && boardSign[i] == boardSign[i + 3] && boardSign[i + 3] == boardSign[i + 6])
			{
				printWin();
				return;
			}
		}

		if (number_of_turns == 9)
			printTie();
	}

	function printWin()
	{
		let winner = turn == 1 ? 2 : 1;
		let turn_ind = document.getElementById("turn-indicator");

		if (winner == 1)
			turn_ind.style.backgroundColor = "rgb(0,0, 255)";

		else
			turn_ind.style.backgroundColor = "rgb(255,0, 0)";

		turn_ind.innerText = `Player ${winner} won!`;
		gameOver = 1;
	}

	function printTie()
	{
		let turn_ind = document.getElementById("turn-indicator");
		turn_ind.style.backgroundColor = "rgb(0,255,0)";
		turn_ind.innerText = `Tied!`;
		gameOver = 1;
	}

	return {createGrid};
}

let gameBoard = gameBoardFactory();
gameBoard.createGrid();