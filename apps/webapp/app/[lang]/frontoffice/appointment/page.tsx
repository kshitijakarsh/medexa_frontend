"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AppointmentPage from "../../appointment/page";

// Wrapper component that intercepts navigation to ensure frontoffice routes
export default function FrontofficeAppointmentPage() {
    const router = useRouter();
    const pathname = usePathname();

    // Override the router.push method to redirect /appointment/book to /frontoffice/appointment/book
    useEffect(() => {
        const originalPush = router.push;

        // @ts-ignore - We're monkey-patching the router
        router.push = (href: string, options?: any) => {
            // If navigation is to /appointment/book, redirect to /frontoffice/appointment/book
            if (typeof href === 'string' && href.includes('/appointment/book')) {
                const modifiedHref = href.replace('/appointment/book', '/frontoffice/appointment/book');
                return originalPush(modifiedHref, options);
            }
            return originalPush(href, options);
        };

        // Cleanup
        return () => {
            // @ts-ignore
            router.push = originalPush;
        };
    }, [router]);

    return <AppointmentPage />;
}
