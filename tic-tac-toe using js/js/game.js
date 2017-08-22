
var _winningMove=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

var playerTurn=0;
var playerCellEntry={};
playerCellEntry[0]="X";
playerCellEntry[1]="O";

var playerAlias={};
playerAlias[0]="A";
playerAlias[1]="B";

var board=[];

function fillBoard(id){
	var index=id-1;
	if(isCellEmpty(index)==true)
	{		
		board[index]=playerCellEntry[playerTurn];
		document.getElementById(id).innerText=playerCellEntry[playerTurn];
		if(isMatchWonned()==true)
		{							
			displayWinner();		
		}
		playerTurn=(playerTurn+1)%2;	
		displayPlayerTurn();
	}	
}

function displayWinner(){
		document.getElementById("winner").innerText=playerAlias[playerTurn];	
}

function displayPlayerTurn(){	
		document.getElementById("player").innerText=playerAlias[playerTurn];		
}

function isCellEmpty(index){
	if(board[index]==undefined)
		return true;
	else
		return false;
}

function isMatchWonned(){
	for(var i=0;i<8;i++){
		if(isWinSetMatched(_winningMove[i])==true)
			return true;	
	}	
}

function isWinSetMatched(winMove){
	if((board[winMove[0]]==board[winMove[1]] && board[winMove[1]]==board[winMove[2]]) && board[winMove[0]]!=undefined){
		return true;
	}
	else{
		return false;
	}
}

function resetBoard(){
	for(var i=1;i<=9;i++){
		document.getElementById(i).innerText="";
	}
	board=[];
}

function resetPlayer(){
	var playerTurn=0;
	displayPlayerTurn();
}

function resetMatch(){
	resetBoard();
	resetPlayer();
	document.getElementById("winner").innerText="";
}