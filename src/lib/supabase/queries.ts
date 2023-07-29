'use server'
import { Database } from '../supabase.types'
import { getSupabaseClient } from './'
// import { pool } from '../db'
import Pool from 'pg-pool'


const pool = new Pool({
    connectionString:process.env.DATABASE_SECRET_KEY,
    allowExitOnIdle:true
})

console.log("in queries")
export type TweetType=Database['public']['Tables']['tweets']['Row'] & {
    profiles:Pick<
    Database['public']['Tables']['profiles']['Row'],'full_name'|'username'>
  }


export  const GetTweets=async(currentUserId?:string)=>{
  
  const sqlQueryWithCurrUserId = `
  WITH tweet_likes AS (
    SELECT tweet_id, COUNT(id) AS like_count
    FROM "likes"
    GROUP BY tweet_id
  ),
  user_likes AS (
    SELECT tweet_id
    FROM "likes"
    WHERE user_id =$1  -- Replace 'USER_ID' with the actual ID of the current user
  )
  SELECT
    tweets.*,
    COALESCE(like_count, 0) AS like_count,
    CASE WHEN user_likes.tweet_id IS NOT NULL THEN true ELSE false END AS user_liked,
    profiles.username
  FROM
    tweets
  LEFT JOIN tweet_likes ON tweets.id = tweet_likes.tweet_id
  LEFT JOIN user_likes ON tweets.id = user_likes.tweet_id
  LEFT JOIN profiles ON tweets.profile_id = profiles.id
  ORDER BY
    tweets.created_at ASC;  

  `;
  
  const sqlQueryWithoutCurrUserId = `
  SELECT
  tweets.*,
  COALESCE(like_count, 0) AS like_count,
  profiles.username,
  profiles.full_name
FROM
  tweets
LEFT JOIN (
  SELECT
    tweet_id,
    COUNT(id) AS like_count
  FROM
    likes
  GROUP BY
    tweet_id
) AS like_info ON tweets.id = like_info.tweet_id
LEFT JOIN profiles ON tweets.profile_id = profiles.id
ORDER BY
  tweets.created_at DESC;

  `;
  let query=pool.query(sqlQueryWithoutCurrUserId)
  if(currentUserId){
    query=pool.query(sqlQueryWithCurrUserId, [currentUserId])
  }
  // Execute the query
  try{
    const res=await query

    return {data:res.rows}
  }
    catch(error){
      console.error('Error executing query:', error);
      return {error:"db querying failed"}
    };
  


    
  }

  export const getLikesCount=async(tweetId:string)=>{
    const supabaseServer=await getSupabaseClient()
    const res=await supabaseServer.from('likes')
    .select('id',{
      count:"exact"
    })
    .eq('tweet_id',tweetId)
    return res
  }

  export const isLiked=async({tweetId,userId}:{
    tweetId:string,
    userId?:string
  })=>{
    if(!userId) return false;
    const supabaseServer=await getSupabaseClient()
    const {data,error}=await supabaseServer.from('likes')
    .select('id')
    .eq('tweet_id',tweetId)
    .eq('user_id',userId)
    .single()
    return Boolean(data?.id)
  
  }

  