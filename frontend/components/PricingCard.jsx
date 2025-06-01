"use client";

import { openModal } from "@/redux/slices/modalSlice";
import { fetchSubscription } from "@/redux/slices/subscriptionSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PricingCard = ({
  title,
  titleColor,
  focus,
  idealFor,
  features,
  price,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authData);

  const subscribe = async () => {
    console.log(title)
    try {
      if (!user) {
        dispatch(openModal({ modalName: "login" }));
        return;
      }

      let serviceType;

      switch (title) {
        case "ScholarTrack.":
          serviceType = "ScholarTrack";
          break;
        case "CareerCatch.":
          serviceType = "CareerCatch";
          break;
        case "OpT. All-Access":
          serviceType = "All-Access";
          break;
        default:
          serviceType = "Unknown";
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/subscribe`,
        { price, serviceType },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data.data) {
        console.log("working", data.data.subscription);
        dispatch(
          openModal({
            modalName: "subscribedata",
            data: {subscriptionData :data.data.subscription, serviceType, price}
          })
        );
      }

      // console.log(data);

      if (data.success) {
        window.location.replace(data.url);
      }
    } catch (err) {
      console.error("Subscription Error:", err);
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    dispatch(fetchSubscription());
  }, [dispatch]);

  return (
    <div className="w-full xl:w-[25vw] font-bold border-3 border-white shadow-[0_0_25px_rgba(0,238,255,0.3)] bg-[#5555555E] rounded-3xl pl-3 md:pl-2 lg:pl-3 xl:pl-5 pr-0.5 hover:border-[#00EEFF] hover:shadow-[0_0_25px_rgba(0,238,255,0.3)] hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#9900FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="w-full flex flex-col">
        <h6
          className={`font-semibold w-fit text-2xl xl:text-3xl pt-2 ${titleColor}  group-hover:text-[#00EEFF] transition-colors duration-300`}
        >
          {title}
        </h6>

        <div className="py-3 text-xs sm:text-sm font-bold h-[7em]">
          <p className="">
            <span className="text-[#00EEFF]">Focus:</span> {focus}
          </p>
          <p className="">
            <span className="text-[#00F49F]">Ideal for:</span> {idealFor}
          </p>
        </div>

        <div className="md:mt-8 lg:mt-2 xl:mt-0 flex-grow group-hover:[&>h6]:animate-pulse sm:h-[18em] xl:h-[13em]">
          <h6 className="text-xl mb-1 transition-all duration-300">
            What You Get:
          </h6>
          <ol className="list-disc pl-5 space-y-2 text-xs sm:text-sm [&>li]:hover:text-[#00F49F] [&>li]:transition-colors [&>li]:duration-300">
            {features.map((item, idx) => (
              <li key={idx} className={``}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="my-2 flex flex-col justify-center items-center transition-all duration-500 rounded-b-2xl py-4 md:py-0 lg:py-4 h-52">
        <p className="font-black font-codeProBlackLC text-2xl sm:text-4xl xl:leading-9 my-3 bg-gradient-to-b from-[#00FF11] to-[#FFFFFF] bg-clip-text text-transparent group-hover:animate-bounce">
          <span className="block">Tk. {price}/</span>month
        </p>
        <button
          className="font-codeProBlackLC font-black border-2 border-white/50 rounded-full text-xl sm:text-2xl md:text-3xl px-2 py-1 sm:px-4 sm:py-3 xl:px-10 xl:py-3 mb-2 xl:mb-4 bg-gradient-to-r from-[#D400B8] to-[#9900FF] hover:from-[#9900FF] hover:to-[#D400B8] hover:shadow-[0_0_15px_rgba(153,0,255,0.5)] hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => subscribe()}
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
