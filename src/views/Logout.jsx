'use client'
import { useAuth } from '@/@core/contexts/authContext'
import React from 'react'

import { useRouter } from 'next/navigation'
function Logout() {
    
  const router = useRouter()
    const { logout } = useAuth();
    logout();
  return router.push('/login');
}

export default Logout