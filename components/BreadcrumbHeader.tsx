"use client"

import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from './ui/breadcrumb'
import { usePathname } from 'next/navigation';
import { MobileSidebar } from './Sidebar';

export default function BreadcrumbHeader() {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(path => path !== '');
    return (
    <div className="flex items-center flex-start">
      <MobileSidebar/>
      <Breadcrumb>
      <BreadcrumbList>
      { paths.length > 0 ? paths.map((path, index) => (
        <React.Fragment key={index}>
        <BreadcrumbItem key={index}>
          <BreadcrumbLink className='capitalize' href={`/${path}`}>
            {path}
          </BreadcrumbLink>
        </BreadcrumbItem>
        </React.Fragment>
      )): <BreadcrumbItem>
        <BreadcrumbLink className='capitalize' href={`/`}>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>}
      </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
