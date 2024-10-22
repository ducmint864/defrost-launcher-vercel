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
  const [reward, setReward] = useState<string>("");
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
      reward,
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
          <div className="my-6 w-full flex flex-col p-8">
            <span className="label-text text-gray-600 text-md">
              The rate at which tokens are exchanged for currency
            </span>
            <label className="m-2 input input-bordered flex items-center gap-2 mb-10">
              Exchange rate
              <div className="label">
              </div>
              <input
                type="number"
                //     className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
                // [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                className="grow"
                placeholder="Set token exchange rate"
                onChange={(e) => setTokenExchangeRate(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-gray-500">(1 project token = X vtokens)</span>
              </div>
            </label>

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

            <span className="label-text text-gray-600 text-md">
              The minimum fundraising goal for the project to be considered successful.
            </span>
            <label className="m-2 input input-bordered flex items-center gap-2 mb-10">
              Soft cap
              <input
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                type="number"
                //     className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
                // [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                className="grow"
                onChange={(e) => setSoftcap(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-gray-500">(vTokens)</span>
              </div>
            </label>

            <span className="label-text ext-gray-600 text-md">
              The maximum fundraising goal for the project.
            </span>
            <label className="m-2 input input-bordered flex items-center gap-2 mb-10">
              Hard cap
              <input
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                type="number"
                //   className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
                // [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                className="grow"
                onChange={(e) => setHardcap(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-gray-500">(vTokens)</span>
              </div>
            </label>

            <span className="text-gray-600 text-md">
              The minimum amount a user can invest in this project.
            </span>
            <label className="m-2 input input-bordered flex items-center gap-2 mb-10">
              Min investment
              <input
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                type="number"
                //     className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
                // [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                className="grow"
                onChange={(e) => setMinInvestment(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-gray-500">(vTokens)</span>
              </div>
            </label>

            <span className="text-gray-600 text-md">
              The maximum amount a user can invest in this project.
            </span>
            <label className="m-2 input input-bordered flex items-center gap-2 mb-10">
              Max investment
              <input
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                type="number"
                //     className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
                // [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                className="grow"
                onChange={(e) => setMaxInvestment(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-gray-500">(vTokens)</span>
              </div>
            </label>

            <span className="text-gray-600 text-md">
              The reward rate base on the amount of token purchase.
            </span>
            <label className="m-2 input input-bordered flex items-center gap-2 mb-10">
              Staker reward (%)
              <input
                placeholder="xxxxxxx"
                type="number"
                //   className="border border-black rounded-2xl w-[1050px] text-lg pl-5 focus:outline-none focus:ring-0 w-15 h-12
                // [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                className="grow"
                onChange={(e) => setReward(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-gray-500">e.g, 1 for 1%</span>
              </div>
            </label>


            <span className="text-gray-600 text-md">
              Select the start and end dates for the project or token sale.
            </span>
            <div className="flex items-center border border-black rounded-2xl w-[1050px] h-12 text-lg px-3">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              {/* <DatePicker
                selected={startDate}
                onChange={(date) => {
                  // Lưu ngày được chọn cùng với thời gian hiện tại (giờ, phút, giây)
                  const currentTime = new Date();
                  if (date) {
                    // Đặt ngày được chọn và thời gian hiện tại vào startDate
                    const selectedDateWithTime = new Date(
                      date.setHours(
                        currentTime.getHours(),
                        currentTime.getMinutes(),
                        currentTime.getSeconds()
                      )
                    );
                    setStartDate(selectedDateWithTime);
                  }
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="border-none outline-none w-full"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()} // Chỉ cho phép chọn ngày hiện tại hoặc tương lai
              /> */}

              <div className="flex items-center">
                {/* Start Date and Time Picker */}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    const now = new Date(); // Lấy thời gian hiện tại
                    if (date && date >= now) {
                      // Kiểm tra nếu startDate lớn hơn hoặc bằng thời gian hiện tại
                      setStartDate(date); // Lưu ngày và thời gian đã chọn
                      if (date >= endDate) {
                        setEndDate(new Date(date.getTime() + 15 * 60 * 1000)); // Tự động đặt endDate lớn hơn startDate ít nhất 15 phút
                      }
                    }
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Start Date and Time"
                  className="border-none outline-none w-full"
                  dateFormat="dd/MM/yyyy h:mm aa"
                  minDate={new Date()} // Chỉ cho phép chọn ngày từ hôm nay trở đi
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  minTime={
                    startDate &&
                      startDate.toDateString() === new Date().toDateString()
                      ? new Date() // Nếu chọn hôm nay, giới hạn thời gian nhỏ nhất là thời gian hiện tại
                      : new Date(new Date().setHours(0, 0, 0, 0)) // Nếu chọn ngày trong tương lai, thời gian nhỏ nhất là 00:00
                  }
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                />

                <span className="mx-4">to</span>

                {/* End Date and Time Picker */}
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    if (date && date >= startDate) {
                      setEndDate(date); // Chỉ cho phép lưu endDate nếu nó lớn hơn hoặc bằng startDate
                    }
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate} // endDate không thể nhỏ hơn startDate
                  showTimeSelect
                  placeholderText="End Date"
                  className="border-none outline-none w-full"
                  dateFormat="dd/MM/yyyy h:mm aa"
                  timeIntervals={15}
                  timeFormat="HH:mm"
                  timeCaption="Time"
                  minTime={
                    startDate &&
                      endDate &&
                      startDate.toDateString() === endDate.toDateString()
                      ? startDate // Nếu cùng ngày, endDate phải lớn hơn thời gian của startDate
                      : new Date(new Date().setHours(0, 0, 0, 0)) // Nếu không cùng ngày, thời gian bắt đầu từ 00:00
                  }
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))} // Giới hạn thời gian tối đa trong ngày là 23:59:59
                />
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
    </div >
  );
};

export default Promotion;
