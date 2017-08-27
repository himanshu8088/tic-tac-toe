var winningBoxes;
var winningBoxesCount=8;
var columnCount=0;
var playerTurn=0;
var turnwiseBoxEntry={};
var boxInputFlag=true;
var playerAlias={};
var board;

turnwiseBoxEntry[0]="X";
turnwiseBoxEntry[1]="O";
playerAlias[0]="A";
playerAlias[1]="B";


$(document).ready(constructWinningMove());
$('.box').click(function(event) {
    var boxId = $(this).attr('id')
    fillBoard(boxId);
});


function constructWinningMove(){
	columnCount=Math.sqrt(document.getElementById("matrix").childElementCount);	
	board=new Array(columnCount*columnCount);
	// There are total 8 possible permututed win box possiblity in any board where value of each box is box serial number
	winningBoxes=new Array(winningBoxesCount);	

	// Matrix will store each box number
	var idMatrix= new Array(columnCount);
		
	//Generate and store box number
	for(var i=0;i<columnCount;i++){				
		idMatrix[i]=new Array(columnCount);
		for(var j=0;j<columnCount;j++){
			idMatrix[i][j]=columnCount*i+j;
		}
	}


	/* 
		8 boxs can be categorised under 4 possible box win move: 
	 	1) box-wise 
	 	2) Column-wise 
	 	3) Diagonal top-left to bottom-right 
		4) Diagonal top-right to bottom-left	
	*/

	var index=0;

	//row-wise box					
	for(;index<3;index++){	
		winningBoxes[index]=new Array(idMatrix[index]);		
	}
	
	//column-wise box						
	for(;index<6;index++){	
		winningBoxes[index]=new Array(getColumnTriplet(idMatrix,index-3));		
	}

	function getColumnTriplet(arr, n) {
	  return arr.map(x=> x[n]);
	}
	
	//Diagonal top-left to bottom-right box		
	winningBoxes[index++]=new Array(getDiagonalTriplet1(idMatrix));
	function getDiagonalTriplet1(matrix){
		var tempArr=new Array(columnCount);
		for(var i=0;i<columnCount;i++){
			tempArr[i]=matrix[i][i];
		}
	 return tempArr;
	}		

	//Diagonal top-right to bottom-left	box
	winningBoxes[index]=new Array(getDiagonalTriplet2(idMatrix));
	function getDiagonalTriplet2(matrix){
		var tempArr=new Array(columnCount);
		for(var i=columnCount-1;i>=0;i--){
			tempArr[i]=matrix[columnCount-i-1][i];
		}
		return tempArr;
	}		
}

function fillBoard(id){	
	var index=id-1;
	if(isBoxEmpty(index)==true)
	{				
		if(boxInputFlag==true){
			board[index]=turnwiseBoxEntry[playerTurn];		
			$("#"+id).text(turnwiseBoxEntry[playerTurn]);
		}
		if(isMatchWon()==true){							
			displayWinner();
			boxInputFlag=false;				
		}
		else{			
			playerTurn=(playerTurn+1)%2;	
			displayPlayerTurn();
		}		
	}		  
}

function isBoxEmpty(index){
	if(board[index]==undefined)
		return true;
	else
		return false;
}

function isMatchWon(){
	for(var i=0;i<winningBoxesCount;i++){		
		if(isMatched(winningBoxes[i])==true)
			return true;	
	}	
	return false;
}

function isMatched(box){		
	if((board[box[0][0]]==board[box[0][1]] && board[box[0][1]]==board[box[0][2]]) && board[box[0][0]]!=undefined){
		return true;
	}
	else{
		return false;
	}
}

function resetBoard(){
	for(var i=1;i<=columnCount*columnCount;i++){
		$("#"+i).text("");
	}
	board=[];
}

function resetPlayer(){
	playerTurn=0;
	displayPlayerTurn();
}

function resetMatch(){
	resetBoard();
	resetPlayer();
	boxInputFlag=true;	
	$("#winner").text("");	
	$("#player").text("Player Turn:A");	
}

function displayWinner(){
		$("#winner").text("Winner:"+playerAlias[playerTurn]);	
}

function displayPlayerTurn(){	
		$("#player").text("Player Turn:"+playerAlias[playerTurn]);		
}