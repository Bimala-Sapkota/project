import React from "react";

// import YoutubeIcon from "./you-tube";

const BottomFooter = () => {
  return (
    <div className="pt-8 text-white">
      <hr className="h-[1px] bg-[#6C6C6C] " />
      <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-end mt-4">
        <div className="text-[10px] font-[200]  flex gap-1 items-center">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="font-semibold">Shop kart Nepal.</span>
          <span className=" border-r-[1px] pr-1 ">All rights reserved.</span>
          Designed by
          <span className="font-semibold">______</span>
        </div>
        {/* <div className="flex gap-1 items-center mt-4 lg:mt-0">
          <Link target="_blank"  href={"https://www.facebook.com/hmc.dahua"}>
            <FacebookIcon />
          </Link>
          <Link target="_blank" href={"https://www.instagram.com/hmc_nepal/"}>
            <InstagramIcon />
          </Link>
          <Link target="_blank" href={"https://www.youtube.com/@hmcnepal"}>
            <YoutubeIcon className="h-5 w-5" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default BottomFooter;
