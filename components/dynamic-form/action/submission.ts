// app/actions/dynamicFormSubmissionsAction.ts
'use server';
import {
  cloudflareTurnstileSiteVerify,
  cloudflareTurnstileSiteVerifyErrorMessages,
} from '#/lib/cloudflare/turnstile/site-verify';
import { FormFieldProps } from '../type';

interface DynamicFormSubmissionsActionProps {
  token: string;
  id?: number;
  fields?: FormFieldProps[];
  data?: Record<string, any>;
}

const dynamicFormSubmissionsAction = async ({
  token,
  id,
  fields,
  data,
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FE_URL ?? 'http://localhost:3000'}/api/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, token }), // Include token in the payload
        },
      );

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
