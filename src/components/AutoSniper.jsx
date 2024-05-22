import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AutoSniper() {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    function handleClick() {
        if (token === "") {
            toast.error("Please enter Wallet Token!");
            return;
        }
        navigate("/details", { state: { token } });
    }
    return (
        <div className="max-w-md mx-auto bg-green-300 p-4 rounded-lg shadow-lg mt-5">
            <div className="text-center mb-4">
                <h1 className="text-xl font-bold">Manual Buyer / Auto Sniper</h1>
                <p className="text-lg">Paste in a token address below to start buying</p>
                <p className="text-sm text-gray-500 mt-2">
                    e.g: <span className="bg-gray-200 p-1 rounded">{token || 'AoWkbf3pFDt94CQQLyeKprQm2cDaSoW29R6J2AxApz5x'}</span>
                </p>
            </div>
            <div className="mb-4">
                <input
                    id="token"
                    name="token"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter token address"
                />
            </div>
            <div className="text-center flex justify-center">
                <div className="mx-3">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600"
                        onClick={() => {
                            setToken("");
                            navigate(-1);
                        }}
                    >
                        Dismiss
                    </button>
                </div>
                <div className="mx-3">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
                        onClick={handleClick}
                    >
                        Buy
                    </button>
                </div>
            </div>
        </div>

    )
}

export default AutoSniper;