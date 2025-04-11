'use client'

// React Imports
import { useEffect, useRef } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import { styled, useColorScheme, useTheme } from '@mui/material/styles'

// Component Imports
import VerticalNav, { NavHeader, NavCollapseIcons, MenuItem } from '@menu/vertical-menu'
import VerticalMenu from './VerticalMenu'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

// Style Imports
import navigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import { Box, Button } from '@mui/material'
import { useAuth } from '@/@core/contexts/authContext'
import { useRouter } from 'next/navigation'
import useSingleSessionSSE from '@/@core/hooks/useSingleSessionSSE'

const StyledBoxForShadow = styled('div')(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(var(--mui-palette-background-paper) ${theme.direction === 'rtl' ? '95%' : '5%'}, rgb(var(--mui-palette-background-paperChannel) / 0.85) 30%, rgb(var(--mui-palette-background-paperChannel) / 0.5) 65%, rgb(var(--mui-palette-background-paperChannel) / 0.3) 75%, transparent)`,
  '&.scrolled': {
    opacity: 1
  }
}))

const StyledLogoutButtonContainer = styled(Box)(({ theme }) => ({
  // position: 'absolute',
   bottom: 10,
  width: '100%',
  padding: theme.spacing(2),
  color: ` var(--mui-palette-primary-contrastText)`,
  background: `linear-gradient(270deg, rgb(var(--mui-palette-primary-mainChannel) / 0.7) 0%, var(--mui-palette-primary-main) 100%) !important`,
  boxShadow: ` var(--mui-customShadows-primary-sm)`,
  borderTop: `1px solid ${theme.palette.divider}`,
  textAlign: 'left',
  display: "flex",
  borderRadius: ` var(--mui-shape-borderRadius)`,
  cursor: "pointer",
  paddingBlock: "8px",
  paddingInline: "12px",
  gap:"10px"
}))

const StyledLoggedInUserContainer = styled(Box)(({ theme }) => ({
  bottom: 10,
  width: '100%',
  padding: theme.spacing(2),
  color: ` var(--primary-color)`,
  // background: `linear-gradient(270deg, rgb(var(--mui-palette-primary-mainChannel) / 0.7) 0%, var(--mui-palette-primary-main) 100%) !important`,
  // boxShadow: ` var(--mui-customShadows-primary-sm)`,
  // borderTop: `1px solid ${theme.palette.divider}`,
  textAlign: 'left',
  display: "flex",
  flexDirection:"row",
  alignItems:"center",
  fontSize:"18px",
  // borderRadius: ` var(--mui-shape-borderRadius)`,
  // cursor: "pointer",
  paddingBlock: "8px",
  paddingInline: "12px",
  gap:"10px"
}))

const Navigation = props => {
  // states
  const { logout, user } = useAuth();
// console.log("user : ",)
  // Props
  const { mode, systemMode } = props

  // Hooks
  const verticalNavOptions = useVerticalNav()
  const { updateSettings, settings } = useSettings()
  const { mode: muiMode, systemMode: muiSystemMode } = useColorScheme()
  const theme = useTheme()
  const router = useRouter()
  // Refs
  const shadowRef = useRef(null)

  // Vars
  const { isCollapsed, isHovered, collapseVerticalNav, isBreakpointReached } = verticalNavOptions
  const isServer = typeof window === 'undefined'
  const isSemiDark = settings.semiDark
  let isDark

  if (isServer) {
    isDark = mode === 'system' ? systemMode === 'dark' : mode === 'dark'
  } else {
    isDark = muiMode === 'system' ? muiSystemMode === 'dark' : muiMode === 'dark'
  }

  const scrollMenu = (container, isPerfectScrollbar) => {
    container = isBreakpointReached || !isPerfectScrollbar ? container.target : container

    if (shadowRef && container.scrollTop > 0) {
      // @ts-ignore
      if (!shadowRef.current.classList.contains('scrolled')) {
        // @ts-ignore
        shadowRef.current.classList.add('scrolled')
      }
    } else {
      // @ts-ignore
      shadowRef.current.classList.remove('scrolled')
    }
  }

  useEffect(() => {
    if (settings.layout === 'collapsed') {
      collapseVerticalNav(true)
    } else {
      collapseVerticalNav(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.layout])

  const handleUserLogout = async () => {
    // Redirect to login page
    // logout();
    router.push('/logout')
  }

  // useEffect(() => {
  //   if (user?.transactionID) {
  //     useSingleSessionSSE(user?.transactionID);
  //   }
  // }, [user])

  return (
    // eslint-disable-next-line lines-around-comment
    // Sidebar Vertical Menu
    <VerticalNav
      customStyles={navigationCustomStyles(verticalNavOptions, theme)}
      collapsedWidth={71}
      backgroundColor='var(--mui-palette-background-paper)'
      // eslint-disable-next-line lines-around-comment
      // The following condition adds the data-mui-color-scheme='dark' attribute to the VerticalNav component
      // when semiDark is enabled and the mode or systemMode is light
      {...(isSemiDark &&
        !isDark && {
        'data-mui-color-scheme': 'dark'
      })}
    >
      <NavHeader>
        <Link href='/'>
        {!(isCollapsed && !isHovered) ? (
            <>
               <Logo color={'primary'} isSmall={false}  width="25mm"/>
            </>
          ) : (
            <Logo color={'primary'} isSmall={true}/>
          )}
         
        </Link>
        {!(isCollapsed && !isHovered) && (
          <NavCollapseIcons
            lockedIcon={<i className='tabler-circle-dot text-xl' />}
            unlockedIcon={<i className='tabler-circle text-xl' />}
            closeIcon={<i className='tabler-x text-xl' />}
            onClick={() => updateSettings({ layout: !isCollapsed ? 'collapsed' : 'vertical' })}
          />
        )}
      </NavHeader>
      <StyledBoxForShadow ref={shadowRef} />
      <VerticalMenu scrollMenu={scrollMenu} />
      <div className='p-3'>
      <StyledLoggedInUserContainer>
      {!(isCollapsed && !isHovered) ? (
            <>
              <i className='text-primary text-xl tabler-user-square-rounded' />
              {user?.useremail}
            </>
          ) : (
            <i className='text-primary text-xl tabler-user-square-rounded' />
          )}
      </StyledLoggedInUserContainer>
      </div>
      <div className='p-3'>
        <StyledLogoutButtonContainer onClick={ handleUserLogout} >
          {!(isCollapsed && !isHovered) ? (
            <>
              <i className='tabler-logout-2' />
              Logout
            </>
          ) : (
            <i className='tabler-logout-2' />
          )}
        </StyledLogoutButtonContainer>
      </div>
    </VerticalNav>
  )
}

export default Navigation
