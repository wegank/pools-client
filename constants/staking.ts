import { KnownNetwork, NETWORKS } from '@tracer-protocol/pools-js';
import { FarmConfig } from '~/types/staking';
import { StakingRewards__factory } from '~/types/staking/typechain/factories/StakingRewards__factory';

export const farmConfig: Record<KnownNetwork, FarmConfig> = {
    [NETWORKS.ARBITRUM_RINKEBY]: {
        poolFarms: [],
        sushiRouterAddress: '',
    },
    [NETWORKS.ARBITRUM]: {
        poolFarms: [
            // active
            {
                address: '0x93116d661DaCaA8Ff65Cb5420Ef61425322AEA7f', // 3-BTC/USD+USDC Balancer LP
                pool: '0x3aca4F1B1791D00eBBAE01d65E9739c9C886F33C',
                abi: StakingRewards__factory.abi,
                isBPTFarm: true,
                balancerPoolId: '0x045c5480131eef51aa1a74f34e62e7de23136f2400010000000000000000009a',
                link: 'https://arbitrum.balancer.fi/#/pool/0x045c5480131eef51aa1a74f34e62e7de23136f2400010000000000000000009a',
            },
            {
                address: '0x04Ff29F8F379B2AA7d79BA66Ce76649334D83e48', // 3L-BTC/USD+USDC
                pool: '0x3aca4F1B1791D00eBBAE01d65E9739c9C886F33C',
                abi: StakingRewards__factory.abi,
            },
            {
                address: '0x16c457fC0F5d5981574ED2BaeD81c625BD91b633', // 3S-BTC/USD+USDC
                pool: '0x3aca4F1B1791D00eBBAE01d65E9739c9C886F33C',
                abi: StakingRewards__factory.abi,
            },
            {
                address: '0x906c81a761d60AcaCAe85165d67031E9F7E3CEa9', // 3-ETH/USD+USDC Balancer LP
                pool: '0x8F4af5A3b58EA60e66690f30335Ed8586E46AcEb',
                abi: StakingRewards__factory.abi,
                isBPTFarm: true,
                balancerPoolId: '0x59b7867f6b127070378feeb328e2ffe6aab6752500010000000000000000009b',
                link: 'https://arbitrum.balancer.fi/#/pool/0x59b7867f6b127070378feeb328e2ffe6aab6752500010000000000000000009b',
            },
            {
                address: '0x111278bf2CC2Fd862183CF34896c60DbbEA0706F', // 3L-ETH/USD+USDC
                pool: '0x8F4af5A3b58EA60e66690f30335Ed8586E46AcEb',
                abi: StakingRewards__factory.abi,
            },
            {
                address: '0x489dA242a948d1978673FEF8836740c11732eC0B', // 3S-ETH/USD+USDC
                pool: '0x8F4af5A3b58EA60e66690f30335Ed8586E46AcEb',
                abi: StakingRewards__factory.abi,
            },
            {
                address: '0x19B08bce18417150fAEC2b4951dad924f8D131A1', // 3-WTI/USD+USDC Balancer LP
                pool: '0xa740b84Fd3547b9C445844c30A10Cde6dce3E08B',
                abi: StakingRewards__factory.abi,
                isBPTFarm: true,
                balancerPoolId: '0xfe7b8f8fca690ab0cd2b8d979abeeac94c06805d00010000000000000000009c',
                link: 'https://arbitrum.balancer.fi/#/pool/0xfe7b8f8fca690ab0cd2b8d979abeeac94c06805d00010000000000000000009c',
            },
            {
                address: '0x38B90a6268b1a20F7A7319D533bc9d31678Cd7d8', // 3L-WTI/USD+USDC
                pool: '0xa740b84Fd3547b9C445844c30A10Cde6dce3E08B',
                abi: StakingRewards__factory.abi,
            },
            {
                address: '0x0dC23d133cAB52be60C905C24F21925dE6e67aA2', // 3S-WTI/USD+USDC
                pool: '0xa740b84Fd3547b9C445844c30A10Cde6dce3E08B',
                abi: StakingRewards__factory.abi,
            },
            {
                address: '0x6d52d4C087DD8a167eCA0008fb4c69D99169DcE8', // 3-BTC/USD+USDC-12h Balancer LP
                pool: '0x2bfb8aeE6EB2dcCd694f8eCB4C31FdeBfC22b55a',
                abi: StakingRewards__factory.abi,
                isBPTFarm: true,
                balancerPoolId: '0xc999678122cbf8a30cb72c53d4bdd72abd96af880001000000000000000000b4',
                link: 'https://arbitrum.balancer.fi/#/pool/0xc999678122cbf8a30cb72c53d4bdd72abd96af880001000000000000000000b4',
                name: '3-BTC/USD+USDC-12h',
            },
            {
                address: '0x3004CC46432522B0AeA30d16aF769B1727aA0c26', // 3L-BTC/USD+USDC-12h
                pool: '0x2bfb8aeE6EB2dcCd694f8eCB4C31FdeBfC22b55a',
                abi: StakingRewards__factory.abi,
            },
            {
                address: '0x0896Fd59b574f536751c82B8Dd9fd9466af009aC', // 3S-BTC/USD+USDC-12h
                pool: '0x2bfb8aeE6EB2dcCd694f8eCB4C31FdeBfC22b55a',
                abi: StakingRewards__factory.abi,
            },
            // deprecated
            {
                address: '0xcD8c0662cf72512857e98646b5C8363782c137A7', // 3-BTC/USD-long-farm
                pool: '0x6D3Fb4AA7ddCa8CBc88F7BA94B36ba83fF6bA234',
                abi: StakingRewards__factory.abi,
                name: '3L-BTC/USD+USDC',
                rewardsEnded: true,
            },
            {
                address: '0x046B21659C445f43f2c621c874F79868dC6FA159', // 3-BTC/USDC-short-farm
                pool: '0x6D3Fb4AA7ddCa8CBc88F7BA94B36ba83fF6bA234',
                abi: StakingRewards__factory.abi,
                name: '3S-BTC/USD+USDC',
                rewardsEnded: true,
            },
            {
                address: '0xC21159bF0252A37b0c281DF2D9B723120cAa86c7', // 3-ETH/USDC-long-farm
                pool: '0x3C16b9efE5E4Fc0ec3963F17c64a3dcBF7269207',
                abi: StakingRewards__factory.abi,
                name: '3L-ETH/USD+USDC',
                rewardsEnded: true,
            },
            {
                address: '0x224949832f3dbf9a365D9bA3ec504727a103E96E', // 3-ETH/USDC-short-farm
                pool: '0x3C16b9efE5E4Fc0ec3963F17c64a3dcBF7269207',
                abi: StakingRewards__factory.abi,
                name: '3S-ETH/USD+USDC',
                rewardsEnded: true,
            },
        ],
        sushiRouterAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        stakingRewardTokens: {
            fxs: {
                address: '0x9d2f299715d94d8a7e6f5eaa8e654e8c74a988a7',
                decimals: 18,
            },
        },
    },
    [NETWORKS.MAINNET]: {
        poolFarms: [],
        sushiRouterAddress: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    },
    [NETWORKS.RINKEBY]: {
        poolFarms: [],
        sushiRouterAddress: '',
    },
    [NETWORKS.KOVAN]: {
        poolFarms: [],
        sushiRouterAddress: '',
    },
    [NETWORKS.GOERLI]: {
        poolFarms: [],
        sushiRouterAddress: '',
    },
};
