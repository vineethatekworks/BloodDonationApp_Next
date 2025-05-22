import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/utils/Jwt/JwtUtils";
import { JWTPayload } from "jose";
import { API_PATH_PERMISSION } from "./utils/paths/ApiPathPermission";





export default async function middleware(request: NextRequest) {
  // Middleware logic goes here
  try{
    const method = request.method;
    const pathname = request.nextUrl.pathname;

    const headers = request.headers.get("Authorization")||"";
    if(!headers){
      // return new Response("Authorization header is missing", { status: 401 });
      return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
    }

    const token = headers.slice(7); // Remove "Bearer " prefix
    if (!token) {
      return NextResponse.json({ message: "Token is missing" }, { status: 401 });
    }

    const payload: JWTPayload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ message: "Invalid token or expired" }, { status: 401 });
    }

    const userRole = payload.role as string;
    const methodPaths: Record<string, string[]> = API_PATH_PERMISSION[method];
   if (methodPaths) {
      const matchedPath = Object.keys(methodPaths).find((routePattern) =>
        routePattern === pathname || matchRoute(routePattern, pathname)
      );

      if (matchedPath) {
        const allowedRoles = methodPaths[matchedPath];
        if (!allowedRoles.includes(userRole)) {
          return NextResponse.json(
            { error: "User does not have permission for this route" },
            { status: 403 }
          );
        }
      }
    }

    const user_id = payload.user_id as string;
    const response = NextResponse.next();
    response.headers.set("x-user-id", user_id);
    response.headers.set("x-user-role", userRole);

    return response;
    
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });    
  }
}

function matchRoute(route: string, pathname: string): boolean {
  const routePattern = route.split("/").filter(Boolean);
  const pathPattern = pathname.split("/").filter(Boolean);

  if (routePattern.length !== pathPattern.length) return false;

  for (let i = 0; i < routePattern.length; i++) {

    if (routePattern[i].startsWith(":")) continue;
    if (routePattern[i] !== pathPattern[i]) return false;
  }
  return true;
}

export const config = {
    matcher: [
      "/api/teacher/:path*",
      "/api/admin/:path*",
      "/api/student/:path*",
      "/api/user/:path((?!login|register).*)"
      
    ],
  };
  