'use server'
import { randomUUID } from "crypto"
// import { supabaseServer } from "./"
import { getSupabaseClient } from "./"
import { revalidatePath } from "next/cache"

export const likeTweet=async(
    {tweetId,userId}:{
        tweetId:string,
        userId:string
    }
  )=>{
    const supabaseServer=await getSupabaseClient()
    console.log("hello dear",supabaseServer)
        const {data,error}=await supabaseServer.from("likes").insert({
            id:randomUUID(),
            tweet_id:tweetId,
            user_id:userId

        })

        //not good approach to revalidate again
        revalidatePath('/')
       
    }
  
export const unlikeTweet=async(
    {tweetId,userId}:{
        tweetId:string,
        userId:string
    }
  )=>{
    const supabaseServer=await getSupabaseClient()
    console.log("hello dear",supabaseServer)
        const {data,error}=await supabaseServer.from("likes").delete().eq('tweet_id',tweetId)
        .eq('user_id',userId)

        console.log(data,error)
        revalidatePath('/')
    }
  