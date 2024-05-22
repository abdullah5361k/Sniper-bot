import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ColorRing, TailSpin } from "react-loader-spinner";

function BuySol() {
    const { amount } = useParams();

    const [privateKey, setPrivateKey] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);
    const [loading, setLoading] = useState(false);


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
        setLoading(true);
        try {
            const URL = "https://dev-api-sniperbot.kryptomind.net/api/v1/get-wallet";
            const res = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer 6327607140`
                }
            });
            const privateKeys = res?.data?.map(el => el?.solana?.publicKey);
            if (privateKeys.length > 0) {
                setPrivateKey(privateKeys);
                setCheckboxes(privateKeys.map((el, idx) => ({ id: idx + 1, checked: false, value: amount })))
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleClick = async () => {
        const wallets = [];
        if (checkboxes.length > 0) {
            checkboxes.filter(el => el.checked == true && el.value > 0)
                .map(el => wallets.push({ walletAddress: privateKey[el.id - 1], amount: el.value }));
        }
        console.log("Wallets  ", wallets);
        const res = await axios.post("https://dev-api-sniperbot.kryptomind.net/api/v1/sol-swap-buy", { wallets, token: "AoWkbf3pFDt94CQQLyeKprQm2cDaSoW29R6J2AxApz5x" }, {
            headers: {
                Authorization: `Bearer 6327607140`
            }
        });
        console.log("Res  ", res);
    }

    useEffect(() => {
        getWallets();
    }, [])

    return (
        <>
            <div className="max-w-lg mx-auto bg-green-300 p-4 rounded-lg shadow-lg mt-5">
                <div className="text-center mb-4">
                    <h6 className="text-xl font-bold">Please click on the Wallet Address for which you want to buy {amount ? amount : ""} SOL</h6>
                </div>
                {/* w-max  mx-auto bg-green-200 p-4 rounded-lg shadow-lg */}
                {
                    loading ? (
                        <>
                            <div className="flex justify-center items-center">
                                <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />
                            </div>
                        </>
                    ) : (
                        <div>
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
                                        </div>
                                    </>
                                ))
                            }
                            <div className="mx-3 text-center mt-4">
                                <button
                                    className="bg-blue-500 text-white py-2 px-5 mx-5 rounded-md shadow-md hover:bg-blue-600"
                                    onClick={handleClick}
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default BuySol;