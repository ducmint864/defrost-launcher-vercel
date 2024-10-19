"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import PromotionPage from "./promotion";
import { Button, Calendar, DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
// import { DatePicker } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { updatePromotionPageData } from "@/lib/store/formSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
const Promotion = () => {
  const [tokenExchangeRate, setTokenExchangeRate] = useState<string>("");
  // const [amountTokenRelease, setAmountTokenRelease] = useState<string>("");
  const [softcap, setSoftcap] = useState<string>("");
  const [hardcap, setHardcap] = useState<string>("");
  const [minInvestment, setMinInvestment] = useState<string>("");
  const [maxInvestment, setMaxInvestment] = useState<string>("");
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const route = useRouter();
  const dispatch = useDispatch();

  const handleContinue = () => {
    const formDatas = {
      tokenExchangeRate,
      // amountTokenRelease,
      softcap,
      hardcap,
      minInvestment,
      maxInvestment,
      startDate,
      endDate,
    };

    dispatch(updatePromotionPageData(formDatas));

    route.push("/addProject/preview");
  };

  return (
    <div className="flex justify-center min-h-screen bg-primary">
      <div className="w-3/5 mx-auto">
        <div className="mt-12 mb-6 text-2xl font-bold text-white">
          Set Price
        </div>
        <div className="border border-black bg-white rounded-2xl h-[900px] mb-12 overflow-hidden">
          {" "}
          <div className="my-6 ml-8 w-full flex flex-col  gap-5 ">
            <input
              type="number"
              className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Set token exchange rate"
              onChange={(e) => setTokenExchangeRate(e.target.value)}
            />
            <span className="text-gray-600 text-md">
              The rate at which tokens are exchanged for currency (e.g., 1 token
              = X currency units).
            </span>

            {/* <input
              placeholder="Amount token release"
              type="number"
              className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setAmountTokenRelease(e.target.value)}
            />
            <span className="text-gray-600 text-md">
              Enter the total amount of tokens to be released for sale or
              distribution.
            </span> */}

            <input
              placeholder="Softcap"
              type="number"
              className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setSoftcap(e.target.value)}
            />
            <span className="text-gray-600 text-md">
              The minimum fundraising goal for the project to be considered
              successful.
            </span>

            <input
              placeholder="Hardcap"
              type="number"
              className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setHardcap(e.target.value)}
            />
            <span className="text-gray-600 text-md">
              The maximum fundraising goal for the project.
            </span>

            <input
              placeholder="Minimum investment"
              type="number"
              className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setMinInvestment(e.target.value)}
            />
            <span className="text-gray-600 text-md">
              The minimum amount a user can invest in this project.
            </span>

            <input
              placeholder="Maximum investment"
              type="number"
              className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setMaxInvestment(e.target.value)}
            />
            <span className="text-gray-600 text-md">
              The maximum amount a user can invest in this project.
            </span>

            <div className="flex items-center border border-black rounded-2xl w-[1050px] h-12 text-lg px-3">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="border-none outline-none w-full"
              />
              <span className="mx-2">to</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="border-none outline-none w-full"
              />
            </div>
            <span className="text-gray-600 text-md">
              Select the start and end dates for the project or token sale.
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            className="mt-5 bg-neutral text-white w-full mx-auto p-3 text-lg rounded-2xl mb-10"
            type="submit"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
