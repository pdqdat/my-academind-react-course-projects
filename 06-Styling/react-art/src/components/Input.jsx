export default function Input({ label, invalid, ...props }) {
    let labelClasses = "mb-2 block text-xs font-bold uppercase tracking-wide";

    if (invalid) {
        labelClasses += " text-red-400";
    } else {
        labelClasses += " text-stone-300";
    }

    return (
        <p>
            <label className={labelClasses}>{label}</label>

            <input
                className={`w-full rounded border px-3 py-2 leading-tight shadow ${invalid ? "border-red-300 bg-red-100 text-red-500" : "bg-stone-300 text-gray-700"}`}
                {...props}
            />
        </p>
    );
}
