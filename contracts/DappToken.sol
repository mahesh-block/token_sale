pragma solidity ^0.4.2;

contract DappToken {

        // variable declaration
        uint256 public totalSupply;
        string public name = "DApp Token";
        string public symbol = "DAPP";
        string public standard = "DApp Token v1.0";

        //event triggers when tokens are transferred
        event Transfer(
            address indexed _from,
            address indexed _to,
            uint256 _value
            );
        event Approval(
            address indexed _owner,
            address indexed _spender,
            uint256 _value
            );
        mapping (address => uint256) public balanceOf;
        //defining variable how much owner allowed to spend
        mapping (address => mapping (address => uint256) )public allowance;
        //constructor function with initial supply
        function DappToken(uint256 _initialSupply) public{
            balanceOf[msg.sender] = _initialSupply;
            totalSupply = _initialSupply;
        }

        //Transfer function
        function transfer(address _to,uint256 _value) public returns (bool success) {
            //exception if account doesn't have enough value
            require(balanceOf[msg.sender] >= _value);
            balanceOf[msg.sender] -= _value;
            balanceOf[_to] += _value;
            Transfer(msg.sender, _to, _value);

            return true;
        }
        // approving spender to spend your money
        function approve(address _spender,uint256 _value) public returns (bool success) {
            allowance[msg.sender][_spender]=_value;
            Approval(msg.sender, _spender, _value);
            return true;
        }
        //transfer from
        function transferFrom(address _from,address _to,uint256 _value) public returns (bool success) {
            //owner has enough tokens
            require(_value <= balanceOf[_from]);
            require(_value <= allowance[_from][msg.sender]);
            balanceOf[_from] -= _value;
            balanceOf[_to] += _value;

            allowance[_from][msg.sender] -=_value;
            Transfer(_from, _to, _value);
            //change balance

            return true;
        }
}
