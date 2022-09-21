import { useContractCall, useContractFunction } from "@usedapp/core";
import { Contract } from '@usedapp/core/node_modules/@ethersproject/contracts'
import { ethers, BigNumberish, BigNumber } from "ethers";
import { repuBoundNftAddress } from "../contracts";
import repuBoundNftAbi from '../contracts/abi/RepUBoundNft.json';
import { RepUBoundNft } from '../gen/types'

const repuIdBoundNftIface = new ethers.utils.Interface(repuBoundNftAbi.abi);
const repuIdBoundNftContract = new Contract(repuBoundNftAddress, repuIdBoundNftIface);

export function useBalanceOf(address: string) {
    const [balance] = useContractCall({
        abi: repuIdBoundNftIface,
        address: repuBoundNftAddress,
        method: 'balanceOf',
        args: [address]
    }) ?? [];
    console.log('%c balance:' + balance, 'color: green')
    return balance;
}

export function useTokenOfOwnerByIndex(address: string) {
    const [tokenId] = useContractCall({
        abi: repuIdBoundNftIface,
        address: repuBoundNftAddress,
        method: 'tokenOfOwnerByIndex',
        args: [address, BigNumber.from(0)]
    }) ?? [];
    console.log('%c tokenId:' + tokenId, 'color: green')
    return tokenId;
}

export function useTokenURI(tokenId: BigNumberish) {
    const [uri] = useContractCall({
        abi: repuIdBoundNftIface,
        address: repuBoundNftAddress,
        method: 'tokenURI',
        args: [tokenId]
    }) ?? [];
    console.log('%c uri:' + uri, 'color: green');
    return uri;
}

export function useIssueRepUBound() {
    const { state, send } = useContractFunction(repuIdBoundNftContract, 'issueRepUBound', {});
    return { state, send };
}