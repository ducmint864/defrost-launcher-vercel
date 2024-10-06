"use client";
import React from "react";
import { useRouter } from "next/navigation";



const InfoBar = () => {
    const route = useRouter();

    const toGeneralDetails = () => {
        route.push('/addproject/generaldetails');
    }

    const toPromotion = () => {
        route.push('/addproject/promotion');
    }

    const toPreview = () => {
        route.push('/addproject/preview');
    }

    return (
        <div className="mt-20 text-sm font-bold">

            <div className="flex justify-center items-center w-full">
                <div className="flex divide-x w-3/5 border rounded-full shadow-lg">
                    <button
                        className="w-1/3 text-center py-4 px-6 rounded-l-full bg-white" onClick={toGeneralDetails}>
                        GENERAL DETAILS
                    </button>
                    <button className="w-1/3 text-center py-4 px-6 bg-white" onClick={toPromotion}>PROMOTION</button>
                    <button className="w-1/3 text-center py-4 px-6 rounded-r-full bg-white" onClick={toPreview}>PREVIEW</button>



                </div>



            </div>

            {/* <ul className="steps">
                <li className="step step-primary">Register</li>
                <li className="step step-primary">Choose plan</li>
                <li className="step">Purchase</li>
                <li className="step">Receive Product</li>
            </ul> */}

        </div>
    )
}

export default InfoBar;