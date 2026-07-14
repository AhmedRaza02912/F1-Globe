export default function Info({ title, value }) {

    return (

        <div className="flex justify-between border-b border-zinc-700 py-2">

            <span className="text-zinc-400">
                {title}
            </span>

            <span>
                {value}
            </span>

        </div>

    );

}