import { useContractCall, useContractFunction } from "@usedapp/core";
import { Contract } from '@usedapp/core/node_modules/@ethersproject/contracts'
import { ethers, BigNumberish } from "ethers";
import { repuBoundNftAddress } from "../contracts";
import repuBoundNftAbi from '../contracts/abi/RepUBoundNft.json';
import { RepUBoundNft } from '../gen/types'

const repuIdBoundNftIface = new ethers.utils.Interface(repuBoundNftAbi.abi);
const repuIdBoundNftContract = new Contract(repuBoundNftAddress, repuIdBoundNftIface);

export function useOwnerOf(tokenId: BigNumberish) {
    const [ address ] = useContractCall({
        abi: repuIdBoundNftIface,
        address: repuBoundNftAddress,
        method: 'ownerOf',
        args: [tokenId]
    }) ?? [];
    console.log('%c address:' + address, 'color: green')
    return address;
}

export function useBalanceOf(address: string) {
    const [ balance ] = useContractCall({
        abi: repuIdBoundNftIface,
        address: repuBoundNftAddress,
        method: 'balanceOf',
        args: [address]
    }) ?? [];
    console.log('%c balance:' + balance, 'color: green')
    return balance;
}

export function useIssueRepUBound() {
    const { state, send } = useContractFunction(repuIdBoundNftContract, 'issueRepUBound', {});
    return { state, send };
}