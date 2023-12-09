'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';

export default function ProfileMenu() {
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='hidden lg:flex'>
        <HoverCard openDelay={300}>
          <HoverCardTrigger>
            {(!isLoaded || !user) && (
              <Skeleton className='rounded-full h-12 w-12' />
            )}
            {isLoaded && user && (
              <Avatar className='h-12 w-12 hover:cursor-pointer'>
                <AvatarImage src={user.imageUrl} alt='avatar' />
                <AvatarFallback>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
          </HoverCardTrigger>
          <HoverCardContent
            collisionPadding={40}
            sideOffset={30}
            className='rounded-2xl shadow-sm border-[#f3f3f4] p-8 w-[320px]'
          >
            <div className='flex flex-col'>
              <Link
                href='/'
                className='flex flex-col justify-center items-center mb-5'
              >
                {(!isLoaded || !user) && (
                  <>
                    <Skeleton className='rounded-full h-20 w-20' />
                    <Skeleton className='mt-4 h-6 w-40' />
                  </>
                )}
                {isLoaded && user && (
                  <>
                    <Avatar className='h-20 w-20 hover:cursor-pointer'>
                      <AvatarImage src={user.imageUrl} alt='avatar' />
                      <AvatarFallback>
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className='mt-4 font-medium'>
                      {user.firstName} {user.lastName}
                    </p>
                  </>
                )}
              </Link>
              <Link
                href='/'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Upload design work
              </Link>
              <Link
                href='/'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Work preferences
              </Link>
              <Link
                href='/'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Settings
              </Link>
              <Separator className='my-3' />
              <SignOutButton>
                <button className='text-[15px] pt-2 text-left hover:opacity-80 transition-opacity ease-in-out duration-200'>
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className='block lg:hidden'>
        {(!isLoaded || !user) && (
          <Skeleton className='rounded-full h-[38px] w-[38px]' />
        )}
        {isLoaded && user && (
          <Avatar
            onClick={() => setOpen((prevState) => !prevState)}
            className='h-[38px] w-[38px] hover:cursor-pointer'
          >
            <AvatarImage src={user.imageUrl} alt='avatar' />
            <AvatarFallback>
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          onClick={() => setOpen((prevState) => !prevState)}
          className={cn(
            'before:content-[""] before:fixed before:z-10 before:top-[100px] before:left-0 before:w-screen before:h-screen before:bg-black/50 transition-opacity ease-in-out duration-300',
            open ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          className={cn(
            'fixed top-[100px] w-full right-0 z-20 transition-opacity ease-in-out duration-300',
            open ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className='relative z-10 box-border max-h-[calc(100vh_-_100px)] p-8 overflow-y-scroll border-t border-gray-200 bg-white shadow-lg'>
            <div className='flex flex-col'>
              <Link
                href='/'
                className='flex flex-col justify-center items-center mb-5'
              >
                {(!isLoaded || !user) && (
                  <>
                    <Skeleton className='rounded-full h-20 w-20' />
                    <Skeleton className='mt-4 h-6 w-40' />
                  </>
                )}
                {isLoaded && user && (
                  <>
                    <Avatar className='h-20 w-20 hover:cursor-pointer'>
                      <AvatarImage src={user.imageUrl} alt='avatar' />
                      <AvatarFallback>
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className='mt-4 font-medium text-[15px]'>
                      {user.firstName} {user.lastName}
                    </p>
                  </>
                )}
              </Link>
              <Link
                href='/'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Upload design work
              </Link>
              <Link
                href='/'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Work preferences
              </Link>
              <Link
                href='/'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Settings
              </Link>
              <Separator className='my-3' />
              {(!isLoaded || !user) && (
                <>
                  <Skeleton className='h-5 mt-3 w-20' />
                </>
              )}
              {isLoaded && user && (
                <SignOutButton>
                  <button className='text-[15px] pt-2 text-left hover:opacity-80 transition-opacity ease-in-out duration-200'>
                    Sign out
                  </button>
                </SignOutButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}