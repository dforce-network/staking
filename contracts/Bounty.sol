pragma solidity 0.5.17;

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol

/**
 * @dev Interface of the ERC20 standard as defined in the EIP. Does not include
 * the optional functions; to access them see {ERC20Detailed}.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// File: @openzeppelin/contracts/math/SafeMath.sol

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * _Available since v2.4.0._
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

// File: @openzeppelin/contracts/math/Math.sol

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library Math {
    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow, so we distribute
        return (a / 2) + (b / 2) + ((a % 2 + b % 2) / 2);
    }
}

// File: contracts/Bounty.sol

contract Bounty {

    using SafeMath for uint;

    address public rewardToken;
    address public stakeToken;

    uint public rewardAmount;
    uint public rewardStartBlock;
    uint public rewardStopBlock;

    uint public firstNumber;
    uint public incrementPerSecond;

    uint public timesLastNumber = 3;

    uint[] public updateBlocks;

    mapping (address => uint) public userStakeAmounts;
    mapping (address => uint) public userStakeBlock;
    mapping (address => mapping(uint => uint)) public userStakeStage;
    mapping (address => uint) public userWithdrawed;
    mapping (uint => uint) public updateStakeAmounts;
    
    constructor(address _rewardToken, address _stakeToken, uint _rewardAmount, uint _rewardStartBlock, uint _rewardStopBlock) public {
        rewardToken = _rewardToken;
        stakeToken = _stakeToken;
        rewardAmount = _rewardAmount;
        rewardStartBlock = _rewardStartBlock;
        rewardStopBlock = _rewardStopBlock;
        cal(_rewardAmount, _rewardStartBlock, _rewardStopBlock);
    }

    function cal(uint _rewardAmount, uint _rewardStartBlock, uint _rewardStopBlock) internal returns (uint) {
        uint n = _rewardStopBlock.sub(_rewardStartBlock);
        uint doubleMidienNumber =  _rewardAmount.mul(2).div(n);
        firstNumber = doubleMidienNumber.div(timesLastNumber.add(1));
        incrementPerSecond = firstNumber.mul(timesLastNumber.sub(1)).div(n.sub(1));
    }

    function stake(uint _amount) public {
        require(IERC20(stakeToken).transferFrom(msg.sender, address(this), _amount), "Error");

        if (userStakeBlock[msg.sender] == 0) {
            userStakeBlock[msg.sender] = block.number;
        }
        
        userStakeAmounts[msg.sender] = userStakeAmounts[msg.sender].add(_amount);
        userStakeStage[msg.sender][block.number] = userStakeAmounts[msg.sender];

        _addStake(_amount);
    }

    function withdraw(uint _amount) public {
        require(_amount > 0 && _amount <= userStakeAmounts[msg.sender], "Error");

        userStakeAmounts[msg.sender] = userStakeAmounts[msg.sender].sub(_amount);
        userStakeStage[msg.sender][block.number] = userStakeAmounts[msg.sender];
        
        IERC20(rewardToken).transfer(msg.sender, _amount);
        _subStake(_amount);
    }

    function exit() public {
        getReward();

        uint balance = userStakeAmounts[msg.sender];
        withdraw(balance);
    }

    function getReward() public {
        uint userWithdrawal = rewards(msg.sender);
        if (userWithdrawal > 0) {
            userWithdrawed[msg.sender] = userWithdrawed[msg.sender].add(userWithdrawal);
            IERC20(rewardToken).transfer(msg.sender, userWithdrawal);
        }
    }

    function _addStake(uint _amount) internal {
        uint blockNumber = block.number <= rewardStartBlock ? rewardStartBlock : block.number;
        
        bool isPush = true;
        uint len = updateBlocks.length;
        if (len == 0) {
            updateStakeAmounts[blockNumber] = _amount;
        } else {
            uint lastBlockNumber = updateBlocks[len.sub(1)];
            updateStakeAmounts[blockNumber] = updateStakeAmounts[lastBlockNumber].add(_amount);
            if (blockNumber == updateBlocks[len.sub(1)]) {
                isPush = false;
            }
        } 

        if (isPush) {
            updateBlocks.push(blockNumber);
        }

    }

    function _subStake(uint _amount) internal {
        uint blockNumber = block.number >= rewardStartBlock ? rewardStopBlock : block.number;
        
        bool isPush = true;
        uint len = updateBlocks.length;
        if (len == 0) {
            return;
        } else {
            uint lastBlockNumber = updateBlocks[len.sub(1)];
            updateStakeAmounts[block.number] = updateStakeAmounts[lastBlockNumber].sub(_amount);
            if (blockNumber == updateBlocks[len.sub(1)]) {
                isPush = false;
            }
        }

        if (isPush) {
            updateBlocks.push(blockNumber);
        }
    }

    function rewards(address _user) public view returns(uint) {
        uint startBlock = userStakeBlock[_user];
        uint totalWithdrawal = 0;
        uint stakeAmount = userStakeStage[_user][startBlock];

        if (startBlock ==0 || block.number == startBlock ) {
            return 0;
        } else {
            for (uint i = 0; i < updateBlocks.length; i++) {
                if (updateBlocks[i] >= startBlock && updateBlocks[i] < rewardStopBlock) {
                    uint start = updateBlocks[i];
                    uint end = i < updateBlocks.length - 1 ? updateBlocks[i+1] : block.number;
                    if (userStakeStage[_user][start] > 0) {
                        stakeAmount = userStakeStage[_user][start];
                    }
                    uint withdrawal = _getWithdrawl(start, end, stakeAmount);
                    totalWithdrawal = totalWithdrawal.add(withdrawal);
                }
            }
        }

        return totalWithdrawal.sub(userWithdrawed[_user]);
    }

    function _getWithdrawl(uint _start, uint _end, uint _amount) internal view returns (uint) {
        _end = _end <= rewardStopBlock ? _end : rewardStopBlock;

        uint maddn = _end.add(_start).sub(rewardStartBlock.mul(2));
        uint nsubm = _end.sub(_start);
        uint sum  = firstNumber.mul(2).add(maddn.sub(1).mul(incrementPerSecond)).mul(nsubm).div(2);
        sum  = sum <= rewardAmount ? sum : rewardAmount;
        
        uint total = updateStakeAmounts[_start];
        uint withdrawal = sum.mul(_amount).div(total);

        return withdrawal;
    }
}
