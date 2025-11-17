import { TrendingUp, CheckCircle2, User, User2 } from 'lucide-react';

export default function LeadCards() {
  const cards = [
    {
      icon: User2,
      label: "Total Users",
      value: "2,890",
      subtext: "Active",
      bgFrom: "from-pink-400",
      bgTo: "to-pink-500",
      accentBg: "bg-pink-300/20",
      accentHover: "group-hover:bg-pink-300/30",
    },
    {
      icon: TrendingUp,
      label: "Lead Generated",
      value: "1,245",
      subtext: "This month",
      bgFrom: "from-blue-400",
      bgTo: "to-blue-500",
      accentBg: "bg-blue-300/20",
      accentHover: "group-hover:bg-blue-300/30",
    },
    {
      icon: CheckCircle2,
      label: "Lead Closed",
      value: "342",
      subtext: "Converted",
      bgFrom: "from-emerald-400",
      bgTo: "to-emerald-500",
      accentBg: "bg-emerald-300/20",
      accentHover: "group-hover:bg-emerald-300/30",
    },
  ];

  return (
    <div className="flex gap-6 p-8 flex-wrap   items-center justify-evenly">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br ${card.bgFrom} ${card.bgTo} shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Decorative blur elements */}
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header with icon and number */}
              <div className="flex items-start justify-between mb-6">
                <div className={`${card.accentBg} ${card.accentHover} backdrop-blur-sm p-3 rounded-xl transition-colors duration-300`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white tracking-tight">
                    {card.value}
                  </div>
                  <div className="text-xs text-white/60 font-medium uppercase tracking-wider">
                    {card.subtext}
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                  {card.label}
                </p>
                <div className="w-12 h-1 bg-white/30 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        );
      })}
    </div>
  );
}