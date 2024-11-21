import { Content, Part } from '@google/generative-ai';
import axios from 'axios';
import * as mime from 'mime-types';

export interface IFile {
  url: string;
  type: string;
}

export async function createContent(
  text: string,
  file?: IFile,
): Promise<Content[]> {
  if (file?.url) {
    const response = await axios({
      method: 'get',
      url: file.url,
      responseType: 'arraybuffer',
    });

    const imageBuffer = Buffer.from(response.data);
    const imageParts: Part = {
      inlineData: {
        mimeType: file.type,
        data: imageBuffer.toString('base64'),
      },
    };
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
    },
  ];
}
