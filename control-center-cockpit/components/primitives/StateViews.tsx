import { cn } from "@/lib/utils";
import { AlertTriangle, Database, Inbox, Loader2, Lock, WifiOff } from "lucide-react";

interface StateViewProps {
  title: string;
  description: string;
  nextStep?: string;
  className?: string;
  size?: "sm" | "md";
}

function StateShell({
  icon,
  title,
  description,
  nextStep,
  className,
  size = "md",
  iconClass,
}: StateViewProps & { icon: React.ReactNode; iconClass?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        size === "md" ? "gap-3 px-6 py-12" : "gap-2 px-4 py-6",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-md ring-1",
          size === "md" ? "h-10 w-10" : "h-7 w-7",
          "bg-[var(--card)] ring-[var(--border)]",
          iconClass
        )}
        aria-hidden
      >
        {icon}
      </div>
      <div>
        <p className={cn("font-medium text-[var(--foreground)]", size === "md" ? "text-[13px]" : "text-[12px]")}>
          {title}
        </p>
        <p className={cn("mt-1 text-[var(--muted-foreground)]", size === "md" ? "text-[12px]" : "text-[11px]")}>
          {description}
        </p>
        {nextStep && (
          <p className={cn("mt-1.5 text-[var(--status-info-fg)]", size === "md" ? "text-[11px]" : "text-[10px]")}>
            Next: {nextStep}
          </p>
        )}
      </div>
    </div>
  );
}

export function EmptyState(props: StateViewProps) {
  return (
    <StateShell
      {...props}
      icon={<Inbox size={props.size === "sm" ? 14 : 18} className="text-[var(--muted-foreground)]" />}
    />
  );
}

export function LoadingState(props: StateViewProps) {
  return (
    <StateShell
      {...props}
      icon={
        <Loader2
          size={props.size === "sm" ? 14 : 18}
          className="animate-spin text-[var(--muted-foreground)]"
        />
      }
    />
  );
}

export function ErrorState(props: StateViewProps) {
  return (
    <StateShell
      {...props}
      icon={<AlertTriangle size={props.size === "sm" ? 14 : 18} className="text-[var(--status-blocked-fg)]" />}
      iconClass="bg-[var(--status-blocked)]/10 ring-[var(--status-blocked)]/30"
    />
  );
}

export function UnavailableState(props: StateViewProps) {
  return (
    <StateShell
      {...props}
      icon={<WifiOff size={props.size === "sm" ? 14 : 18} className="text-[var(--muted-foreground)]" />}
      iconClass="bg-[var(--muted)]/40 ring-[var(--border)]/30"
    />
  );
}

export function LockedState(props: StateViewProps) {
  return (
    <StateShell
      {...props}
      icon={<Lock size={props.size === "sm" ? 14 : 18} className="text-[var(--status-warn-fg)]" />}
      iconClass="bg-[var(--status-warn)]/10 ring-[var(--status-warn)]/25"
    />
  );
}

export function FixtureState(props: StateViewProps) {
  return (
    <StateShell
      {...props}
      icon={<Database size={props.size === "sm" ? 14 : 18} className="text-[var(--status-info-fg)]" />}
      iconClass="bg-[var(--status-info)]/10 ring-[var(--status-info)]/25"
    />
  );
}
