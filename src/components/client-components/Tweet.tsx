// 'use server'

import React ,{useTransition,useState} from 'react'
import {BsDot,BsChat, BsThreeDots} from 'react-icons/bs'
import {AiOutlineRetweet,AiOutlineHeart} from 'react-icons/ai'
import {IoShareOutline,IoStatsChart} from "react-icons/io5"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { TweetType } from '@/lib/supabase/getTweets'
import { likeTweet } from '@/lib/supabase/mutation'
// import supabaseServer from '@/lib/supabase'
import { toast } from 'sonner'
import { createPagesBrowserClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getSupabaseClient } from '@/lib/supabase'
import { Database } from '@/lib/supabase.types'
import { getLikesCount, isLiked } from '@/lib/supabase/queries'
import { LikeButtton } from './LikeButtton'
import { cookies } from 'next/headers'
dayjs.extend(relativeTime)
type TweetProps={
    tweet:TweetType,
    currentUserId?:string
}
const Tweet = async ({tweet,currentUserId}:TweetProps) => {

  
  const TweetLikesCount=await getLikesCount(tweet.id)
  const isUserHasLiked=await isLiked({tweetId:tweet.id,userId:currentUserId})
    console.log(isUserHasLiked)
  return (
    <div key={tweet.id} className="flex space-x-4 p-4 border-b-[0.5px] border-gray-500">
    <div>
      <div className="w-10 h-10 rounded-full bg-slate-500">
      </div>
    </div>
    <div className="flex flex-col space-y-2">
      <div className="flex  justify-between w-full">
       <div className="flex space-x-1 items-center">
       <div className='font-bold'>{tweet.profiles.full_name??''}</div>
        <div className="text-gray-500">@{tweet.profiles.username}</div>
        <div className="text-gray-500"><BsDot/></div>
        <div className="text-gray-500">{ dayjs(tweet.created_at).fromNow()}</div>
       </div>
        <div className="flex  ">
      <BsThreeDots/>
  </div>
         </div>

         <div className="flex">
 {tweet.text}
          </div>
          <div className="bg-slate-400 aspect-square w-full lg:h-96 rounded-xl"></div>

          <div className='flex justify-around space-x-2 w-full'>
            <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3"><BsChat/></div>
            <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3"><AiOutlineRetweet/></div>
            <LikeButtton tweetId={tweet.id} count={TweetLikesCount.count} isUserHasLiked={isUserHasLiked}/>
            <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3"><IoStatsChart/></div>
            <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3"><IoShareOutline/></div>
          </div>
    </div>

  </div>
  )
}

export default Tweet