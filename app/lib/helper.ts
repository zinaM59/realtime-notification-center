export function formatFullTimeDiff(date: Date | string): string {
    const now = new Date();
    const target = new Date(date);

    const diffMs = now.getTime() - target.getTime();

    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    const days = Math.floor(totalMinutes / (60 * 24));
    const remainingAfterDays = totalMinutes % (60 * 24);

    const hours = Math.floor(remainingAfterDays / 60);
    const minutes = remainingAfterDays % 60;

    let result = "";

    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m`;

    return result.trim() + " ago";
}
