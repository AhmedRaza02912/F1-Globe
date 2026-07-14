export default function InfoRow({label, value}){
    return (
        <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="text-zinc-400">
                {label}
            </span>
            <span className="font-semibold">
                {value}
            </span>
        </div>
    );
}