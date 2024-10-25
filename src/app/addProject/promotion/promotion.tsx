"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { updatePromotionPageData } from "@/lib/store/formSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const Promotion = () => {
  const [tokenExchangeRate, setTokenExchangeRate] = useState<string>("");
  const [softcap, setSoftcap] = useState<string>("");
  const [hardcap, setHardcap] = useState<string>("");
  const [minInvestment, setMinInvestment] = useState<string>("");
  const [maxInvestment, setMaxInvestment] = useState<string>("");
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reward, setReward] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const route = useRouter();
  const dispatch = useDispatch();

  const handleContinue = () => {
    const formDatas = {
      tokenExchangeRate,
      softcap,
      hardcap,
      minInvestment,
      maxInvestment,
      startDate,
      endDate,
      reward,
    };

    dispatch(updatePromotionPageData(formDatas));
    route.push("/addProject/preview");
  };

  return (
    <div className="flex justify-center min-h-screen bg-primary px-4">
      <div className="w-full lg:w-3/5 mx-auto">
        <div className="mt-12 mb-6 text-2xl font-bold text-white">
          Set Price
        </div>
        <div className="border border-black bg-white rounded-2xl h-auto mb-12 overflow-hidden">
          <div className="my-6 w-full flex flex-col p-8 space-y-10">
            <div>
              <span className="label-text text-gray-600 text-md">
                The rate at which tokens are exchanged for currency
              </span>
              <label className="m-2 input input-bordered flex items-center gap-2">
                <p className="w-40">Exchange rate&nbsp;</p>
                <input
                  type="number"
                  className="grow border-none focus:outline-none focus:ring-0 w-full"
                  placeholder="Enter exchange rate"
                  onChange={(e) => setTokenExchangeRate(e.target.value)}
                />
                <div className="label text-right">
                  <span className="label-text-alt text-gray-500">
                    1 project token = X vtokens
                  </span>
                </div>
              </label>
            </div>

            <div>
              <span className="label-text text-gray-600 text-md">
                The minimum fundraising goal for the project to be considered
                successful.
              </span>
              <label className="m-2 input input-bordered flex items-center gap-2">
                <p className="w-40">
                  Soft cap&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                <input
                  placeholder="Enter softcap"
                  type="number"
                  className="grow border-none focus:outline-none focus:ring-0 w-full"
                  onChange={(e) => setSoftcap(e.target.value)}
                />
                <div className="label">
                  <span className="label-text-alt text-gray-500">vTokens</span>
                </div>
              </label>
            </div>

            <div>
              <span className="label-text text-gray-600 text-md">
                The maximum fundraising goal for the project.
              </span>
              <label className="m-2 input input-bordered flex items-center gap-2">
                <p className="w-40">Hard cap&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <input
                  placeholder="Enter hardcap"
                  type="number"
                  className="grow border-none focus:outline-none focus:ring-0 w-full"
                  onChange={(e) => setHardcap(e.target.value)}
                />
                <div className="label">
                  <span className="label-text-alt text-gray-500">vTokens</span>
                </div>
              </label>
            </div>

            <div>
              <span className="text-gray-600 text-md">
                The minimum amount a user can invest in this project.
              </span>
              <label className="m-2 input input-bordered flex items-center gap-2">
                <p className="w-40">Min invest&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <input
                  placeholder="Enter minimum investment"
                  type="number"
                  className="grow border-none focus:outline-none focus:ring-0 w-full"
                  onChange={(e) => setMinInvestment(e.target.value)}
                />
                <div className="label">
                  <span className="label-text-alt text-gray-500">vTokens</span>
                </div>
              </label>
            </div>

            <div>
              <span className="text-gray-600 text-md">
                The maximum amount a user can invest in this project.
              </span>
              <label className="m-2 input input-bordered flex items-center gap-2">
                <p className="w-40">Max invest&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <input
                  placeholder="Enter maximum investment"
                  type="number"
                  className="grow border-none focus:outline-none focus:ring-0 w-full"
                  onChange={(e) => setMaxInvestment(e.target.value)}
                />
                <div className="label">
                  <span className="label-text-alt text-gray-500">vTokens</span>
                </div>
              </label>
            </div>

            <div>
              <span className="text-gray-600 text-md">
                The reward rate based on the amount of token purchase.
              </span>
              <label className="m-2 input input-bordered flex items-center gap-2">
                <p className="w-40">Stake reward (%)&nbsp;</p>
                <input
                  placeholder="Enter reward rate"
                  type="number"
                  className="grow border-none focus:outline-none focus:ring-0 w-full"
                  onChange={(e) => setReward(e.target.value)}
                />
                <div className="label text-right">
                  <span className="label-text-alt text-gray-500">
                    e.g, 1 for 1%
                  </span>
                </div>
              </label>
            </div>

            <div>
              <span className="text-gray-600 text-md">
                Select the start and end dates for the project or token sale.
              </span>
              <div className="m-2 input input-bordered flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <div className="flex items-center w-full">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      const now = new Date();
                      if (date && date >= now) {
                        setStartDate(date);
                        if (date >= endDate!) {
                          setEndDate(new Date(date.getTime() + 15 * 60 * 1000));
                        }
                      }
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select Start Date"
                    className="border-none outline-none w-full"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeSelect
                    timeIntervals={1}
                    timeFormat="HH:mm"
                    timeCaption="Time"
                    minTime={
                      startDate &&
                      startDate.toDateString() === new Date().toDateString()
                        ? new Date()
                        : new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                  />

                  <span className="mx-4">to</span>

                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      if (date && date >= startDate!) {
                        setEndDate(date);
                      }
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    showTimeSelect
                    placeholderText="End Date"
                    className="border-none outline-none w-full"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    timeIntervals={1}
                    timeFormat="HH:mm"
                    timeCaption="Time"
                    minTime={
                      startDate &&
                      endDate &&
                      startDate.toDateString() === endDate.toDateString()
                        ? startDate
                        : new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                  />
                </div>
              </div>
            </div>
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
