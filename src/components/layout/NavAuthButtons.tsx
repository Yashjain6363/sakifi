"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Loader2, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  mobile?: boolean;
  /** Close mobile menu when a link is pressed */
  onClickLink?: () => void;
};

export function NavAuthButtons({ className, mobile, onClickLink }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setReady(true);
      return;
    }

    let cancelled = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) {
        setSignedIn(!!data.session);
        setReady(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    setSigningOut(true);
    try {
      await fetch(`${window.location.origin}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
      setSignedIn(false);
      router.refresh();
      router.push("/");
    } finally {
      setSigningOut(false);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <Loader2 className="w-4 h-4 animate-spin text-white/40" aria-hidden />
        </span>
      </div>
    );
  }

  if (signedIn) {
    return (
      <div
        className={cn(
          mobile ? "flex flex-col gap-2 pt-2" : "flex items-center gap-2",
          className
        )}
      >
        <Button
          asChild
          variant={mobile ? "default" : "outline"}
          size={mobile ? "lg" : "sm"}
          className={mobile ? "w-full justify-center" : "text-white/85"}
        >
          <Link href="/dashboard" onClick={onClickLink}>
            <LayoutDashboard className="w-4 h-4 mr-1.5" aria-hidden />
            Dashboard
          </Link>
        </Button>
        <Button
          type="button"
          variant={mobile ? "outline" : "ghost"}
          size={mobile ? "lg" : "sm"}
          className={mobile ? "w-full" : "text-white/70"}
          disabled={signingOut}
          onClick={() => void signOut()}
        >
          {signingOut ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
          ) : (
            <>
              <LogOut className="w-4 h-4 mr-1.5" aria-hidden />
              Sign out
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        mobile ? "flex flex-col gap-2 pt-4" : "flex items-center gap-2",
        className
      )}
    >
      <Button asChild variant="ghost" size={mobile ? "lg" : "sm"} className="text-white/70">
        <Link href="/signup" className={mobile ? "w-full" : ""} onClick={onClickLink}>
          Sign up
        </Link>
      </Button>
      <Button asChild size={mobile ? "lg" : "sm"} className={mobile ? "w-full" : ""}>
        <Link href="/login" onClick={onClickLink}>
          Log in
          <LogIn className="w-3.5 h-3.5 ml-1.5" aria-hidden />
        </Link>
      </Button>
    </div>
  );
}
