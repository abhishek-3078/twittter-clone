import React from 'react'
import { SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
// import { useRouter } from 'next/router';
import FormClientComponent from '../client-components/FormClientComponent';
import { revalidatePath } from 'next/cache';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase.types';
import { cookies } from 'next/headers';
const ComposeTweet = () => {

    async function submitTweet(formData:FormData){
        'use server'
        console.log(formData)
        const tweet=formData.get('tweet');
        if(!tweet) return ;
        const supabase=createServerComponentClient<Database>({cookies})
        
        const {data:userData,error:userError}=await supabase.auth.getUser()

        if(userError) return;
        // console.log("usfaf",userData)
        const supabaseURL=process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseSecret=process.env.SUPABASE_SECRET_KEY
    if(!supabaseURL || !supabaseSecret) return {error:{message:"supabase credentials not provided"}}
    const supabaseServer =new SupabaseClient(
    supabaseURL,
    supabaseSecret)
        const {data,error}=await supabaseServer.from("tweets").insert({
            profile_id:userData.user.id,
            text:tweet.toString(),
            id:randomUUID()
        })
        // console.log("res:",data,error);
        revalidatePath('/')
        return {data,error}
        
        // const {data,error}=await supabase.
    }
  return (

    <FormClientComponent action={submitTweet}/>
//     <div className="border-t-[0.5px] border-b-[0.5px] border-gray-500 h-32 relative flex items-stretch   p-4 space-x-2 ">
//     <div className="w-10 h-10 rounded-full bg-slate-500 flex-none"></div>
//     <form action={submitTweet} className="flex flex-col w-full h-full ">
   
//       <input type="text" placeholder="What's happening?" 
//       name="tweet" className="w-full h-full bg-transparent outline-none border-none placeholder:text-2xl placeholder:text-grey-600 "></input>
    
//     <div className="w-full justify-between items-center flex">
//     <div></div>
//     <div className="w-full max-w-[100px]">
//     <button type="submit" className='w-full rounded-full text-2sm font-bold text-center px-4 py-2 bg-primary hover:bg-opacity-70 transition duration-300'
// >Tweet</button>
//     </div>
//     </div>

//     </form>


// </div>
  )

}

export default ComposeTweet