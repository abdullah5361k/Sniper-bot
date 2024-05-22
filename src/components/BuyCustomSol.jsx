import { useEffect, useState } from "react";
import axios from "axios";
import { ColorRing, TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

function BuyCustomSol() {

    const [privateKey, setPrivateKey] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buy, setBuy] = useState(false);


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
        const walletURL = "https://dev-api-sniperbot.kryptomind.net/api/v1/get-wallet";
        setLoading(true);
        try {
            const res = await axios.get(walletURL, {
                headers: {
                    Authorization: `Bearer 6327607140`
                }
            });
            const privateKeys = res?.data?.map(el => el?.solana?.publicKey);
            if (privateKeys.length > 0) {
                setPrivateKey(privateKeys);
                setCheckboxes(privateKeys.map((el, idx) => ({ id: idx + 1, checked: false, value: "" })))
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleClick = async () => {
        const wallets = [];
        const buyURL = "https://dev-api-sniperbot.kryptomind.net/api/v1/sol-swap-buy";
        if (checkboxes.length > 0) {
            checkboxes.filter(el => el.checked == true && el.value > 0)
                .map(el => wallets.push({ walletAddress: privateKey[el.id - 1], amount: el.value }));
        }
        if (wallets.length == 0) {
            toast.error("Please select fields!");
            return;
        }
        setBuy(true);
        try {
            const res = await axios.post(buyURL, { wallets, token: "AoWkbf3pFDt94CQQLyeKprQm2cDaSoW29R6J2AxApz5x" }, {
                headers: {
                    Authorization: `Bearer 6327607140`
                }
            });
            console.log("Res ", res);
        } catch (error) {

        } finally {
            setBuy(false);
        }
    }

    useEffect(() => {
        getWallets();
    }, [])
    return (
        <div className="w-max  mx-auto bg-green-300 p-4 rounded-lg shadow-lg">
            {
                loading == true ? (
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                ) : (
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
                )
            }
            <div className="mx-3 text-center">
                <button
                    className="bg-blue-500 text-white py-2 px-5 mx-5 rounded-md shadow-md hover:bg-blue-600"
                    disabled={loading}
                    onClick={handleClick}
                >
                    {buy ? <TailSpin height={24} width={24} color="#fff" /> : 'Buy'}
                </button>
            </div>
        </div>
    )
}

export default BuyCustomSol;