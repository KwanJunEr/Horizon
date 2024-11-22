"use client";
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Sidebar = ({user}: SiderbarProps) => {
  const pathName = usePathname();
  return (
   <section className='sidebar'>
    <nav className='flex flex-col gap-4'>
        <Link href ="/"
        className='mb-12 cursor-pointer items-center gap-2'>
            <Image 
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt='Horizon Logo'
            className='size-[24] max-xl:size-14'
            />
            <h1 className='sidebar-logo'>Horizon</h1>
        </Link>
        {sidebarLinks.map((item)=>{
            const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
            return(
                <Link href={item.route}
                key={item.label}
                className={cn('sidebar-link',{
                    'bg-bank-gradient' : isActive //conditional class
                })}
                >
                    {item.label}
                </Link>

            )
        })}
    </nav>
   </section>
  )
}

export default Sidebar
