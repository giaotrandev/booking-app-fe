// app/api/verify-token/route.ts

import { verifyTokenAction } from '#/layouts/auth-layout/action/verify-token';

export async function GET() {
  const result = await verifyTokenAction();
  return Response.json(result);
}
