import React from "react";
import ContactCard from "./contact-card";
import { FaPhone } from "react-icons/fa6";
import { GrLocation, GrMail } from "react-icons/gr";
// import ContactCard from './contact-card'
// import CallIcon from '../icons/call-icon'
// import MailIcon from '../icons/mail'
// import LocationIcon from '../icons/location'

const InfoSection = () => {
  return (
    <div className="text-white lg:w-[520px] flex flex-col items-center lg:items-start gap-6">
      <div className="h-22  w-fit ">
        <img
          src={"./logo.png"}
          alt="logo dark"
          // height={500}
          // width={500}
          className="h-full w-fit"
        />
      </div>
      <div className="max-w-[468px] text-center lg:text-start">
        <p className="text-lg 2xl:text-xl font-semibold">About HMC Nepal</p>
        <p className="text-[12px] lg:text-[14px] 3xl:text-[16] font-[200] mt-1">
          Shopkart Nepal is your trusted online destination for authentic tech
          products including laptops, cameras, and accessories. We’re committed
          to quality, genuine products, and exceptional service.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between w-full  gap-2 lg:gap-auto">
        <ContactCard
          Icon={<GrLocation className="h-5 w-5" />}
          title="Located At"
          detail="New Road, Kathmandu"
        />
        <ContactCard
          Icon={<FaPhone className="h-5 w-5" />}
          title="Call Us at"
          detail="986-5374070"
        />
        <ContactCard
          Icon={<GrMail className="h-5 w-5" />}
          title="Mail us at"
          detail="info@shopkart.com.np"
        />
      </div>
    </div>
  );
};

export default InfoSection;
