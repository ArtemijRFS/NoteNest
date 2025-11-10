export function getKeyName(...segments: string[]): string {
    return `NoteNest:${segments.join(":")}`;
}