import React, { useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { BalanceTypeEnum } from '@tracer-protocol/pools-js';
import MintBurnModal from '~/archetypes/Pools/MintBurnModal';
import Divider from '~/components/General/Divider';
import { noDispatch, useSwapContext } from '~/context/SwapContext';
import usePortfolioOverview from '~/hooks/usePortfolioOverview';
import { useStore } from '~/store/main';
import { selectAccount, selectHandleConnect } from '~/store/Web3Slice';

import { OnClickCommit, OnClickStake } from '~/types/portfolio';
import { ClaimedTokens } from './ClaimedTokensTable';
import HistoricCommits from './HistoricCommits';
import QueuedCommits from './QueuedCommits';
import { portfolioReducer, initialPortfolioState } from './state';
import { Container } from './styles';
import * as Styles from './styles';
import { TradeOverviewBanner } from './TradeOverviewBanner';
import UnclaimedTokens from './UnclaimedTokens';

export const PortfolioPage = (): JSX.Element => {
    const router = useRouter();
    const account = useStore(selectAccount);
    const handleConnect = useStore(selectHandleConnect);
    const { swapDispatch = noDispatch } = useSwapContext();
    const [state, dispatch] = useReducer(portfolioReducer, initialPortfolioState);
    const [mintBurnModalOpen, setMintBurnModalOpen] = useState(false);
    const portfolioOverview = usePortfolioOverview();

    const onClickCommitAction: OnClickCommit = (pool, side, action, unclaimed) => {
        swapDispatch({ type: 'setBalanceType', value: unclaimed ? BalanceTypeEnum.escrow : BalanceTypeEnum.wallet });
        swapDispatch({ type: 'setSelectedPool', value: pool });
        swapDispatch({ type: 'setSide', value: side });
        swapDispatch({ type: 'setCommitAction', value: action });
        setMintBurnModalOpen(true);
    };

    const onClickStake: OnClickStake = (token: string, stakeAction: 'stake' | 'unstake') => {
        router.push({
            pathname: '/stake',
            query: {
                [stakeAction]: token,
            },
        });
    };

    const handleModalClose = () => {
        setMintBurnModalOpen(false);
    };

    const emptyState = () => {
        return (
            <Styles.Wrapper>
            </Styles.Wrapper>
        );
    };

    const filledState = () => {
        return (
            <>
                <QueuedCommits
                    queuedCommitsFilter={state.queuedCommitsFilter}
                    queuedCommitsSearch={state.queuedCommitsSearch}
                    dispatch={dispatch}
                />
                <ClaimedTokens
                    claimedTokensMarketFilter={state.claimedTokensMarketFilter}
                    claimedTokensSearch={state.claimedTokensSearch}
                    dispatch={dispatch}
                    onClickCommitAction={onClickCommitAction}
                    onClickStake={onClickStake}
                />
                <UnclaimedTokens
                    escrowSearch={state.escrowSearch}
                    escrowMarketFilter={state.escrowMarketFilter}
                    dispatch={dispatch}
                    onClickCommitAction={onClickCommitAction}
                />
                <Divider text="Historical Data" />
                <HistoricCommits
                    historicCommitsFilter={state.historicCommitsFilter}
                    historicCommitsSearch={state.historicCommitsSearch}
                    dispatch={dispatch}
                />
            </>
        );
    };

    return (
        <Container>
            <TradeOverviewBanner
                title={'Portfolio Overview'}
                portfolioOverview={portfolioOverview}
                account={!!account}
                handleConnect={handleConnect}
            />
            <>{!!account ? filledState() : emptyState()}</>
            {mintBurnModalOpen && <MintBurnModal open={mintBurnModalOpen} onClose={handleModalClose} />}
        </Container>
    );
};

export default PortfolioPage;
