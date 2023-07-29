"use client"

import { PostgrestError } from '@supabase/supabase-js';
import React ,{useRef} from 'react'
import { Toaster,toast } from 'sonner';
type FormClientComponentProps={
  
action(formData: FormData): Promise<{
  err: {
      message: string;
  };
  data?: undefined;
  error?: undefined;
} | {
  data: null;
  error: PostgrestError | null;
  err?: undefined;
}>
}

const FormClientComponent = ({action}:FormClientComponentProps) => {

  const handleSubmit=async(data:any)=>{
    try{
      const res=await action(data)
      console.log(res)
      if(res?.err){
        return toast.error(res.err.message)
      }
      toast.success("Tweet sent successfully")
      resetRef.current?.click()

    }catch(e){
      console.log(e)
    }
  }
  const resetRef=useRef<HTMLButtonElement>(null)
  return (
    <div className="border-t-[0.5px] border-b-[0.5px] border-gray-500 h-32 relative flex items-stretch   p-4 space-x-2 ">
      <Toaster/>
    <div className="w-10 h-10 rounded-full bg-slate-500 flex-none"></div>
    <form action={handleSubmit} className="flex flex-col w-full h-full ">
   
      <input type="text" placeholder="What's happening?" 
      name="tweet" className="w-full h-full bg-transparent outline-none border-none placeholder:text-2xl placeholder:text-grey-600 "></input>
    
    <div className="w-full justify-between items-center flex">
    <div></div>
    <div className="w-full max-w-[100px]">
    <button type="submit" className='w-full rounded-full text-2sm font-bold text-center px-4 py-2 bg-primary hover:bg-opacity-70 transition duration-300'
>Tweet</button>
<button ref={resetRef} type='reset'></button>
    </div>
    </div>

    </form>

</div>
  )
}

export default FormClientComponent