<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="TicTacToe.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div style="display:flex; flex-direction:column">
            <div style="display:flex">                
                <asp:Button ID="Button1" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px" />
                <asp:Button ID="Button2" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px" />
                <asp:Button ID="Button3" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px" />
            </div> 
               <div style="display:flex">              
                <asp:Button ID="Button4" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px" />
                <asp:Button ID="Button5" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px" />
                <asp:Button ID="Button6" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px" />
            </div>
             <div style="display:flex">   
                <asp:Button ID="Button7" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px"/>
                <asp:Button ID="Button8" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px"/>
                <asp:Button ID="Button9" runat="server" Text="" OnClick="FillBoard" Width="100px" Height="100px"/>
            </div>
        </div>
        <div>
            <asp:Label runat="server" Text="Player Turn:"></asp:Label>
            <asp:Label ID="Lbl_Turn" runat="server" Text="A"></asp:Label>        
        </div>
        <div>
            <asp:Label runat="server" Text="Winner:"></asp:Label>
            <asp:Label ID="Lbl_Winner" runat="server" Text=""></asp:Label>
        </div>        
        <asp:Button ID="Btn_Reset" runat="server" Text="Reset" OnClick="Btn_Reset_Click"/>
    </form>
</body>
</html>
