import { redirect } from "next/navigation";

export default function TwoDPage() {
  // This page redirects back to home which now handles both 2D and 3D modes
  redirect("/");
}
