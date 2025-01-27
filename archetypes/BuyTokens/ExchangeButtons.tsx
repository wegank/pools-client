import React, { useState, useMemo, useContext } from 'react';
import { Transition } from '@headlessui/react';
import styled from 'styled-components';
import { Pool, PoolToken, SideEnum, NETWORKS } from '@tracer-protocol/pools-js';
import MintButton, { MintSourceEnum } from '~/archetypes/BuyTokens/MintButton';
import { calcNumTokens } from '~/archetypes/Exchange/Summary/utils';
import { BrowseTableRowData } from '~/archetypes/Pools/state';
import { HiddenExpand } from '~/components/General';
import { ExchangeButtonProps } from '~/components/General/Button/ExchangeButton';
import TimeLeft from '~/components/TimeLeft';
import { useBigNumber } from '~/context/SwapContext';
import { usePoolInstanceActions } from '~/hooks/usePoolInstanceActions';
import TracerSVG from '~/public/img/logos/tracer/tracer_logo.svg';
import { constructBalancerLink } from '~/utils/balancer';
import { toApproxCurrency } from '~/utils/converters';
import { AnalyticsContext } from '~/context/AnalyticsContext';

export type EXButtonsProps = {
    amount: string;
    isLong: boolean;
    pool: Pool;
    side: SideEnum;
    token: PoolToken;
    leverage: number;
    market: string;
    poolTokens: BrowseTableRowData[];
    isInvalid: boolean;
} & ExchangeButtonProps;

export const ExchangeButtons: React.FC<EXButtonsProps> = ({
    amount,
    isLong,
    pool,
    side,
    token,
    leverage,
    market,
    poolTokens,
    isInvalid,
    swapState,
    swapDispatch,
    account,
    userBalances,
    commitType,
}) => {
    const [mintButtonClicked, setMintButtonClicked] = useState(false);
    // Required for tracking trade actions
    const { trackBuyAction } = useContext(AnalyticsContext);

    const handleClick = () => {
        setMintButtonClicked(true);
    };

    const { commit, approve } = usePoolInstanceActions();
    const amountBN = useBigNumber(amount);

    const tokenPrice = useMemo(
        () => (isLong ? pool.getNextLongTokenPrice() : pool.getNextShortTokenPrice()),
        [isLong, pool.longToken, pool.shortToken],
    );

    const balancerPrice = useMemo(
        () =>
            poolTokens && token && token.symbol
                ? isLong
                    ? poolTokens.filter((poolToken) => poolToken.address === token?.pool)[0]?.longToken?.balancerPrice
                    : poolTokens.filter((poolToken) => poolToken.address === token?.pool)[0]?.shortToken?.balancerPrice
                : NaN,
        [isLong, token, poolTokens, pool.longToken, pool.shortToken],
    );

    const nextTokenPrice = useMemo(
        () => (isLong ? pool.getNextLongTokenPrice() : pool.getNextShortTokenPrice()),
        [isLong, pool.longToken, pool.shortToken],
    );

    const expectedAmount = calcNumTokens(amountBN, nextTokenPrice);
    const expectedBalancerAmount = !isNaN(balancerPrice)
        ? calcNumTokens(amountBN, useBigNumber(balancerPrice.toString()))
        : useBigNumber('0');

    const isValidOnBalancer = isFinite(expectedBalancerAmount.toNumber());
    const isValidAmount = parseFloat(amount) > 0 && amount.length > 0;
    const sideIndicator = side === SideEnum.long ? 'L' : 'S';
    const timeLeft = useMemo(
        () => poolTokens.filter((poolToken) => poolToken.address === token?.pool)[0]?.expectedExecution,
        [poolTokens, token],
    );

    return (
        <StyledHiddenExpand defaultHeight={0} open={!isInvalid && !!timeLeft && account !== undefined}>
            <Transition
                show={!isInvalid}
                enter="transition-opacity duration-50 delay-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <BuyButtonContainer>
                    <BuyText>
                        Mint <b>{`${expectedAmount.toNumber().toFixed(3)}`}</b> tokens at{' '}
                        <b>{toApproxCurrency(tokenPrice, 3)}</b> in{' '}
                        <b>
                            <TimeLeft targetTime={timeLeft} />
                        </b>
                    </BuyText>
                    <MintButtonContainer isValidAmount={isValidAmount} account={account}>
                        {userBalances.settlementToken.approvedAmount.eq(0) && (
                            <TracerMintButton
                                hidden={mintButtonClicked}
                                onClick={handleClick}
                                disabled={!isValidAmount}
                            >
                                <span className="mr-2 inline-block">Mint on</span>
                                <TracerSVG className="w-[90px]" alt="Tracer logo" />
                            </TracerMintButton>
                        )}
                        <MintButton
                            swapState={swapState}
                            swapDispatch={swapDispatch}
                            userBalances={userBalances}
                            approve={approve}
                            pool={pool}
                            amountBN={amountBN}
                            commit={commit}
                            commitType={commitType}
                            token={token}
                            isLong={isLong}
                            trackBuyAction={trackBuyAction}
                        />
                    </MintButtonContainer>
                </BuyButtonContainer>
                <BuyButtonContainer>
                    <BuyText>
                        {isValidOnBalancer ? (
                            <>
                                Buy <b>{expectedBalancerAmount?.toNumber().toFixed(3)}</b> tokens at{' '}
                                <b>${balancerPrice && parseFloat(balancerPrice.toString()).toFixed(3)}</b> instantly
                            </>
                        ) : (
                            <>
                                There are no Balancer pools for the {leverage}
                                {sideIndicator}-{market} token yet.
                            </>
                        )}
                    </BuyText>
                    <BalancerBuyButton
                        onClick={() => {
                            trackBuyAction(
                                side,
                                leverage,
                                token.name,
                                pool.settlementToken.symbol,
                                expectedAmount,
                                amountBN,
                                userBalances.settlementToken.balance,
                                MintSourceEnum.balancer,
                            );
                            open(constructBalancerLink(token?.address, NETWORKS.ARBITRUM, true), '_blank');
                        }}
                        isValidOnBalancer={isValidOnBalancer}
                        isValidAmount={isValidAmount}
                        disabled={!isValidOnBalancer || !isValidAmount}
                    >
                        <span className="mr-2 inline-block">Take me to</span>
                        <img className="w-[105px]" alt="tracer-logo" src={'/img/logos/balancer/balancer_logo.svg'} />
                    </BalancerBuyButton>
                </BuyButtonContainer>
            </Transition>
        </StyledHiddenExpand>
    );
};

export default ExchangeButtons;

const StyledHiddenExpand = styled(HiddenExpand)`
    margin-top: 0;
    margin-bottom: 16px;
    @media (min-width: 640px) {
        margin-bottom: 48px;
    }
`;

const BuyButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    width: 100%;
    background: var(--background-secondary);
    border-radius: 8px;
    padding: 16px;
    color: var(--text);
    @media (min-width: 640px) {
        flex-direction: row;
        padding: 12px 12px 12px 16px;
    }
`;

const MintButtonContainer = styled.div<{
    isValidAmount: boolean;
    account?: string;
}>`
    position: relative;
    width: 220px;
    height: 56px;
    opacity: ${({ isValidAmount, account }) => (isValidAmount || !account ? '1' : '0.5')};
    cursor: ${({ isValidAmount, account }) => (isValidAmount || !account ? 'pointer' : 'not-allowed')};
    button {
        pointer-events: ${({ isValidAmount, account }) => (isValidAmount || !account ? 'auto' : 'none')};
    }
`;

export const TracerMintButton = styled.button`
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 13px 25px;
    width: 100%;
    height: 100%;
    background: #3535dc;
    border-radius: 7px;
    color: white;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    z-index: 1;
`;

const BalancerBuyButton = styled.button<{
    isValidOnBalancer: boolean;
    isValidAmount: boolean;
}>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 13px 11px;
    width: 220px;
    height: 56px;
    background: #16bdca;
    border-radius: 4px;
    color: white;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    opacity: ${({ isValidOnBalancer, isValidAmount }) => (isValidOnBalancer && isValidAmount ? '1' : '0.5')};
    cursor: ${({ isValidOnBalancer, isValidAmount }) =>
        isValidOnBalancer && isValidAmount ? 'default' : 'not-allowed'};
`;

const BuyText = styled.p`
    max-width: 235px;
    margin-right: 20px;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    margin-bottom: 16px;
    text-align: center;
    @media (min-width: 640px) {
        margin-bottom: 0;
        text-align: left;
    }
`;
