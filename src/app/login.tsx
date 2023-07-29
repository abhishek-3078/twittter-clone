'use client'
import { Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";

import { createClientComponentClient ,SupabaseClient, User} from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'

import type { Database } from '@/lib/supabase.types'

export default function Login() {
  const [email, setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading,setLoading]=useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    supabase.auth.getSession().then((res) => {
      if (!res.data.session) {
        setIsOpen(true);
        return;
      }
      console.log(res)
      setUser(res.data.session.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   })
  //   router.refresh()
  // }

  const handleSignIn = async () => {
    // await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // })
    setLoading(true)
    const {data:d,error:e}=await supabase.from("profiles").select().eq('username',username.trim())
    // if(d && d?.length>0){
    //   console.log(d)
    //   alert("username already exist")
    //   return

    // }
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        data:{
          username
        }
      },
    })
    setLoading(false)
  
    // router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <>


<Dialog defaultOpen open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="bg-black p-6">
    <div>
      <div>
      <input name="email" placeholder="enter email" 
      className="block mt-3 p-2 bg-transparent focus:outline-none placeholder:text-xl border-b-white border-b-2"onChange={(e) => setEmail(e.target.value)} value={email} />
      <input
        type="text"
        name="username"placeholder="enter username" 
        className="block mt-3 p-2 bg-transparent focus:outline-none placeholder:text-xl border-b-white border-b-2"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      {/* <button onClick={handleSignUp} className="bg-primary p-3 m-2 rounded-xl ">Sign up</button> */}
      <button onClick={handleSignIn} className="bg-primary p-3 m-2 rounded-xl" disabled={loading}>Sign in with Otp</button>
      <button onClick={handleSignOut} className="bg-primary p-3 m-2 rounded-xl">Sign out</button>
      </div>
      </div>
    </DialogContent>
  </Dialog>
    
    </>
  )
}