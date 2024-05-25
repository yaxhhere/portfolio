import { experience } from "@/helpers/config";

export default async function Experience() {
  return (
    <section className="relative flex flex-col w-full bg-[#34353a] shadow-2xl shadow-gray-900 2xl:px-[300px] py-14 mt-20">
      <h2 className="text-[40px] font-black absolute text-center -top-9 left-0 right-0">
        Experience
      </h2>
      <div className="flex flex-col px-[40px] md:px-[100px]">
        {experience?.map((doc) => {
          return (
            <div key={doc?.key} className="flex flex-col mt-5">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <img
                    src="/images/assets/pointerIcon.svg"
                    className="w-full h-14 hidden md:block"
                  />
                  <span className="text-[12px] absolute z-10 top-3 left-1">
                    {doc?.year}
                  </span>
                </div>
                <div className="h-4 w-4 rounded-full bg-transparent animate-pulse mt-3.5 hidden md:block">
                  <div className="h-full w-full rounded-full bg-[#f8c979] shadow-xl"></div>
                </div>
                <div className="flex flex-col mt-5 md:mt-0">
                  <h1 className="text-[24px] font-medium">{doc?.title}</h1>
                  <h1 className="text-[14px] font-normal">{doc?.company}</h1>
                </div>
              </div>
              <div className="flex flex-row gap-6 md:pl-[130px] mt-5">
                <hr className="w-1 h-auto bg-[#f8c979]" />
                <p className="text-justify text-[14px] -mt-1">
                  {doc?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
