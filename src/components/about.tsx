import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

export default async function About() {
  return (
    <>
      <section className="flex lg:flex-row flex-col-reverse w-full h-screen bg-[#34353a] shadow-lg shadow-gray-900 xl:px-[100px]">
        <div className="basis-1/2 flex flex-col justify-center items-center lg:text-left text-center">
          <div>
            <p className="text-[26px] sm:text-[36px] xl:text-[48px]">
              I&apos;m{" "}
              <span className="text-[#f8c979] text-[34px] sm:text-[50px] xl:text-[70px] font-bold">
                Yashodhan Kalia
              </span>
              <br />
              Full Stack Developer
            </p>
            <button className="border-[3px] rounded-[20px] px-5 py-3 mt-5 text-[#f8c979] border-[#f8c979]">
              Contact Me
            </button>
          </div>
        </div>
        <div className="basis-1/2 flex flex-col justify-center items-center xl:justify-end xl:items-end lg:mt-0 mt-24">
          <img
            src={"/images/rightImage.png"}
            className="w-[400px] sm:w-[300px] md:w-[460px] lg:w-[700px] xl:w-[850px] rounded-full xl:rounded-none"
            alt="right image"
          />
        </div>
      </section>
      <div className="flex flex-col absolute right-10 bottom-5 gap-5 text-[24px]">
        <hr className="w-0.5 bg-[#f8c979] h-24 ml-2.5"></hr>
        <BsLinkedin className="cursor-pointer" />
        <BsGithub className="cursor-pointer" />
        <BsInstagram className="cursor-pointer" />
      </div>
    </>
  );
}
