export default async function Testimonials() {
  return (
    <section className="2xl:px-[400px]">
      <div className="flex flex-col p-12">
        <div className="flex flex-col-reverse mt-20 gap-10 2xl:gap-0 2xl:flex-row justify-between 2xl:items-center 2xl:justify-center">
          <div className="flex flex-col 2xl:basis-3/5 text-center xl:text-start">
            <h2 className="text-[40px] font-black">Testimonial</h2>
            <div className="flex flex-row mt-10 gap-2">
              <hr className="w-8 h-0.5 bg-[#f8c979]" />
              <div className="flex flex-col">
                <p className="text-justify -mt-3">
                  It has been an exceptional experience. His expertise in the
                  MERN stack is evident in the high-quality, efficient solutions
                  he deliver. He consistently demonstrate attention to
                  detail, clear communication, and a strong commitment to
                  meeting deadlines. His ability to solve complex problems and
                  deliver scalable, user-friendly applications makes them a
                  valuable asset to any project. I highly recommend his
                  services for anyone looking to bring their web development
                  projects to life.
                </p>
                <div className="flex text-[20px] font-black mt-4">Tushar Gupta</div>
                <span className="flex flex-row gap-2 mt-4">
                  <hr className="w-2 h-0.5 bg-[#f8c979]" />
                  <p className="text-justify -mt-2.5 text-[14px]">
                    CEO, Sai Tech
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="2xl:basis-2/3 flex flex-col 2xl:justify-end 2xl:items-end justify-center items-center">
            <div className="relative w-[280px] h-[200px] bg-[#f8c979] 2xl:rounded-l-[20px] rounded-[20px]">
              <img
                src={"/images/assets/testimonial.png"}
                className="absolute bottom-0 h-[320px] w-[230px] 2xl:right-2 right-0 left-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
