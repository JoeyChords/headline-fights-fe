import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Headline Fights",
    short_name: 'Headline Fights',
    description: "Headline Fights is a game that helps players learn to recognize bias in the news media by pitting CNN and Fox News headlines against each other.",
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}