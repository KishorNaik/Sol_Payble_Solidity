//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PayableDemo{

    // Payble Function
    // Payble Address
    // You can not declare view and Pure keywords once you mark as payble function

    address payable private owner; // Payble Address

    event DepositEvent(address _sender,uint _amount,uint _balance);
    event WithdrawByOwnerEvent(uint _amount,uint _balance);
    event TransferToAddressEvent(address _to,uint amount, uint _balance);

    modifier onlyOwner(){
        require(msg.sender==owner,"Not Owner");
        _;
    }

    constructor(address _ownerAddress) public payable  {  // Payable Contractor
        owner=payable(_ownerAddress);
        emit DepositEvent(_ownerAddress, msg.value, address(this).balance);
    }

    function deposit() public payable{ // Payable Function
        emit DepositEvent(msg.sender, msg.value, address(this).balance);
    }

    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }

    function getBalanceByAddress(address _memberAddress) public view returns(uint){
        return _memberAddress.balance;
    }

    function withdrawByOwner(uint _amount) public payable onlyOwner{
        owner.transfer(_amount);
        emit WithdrawByOwnerEvent(_amount, address(this).balance);
    }

    function transferToAddress(address payable _to,uint _amount) public payable onlyOwner{
        _to.transfer(_amount);
        emit TransferToAddressEvent(_to, _amount, address(this).balance);
    }

}