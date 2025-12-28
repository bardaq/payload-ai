import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

type ElevenLabsTextToSpeechOptions = {
  voice_id: string
}

export const generateVoice = async (text: string, options: ElevenLabsTextToSpeechOptions) => {
  const elevenLabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  })
  const response = await elevenLabs.textToSpeech.convertWithTimestamps(options.voice_id, {
    ...options,
    text,
  })
  if (response?.audioBase64) {
    const audioBuffer = Buffer.from(response.audioBase64, 'base64')

    return {
      alignment: response.alignment,
      buffer: audioBuffer,
    }
  }
}
