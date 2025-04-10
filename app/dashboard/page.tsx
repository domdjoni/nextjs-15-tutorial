
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { prisma } from '../utils/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import BlogpostCard from '../components/generale/BlogpostCard'
import { resolve } from 'path'


async function getData(userId: string) {

  await new Promise((resolve) => setTimeout(resolve, 4000));
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return data;
}

const page = async () => {

  const {getUser} = getKindeServerSession()
  const user = await getUser()

  const data = await getData(user?.id)


 
  return (
    <div>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-medium'>Your Blog articles</h2>

          <Link className={buttonVariants()} href="/dashboard/create">
            Create Post
          </Link>


        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

          { 
            data.map((item) => (
             <BlogpostCard data={item} key={item.id} />
            ))
          }

        </div>
    </div>

  )
}

export default page