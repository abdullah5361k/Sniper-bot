import { Route, Routes } from "react-router-dom";
import FirstWallet from "./components/FirstWallet";
import AutoSniper from "./components/AutoSniper";
import Trade from "./components/Trade";
import Details from "./components/Details";
import BuySol from "./components/BuySol";
import BuyCustomSol from "./components/BuyCustomSol";
import SellCustomSol from "./components/SellCustomSol";
import SellSol from "./components/SellSol";
import { Toaster } from "react-hot-toast";
import Table from "./components/Table";

function App() {

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<FirstWallet />} />
        <Route path="/auto-sniper" element={<AutoSniper />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/details" element={<Details />} />
        <Route path="/buy/:amount/sol" element={<BuySol />} />
        <Route path="/buy/sol" element={<BuyCustomSol />} />
        <Route path="/sell/sol" element={<SellCustomSol />} />
        <Route path="/sell/:amount/sol" element={<SellSol />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
  )
}

export default App
