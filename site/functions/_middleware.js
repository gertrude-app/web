export const onRequest = async ({ request, next, env }) => {
  const url = new URL(request.url);
  if (url.pathname === `/` && Math.random() < 0.5) {
    url.pathname = `/old`;
    const asset = await env.ASSETS.fetch(url);
    const response = new Response(asset.body, asset);
    response.headers.append(`Set-Cookie`, `old=true; Path=/; Max-Age=1209600`);
    return response;
  }
  return next();
};
