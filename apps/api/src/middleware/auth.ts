import { clerkMiddleware, requireAuth, getAuth } from "@clerk/express";
import type { Request, Response, NextFunction, RequestHandler } from "express";

// Global Clerk middleware — attach to all routes (per D-17)
export const clerkAuth: RequestHandler = clerkMiddleware();

// Protected route middleware — any authenticated user
export { requireAuth };

// Admin route middleware — requires admin role (per D-16, AUTH-03)
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth(req);
  if (!auth?.userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const role = (auth.sessionClaims?.metadata as { role?: string })?.role;
  if (role !== "admin") {
    res.status(403).json({ error: "Forbidden: admin role required" });
    return;
  }
  next();
}

// Helper to extract userId from request (returns null for unauthenticated)
export function getOptionalUserId(req: Request): string | null {
  const auth = getAuth(req);
  return auth?.userId ?? null;
}
