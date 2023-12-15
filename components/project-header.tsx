'use client';

import Link from 'next/link';
import { useIntersectionObserver } from '@uidotdev/usehooks';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useClerkUser from '@/hooks/use-clerk-user';
import { Skeleton } from '@/components/ui/skeleton';
import { BookmarkIcon, HeartIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProjectHeaderProps {
  userId: string;
  title: string;
}

export default function ProjectHeader({ userId, title }: ProjectHeaderProps) {
  const { user, isLoading } = useClerkUser({ userId });

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px'
  });

  return (
    <>
      <div ref={ref} className='flex justify-center'>
        <h1 className='w-full max-w-5xl text-start text-2xl font-semibold mb-[10px] pt-16'>
          {title}
        </h1>
      </div>
      <div
        className={cn(
          'sticky top-0 z-10 flex justify-center',
          entry !== null && entry.intersectionRect.top === 0 && 'border-b'
        )}
      >
        <div className='w-full max-w-5xl flex justify-between items-center pt-[14px] pb-[10px] bg-white'>
          <div className='flex items-center gap-3'>
            {isLoading && <Skeleton className='w-12 h-12 rounded-full' />}
            {!isLoading && user && (
              <Avatar className='h-12 w-12 hover:cursor-pointer'>
                <AvatarImage src={user.imageUrl} alt='avatar' />
                <AvatarFallback>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className='flex flex-col gap-1'>
              {isLoading && (
                <>
                  <Skeleton className='w-28 h-4' />
                  <div className='flex gap-[10px] items-center'>
                    <Skeleton className='w-28 h-3' />
                    <Skeleton className='w-10 h-3' />
                  </div>
                </>
              )}
              {!isLoading && user && (
                <>
                  <Link href='/' className='font-semibold text-sm'>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </Link>
                  <div className='flex gap-[10px] items-center'>
                    <div className='flex items-center'>
                      <span className='relative flex justify-center items-center h-3 w-3 mr-1'>
                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75'></span>
                        <span className='relative inline-flex rounded-full h-2 w-2 bg-green-600'></span>
                      </span>
                      <p className='text-green-600 text-xs font-medium'>
                        Available for work
                      </p>
                    </div>
                    <p className='text-xs font-medium text-muted-foreground hover:cursor-pointer hover:font-semibold'>
                      Follow
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full w-10 h-10'
            >
              <HeartIcon size={16} />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full w-10 h-10'
            >
              <BookmarkIcon size={16} />
            </Button>
            <Button className='rounded-full h-10'>Get in touch</Button>
          </div>
        </div>
      </div>
    </>
  );
}