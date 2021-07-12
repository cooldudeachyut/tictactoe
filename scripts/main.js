function createGrid()
{
	const grid = document.getElementById("game-grid");
	
	for (let i = 0; i < 9; i++)
	{
		let div = document.createElement("div");
		div.classList.add("grid-card");
		div.id = `grid-${i}`;
		grid.append(div);
	}
}

createGrid();