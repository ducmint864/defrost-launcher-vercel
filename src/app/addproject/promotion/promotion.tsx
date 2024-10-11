"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import PromotionPage from "./promotion";
import { Calendar } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { updatePromotionPageData } from "@/lib/store/formSlice";
const Promotion = () => {
  const [tokenExchangeRate, setTokenExchangeRate] = useState("");
  const [amountTokenRelease, setAmountTokenRelease] = useState("");
  const [date, setDate] = useState("");
  

  const route = useRouter();
  const dispatch = useDispatch();

  const handleContinue = () => {
    const formDatas = [
      tokenExchangeRate,
      amountTokenRelease,
      date,
    ];
    dispatch(updatePromotionPageData(formDatas));
    route.push("/addproject/preview");
  };

  return (
    <div>
      <div className="w-3/5 mx-auto">
        <div className="mt-12 mb-6 text-2xl font-bold">Set Price</div>
        <div className="border border-black rounded-2xl h-3/5 mb-12">
          <div className="my-6 ml-10 w-full">
            <input
              type="number"
              className="border border-black rounded-2xl w-3/5 h-12 text-lg pl-5"
              placeholder="Set token exchange rate"
              onChange={(e) => setTokenExchangeRate(e.target.value)}
            />

            <hr className="border border-black w-3/5 my-14"></hr>

            <div>
              <input
                type="number"
                className="border border-black rounded-2xl w-3/5 h-12 text-lg"
                placeholder="Amount token release"
                onChange={(e) => setAmountTokenRelease(e.target.value)}
              />
            </div>

            <hr className="border border-black w-3/5 mt-14 mb-6"></hr>

            {/* <div className=" "> */}
            <div>
              <DatePicker
                // label="Birth Date"
                variant="bordered"
                showMonthAndYearPickers
                className="border border-black rounded-2xl w-3/5 h-12 text-lg"
                onChange={(date) => setDate(date.toString())}
              />
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-10 bg-black text-white w-full mx-auto p-3 text-lg rounded-2xl"
            type="submit"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
