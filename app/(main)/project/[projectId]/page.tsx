import Link from 'next/link';
import Image from 'next/image';
import ObjectID from 'bson-objectid';
import { notFound } from 'next/navigation';
import { Github, Globe } from 'lucide-react';

import db from '@/lib/db';
import Modal from '@/components/ui/modal';
import { Separator } from '@/components/ui/separator';
import ProjectHeader from '@/components/project-header';
import ProjectOwner from '@/components/project-owner';

export default async function ProjectPage({
  params
}: {
  params: { projectId: string };
}) {
  const isValidId = ObjectID.isValid(params.projectId);

  if (!isValidId) {
    notFound();
  }

  const project = await db.project.findUnique({
    where: {
      id: params.projectId
    }
  });

  if (!project) {
    notFound();
  }

  return (
    <Modal>
      <div className='w-full relative pb-[70px]'>
        <ProjectHeader userId={project.userId} title={project.title} />
        <div className='flex justify-center px-8 lg:px-[120px]'>
          <div className='flex flex-col relative max-w-5xl'>
            <Image
              src={project.image}
              alt={project.title}
              width={1024}
              height={768}
              priority
              className='my-7 rounded-md'
            />
            <p className='font-medium text-lg my-8'>{project.description}</p>
            <div className='flex justify-start gap-2 h-5'>
              <div className='inline-flex items-center gap-2'>
                <Github className='w-5 h-5' />
                <Link
                  href={project.githubUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline underline-offset-4 text-sm font-medium'
                >
                  GitHub repo
                </Link>
              </div>
              <Separator orientation='vertical' className='mx-2 w-[2px]' />
              <div className='inline-flex items-center gap-2'>
                <Globe className='w-5 h-5' />
                <Link
                  href={project.githubUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline underline-offset-4 text-sm font-medium'
                >
                  Live site
                </Link>
              </div>
            </div>
            <ProjectOwner userId={project.userId} />
          </div>
        </div>
      </div>
    </Modal>
  );
}