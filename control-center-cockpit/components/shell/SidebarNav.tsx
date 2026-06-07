"use client";

import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  Archive,
  ChevronRight,
  ClipboardList,
  Cpu,
  FileText,
  Layers,
  Lock,
  Map,
  Palette,
  Settings,
  Shield,
  Zap,
} from "lucide-react";

export type NavItemId =
  | "today"
  | "lanes"
  | "blockers"
  | "evidence"
  | "permissions"
  | "settings";

interface NavItem {
  id: NavItemId;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number | string;
  badgeVariant?: "warn" | "blocked" | "ok" | "info";
}

const primaryNav: NavItem[] = [
  { id: "today", label: "Today", icon: Activity },
  { id: "lanes", label: "Lanes", icon: Layers },
  { id: "blockers", label: "Blockers", icon: AlertTriangle, badge: 4, badgeVariant: "blocked" },
  { id: "evidence", label: "Evidence / Archive", icon: Archive },
  { id: "permissions", label: "Permissions", icon: Shield, badge: 1, badgeVariant: "warn" },
  { id: "settings", label: "Settings", icon: Settings },
];

// Lane shortcuts (secondary group)
const laneShortcuts = [
  { id: "products", label: "Products", icon: ClipboardList },
  { id: "theory-doctrine", label: "Theory / Doctrine", icon: FileText },
  { id: "design-territory", label: "Design / Territory", icon: Palette },
  { id: "public-surfaces", label: "Public Surfaces", icon: Map },
  { id: "creative-peer-review", label: "Creative / Peer Review", icon: Zap },
  { id: "governance", label: "Governance", icon: Lock },
  { id: "background-tasks", label: "Background Tasks", icon: Cpu },
];

const badgeColors: Record<string, string> = {
  warn: "bg-[var(--status-warn)] text-[var(--status-warn-fg)]",
  blocked: "bg-[var(--status-blocked)] text-[var(--status-blocked-fg)]",
  ok: "bg-[var(--status-ok)] text-[var(--status-ok-fg)]",
  info: "bg-[var(--status-info)] text-[var(--status-info-fg)]",
};

interface SidebarNavProps {
  activeId: NavItemId;
  onNavigate: (id: NavItemId) => void;
  collapsed?: boolean;
}

export function SidebarNav({ activeId, onNavigate, collapsed = false }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex h-full flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] py-4",
        collapsed ? "w-14" : "w-56"
      )}
      aria-label="Primary navigation"
    >
      {/* Brand mark */}
      <div
        className={cn(
          "mb-6 flex items-center gap-2.5 px-4",
          collapsed && "justify-center px-0"
        )}
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-[var(--sidebar-accent-foreground)]/10 ring-1 ring-[var(--sidebar-border)]">
          <Cpu size={13} className="text-[var(--sidebar-accent-foreground)]" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold leading-none text-[var(--sidebar-accent-foreground)]">
              Control Center
            </p>
            <p className="mt-0.5 truncate text-[10px] leading-none text-[var(--sidebar-muted)]">
              local · private
            </p>
          </div>
        )}
      </div>

      {/* Primary nav */}
      <ul className="flex flex-col gap-0.5 px-2" role="list">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex w-full items-center gap-2.5 rounded px-2 py-1.5 text-left text-[13px] leading-none transition-colors",
                  isActive
                    ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)] font-medium"
                    : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]/60 hover:text-[var(--sidebar-accent-foreground)]",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon
                  size={14}
                  className={cn(
                    "flex-shrink-0",
                    isActive ? "text-[var(--sidebar-accent-foreground)]" : "text-[var(--sidebar-muted)]"
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[10px] font-medium tabular-nums",
                          item.badgeVariant ? badgeColors[item.badgeVariant] : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                        )}
                        aria-label={`${item.badge} items`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Lanes section */}
      {!collapsed && (
        <div className="mt-6 px-4">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--sidebar-muted)]">
            Lanes
          </p>
          <ul className="flex flex-col gap-0.5" role="list">
            {laneShortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate("lanes")}
                    className="group flex w-full items-center gap-2 rounded px-2 py-1 text-left text-[12px] leading-none text-[var(--sidebar-foreground)] transition-colors hover:bg-[var(--sidebar-accent)]/60 hover:text-[var(--sidebar-accent-foreground)]"
                  >
                    <Icon size={12} className="flex-shrink-0 text-[var(--sidebar-muted)]" />
                    <span className="flex-1 truncate">{item.label}</span>
                    <ChevronRight size={10} className="flex-shrink-0 text-[var(--sidebar-muted)] opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Bottom spacer */}
      <div className="mt-auto" />
    </nav>
  );
}
