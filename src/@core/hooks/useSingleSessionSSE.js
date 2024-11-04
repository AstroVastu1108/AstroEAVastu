'use client'

import { useEffect } from 'react'

const useSingleSessionSSE = userId => {
 
    useEffect(() => {
        if (!userId) return;

        const eventSource = new EventSource(`/api/session-notification/sse?userId=${userId}`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.action === "logout") {
                // Logout the user immediately
                alert("You have been logged out due to another login.");
                eventSource.close();

                // Clear session data and redirect to login
                localStorage.removeItem("sessionToken");
                // router.push("/login");
                window.location.href = "/login";
            }
        };

        // Clean up the SSE connection when component unmounts
        return () => {
            eventSource.close();
        };
    }, [userId]);
}

export default useSingleSessionSSE
