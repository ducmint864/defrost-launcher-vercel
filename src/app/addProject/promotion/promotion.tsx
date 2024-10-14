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
  const [tokenExchangeRate, setTokenExchangeRate] = useState("");
  const [amountTokenRelease, setAmountTokenRelease] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const route = useRouter();
  const dispatch = useDispatch();

  const handleContinue = () => {
    const formDatas = [tokenExchangeRate, amountTokenRelease, date];
    dispatch(updatePromotionPageData(formDatas));
    route.push("/addProject/preview");
  };

  return (
    <div className="flex justify-center min-h-screen bg-primary">
      <div className="w-3/5 mx-auto">
        <div className="mt-12 mb-6 text-2xl font-bold text-white">
          Set Price
        </div>
        <div className="border border-black bg-white rounded-2xl h-2/5 mb-12">
          <div className="my-6 ml-10 w-full flex flex-col gap-5">
            {/* <div className=""> */}
            <input
              type="number"
              className="border border-black rounded-2xl w-3/5 h-12 text-lg pl-5"
              placeholder="Set token exchange rate"
              onChange={(e) => setTokenExchangeRate(e.target.value)}
            />

            <span className="text-gray-600 text-md">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </span>

            <input
              type="number"
              className="border border-black rounded-2xl w-3/5 h-12 text-lg pl-5"
              placeholder="Amount token release"
              onChange={(e) => setTokenExchangeRate(e.target.value)}
            />

            <span className="text-gray-600 text-md">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </span>

            <div className="flex items-center border border-black rounded-2xl w-3/5 h-12 text-lg px-3">
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </span>
            {/* </div> */}
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            className="mt-5 bg-neutral text-white w-full mx-auto p-3 text-lg rounded-2xl mb-10"
            type="submit"
            // onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
