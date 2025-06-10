type CloudflareTurnstileSiteVerifyErrorCodesProps = (
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'timeout-or-duplicate'
  | 'internal-error'
)[];

const cloudflareTurnstileSiteVerify: (token: string) => Promise<{
  success: boolean;
  'error-codes': CloudflareTurnstileSiteVerifyErrorCodesProps;
}> = async (token: string) => {
  let formData = new FormData();
  formData.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? '');
  formData.append('response', token);
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: formData,
    },
  );
  return await response.json();
};

const cloudflareTurnstileSiteVerifyErrorMessages = (
  errorCodes: CloudflareTurnstileSiteVerifyErrorCodesProps,
) => {
  if (Array.isArray(errorCodes) && errorCodes.length > 0) {
    let list: string[] = [];
    errorCodes.map(errorCode => {
      switch (errorCode) {
        case 'missing-input-secret':
          list.push('The secret parameter was not passed.');
          break;
        case 'invalid-input-secret':
          list.push('The secret parameter was invalid or did not exist.');
          break;
        case 'missing-input-response':
          list.push('The response parameter (token) was not passed.');
          break;
        case 'invalid-input-response':
          list.push(
            'The response parameter (token) is invalid or has expired. Most of the time, this means a fake token has been used. If the error persists, contact customer support.',
          );
          break;
        case 'bad-request':
          list.push('The request was rejected because it was malformed.');
          break;
        case 'timeout-or-duplicate':
          list.push(
            'The response parameter (token) has already been validated before. This means that the token was issued five minutes ago and is no longer valid, or it was already redeemed.',
          );
          break;
        case 'internal-error':
          list.push(
            'An internal error happened while validating the response. The request can be retried.',
          );
          break;
        default:
          list = [];
      }
    });
    return list.join(' | ');
  }
  return;
};

export {
  cloudflareTurnstileSiteVerify,
  cloudflareTurnstileSiteVerifyErrorMessages,
};
