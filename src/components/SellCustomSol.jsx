import { useState, useEffect } from "react";
import axios from "axios";
function SellCustomSol() {
    const [privateKey, setPrivateKey] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);


    const handleCheckboxChange = (id) => {
        setCheckboxes(checkboxes.map(check =>
            check.id === +id ? { ...check, checked: !check.checked } : check
        ))
    };

    const handleInputChange = (value, id) => {
        setCheckboxes(checkboxes.map(check =>
            check.id === +id ? { ...check, value: value } : check
        ))
    };


    async function getWallets() {
        const URL = "https://dev-api-sniperbot.kryptomind.net/api/v1/get-wallet";
        const res = await axios.get(URL, {
            headers: {
                Authorization: `Bearer 6327607140`
            }
        });
        // console.log("Res ", res);
        const privateKeys = res?.data?.map(el => el?.solana?.publicKey);
        if (privateKeys.length > 0) {
            setPrivateKey(privateKeys);
            setCheckboxes(privateKeys.map((el, idx) => ({ id: idx + 1, checked: false, value: "" })))
            // console.log(privateKeys);
        }
    }

    const handleClick = async () => {
        const wallets = [];
        if (checkboxes.length > 0) {
            checkboxes.filter(el => el.checked == true && el.value > 0)
                .map(el => wallets.push({ walletAddress: privateKey[el.id - 1], amount: el.value }));
        }
        console.log("Wallets  ", wallets);
        const res = await axios.post("https://dev-api-sniperbot.kryptomind.net/api/v1/sol-swap-sell", { wallets, token: "AoWkbf3pFDt94CQQLyeKprQm2cDaSoW29R6J2AxApz5x" }, {
            headers: {
                Authorization: `Bearer 6327607140`
            }
        });
        console.log("Res  ", res);
        console.log("Wallets  ", wallets);
    }

    useEffect(() => {
        getWallets();
    }, [])
    return (
        <div className="w-max  mx-auto bg-green-300 p-4 rounded-lg shadow-lg">
            {
                checkboxes && checkboxes.length > 0 && checkboxes.map((el, idx) => (
                    <>
                        <div key={el.id} className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={el.id}
                                    checked={el.checked}
                                    onChange={(e) => handleCheckboxChange(e.target.id)}
                                    className="mr-2"
                                />
                                <label htmlFor="checkbox" className="text-lg">{privateKey[idx]}</label>
                            </div>
                            <div className="w-24">
                                <input
                                    type="number"
                                    id={el.id}
                                    value={el.value}
                                    onChange={(e) => handleInputChange(e.target.value, e.target.id)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="amount"
                                />
                            </div>
                        </div>
                    </>
                ))
            }
            <div className="mx-3 text-center">
                <button
                    className="bg-blue-500 text-white py-2 px-5 mx-5 rounded-md shadow-md hover:bg-blue-600"
                    onClick={handleClick}
                >
                    Sell
                </button>
            </div>
        </div>
    )
}


export default SellCustomSol;