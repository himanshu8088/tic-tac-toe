
var _winningMove=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

var playerTurn=0;
var playerCellEntry={};
playerCellEntry[0]="X";
playerCellEntry[1]="Y";
var board=[];


function fillBoard(id){
	var index=id-1;
	if(isCellEmpty(index)==true)
	{		
		board[index]=playerCellEntry[playerTurn];
		document.getElementById(id).innerText=playerCellEntry[playerTurn];
		if(isMatchWon==true)
		{
			alert("Player "+playerTurn+" Won");
			resetBoard();
			resetPlayer();
		}
		playerTurn=(playerTurn+1)%2;			
	}	
}

var isMatchWon= function isWon(){
	for(var i=0;i<8;i++){
		if(isMatchCell(_winningMove[i]))
			return true;	
	}
	
}

var isMatchedCell= function isMatch(valueArr){
	if(board[valueArr[0]]==board[valueArr[1]] && board[valueArr[1]]==board[valueArr[2]]){
		return true;
	}
	else{
		return false;
	}
}

var isCellEmpty=function isEmpty(index){
	if(board[index]==undefined)
		return true;
	else
		return false;
}

function resetBoard(){
	for(var i=1;i<=9;i++){
		document.getElementById(i).innerText="";
	}
	board=[];
}

function resetPlayer(){
	var playerTurn=0;
}