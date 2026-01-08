import { z } from 'zod'

export const RESERVED = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'LPT1', '.', '..']

export const playlistNameSchema = z.object({
  playlistName: z
    .string()
    .trim()
    .min(2, 'Playlist name must be at least 2 characters')
    .max(50, 'Playlist name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Only letters, numbers, spaces, hyphens, and underscores allowed')
    .refine((name) => name.replace(/\s/g, '').length > 0, {
      message: 'Playlist name cannot contain only spaces'
    })
    .refine(
      (name) => {
        return !RESERVED.includes(name.toUpperCase())
      },
      {
        message: 'This playlist name is reserved by the system'
      }
    )
})

export const downloadSongSchema = z.object({
  url: z.string().trim().min(2, 'Song url must be at least 2 characters'),
  downloadOption: z.string().trim().min(2, 'You must selected a download option'),
  playlistName: z.string().trim().min(2, 'You must selected playlist folder')
})
