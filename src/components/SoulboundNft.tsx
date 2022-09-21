import React from 'react';
import { Flex, Button, Text, Badge, Box, Image } from "@chakra-ui/react";
import { useBalanceOf, useIssueRepUBound, useTokenOfOwnerByIndex, useTokenURI } from '../hooks/SoulboundHooks';
import { useEthers } from '@usedapp/core';
import { BigNumber } from 'ethers';

type Metadata = {
    description: string;
    external_url: string;
    image: string;
    name: string;
}

export default function SoulboundNft() {
    const { account } = useEthers();

    console.log('%c account: ' + account, 'color: green');

    const [balance, setBalance] = React.useState(useBalanceOf(account as string));
    const [tokenId, setTokenId] = React.useState(useTokenOfOwnerByIndex(account as string));
    const [metadata, setMetadata] = React.useState<Metadata>();
    const tokenURI = useTokenURI(BigNumber.from(tokenId));

    if (tokenURI) {
        fetch(tokenURI)
            .then(res => res.json())
            .then(data => setMetadata(data));
    }

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
                    {tokenId ? `Token ID: ${tokenId}` : 'No Soulbound Token'}
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