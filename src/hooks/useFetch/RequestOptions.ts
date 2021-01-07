export interface RequestOptions {
    method: string
    headers: Record<string, string> | null
    body: string | null
}
