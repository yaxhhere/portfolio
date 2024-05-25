export default async function ContactMe() {
    return <section className="relative flex flex-col w-full bg-[#34353a] shadow-2xl shadow-gray-900 2xl:px-[300px] py-14 mt-20">
        <div className="grid grid-cols-8 gap-1">
            <hr className="h-1 w-full bg-[#f8c979] col-span-2 lg:col-span-3" />
            <h2 className="text-[30px] md:text-[40px] text-center 2xl:text-[40px] font-black -mt-6 lg:-mt-8 col-span-4 lg:col-span-2">
                Contact Me
            </h2>
            <hr className="h-1 w-full bg-[#f8c979] col-span-2 lg:col-span-3" />
    </div>
    <div className="flex flex-col gap-5 px-[100px] mt-10 justify-center">
        <div className="flex flex-col md:flex-row gap-5">
            <input placeholder="Full Name" className="basis-1/2 h-10 rounded-[10px] p-2 text-[#333]" />
            <input placeholder="Email" className="basis-1/2 h-10 rounded-[10px] p-2 text-[#333]" />
        </div>
        <textarea rows={5} placeholder="Description" className="p-2 rounded-[10px] text-[#333]" />
        <button className="bg-[#f8c979] w-[180px] py-2 rounded-[15px]">Submit</button>
    </div>
  </section>
}