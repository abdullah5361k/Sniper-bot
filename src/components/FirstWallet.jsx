import { Link } from "react-router-dom";

function FirstWallet() {
    return (
        <div className="max-w-sm mx-auto bg-green-300 p-4 rounded-lg shadow-lg mt-5">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">🚀 SniperBot:</h1>
                <p className="text-lg">Your Gateway to Solana DeFi 🤖</p>
                <div className="text-blue-500 flex justify-center space-x-2 mt-2">
                    <a href="#" className="underline">Telegram</a>
                    <span>|</span>
                    <a href="#" className="underline">Twitter</a>
                    <span>|</span>
                    <a href="#" className="underline">Website</a>
                </div>
            </div>
            <div className="text-center mb-4">
                <p className="text-lg">• SOL: <span className="font-bold">$144.02</span></p>
                <p className="text-lg">Create your first wallet at <a href="#" className="text-blue-500 underline">/wallet</a></p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Link to="/auto-sniper" className="bg-gray-200 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 text-center"><button>Auto Sniper</button></Link>
                <Link to="/auto-sniper" className="bg-gray-200 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 text-center"><button>Manual Buyer</button></Link>
                <Link to="/trade" className="bg-gray-200 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 text-center"><button>Trade</button></Link>
                <button className="bg-gray-200 py-2 px-4 rounded-md shadow-md hover:bg-gray-300">Help</button>
                <button className="bg-gray-200 py-2 px-4 rounded-md shadow-md hover:bg-gray-300">Wallets</button>
                <button className="bg-gray-200 py-2 px-4 rounded-md shadow-md hover:bg-gray-300">Settings</button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 col-span-2">Close</button>
            </div>
        </div>
    )
}

export default FirstWallet;