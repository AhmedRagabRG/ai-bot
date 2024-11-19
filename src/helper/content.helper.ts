import { Content, Part } from '@google/generative-ai';
import axios from 'axios';

export async function createContent(text: string, imgUrl?: string): Promise<Content[]> {
  if (imgUrl) {
    const response = await axios({
      method: 'get',
      url: imgUrl,
      responseType: 'arraybuffer',
    }); 
    const imageBuffer = Buffer.from(response.data);
    const imageParts: Part = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBuffer.toString('base64'),
      }
    }
    return [
      {
        role: 'user',
        parts: [
          imageParts,
          {
            text,
          },
        ],
      },
    ];
  } 

  return [
    {
      role: 'user',
      parts: [
        {
          text,
        },
      ],
    },
  ];
}

export async function createTextContent(text: string) {
  if (!text) return;

  return [
    {
      role: 'user',
      parts: [
        {
          text,
        },
      ],
    }
  ]
}