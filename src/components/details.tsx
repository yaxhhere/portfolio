import { portfolio, skills } from "@/helpers/config";

export default async function Details() {
  return (
    <section className="2xl:px-[400px]">
      <div className="flex flex-col p-12">
        <h2 className="text-[40px] font-black text-center">About</h2>
        <p className="text-[16px] mt-2 text-justify">
          As a Full Stack Web Developer, I specialize in crafting dynamic and
          responsive web applications by seamlessly integrating{" "}
          <span className="text-[#f8c979]">
            front-end and back-end technologies
          </span>
          . With expertise in{" "}
          <span className="text-[#f8c979]">
            HTML5, CSS3, JavaScript (React, Angular, Vue.js)
          </span>
          , and server-side languages such as{" "}
          <span className="text-[#f8c979]">Node.js, PHP, and Python</span>, I
          create user-friendly interfaces and robust, scalable APIs. My
          proficiency extends to database management with{" "}
          <span className="text-[#f8c979]">MySQL, PostgreSQL, and MongoDB</span>
          , as well as deployment using cloud services like{" "}
          <span className="text-[#f8c979]">AWS and Azure</span>. Committed to
          continuous learning and innovation, I thrive in collaborative
          environments, consistently delivering high-quality solutions that
          enhance user experience and meet client needs.
        </p>
      </div>
      <div className="flex flex-col p-12 w-full text-center">
        <h2 className="text-[40px] font-black">My Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {skills.map((doc) => {
            return (
              <div
                key={doc?.key}
                className="col-span-1 self-center flex flex-col bg-[#3d3e41] px-5 py-8 box-border items-center justify-between gap-5 rounded-[10px] shadow-lg shadow-gray-900 hover:bg-[#ffc155] transform hover:scale-105 transition duration-200 cursor-pointer"
              >
                <div className="flex flex-row gap-2">
                  {doc?.image?.split(",")?.map((el) => {
                    return <img key={el} src={el} className="w-[80px] h-[80px]" />;
                  })}
                </div>
                <h2 className="text-[20px] font-extrabold">{doc?.label}</h2>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col p-12 w-full text-center">
        <h2 className="text-[40px] font-black">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {portfolio?.map((doc, index) => {
            return (
              <div
                key={doc.key}
                className={`relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-200 bg-white ${index == 0 ? 'row-span-2' : ''}`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={doc.backgroundImage}
                  alt={doc.key}
                />
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 hover:opacity-75 flex flex-col justify-center px-2">
                  <h3 className="text-[24px] font-black">{doc?.title}</h3>
                  <p className="mt-3 text-[18px]">{doc?.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
