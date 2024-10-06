"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PromotionPage from "./promotion"



const Promotion = () => {
    const route = useRouter();
    
    const handleContinue = () => {
        route.push("/addproject/preview");
    };

    return (
        <div>
            <PromotionPage />
            <div className="w-3/5 mx-auto">
                <div className="mt-12 mb-6 text-2xl font-bold">
                    Set Price
                </div>
                <div className="border border-black rounded-2xl h-3/5 mb-12">
                    <div className="my-6 ml-10 w-full">
                        <input type="number" className="border border-black rounded-2xl w-3/5 h-12 text-lg"
                            placeholder="Set token exchange rate" />

                        <hr className="border border-black w-3/5 my-14"></hr>

                        <div>
                            <input type="number" className="border border-black rounded-2xl w-3/5 h-12 text-lg"
                                placeholder="Amount token release" />
                        </div>

                        <hr className="border border-black w-3/5 mt-14 mb-6"></hr>

                        <div className=" ">
                            <div>
                                <input type="number" className="border border-black rounded-2xl w-3/5 h-12 text-lg"
                                    placeholder="Release date - End Date" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="mt-10 bg-black text-white w-full mx-auto p-3 text-lg rounded-2xl"
                     type="submit" onClick={handleContinue}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Promotion;