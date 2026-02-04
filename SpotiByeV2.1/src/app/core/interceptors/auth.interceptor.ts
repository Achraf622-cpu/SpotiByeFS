import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // For Exam Demo: Intercepting request to add Authorization header
    console.log(`🌐 [AuthInterceptor] Intercepting request to: ${req.url}`);

    const authToken = 'DEMO_EXAM_TOKEN_123'; // Dummy token

    // Clone the request and add the authorization header
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return next(authReq);
};
