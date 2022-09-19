import { Flex, Text, Button } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { defaultAbiCoder } from '@ethersproject/abi'
import { useIdentityOfNullifier, useVerifyAndExecute } from "../hooks";
import { useEthers } from "@usedapp/core";

// {
//     "merkle_root": "0x0516e066cabb4ef7306371406d8e7acb05d986942088e07d635b7aec4ec55304",
//     "nullifier_hash": "0x1d09fc8418b887db5cda1669868e265a1f4d5f568f66a67c614aec5f5dcf17f9",
//     "proof": "0x053f4df70b6fa71232b37812e51a947b9ebb7f84379c842f5d05be7a339f9eec2c002ac96384ed841281a2e42b05000a6089acf9f11a69bacfeaebebce91afd41bee91dce106604a5eb583876547847e6a32537ffe3a1564b947eb762d6edbd32d1b3d876c4eb7289c8318398bccfd8d18a757015eec06ab3461abee40089e0f2f516825f4a7dd516964cbc27e4aeec9e216a2528494b6918873ccb86b23ad7d07e29442a99d100d373732b75670723ca723ff54f0e2dae4427a18a4247f58130a5d30cd1f46ddd7d8400eae41b0ae5305804990b4bf61c3a9dd8f6dcbd71667157dff70e84fdf69b80bac26776b4b5da97860cf4e65fa3ba9d3e5bdad4ed521"
// }


export default function Verify() {
    const { account } = useEthers()

    const nullAddress: string = useIdentityOfNullifier(BigNumber.from(0));
    const { state, send } = useVerifyAndExecute();
    console.log(`send: ${send}, state: ${JSON.stringify(state)}`);

    function handleVerifyAndExecute() {
        console.log('in handleVerifyAndExecute')

        const unpackedProof = defaultAbiCoder.decode(["uint256[8]"], "0x053f4df70b6fa71232b37812e51a947b9ebb7f84379c842f5d05be7a339f9eec2c002ac96384ed841281a2e42b05000a6089acf9f11a69bacfeaebebce91afd41bee91dce106604a5eb583876547847e6a32537ffe3a1564b947eb762d6edbd32d1b3d876c4eb7289c8318398bccfd8d18a757015eec06ab3461abee40089e0f2f516825f4a7dd516964cbc27e4aeec9e216a2528494b6918873ccb86b23ad7d07e29442a99d100d373732b75670723ca723ff54f0e2dae4427a18a4247f58130a5d30cd1f46ddd7d8400eae41b0ae5305804990b4bf61c3a9dd8f6dcbd71667157dff70e84fdf69b80bac26776b4b5da97860cf4e65fa3ba9d3e5bdad4ed521")[0];
        console.log(`unpackedProof: ${unpackedProof}`);
        send(
            account,
            BigNumber.from("0x0516e066cabb4ef7306371406d8e7acb05d986942088e07d635b7aec4ec55304"),
            BigNumber.from("0x1d09fc8418b887db5cda1669868e265a1f4d5f568f66a67c614aec5f5dcf17f9"),
            unpackedProof
        )
        console.log('out handleVerifyAndExecute')
    }

    return (
        <Flex direction="column" align="center" mt="4">
            <Text color="white" fontSize="md">
                {nullAddress ? nullAddress : 0}
            </Text>
            <Button colorScheme="teal" size="lg" onClick={handleVerifyAndExecute}>
                Verify
            </Button>
        </Flex>
    );
}