import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  count?: number;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, description, count, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-[13px] font-semibold text-[var(--foreground)]">{title}</h2>
          {count !== undefined && (
            <span className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-[var(--muted-foreground)]">
              {count}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

interface PanelCardProps {
  children: React.ReactNode;
  className?: string;
}

export function PanelCard({ children, className }: PanelCardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-[var(--border)] bg-[var(--card)] p-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface PanelRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function PanelRow({ children, className, onClick }: PanelRowProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-start gap-3 rounded px-3 py-2.5 text-left transition-colors hover:bg-[var(--accent)]/60",
          className
        )}
      >
        {children}
      </button>
    );
  }
  return (
    <div className={cn("flex items-start gap-3 px-3 py-2.5", className)}>
      {children}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-[var(--border)]", className)} aria-hidden />;
}

export function MetaLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]", className)}>
      {children}
    </span>
  );
}
