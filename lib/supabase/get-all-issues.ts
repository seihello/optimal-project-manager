import createClient from "@/lib/supabase/client";
import { Issue } from "../types/issue.type";

export default async function getAllIssues(userId: string): Promise<Issue[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("issues")
      .select("*")
      .eq("author", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
