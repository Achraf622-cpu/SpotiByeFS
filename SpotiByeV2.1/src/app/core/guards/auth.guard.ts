import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    // For Exam Demo: Logic to check if user is logged in
    // In a real app, this would check a AuthService or LocalStorage token
    const isLoggedIn = true; // Always true for this demo to show functionality without blocking

    if (isLoggedIn) {
        console.log('🛡️ [AuthGuard] Access granted to:', state.url);
        return true;
    } else {
        console.warn('⛔ [AuthGuard] Access denied!');
        // router.navigate(['/login']);
        return false;
    }
};
