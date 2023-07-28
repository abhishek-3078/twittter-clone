"use client"
import React , {useState} from 'react'

import { Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from "@/components/ui/Dialog";
  import { Input } from "@/components/ui/Input";
    

const AuthModel = () => {

  const [isOpen,setIsOpen]=useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <Input/>
    </DialogContent>
  </Dialog>
  )
}

export default AuthModel