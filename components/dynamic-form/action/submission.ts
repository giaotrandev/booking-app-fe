// app/actions/dynamicFormSubmissionsAction.ts
'use server';
import {
  cloudflareTurnstileSiteVerify,
  cloudflareTurnstileSiteVerifyErrorMessages,
} from '#/lib/cloudflare/turnstile/site-verify';
import { cookies } from 'next/headers';
import { FormFieldProps } from '../type';

interface DynamicFormSubmissionsActionProps {
  token: string;
  fields?: FormFieldProps[];
  data?: Record<string, any>;
  baseUrl: string;
}

const dynamicFormSubmissionsAction = async ({
  token,
  data,
  baseUrl,
}: DynamicFormSubmissionsActionProps): Promise<{
  success: boolean;
  message?: string;
  data?: any;
}> => {
  try {
    // Validate Cloudflare Turnstile token
    const verify = await cloudflareTurnstileSiteVerify(token);
    if (verify && verify.success) {
      // Token is valid, call the local /api/login route
      // const BASE_URL =
      //   process.env.NODE_ENV === 'production'
      //     ? process.env.NEXT_BASE_URL // ví dụ: https://yourdomain.com
      //     : 'http://localhost:3000'; // local URL
      const loginUrl = `${baseUrl}/api/login`;
      // const loginUrl = `/api/login`;
      const cookieStore = await cookies();
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const setCookieHeader = res.headers.get('set-cookie');

      if (setCookieHeader) {
        // Tách từng cookie riêng biệt
        const cookiesRes = setCookieHeader.split(/,(?=\s*\w+=)/); // match: at=...;..., rt=...;...

        for (const cookieStr of cookiesRes) {
          const trimmed = cookieStr.trim();

          const match = trimmed.match(/^(\w+)=([^;]+)/); // chỉ lấy key=value đầu tiên trước dấu ;
          if (!match) continue;

          const key = match[1];
          const value = match[2];

          if (key === 'at' || key === 'rt') {
            cookieStore.set(key, value, {
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              path: '/',
            });
          }
        }
      }

      const result = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: result.message || 'Login failed',
        };
      }

      return {
        success: true,
        message: 'Login successful',
        data: result, // Include response data for user info
      };
    } else {
      const errorMessages = cloudflareTurnstileSiteVerifyErrorMessages(
        verify['error-codes'],
      );
      throw new Error(errorMessages);
    }
  } catch (error) {
    console.error('Turnstile validation or login error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error',
    };
  }
};

export { dynamicFormSubmissionsAction };
