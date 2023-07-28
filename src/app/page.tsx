import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import MainComponent from "@/components/MainComponent";
import RightSection from "@/components/RightSection";
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/supabase.types'
import Login from "./login";
 

export const revalidate=0;
const Home = async () => {
  // const supabase = createServerComponentClient<Database>({ cookies })
  // const { data,error } = await supabase.auth.getUser()
  // console.log(({data,error}))

  return (
    <div className="w-full  h-full flex justify-center relative  bg-black text-white ">
      
   
    <Login/>
      <div className="w-full lg:w-[80%] h-full justify-center flex relative  ">
        <LeftSideBar />
        <MainComponent />
        <RightSection/>
       
      </div>
    </div>
  );
};

export default Home;
