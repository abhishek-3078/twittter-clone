
import React from 'react'

import ComposeTweet from './server-components/ComposeTweet'

import { GetTweets } from '@/lib/supabase/queries'
import Tweet from './client-components/Tweet'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'



const MainComponent = async () => {
   
  const supabaseServer=await createServerComponentClient({cookies})
  const {data:userData,error:userError}=await supabaseServer.auth.getUser()
  const res=await GetTweets()

  return (
    <main className="flex w-full md:w-[625px] h-full min-h-screen flex-col  border-l-[0.5px] border-r-[0.5px] border-gray-500">
<h1 className="text-xl font-bold p-6 backdrop-blur bg-black/30 sticky top-0">

  Home
  </h1>
    <ComposeTweet/>
    <div className="flex  flex-col">
      {res?.error && <div>Something wrong with the server</div>}

      {!res?.error && res?.data && 
        res.data.map((tweet,i)=>{
          return (
           <Tweet key={tweet.id}  tweet={tweet} currentUserId={userData.user?.id}/>
          )
        })
      }
    </div>

   </main>
  )
}

export default MainComponent