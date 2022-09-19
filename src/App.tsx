import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import AccountModal from "./components/AccountModal";
import ConnectButton from "./components/ConnectButton";
import Layout from "./components/Layout";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Layout>
    </ChakraProvider>
  )
}