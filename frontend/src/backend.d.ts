import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Event {
    id: string;
    review: string;
    title: string;
    date?: string;
    createdAt: bigint;
    description: string;
    image: ExternalBlob;
    location?: string;
}
export interface backendInterface {
    createEvent(id: string, title: string, description: string, date: string | null, location: string | null, image: ExternalBlob, review: string): Promise<void>;
    listEvents(): Promise<Array<Event>>;
}
