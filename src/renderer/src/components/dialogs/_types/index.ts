import { PlaylistModel, SongModel } from '@shared/models'

export type SongPayloadProps = { payload: { song: SongModel } }
export type PlaylistPayloadProps = { payload: { playlist: PlaylistModel } }
