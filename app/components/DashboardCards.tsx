type Card = {
    label: string;
    value: string | number;
};

const cards: Card[] = [
    { label: "Total Tasks", value: 12 },
    { label: "Open Tasks", value: 5 },
    { label: "Completed", value: 7 },
    { label: "Unread Notifications", value: 3 },
];

export default function DashboardCards() {
    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <div key={card.label} className="app-panel p-5">
                    <p className="text-sm text-app-muted">{card.label}</p>
                    <h3 className="mt-3 text-3xl font-bold text-white">{card.value}</h3>
                </div>
            ))}
        </section>
    );
}