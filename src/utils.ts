export function roll(expr: string): number {
    const input = expr.toLowerCase().match(/^(\d+)?d(\d+)([+-×])?(\d+)?/i);
    if (!input) {
        throw new Error('Invalid roll expression');
    }

    const count = Number(input[1] || 1);
    const dice = Number(input[2]);
    const modifier = input[3];
    const modify = Number(input[4]);

    let total = 0;
    for (let index = 0; index < count; index++) {
        total += Math.floor(Math.random() * (dice - 1 + 1)) + 1;
    }

    if ('+' === modifier) {
        total += modify;
    } else if ('-' === modifier) {
        total -= modify;
    } else if (modifier) {
        total = total * modify;
    }

    return Math.max(total, 1);
}
