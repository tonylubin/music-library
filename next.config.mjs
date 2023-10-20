/** @type {import('next').NextConfig} */

import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['audiomotion-analyzer'],
}

export default withPlaiceholder(nextConfig);
