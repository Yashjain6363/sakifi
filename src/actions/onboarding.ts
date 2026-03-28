"use server";

import { onboardingSchema } from "@/lib/onboarding-schema";
import { createClient } from "@/lib/supabase/server";
import { safeError, safeSuccess } from "@/lib/security";

export async function saveOnboardingProfile(
  data: unknown
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return safeError("Please sign in again to continue.");
    }

    const parsed = onboardingSchema.safeParse(data);
    if (!parsed.success) {
      return safeError(
        parsed.error.errors[0]?.message ?? "Please check your answers and try again."
      );
    }

    const payload = parsed.data;
    const row = {
      id: user.id,
      email: user.email ?? null,
      gender: payload.gender,
      onboarding: payload as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("profiles").upsert(row, {
      onConflict: "id",
    });

    if (error) {
      console.error("[onboarding] profiles upsert", error.message);
      return safeError(
        "Could not save your profile. Create the `profiles` table in Supabase (see supabase/profiles.sql) and try again."
      );
    }

    return safeSuccess("Your preferences are saved. Sakhi will use them to personalize guidance.");
  } catch (e) {
    return safeError("Something went wrong. Please try again.", e);
  }
}
