pragma solidity ^0.5.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
