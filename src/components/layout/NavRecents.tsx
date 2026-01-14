import { type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type RecentItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export function NavRecents({ recentItems }: { recentItems: RecentItem[] }) {
  if (recentItems.length === 0) {
    return null;
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Courses</SidebarGroupLabel>

      <SidebarMenu>
        {recentItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive ? "font-medium text-black" : "text-muted-foreground"
                }
              >
                <item.icon />
                <span>{item.name}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
