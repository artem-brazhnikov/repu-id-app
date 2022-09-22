import React from 'react';
import { Flex, Button, Text, Badge, Box, Image } from "@chakra-ui/react";
import { useBalanceOf, useIssueRepUBound, useTokenOfOwnerByIndex, useTokenURI } from '../hooks/SoulboundHooks';
import { useEthers } from '@usedapp/core';
import { BigNumber, ethers, providers } from 'ethers';

import { repuBoundNftAddress } from "../contracts";
import repuBoundNftAbi from '../contracts/abi/RepUBoundNft.json';
import { RepUBoundNft } from '../gen/types'

type Metadata = {
    description: string;
    external_url: string;
    image: string;
    name: string;
}

export default function SoulboundNft() {
    const { account } = useEthers();

    const [tokenURI, setTokenURI] = React.useState('');
    const [tokenId, setTokenId] = React.useState<BigNumber>();
    const [metadata, setMetadata] = React.useState<Metadata>();

    console.log('%c account: ' + account, 'color: green');

    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();

    const nftContract = new ethers.Contract(repuBoundNftAddress, repuBoundNftAbi.abi, web3Provider) as RepUBoundNft;

    React.useEffect(() => {
        const readTokenData = async () => {
            const balance = await nftContract.balanceOf(account as string);
            console.log(`balance ${balance}`);
            if (balance.toNumber() === 1) {
                const tokenId = await nftContract.tokenOfOwnerByIndex(account as string, 0);
                console.log(`tokenId ${tokenId}`);
                if (tokenId) {
                    setTokenId(tokenId);
                    const tokenUri = await nftContract.tokenURI(tokenId);
                    console.log(`tokenURI ${tokenUri}`);
                    setTokenURI(tokenUri);
                }
            }
        }
        readTokenData();
    }, [account]);


    React.useEffect(() => {
        if (tokenURI) {
            fetch(tokenURI)
                .then(res => res.json())
                .then(data => setMetadata(data));
        }
    }, [tokenURI]);

    const { state, send: issueRepuBoundNft } = useIssueRepUBound();
    console.log('%c' + JSON.stringify(state), 'color: green');

    const handleOnIssueNft = () => {
        issueRepuBoundNft(
            account as string,
            'https://ipfs.filebase.io/ipfs/QmeiwY28K8ZKyYynxi5cUUDR1EDawGPGV8Va9YkzsmR6f3'
        )
    }

    return (
        <Flex direction="column" align="center" mt="4">
            <Box p="2">
                <Button
                    colorScheme='teal'
                    onClick={handleOnIssueNft}
                >
                    Issue Soulbound NFT
                </Button>
            </Box>
            <Box p="2">
                <Badge colorScheme='green' variant='solid' color='black'>
                    {tokenId ? `Token ID: ${tokenId.toString()}` : 'No Soulbound Token'}
                </Badge>
            </Box>
            {metadata ?
                <Box p='2'>
                    <Badge colorScheme='green' variant='solid' color='black'>
                        {metadata ? `Token Name: ${metadata?.name}` : 'No Soulbound Token'}
                    </Badge>
                </Box> : ''}
            {metadata ?
                <Box p='2'>
                    <Image
                        src={metadata?.image}
                        alt={metadata?.description}
                        boxSize='300px'
                        borderRadius='lg'
                    />
                </Box> : ''}
        </Flex>
    )
}