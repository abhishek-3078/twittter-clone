import React from 'react'
import {BiHomeCircle,BiUser} from 'react-icons/bi'
import {BsBell,BsBookmark, BsThreeDots, BsTwitter,BsEnvelope as HiEnvelope} from 'react-icons/bs'
import {HiOutlineHashtag} from 'react-icons/hi'
import Link from 'next/link'

const NAVIGATION_ITEMS=[{
  title:"Twitter",
  icon:BsTwitter
},{
  title:"Home",
  icon:BiHomeCircle
},{
  title:"Explore",
  icon:HiOutlineHashtag
},
{
  title:"Notifications",
  icon:BsBell
},{
  title:"Messages",
  icon:HiEnvelope
},{
  title:"Bookmarks",
  icon:BsBookmark
},{
  title:"Profile",
  icon:BiUser
}]
const LeftSideBar = () => {
  return (
    <section className='sticky top-0 lg:w-[275px] w-[60px] flex-col h-screen  items-stretch px-2 lg:p-4 '>
    <div className="flex flex-col  items-center lg:items-start h-full space-y-2 mt-4  ">
    {
      NAVIGATION_ITEMS.map((item)=>(
        <Link className="hover:bg-white/10 flex items-center text-xl justify-start w-fit transition duration-200 space-x-2 rounded-3xl py-2 lg:px-6" key={item.title} href={`${item.title.toLowerCase()}` }>
<div><item.icon size={'26px'}/></div>
{item.title!=='Twitter' && <div className="hidden lg:flex">{item.title}</div>}

        </Link>
      ))
    }
  <button className='w-full rounded-full lg:text-xl text-center lg:p-3 bg-primary text-xs p-1 hover:bg-opacity-70 transition duration-300'
>Tweet</button>
</div>
  <button className="rounded-full bg-transparent flex items-center space-x-2 w-full justify-between hover:bg-white/10 p-4">
    <div className='flex items-center space-x-2'>
    <div className="rounded-full bg-slate-400 h-10 w-10"></div>
    <div className='text-left' >
    <div className='text-sm font-semibold'>Abhishek</div>
    <div className='text-xs'>@abhi786</div>
    </div>
    </div>
    <div><BsThreeDots/></div>

  </button>
  </section>
  )
}

export default LeftSideBar