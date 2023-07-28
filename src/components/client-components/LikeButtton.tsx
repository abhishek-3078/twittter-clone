'use client'
import { likeTweet, unlikeTweet } from "@/lib/supabase/mutation"
import { getLikesCount } from "@/lib/supabase/queries"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import { useState, useTransition } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { toast } from "sonner"

export const LikeButtton =({tweetId,count,isUserHasLiked}:{tweetId:string,count:number|null,isUserHasLiked:boolean}) => {
    
    let [isLikePending,startTransition]=useTransition()

    const [supabase]=useState(()=>createPagesBrowserClient())
  return (
    <button onClick={()=>{
        supabase.auth.getUser().then(res=>{
            if(res.data && res.data.user){
                const user=res.data.user
                console.log(user)
                startTransition(()=>
                isUserHasLiked?unlikeTweet({tweetId,userId:user.id}):likeTweet({
                    tweetId,
                    userId:user.id
                }))
            }else{
                toast("please login to like a tweet")
            }
        })
    }} className="rounded-full hover:bg-white/10 flex items-center transition  gap-1 duration-200 cursor-pointer p-3">
        {isUserHasLiked ? <AiFillHeart  className="h-5 w-5 text-red-600"/>:<AiOutlineHeart/>}
        <span className="text-sm " >{count??0}</span> </button>
  )
}
