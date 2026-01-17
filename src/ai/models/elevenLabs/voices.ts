export type Voice = {
  [key: string]: any
  name?: string
  voice_id: string
}

import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'
import * as process from 'node:process'

let voicesState: { voices: Voice[] } = { voices: [] }
export const getAllVoices = async (): Promise<{ voices: Voice[] }> => {
  if (!process.env.ELEVENLABS_API_KEY) {
    return voicesState
  }

  try {
    const elevenLabs = new ElevenLabsClient()
    if (!voicesState.voices.length) {
      const response = await elevenLabs.voices.getAll()
      // Map API Voice type (voiceId) to our Voice type (voice_id)
      voicesState = {
        voices: response.voices.map((voice) => ({
          ...voice,
          voice_id: voice.voiceId,
        })),
      }
    }
    return voicesState
  } catch (error) {
    console.error('getAllVoices: ', error)
    return voicesState
  }
}
