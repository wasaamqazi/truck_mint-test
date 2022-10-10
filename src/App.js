import "./App.css";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ToastContainer } from "react-toastify";

const { chains, provider } = configureChains(
  [chain.polygon],
  [
    alchemyProvider({ apiKey: "4PVWbySpmDFT8D4d3T8PcFlCDPRUqehb" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
// import { Animationss } from "./components/animation";
function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} initialChain={chain.polygon}>
        <Home />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* <Animationss/> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
