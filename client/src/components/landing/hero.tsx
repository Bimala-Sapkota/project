import heroImage from "../../assets/hero-1.webp";

const Hero = () => {
  return (
    <div id={"hero-section"} className="w-full  h-[85vh] relative">
      {/* overlay */}
      <div className="bg-black/40 absolute  inset-0"></div>

      <img src={heroImage} className="h-full w-full" />
      {/* hero information */}
      <div className="absolute top-[30%] bottom-1/2 left-20 max-w-[700px]">
        <div>
          <h1 className="text-5xl text-[#A31621] font-extrabold">
            Your One-Stop Online Destination
          </h1>
          <p className="text-lg text-[#FCF7F8] mt-2">
            Discover a wide range of high-quality products, carefully curated to
            match your lifestyle. Whether you&apos;re upgrading your wardrobe,
            refreshing your home, or shopping for the perfect gift, we&apos;ve
            got something for everyone — all in one seamless shopping
            experience.
          </p>
        </div>
        <button className="bg-[#A31621] border border-[#A31621]  text-[#FCF7F8] hover:bg-[#FCF7F8] hover:border-[#A31621] hover:text-[#A31621] trasition-all duration-400 py-3 w-[150px] rounded-md font-bold text-lg cursor-pointer mt-4">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;

// footer
