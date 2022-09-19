import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import AccountModal from "./components/AccountModal";
import ConnectButton from "./components/ConnectButton";
import Layout from "./components/Layout";
import Verify from "./components/Verify";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
        <Verify />
      </Layout>
    </ChakraProvider>
  )
}