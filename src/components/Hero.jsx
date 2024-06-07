import { LuAlignHorizontalDistributeStart } from "react-icons/lu";

const Hero = () => {
  return (
    <div className=" w-full heroImg flex flex-col justify-center gap-10 items-center py-[100px]">
      <div className="text-center">

      <p className="font-bold text-5xl">
      Explore a World of Flavors
      </p>

      <p className="text-lg">
      Find Your Next Culinary Adventure
      </p>
      </div>

      <div className="text-center">
        <button className="bg-orange-500 py-2 px-6 text-light rounded-md hover:bg-orange-900 hover:shadow-lg flex items-center gap-3">
        Get Started
        <LuAlignHorizontalDistributeStart />  
        </button>
      </div>
    </div>
  )
}

export default Hero