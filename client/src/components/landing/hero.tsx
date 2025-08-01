import heroImage from "../../assets/hero-1.webp";

const Hero = () => {
  return (
    <div id={"hero-section"} className="w-full h-[80vh]">
      <img src={heroImage} className="h-full w-full" />
    </div>
  );
};
export default Hero;
