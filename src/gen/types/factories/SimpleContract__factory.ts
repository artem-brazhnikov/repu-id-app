/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  SimpleContract,
  SimpleContractInterface,
} from "../SimpleContract";

const _abi = [
  {
    inputs: [],
    name: "incrementCount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_count",
        type: "uint256",
      },
    ],
    name: "setCount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class SimpleContract__factory {
  static readonly abi = _abi;
  static createInterface(): SimpleContractInterface {
    return new utils.Interface(_abi) as SimpleContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleContract {
    return new Contract(address, _abi, signerOrProvider) as SimpleContract;
  }
}
