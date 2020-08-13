export function between(min: number, max: number): number {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function env(key: string, _default: string): string {
    return process.env[key] || _default;
}

export function rand<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

export function ucfirst(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export function roll(expr: string): number {
    const input = expr.toLowerCase().match(/^(\d+)?d(\d+)([+-×x])?(\d+)?/);
    if (!input) {
        throw new Error("Invalid roll expression");
    }

    const count = Number(input[1] || 1);
    const dice = Number(input[2]);
    const modifier = input[3];
    const mod = Number(input[4]);

    let total = 0;
    for (let index = 0; index < count; index++) {
        total += Math.floor(Math.random() * (dice - 1 + 1)) + 1;
    }

    if ("+" === modifier) {
        total += mod;
    } else if ("-" === modifier) {
        total -= mod;
    } else if ("x" === modifier || "×" === modifier) {
        total = total * mod;
    }

    return total;
}
