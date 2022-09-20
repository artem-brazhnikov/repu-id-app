import React from "react";
import { Flex, Text, Button, Input } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { defaultAbiCoder } from '@ethersproject/abi'
import { useIdentityOfNullifier, useVerifyAndExecute } from "../hooks";
import { useEthers } from "@usedapp/core";
import { VerificationResponse, WorldIDWidget } from "@worldcoin/id";

export default function Verify() {
    const { account } = useEthers()

    const [proof, setProof] = React.useState<VerificationResponse>();
    const [tempAccount, setTempAccount] = React.useState(account);
    
    const { state, send: verifyAndExecute } = useVerifyAndExecute();
    console.log('%c' + `state: ${JSON.stringify(state)}`, 'color: green');
    
    // const registeredAddr: string = useIdentityOfNullifier(BigNumber.from(proof?.nullifier_hash));

    const decodeProof = (proof: string) => {
        return defaultAbiCoder.decode(["uint256[8]"], proof)[0];
    }

    const handleInput = (event: any) => {
        console.log(`temp account: ${JSON.stringify(event.target.value)}`);
        setTempAccount(event.target.value);
    }

    const handleVerifyAndExecute = () => {
        console.log('%cin handleVerifyAndExecute', 'color: green')

        verifyAndExecute(
            tempAccount,
            proof?.merkle_root,
            proof?.nullifier_hash,
            decodeProof(proof?.proof as string)
        )

        console.log('%cout handleVerifyAndExecute', 'color: green')
    }

    return (
        <Flex direction="column" align="center" mt="4">
            {/* <Text color="white" fontSize="md">
                {nullAddress ? nullAddress : 0}
            </Text> */}
            <Input
                placeholder='0x0000000000000000000000000000000000000000'
                variant='flushed'
                type="text"
                onChange={handleInput}
                color="white"
            />
            <WorldIDWidget
                actionId='wid_staging_2cb9042bfb7c895df8d25f4a06c2de86'
                signal={account as string}
                enableTelemetry={true}
                onSuccess={(verificationResponse) => {
                    console.log('%c' + verificationResponse, 'color: green');
                    setProof(verificationResponse);
                    // handleVerifyAndExecute();
                }}
                onError={(error) => console.error(error)}
            />
            <Button colorScheme="teal" size="lg" onClick={handleVerifyAndExecute}>
                Verify
            </Button>
        </Flex>
    );
}