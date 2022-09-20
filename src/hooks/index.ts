import { BigNumber, ethers } from 'ethers';
import { Contract } from '@usedapp/core/node_modules/@ethersproject/contracts'
import { useContractCall, useContractFunction } from "@usedapp/core";
import { repuIdControllerAddress } from '../contracts'
import repuIdControllerAbi from '../contracts/abi/RepUIdController.json';

const repuIdControllerInterface = new ethers.utils.Interface(repuIdControllerAbi.abi);
const repuIdControllerContract = new Contract(repuIdControllerAddress, repuIdControllerInterface);

console.log(`ABI: ${JSON.stringify(repuIdControllerAbi.abi)}`);

export function useIdentityOfNullifier(nullifierHash: BigNumber) {
    const [address]: any = useContractCall({
        abi: repuIdControllerInterface,
        address: repuIdControllerAddress,
        method: 'identityOfNullifier',
        args: [nullifierHash]
    }) ?? [];
    console.log(`[useIdentityOfNullifier] result: ${address}`);
    return address;
}

export function useVerifyAndExecute() {
    const { send, state } = useContractFunction(repuIdControllerContract, 'verifyAndExecute', {});
    return { send, state };
}