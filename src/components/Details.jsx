import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
function Details() {
    const [primaryWallet, setPrimaryWallet] = useState(null);
    const [error, setError] = useState(false);
    const location = useLocation();
    const walletAddress = location.state;
    const navigate = useNavigate();
    function handleClick(e) {
        if (e.target.value) {
            navigate(`/${e.target.name}/${e.target.value}/sol`);
        }
    }

    async function getPrimaryWallet() {
        const URL = "https://dev-api-sniperbot.kryptomind.net/api/v1/get-native-balance";
        try {
            const res = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer 6327607140`
                }
            })
            if (res?.data && res?.status == 200) {
                setPrimaryWallet({ balance: res?.data[0]?.balances[1].balance, walletAddress: res?.data[0]?.balances[1].walletAddress })
            }
        } catch (error) {
            setError(true);
        }
        console.log(primaryWallet);
    }

    useEffect(() => {
        getPrimaryWallet();
    }, [])

    return (
        <div className="max-w-lg mx-auto bg-green-300 p-4 rounded-lg shadow-lg">
            <h5 className="text-lg font-bold">Pepe (🔗SOL)</h5>
            {walletAddress?.token}
            {/* Pool Info */}
            <div className="mb-4">
                <h2 className="text-lg font-bold">Pool Info:</h2>
                <p>DEX: <span className="text-blue-500">meteora</span></p>
                {/* <p>Market Cap: <span className="font-bold">$3,578,097,052</span></p> */}
                <p>Liquidity: <span className="font-bold">$544545</span></p>
                {/* <p>TxFees: B <span className="font-bold">$35.0</span> | S <span className="font-bold">$17.5</span></p> */}
            </div>

            {/* Token Info */}
            {/* <div className="mb-4">
                <h2 className="text-lg font-bold">Token Info:</h2>
                <p>B <span className="font-bold text-red-500">0.00%</span> | S <span className="font-bold text-red-500">0.00%</span> | T <span className="font-bold text-red-500">0.00%</span></p>
                <p>Max Tax: <span className="text-red-500">✖️</span></p>
                <p>Burnt: <span className="font-bold text-orange-500">1.64%</span></p>
                <p>Clogged: <span className="font-bold text-red-500">0.01%</span></p>
            </div> */}

            {/* Links */}
            {/* <div className="mb-4">
                <h2 className="text-lg font-bold">Links:</h2>
                <div className="flex space-x-2">
                    <a href="#" className="text-blue-500 underline">Scan</a>
                    <a href="#" className="text-blue-500 underline">Dextools</a>
                    <a href="#" className="text-blue-500 underline">DexTools</a>
                    <a href="#" className="text-blue-500 underline">Defined</a>
                </div>
            </div> */}


            {/* Primary Wallet */}
            <div className="mb-4">
                <h2 className="text-lg font-bold">Your Primary Wallet:</h2>
                {/* <p>B <span className="font-bold text-red-500">0.00%</span> | S <span className="font-bold text-red-500">0.00%</span> | T <span className="font-bold text-red-500">0.00%</span></p>
                <p>Max Tax: <span className="text-red-500">✖️</span></p>
                <p>Burnt: <span className="font-bold text-orange-500">1.64%</span></p>
                <p>Clogged: <span className="font-bold text-red-500">0.01%</span></p> */}
                {
                    primaryWallet ? (
                        <>
                            <p>.<span className="text-red-500">{primaryWallet?.walletAddress}</span></p>
                            <p>Balance: <span className="text-red-500">{primaryWallet?.balance} SOL</span></p>
                        </>
                    ) : (
                        <TailSpin height={34} width={34} color="red" />
                    )
                }
                {
                    setError === true ? `Not Found` : ""
                }
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2">
                <button onClick={handleClick} name="buy" value="0.1" className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Buy 0.1SOL</button>
                <button onClick={handleClick} name="buy" value="0.2" className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Buy 0.2SOL</button>
                <button onClick={handleClick} name="buy" value="0.5" className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Buy 0.5SOL</button>
                <button onClick={handleClick} name="buy" value="1" className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Buy 1SOL</button>
            </div>
            <div className="grid grid-col-1 gap-2 my-3">
                <button onClick={() => navigate("/buy/sol")} className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Buy XSOL</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={handleClick} name="sell" value="0.1" className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Sell 0.1SOL</button>
                <button onClick={handleClick} name="sell" value="0.2" className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Sell 0.2SOL</button>
                <button onClick={handleClick} name="sell" value="0.5" className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Sell 0.5SOL</button>
                <button onClick={handleClick} name="sell" value="1" className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Sell 1SOL</button>
            </div>
            <div className="grid grid-col-1 gap-2 my-3">
                <button onClick={() => navigate("/sell/sol")} className="bg-yellow-400 text-white py-2 rounded-md shadow-md hover:bg-yellow-600">Sell XSOL</button>
            </div>
        </div>
    )
}

export default Details;