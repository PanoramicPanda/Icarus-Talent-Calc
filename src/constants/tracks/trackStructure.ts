export type TrackEndpoint = string | [number, number]

export interface Track {
    from: TrackEndpoint
    to: TrackEndpoint
}