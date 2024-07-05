/**
 * Accepts all public routes
 * This routes which are not protected by Auth
 * @type {string[]}
 */
export const publicRoutes = ["/"];
/**
 * Accepts all Auth routes
 * This routes are used to login or register users and are
 *  never been protected by Auth but required to be redirected with session exists
 * @type {string[]}
 */
export const authRoutes = ["/login", "/signup", "/error"];
/**
 * Thsi is not protected by Auth
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
