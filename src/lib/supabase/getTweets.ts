'use server'
import { SupabaseClient,createClient } from '@supabase/supabase-js'
import { Database } from '../supabase.types'
// import supabaseServer from '../supabase'
import { randomUUID } from 'crypto'


export type TweetType=Database['public']['Tables']['tweets']['Row'] & {
    profiles:Pick<
    Database['public']['Tables']['profiles']['Row'],'full_name'|'username'>
  }

const supabaseURL=process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecret=process.env.SUPABASE_SECRET_KEY
export  const GetTweets=async()=>{
    
    if(!supabaseURL || !supabaseSecret) return {error:{message:"supabase credentials not provided"}}
    const supabaseServer =new SupabaseClient(
    supabaseURL,
    supabaseSecret)
    if(supabaseServer)
    return await supabaseServer.from("tweets").select(`*,profiles(
      full_name,
      username
    )`)
    // .limit(3)
    .returns<TweetType[]>
    ()
    
  }

  