"use client";

import NotificationBell from "./NotificationBell";
import AuthButtons from "./AuthButtons";
import HeaderDashboardItems from "./HeaderDashboardItems";
import { useAuthSession } from "../providers/AuthContext";

export default function HeaderClient() {
  const session = useAuthSession();

  return (
    <div className="flex items-center gap-4">
      <HeaderDashboardItems />
      {session?.user ?
        <NotificationBell /> : null}
      <AuthButtons />
    </div>
  );
}
