// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SteakToken {
    address public owner;
    string public name = "Steak Token";
    string public symbol = "Steak";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    mapping(address => uint256) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function _WithdrawToken(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[owner] >= _value);
        balanceOf[owner] -= _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        return true;
    }

    function _DepositToken(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[_to] >= _value);
        balanceOf[_to] -= _value;
        balanceOf[owner] = balanceOf[owner] + _value;
        return true;
    }

    function _BalanceOf(address _from) public view returns (uint256) {
        return balanceOf[_from];
    }
}
