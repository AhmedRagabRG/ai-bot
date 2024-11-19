import { Content, Part } from '@google/generative-ai';
import axios from 'axios';

export async function createContent(text: string, img: any) {
  const response = await axios({
    method: 'get',
    url: `${img}`,
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
