import { ChevronRight, type LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { isActiveRoute } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const parentActive = isActiveRoute(location.pathname, item.url);

          const childActive =
            item.items?.some((sub) =>
              isActiveRoute(location.pathname, sub.url)
            ) ?? false;

          const open = parentActive || childActive;

          return (
            <Collapsible key={item.title} asChild defaultOpen={open}>
              <SidebarMenuItem>
                {/* Parent */}
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  data-active={parentActive}
                  className="rounded-md data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                >
                  <NavLink to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>

                {/* Children */}
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const subActive = isActiveRoute(
                            location.pathname,
                            subItem.url
                          );

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                data-active={subActive}
                                className="data-[active=true]:bg-muted data-[active=true]:font-medium"
                              >
                                <NavLink to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
