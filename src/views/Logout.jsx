'use client';
import { useAuth } from '@/@core/contexts/authContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    // Perform the logout operation
    logout();

    // Redirect to login after logout is performed
    router.push('/login');
  }, []);

  return null; // You can return null or a loading indicator
}

export default Logout;
