'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import useVerticalNav from '@/@menu/hooks/useVerticalNav'
import LayoutNavbar from '@layouts/components/vertical/Navbar'

const NavbarContent = () => {
  const { isBreakpointReached } = useVerticalNav()
  return (
    <>
      {isBreakpointReached &&

        <LayoutNavbar>
          <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full bg-[#f5f5f5]')}>
            <div className='flex items-center gap-4'>
              <NavToggle />
              {/* <ModeDropdown /> */}
            </div>
            <div className='flex items-center'>
              <UserDropdown />
            </div>
          </div>
        </LayoutNavbar>
      }
    </>
  )
}

export default NavbarContent
