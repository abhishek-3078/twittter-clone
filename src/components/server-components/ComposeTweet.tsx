import React from 'react'
import { SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
// import { useRouter } from 'next/router';
import FormClientComponent from '../client-components/FormClientComponent';
import { revalidatePath } from 'next/cache';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase.types';
import { cookies } from 'next/headers';
import { getSupabaseClient } from '@/lib/supabase';
const ComposeTweet = ({userId}:{userId?:string}) => {

    async function submitTweet(formData:FormData){
        'use server'
        console.log(formData)
        const tweet=formData.get('tweet');
        if(!tweet) return {err:{message:"tweet can't be empty"}};
        if(!userId){
          return {err:{message:"please login before tweet"}}
        }
        // console.log("usfaf",userData)
        const supabaseServer=await getSupabaseClient()
        const {data,error}=await supabaseServer.from("tweets").insert({
            profile_id:userId,
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
  )

}

export default ComposeTweet