using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TicTacToe
{
    public partial class Default : System.Web.UI.Page
    {
        private int _winningBoxesSetCount;
        private Dictionary<int, char> _turnMapper;
        private Dictionary<int, char> _player;
        private int[][] _winningSet;
        private int _column;
        private int _playerTurn;
        private  bool _boxInputFlag;
        private  int[] _board;

        protected void Page_Init(object sender, EventArgs e)
        {
            _winningBoxesSetCount = 8;
            _turnMapper = new Dictionary<int, char>()
            {
                { 0,'X' },
                { 1,'O' }
            };
            _player = new Dictionary<int, char>()
            {
                { 0,'A' },
                { 1,'B' }
            };            
            _column = 3;
            _playerTurn = 0;
            _boxInputFlag = true;
            _board = new int[_column * _column];
            ConstructWinningSet(_column);
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (ViewState["board"] != null)
                _board = ViewState["board"] as int[];
            if (ViewState["boxInputFlag"] != null)
                _boxInputFlag = (bool)ViewState["boxInputFlag"];
            if (ViewState["turn"] != null)
                _playerTurn = (int)ViewState["turn"];
        }
        
        private void ConstructWinningSet(int column)
        {
            _column = column;
            // There are total 8 possible permututed win box possiblity in any board where value of each box is box serial number
            _winningSet = new int[_winningBoxesSetCount][];

            // Matrix will store each box number
            int[][] boxIndexes = new int[column][];

            //Generate and store box number
            for (var i = 0; i < column; i++)
            {
                boxIndexes[i] = new int[column];
                for (var j = 0; j < column; j++)
                {
                    boxIndexes[i][j] = column * i + j;
                }
            }
            /* 
                8 boxs can be categorised under 4 possible box win move: 
                1) box-wise 
                2) Column-wise 
                3) Diagonal top-left to bottom-right 
                4) Diagonal top-right to bottom-left	
            */
            var index = 0;

            //row-wise box					
            for (; index < 3; index++)
            {
                _winningSet[index] = new int[column];
                _winningSet[index] = boxIndexes[index];
            }

            //column-wise box						
            for (; index < 6; index++)
            {
                _winningSet[index] = GetColumnTriplet(boxIndexes, index - 3);
            }

            //Diagonal top-left to bottom-right box		
            _winningSet[index++] = GetDiagonalTriplet1(boxIndexes);

            //Diagonal top-right to bottom-left	box
            _winningSet[index] = GetDiagonalTriplet2(boxIndexes);
        }

        protected void FillBoard(object sender, EventArgs e)
        {
            Button button = sender as Button;
            var index =GetIndexByButtonId(button)-1;
          
            if (IsBoxEmpty(index) == true)
            {
                if (_boxInputFlag == true)
                {                                                        
                   _board[index] = _turnMapper[_playerTurn];
                    ViewState["board"] = _board;
			        button.Text=_turnMapper[_playerTurn].ToString();
                }
                if (IsMatchWon() == true)
                {
                    DisplayWinner();
                    _boxInputFlag = false;
                    ViewState["boxInputFlag"] = _boxInputFlag;
                }
                else
                {
                    _playerTurn = (_playerTurn + 1) % 2;
                    ViewState["turn"] = _playerTurn;
                    DisplayPlayerTurn();
                }
            }    
        }

        protected void Btn_Reset_Click(object sender, EventArgs e)
        {
            ResetBoard();
            ResetPlayer();
            _boxInputFlag = true;
            ViewState["boxInputFlag"] = _boxInputFlag;
            ViewState["board"] = null;
            ViewState["turn"] = null;
            Lbl_Winner.Text = "";
            Lbl_Turn.Text = "A";
        }

        private int GetIndexByButtonId(Button button)
        {
            Dictionary<Button, int> indexMapper = new Dictionary<Button, int>()
            {
                { Button1 ,1},
                { Button2 ,2},
                { Button3 ,3},
                { Button4 ,4},
                { Button5 ,5},
                { Button6 ,6},
                { Button7 ,7},
                { Button8 ,8},
                { Button9 ,9},
            };
            return indexMapper[button];
        }

        private int[] GetColumnTriplet(int[][] arr,int n)
        {
           int[] triplet = new int[arr.Length];
           for(int i=0; i < arr.Length; i++)
           {
                triplet[i] = arr[i][n];
           }
           return triplet;
        }

        private int[] GetDiagonalTriplet1(int[][] matrix)
        {
            var triplet = new int[_column];
            for (var i = 0; i < _column; i++)
            {
                triplet[i] = matrix[i][i];
            }
            return triplet;
        }

        private int[] GetDiagonalTriplet2(int[][] matrix)
        {
            var triplet = new int[_column];
            for (var i = _column - 1; i >= 0; i--)
            {
                triplet[i] = matrix[_column - i - 1][i];
            }
            return triplet;
        }

        private void DisplayWinner()
        {
		    Lbl_Winner.Text= _player[_playerTurn].ToString();
        }

        private void DisplayPlayerTurn()
        {	
		    Lbl_Turn.Text=_player[_playerTurn].ToString();
        }

        private bool IsBoxEmpty(int index)
        {
            if (_board[index]==0)
                return true;
            else
                return false;
        }

        private bool IsMatchWon()
        {
            for (var i = 0; i < _winningBoxesSetCount; i++)
            {
                if (IsMatched(_winningSet[i]) == true)
                    return true;
            }
            return false;
        }

        private bool IsMatched(int[] box)
        {
            if ((_board[box[0]] == _board[box[1]] && _board[box[1]] == _board[box[2]]) && _board[box[0]] != 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private void ResetBoard()
        {
            _board = null;
            Button1.Text = "";
            Button2.Text = "";
            Button3.Text = "";
            Button4.Text = "";
            Button5.Text = "";
            Button6.Text = "";
            Button7.Text = "";
            Button8.Text = "";
            Button9.Text = "";
        }

        private void ResetPlayer()
        {
            _playerTurn = 0;
            ViewState["turn"] = _playerTurn;
            DisplayPlayerTurn();
        }

      
    }
}