import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
function Trade() {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [wallet, setWallet] = useState("");
    async function handleClick() {
        const URL = "https://dev-api-sniperbot.kryptomind.net/api/v1/transactions";
        if (wallet == "") {
            return toast.error("Please add Wallet!");
        }
        setIsLoading(true);
        try {
            const res = await axios.get(`${URL}/${wallet}`, {
                headers: {
                    Authorization: `Bearer 6327607140`
                }
            });
            setIsModalOpen(true);
            setApiResponse(res?.data);
        } catch (error) {
            toast.error("Some thing went wrong!");
        }
        setIsLoading(false);
        setWallet("");
    }

    return (
        <div className="max-w-md mx-auto bg-green-300 p-4 rounded-lg shadow-lg mt-5">
            <div className="text-center mb-4">
                <h1 className="text-lg font-bold">FOR TRADING INFO ⚖️</h1>
                <p className="text-md">
                    First you need to Enter your <span className="font-bold">Wallet Address:</span> 🌐
                </p>
            </div>
            <div className="mb-4">
                <input
                    id="wallet"
                    name="wallet"
                    value={wallet}
                    onChange={e => setWallet(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter wallet address"
                />
            </div>
            <div className="text-center">
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600"
                    disabled={isLoading}
                    onClick={handleClick}
                >
                    {isLoading ? <TailSpin height={24} width={24} color="#fff" /> : 'Get Trade Info'}
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
                    <div className="bg-white p-8 rounded shadow-lg z-50">
                        <h2 className="text-2xl mb-4">Response</h2>
                        <pre className="bg-gray-100 p-4 rounded mb-4">
                            {apiResponse && apiResponse.length === 0 ? (
                                <h1>No transactions Happened</h1>
                            ) : (
                                JSON.stringify(apiResponse, null, 2)
                            )}
                        </pre>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Trade;