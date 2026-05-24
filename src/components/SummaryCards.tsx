import { LEVELS, LEVEL_INFO, promotedThisMonth, type Trainee } from "@/lib/trainees";
import { Users, TrendingUp } from "lucide-react";

interface StatProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
  accent?: React.ReactNode;
  color?: "orange" | "gray" | "green" | "blue" | "purple";
}

function Stat({ label, value, hint, icon, accent, color = "gray" }: StatProps) {
  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    orange: {
      bg: "bg-orange-50 dark:bg-orange-950",
      text: "text-orange-700 dark:text-orange-300",
      border: "border-orange-200 dark:border-orange-800",
    },
    gray: {
      bg: "bg-slate-50 dark:bg-slate-900",
      text: "text-slate-700 dark:text-slate-300",
      border: "border-slate-200 dark:border-slate-800",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-950",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-200 dark:border-green-800",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-800",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800",
    },
  };

  const { bg, text, border } = colorClasses[color];

  return (
    <div
      className={`${bg} ${border} group relative overflow-hidden rounded-xl border p-4 transition-all duration-200 hover:shadow-sm`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
          {label}
        </p>
        {icon && <div className={`${text} opacity-70`}>{icon}</div>}
        {accent}
      </div>
      <div className={`${text} mt-3 text-3xl font-bold leading-none tracking-tight`}>
        {value}
      </div>
      {hint && (
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{hint}</p>
      )}
    </div>
  );
}

export function SummaryCards({ trainees }: { trainees: Trainee[] }) {
  const total = trainees.length;
  const promoted = promotedThisMonth(trainees);
  const counts = LEVELS.map((l) => ({
    level: l,
    count: trainees.filter((t) => t.currentLevel === l).length,
  }));

  const colorMap: Record<number, "orange" | "gray" | "green" | "blue" | "purple"> = {
    0: "gray",
    1: "green",
    2: "blue",
    3: "purple",
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <Stat
        label="Total"
        value={total}
        hint="in program"
        icon={<Users className="h-5 w-5" />}
        color="orange"
      />
      {counts.map(({ level, count }) => (
        <Stat
          key={level}
          label={`Level ${level}`}
          value={count}
          hint={LEVEL_INFO[level].desc}
          color={colorMap[level]}
          accent={
            <span
              className="h-3 w-3 rounded-full ring-2 ring-current ring-offset-2 dark:ring-offset-slate-900"
              style={{ background: `var(--level-${level})` }}
            />
          }
        />
      ))}
      <Stat
        label="Promoted"
        value={promoted}
        hint="this month"
        icon={<TrendingUp className="h-5 w-5" />}
        color="orange"
      />
    </div>
  );
}