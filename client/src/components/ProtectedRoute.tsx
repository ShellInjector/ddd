import { useAuth } from "@/hooks/use-auth";
import { Redirect, Route } from "wouter";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { queryClient } from "@/lib/queryClient";

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

export function ProtectedRoute({ path, component: Component }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // Force refresh user data when accessing protected route
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["/api/user"] });
  }, []);

  return (
    <Route path={path}>
      {(params) => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }

        if (!user) {
          return <Redirect to="/login" />;
        }

        return <Component {...params} />;
      }}
    </Route>
  );
}