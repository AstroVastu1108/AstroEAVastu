'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <div className='flex gap-x-2'>
        <Link href='#' className='text-primary'>
          AstroVastu.net
        </Link>
        <i className='tabler-git-merge'></i>
        <span>Version 24.K29</span>
        <i className='tabler-minus-vertical'></i>
        <span>Powered by</span>
        <Link href='#' className='text-primary'>
          MAYCOMS Software
        </Link>
      </div>
      <div className='flex gap-x-2'>
        <span className='text-textSecondary'>{`© ${new Date().getFullYear()} Elephant Astrology. All rights reserved. `}</span>
      </div>
      {!isBreakpointReached && (""
        // <div className='flex items-center gap-4'>
        //   <Link href='https://themeforest.net/licenses/standard' target='_blank' className='text-primary'>
        //     License
        //   </Link>
        //   <Link href='https://themeforest.net/user/pixinvent/portfolio' target='_blank' className='text-primary'>
        //     More Themes
        //   </Link>
        //   <Link
        //     href='https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation'
        //     target='_blank'
        //     className='text-primary'
        //   >
        //     Documentation
        //   </Link>
        //   <Link href='https://pixinvent.ticksy.com' target='_blank' className='text-primary'>
        //     Support
        //   </Link>
        // </div>
      )}
    </div>
  )
}

export default FooterContent
