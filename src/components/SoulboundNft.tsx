import React from 'react';
import { Flex, Button, Text, Badge } from "@chakra-ui/react";
import { useIssueRepUBound, useOwnerOf } from '../hooks/SoulboundHooks';
import { useEthers } from '@usedapp/core';
import { BigNumber } from 'ethers';

function useGetOwnersToToken(tokenId: any) {
    let ownerAddr = useOwnerOf(BigNumber.from(tokenId));
    return `${ownerAddr} => ${tokenId}`
}

export default function SoulboundNft() {
    const { account } = useEthers();
    const { state, send: issueRepuBoundNft } = useIssueRepUBound();
    console.log('%c' + JSON.stringify(state), 'color: green');

    const addrToToken: any = [];
    addrToToken.push(
        <Badge colorScheme='green'>Address to Token
            <Text color="black" fontSize="md" align='center'>
                {useGetOwnersToToken(0)}
            </Text>
        </Badge>
    )

    addrToToken.push(
        <Badge colorScheme='green'>Address to Token
            <Text color="black" fontSize="md" align='center'>
                {useGetOwnersToToken(1)}
            </Text>
        </Badge>
    )

    const handleOnIssueNft = () => {
        issueRepuBoundNft(
            account as string,
            'ipfs://QmeiwY28K8ZKyYynxi5cUUDR1EDawGPGV8Va9YkzsmR6f3'
        )
    }

    return (
        <Flex direction="column" align="center" mt="4">
            <Button
                colorScheme='teal'
                onClick={handleOnIssueNft}
            >
                Issue Soulbound NFT
            </Button>
            {addrToToken}
        </Flex>
    )
}