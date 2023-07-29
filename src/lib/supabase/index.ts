'use server'
import { SupabaseClient,createClient} from "@supabase/supabase-js";


const supabaseSecret=process.env.SUPABASE_SECRET_KEY
const supabaseURL=process.env.NEXT_PUBLIC_SUPABASE_URL

// export const supabaseServer=new SupabaseClient(supabaseURL as string,supabaseSecret as string)

let supabase: SupabaseClient | null = null;

export async function getSupabaseClient(): Promise<SupabaseClient> {
  
    if (!supabase) {
    
        supabase = createClient(supabaseURL as string, supabaseSecret as string,{
            auth:{
                persistSession:true
            }
        });
      }
    
    return supabase;
  }
