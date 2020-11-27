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

// File: contracts/Bounty.sol


/**
The solution is an arithmetic sequence model:
An = A1+(n-1)d
Sn = (A1+An)*n/2

An is the reward in n'th seconds (An is the sn in issue)
Sn is the total reward
A1 is the first second reward
d is the increment per second
n is the total seconds

you should specify: 
- Sn: total reward amount
- n: startRewardBlock - stopRewardBlock
- times: the times the last number more than the first number (An/A1)

we can calculate A1 and d from above
An is the reward amount per second, A1 < A2 < A3 ... < An | A1 + A2 + ... + An = Sn
*/  



contract Bounty {

    using SafeMath for uint;

    address public owner;
    address public rewardToken;
    address public stakeToken;

    uint public rewardAmount;
    uint public rewardStartBlock;
    uint public rewardStopBlock;

    uint public firstNumber;
    uint public incrementPerSecond;
    uint public timesLastNumber = 3;
    uint public secondsPerBlock = 13;

    uint public stakeAmount;

    mapping (address => uint) public userStakeAmounts;
    mapping (address => uint) public userWithdrawed;
    
    constructor(address _rewardToken, address _stakeToken, uint _rewardAmount, uint _rewardStartBlock, uint _rewardStopBlock) public {
        rewardToken = _rewardToken;
        stakeToken = _stakeToken;
        rewardAmount = _rewardAmount;
        rewardStartBlock = _rewardStartBlock;
        rewardStopBlock = _rewardStopBlock;
        cal(_rewardAmount, _rewardStartBlock, _rewardStopBlock);
    }

    function cal(uint _rewardAmount, uint _rewardStartBlock, uint _rewardStopBlock) internal returns (uint) {
        uint n = _rewardStopBlock.sub(_rewardStartBlock).mul(secondsPerBlock);
        uint doubleMidienNumber =  _rewardAmount.mul(2).div(n);
        firstNumber = doubleMidienNumber.div(timesLastNumber.add(1));
        incrementPerSecond = firstNumber.mul(timesLastNumber.sub(1)).div(n.sub(1));
    }

    function stake(uint _amount) public {
        require(IERC20(stakeToken).transferFrom(msg.sender, address(this), _amount), "Error");

        stakeAmount = stakeAmount.add(_amount);
        userStakeAmounts[msg.sender] = userStakeAmounts[msg.sender].add(_amount);

    }

    function unstake() public {
        uint amount = userStakeAmounts[msg.sender];
        require(amount > 0, "");

        uint withdrawal = balanceOf(msg.sender);
        withdraw(withdrawal);

        userStakeAmounts[msg.sender] = 0;
        IERC20(rewardToken).transfer(msg.sender, amount);
    }

    function balanceOf(address _user) public view returns(uint) {
        uint amount = userStakeAmounts[_user];
        uint totalWithdrawal = 0;

        if (amount == 0 || block.number <= rewardStartBlock) {
            return 0;
        } else if (block.number >= rewardStopBlock) {
            totalWithdrawal = rewardAmount;
        } else {
            uint totalSeconds = block.number.sub(rewardStartBlock).mul(secondsPerBlock);
            totalWithdrawal = firstNumber.mul(totalSeconds).add(totalSeconds.mul(totalSeconds.sub(1)).mul(incrementPerSecond).div(2));
            totalWithdrawal = totalWithdrawal <= rewardAmount ? totalWithdrawal : rewardAmount;
        }

        uint userWithdrawal = totalWithdrawal.mul(amount).div(stakeAmount);
        return userWithdrawal.sub(userWithdrawed[_user]);
    }

    function withdraw(uint _amount) public {
        uint userWithdrawal = balanceOf(msg.sender);
        require(_amount <= userWithdrawal, "Error");

        userWithdrawed[msg.sender] = userWithdrawed[msg.sender].add(_amount);
        IERC20(rewardToken).transfer(msg.sender, _amount);
    }
}
