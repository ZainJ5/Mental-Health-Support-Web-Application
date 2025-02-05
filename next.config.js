/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.module.rules.push({
        test: /\.node$/,
        use: 'raw-loader',
      });

      config.externals.push(
        'mongoose',
        'kerberos',
        '@mongodb-js/zstd',
        '@aws-sdk/credential-providers',
        'snappy',
        'socks',
        'aws4',
        'mongodb-client-encryption',
        'encoding'
      );
    }
    return config;
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Applies to all pages
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
