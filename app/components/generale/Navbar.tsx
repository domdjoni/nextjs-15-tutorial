
import { prisma } from '@/app/utils/db'
import { Button, buttonVariants } from '@/components/ui/button'
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {

     const {getUser} = getKindeServerSession()

     const user = await getUser()





  return (
    <nav className='py-5 flex items-center justify-between'>
        <div className='flex items-center gap-6'>
       <Link href="/">
       
            <h1 className='text-3xl font-semibold'>Blog<span className='text-blue-500'>Marshal</span></h1>

       
       
       </Link>
       <div className='hidden sm:flex items-center gap-6'>
            <Link className='text-sm font-medium hover:text-blue-500 transition-colors' href="/">Home</Link>
            <Link className='text-sm font-medium hover:text-blue-500 transition-colors' href="/dashboard">Dashboard</Link>

       </div>
       </div>

      {
          user ? (
               <div className='flex items-center gap-4'>
                    {user.given_name}
                    <LogoutLink className={buttonVariants({variant:'secondary'})}>Logout</LogoutLink>
               </div>
          ) :(
               <div className='flex items-center gap-4'>
                    <LoginLink className={buttonVariants()}>Login</LoginLink>
                    <RegisterLink className={buttonVariants({variant:"secondary"})}>Sign Up</RegisterLink>

               </div>
          )
      }

    </nav>
  )
}

export default Navbar