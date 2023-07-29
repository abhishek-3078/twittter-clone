'use client'
import { likeTweet, unlikeTweet } from "@/lib/supabase/mutation"
import { useState, useTransition } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { toast } from "sonner"

export const LikeButtton =({tweetId,count,isUserHasLiked,userId}:{tweetId:string,count:number|null,isUserHasLiked:boolean,userId?:string}) => {
    
    let [isLikePending,startTransition]=useTransition()


  return (
    <button onClick={()=>{
        
            if(userId){

                startTransition(()=>
                isUserHasLiked?unlikeTweet({tweetId,userId}):likeTweet({
                    tweetId,
                    userId
                }))
            }else{
                toast("please login to like a tweet")
            }
        
    }} className="rounded-full hover:bg-white/10 flex items-center transition  gap-1 duration-200 cursor-pointer p-3">
        {isUserHasLiked ? <AiFillHeart  className="h-5 w-5 text-red-600"/>:<AiOutlineHeart/>}
        <span className="text-sm " >{count??0}</span> </button>
  )
}
