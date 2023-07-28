import { BsSearch } from "react-icons/bs";
const RightSection = () => {
  return (
    <section className=" w-[30%]  sticky -top-[400px] h-screen lg:flex flex-col space-y-4 p-4  hidden">
    <div>
      <div className="  h-full w-full flex rounded-full items-center bg-secondary relative">
        <input
          type="text"
          name=""
          id="searchBox"
          placeholder="Search Twitter"
          className="rounded-full peer outline-none w-full h-full  py-4 pl-14 focus:border-primary focus:border bg-[#16181C]"
        />
        <label
          htmlFor="searchBox"
          className="p-4 absolute top-0 left-0 flex items-center justify-center text-gray-500 peer-focus:text-primary"
        >
          <BsSearch className=" w-5 h-5  " />
        </label>
      </div>
    </div>
    <div className="flex flex-col bg-secondary rounded-xl">
      <h3 className="font-bold text-xxl my-2 p-2">What's happening</h3>
      <div>
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <div
              key={i}
              className="p-4 hover:bg-white/[0.03] last:rounded-b-xl transition duration-200"
            >
              <div className="font-bold text-lg">#trending {i + 1}</div>
              <div className="text-xs text-neutral-400">35.4k</div>
            </div>
          );
        })}
      </div>
    </div>
    <div className="flex flex-col bg-secondary rounded-xl">
      <h3 className="font-bold text-xxl my-2 p-2">Who to follow</h3>
      <div>
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <div
              key={i}
              className="flex p-4 hover:bg-white/[0.03] last:rounded-b-xl justify-between"
            >
              <div className="flex gap-2">
              <div className="font-bold text-lg w-10 h-10 rounded-full bg-slate-400"></div>
              <div className="flex flex-col">
                  <div className="text-bold">Other User</div>
                  <div className="text-gray-500 text-xs">@otheruser32</div>
              </div>
              </div>
              <div>
              <button className=" block rounded-full px-6 py-2 bg-white text-neutral-500">Follow</button>
              </div>

            </div>
          );
        })}
      </div>
    </div>

  
  </section>
  )
}

export default RightSection