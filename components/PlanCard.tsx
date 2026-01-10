type PlanCardProps = {
  selected: boolean;
  onClick: () => void;
  title: string;
  price: string;
  subtitle: string;
  highlight?: boolean;
};

export function PlanCard({
  selected,
  onClick,
  title,
  price,
  subtitle,
  highlight,
}: PlanCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded-xl p-6 flex gap-4 items-start transition
        ${selected ? "border-green-500 ring-2 ring-green-400" : "border-gray-300"}
        ${highlight ? "bg-green-50" : "bg-gray-50"}
      `}
    >
      <div
        className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center
          ${selected ? "border-green-500" : "border-gray-400"}
        `}
      >
        {selected && <div className="h-2.5 w-2.5 bg-green-500 rounded-full" />}
      </div>

      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-2xl font-bold">{price}</p>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
