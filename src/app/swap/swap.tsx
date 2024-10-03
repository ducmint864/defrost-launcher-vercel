"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Token {
    name: string;
    currentPrice: string;
}


const TokenData: Token[] = [
    {
        name: "DOT",
        currentPrice: "5",

    },

    {
        name: "VDOT",
        currentPrice: "5.2",
    },

];


const SwapPage = () => {
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);
    const [amountIn, setAmountIn] = useState<number>(0);
    const [amountOut, setAmountOut] = useState<number>(0);

    const onTokenChange = (token: Token) => {
        setSelectedToken(token);
    }

    const onAmountChange = (amount: number) => {
        setAmountIn(amount);
    }

    const submitSwap = () => {
        const route = useRouter();
        route.push("/swap/confirm");

    }

    return (
        <div className="text-black">
            <div className="mt-14 w-3/5 mx-auto">
                <div className=" border border-black rounded-xl shadow-lg">
                    <h1 className="pl-7 pt-4 pb-4 text-lg font-semibold" >
                        Swap
                    </h1>

                    <hr className="border border-black"></hr>

                    {/* Swap part */}

                    <div className="pl-16 pt-10 text-lg  font-semibold">
                        Pay
                        <select name="" id="" className="relative">

                        </select>
                        <div className="flex justify-center">
                            <div></div>
                            <div className="relative border border-black rounded-full w-3/5 h-12 shadow-xl">
                                {/*@dev: modal */}
                                <div className="absolute left-0 pt-2 pl-5">
                                    MODAL
                                </div>
                                <div className="absolute left-4 pl-24 pb-4">
                                    <input type="number" className="border-none focus:outline-none focus:ring-0 w-72 h-11"></input>
                                </div>
                                <div className="absolute right-0 pt-2 pr-5">
                                    DOT
                                </div>
                            </div>
                        </div>

                        {/* Receive part */}

                        <div className="flex flex-col items-center">
                            <span className="pt-8">⇅</span>
                        </div>

                        Receive

                        <div className="flex justify-center">
                            {/* <div className="border border-black rounded-full shadow-xl"> */}
                            {/* <input type="text" className="border-none focus:outline-none focus:ring-0 w-3/5 h-12"></input> */}
                            <div className="relative border border-black rounded-full w-3/5 h-12 shadow-xl">
                                {/*@dev: modal */}
                                <div className="absolute left-0 pt-2 pl-5">
                                    MODAL
                                </div>

                                <div className="absolute left-4 pl-24 pb-4">
                                    <div className="border-none focus:outline-none focus:ring-0 w-72 h-11 mt-2">${amountOut}</div>
                                </div> 

                                <div className="absolute right-0 pt-2 pr-5">
                                    VDOT
                                </div>
                            </div>

                            {/* </div> */}
                        </div>

                        {/* Swap summary */}

                        <div className="py-9 flex justify-center">
                            <button className="bg-black text-white border border-black rounded-2xl p-2 w-36 shadow-xl">Swap</button>
                        </div>

                        <div className="border border-black rounded-xl pr-5 mr-16 ml-10 mb-10">
                            <div className="flex justify-between pl-5 pr-5 pt-5">
                                <span>Price</span>
                                <span>5 DOT</span>
                            </div>
                            <div className="flex justify-between pl-5 pr-5 pt-5">
                                <span>Price</span>
                                <span>5 VDOT</span>
                            </div>

                            <div className="flex justify-between pl-5 pr-5 pt-5">
                                <span>Price Impact</span>
                                <span>0.8917489</span>
                            </div>

                            <div className="flex justify-between pl-5 pr-5 pt-5">
                                <span>Liquidity Provider Fee</span>
                                <span>5 VDOT</span>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwapPage;