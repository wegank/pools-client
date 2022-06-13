import React from 'react';
import { CommitActionEnum, SideEnum, NETWORKS } from '@tracer-protocol/pools-js';
import { TableRow } from '~/components/General/TWTable';
import { PoolStatusBadge, PoolStatusBadgeContainer } from '~/components/PoolStatusBadge';
import TimeLeft from '~/components/TimeLeft';
import Actions from '~/components/TokenActions';
import { PortfolioSellTooltip, PortfolioStakeTooltip, StyledTooltip } from '~/components/Tooltips';
import TooltipSelector, { TooltipKeys } from '~/components/Tooltips/TooltipSelector';
import { BlockExplorerAddressType } from '~/types/blockExplorers';
import { ClaimedRowActions, ClaimedTokenRowProps } from '~/types/claimedTokens';
import { PoolStatus } from '~/types/pools';
import { constructBalancerLink } from '~/utils/balancer';
import { Market } from '../Market';
import { ActionsButton, ActionsCell } from '../OverviewTable/styles';
import { OverviewTableRowCell } from '../OverviewTable/styles';
import { TokensNotional } from '../Tokens';

export const ClaimedTokenRow: React.FC<ClaimedTokenRowProps & ClaimedRowActions> = ({
    symbol,
    address,
    poolAddress,
    decimals,
    settlementTokenSymbol,
    side,
    balance,
    currentTokenPrice,
    onClickCommitAction,
    onClickStake,
    leveragedNotionalValue,
    expectedExecution,
    poolStatus,
}) => {
    const poolIsDeprecated = poolStatus === PoolStatus.Deprecated;

    // if there is any balance at all they should stake
    const shouldStake = !balance.eq(0);
    return (
        <TableRow lined>
            <OverviewTableRowCell>
                <Market tokenSymbol={symbol} isLong={side === SideEnum.long} />
            </OverviewTableRowCell>
            <OverviewTableRowCell>
                <PoolStatusBadgeContainer>
                    <PoolStatusBadge status={poolStatus} />
                </PoolStatusBadgeContainer>
            </OverviewTableRowCell>
            <OverviewTableRowCell>
                <TokensNotional
                    amount={balance}
                    price={currentTokenPrice}
                    settlementTokenSymbol={settlementTokenSymbol}
                />
            </OverviewTableRowCell>
            <OverviewTableRowCell>
                <div>{`${leveragedNotionalValue.toFixed(3)} ${settlementTokenSymbol}`}</div>
            </OverviewTableRowCell>
            <ActionsCell>
                <PortfolioStakeTooltip>
                    <ActionsButton
                        size="xs"
                        variant="primary-light"
                        // will never be disabled if it gets included as a row it will always be either to stake or to unstake
                        onClick={() => onClickStake(address, shouldStake ? 'stake' : 'unstake')}
                    >
                        {shouldStake ? 'Stake' : 'Unstake'}
                    </ActionsButton>
                </PortfolioStakeTooltip>
                <PortfolioSellTooltip>
                    <ActionsButton
                        size="xs"
                        variant="primary-light"
                        disabled={!balance.toNumber()}
                        onClick={() => open(constructBalancerLink(address, NETWORKS.ARBITRUM, false), '_blank')}
                    >
                        Sell
                    </ActionsButton>
                </PortfolioSellTooltip>
                {console.log(expectedExecution)}
                <StyledTooltip
                    title={
                        <>
                            Burn the Pool Token on Tracer and receive it in <TimeLeft targetTime={expectedExecution} />.
                        </>
                    }
                >
                    <ActionsButton
                        size="xs"
                        variant="primary-light"
                        disabled={!balance.toNumber()}
                        onClick={() => onClickCommitAction(poolAddress, side, CommitActionEnum.burn)}
                    >
                        Burn
                    </ActionsButton>
                </StyledTooltip>
                <TooltipSelector
                    tooltip={{
                        key: poolIsDeprecated ? TooltipKeys.DeprecatedPoolFlipCommit : TooltipKeys.PortfolioFlip,
                    }}
                >
                    <div>
                        <ActionsButton
                            size="xs"
                            variant="primary-light"
                            disabled={poolIsDeprecated || !balance.toNumber()}
                            onClick={() => onClickCommitAction(poolAddress, side, CommitActionEnum.flip)}
                        >
                            Flip
                        </ActionsButton>
                    </div>
                </TooltipSelector>
                <Actions
                    token={{
                        address,
                        symbol,
                        decimals,
                    }}
                    arbiscanTarget={{
                        type: BlockExplorerAddressType.token,
                        target: address,
                    }}
                />
            </ActionsCell>
        </TableRow>
    );
};

export default ClaimedTokenRow;
