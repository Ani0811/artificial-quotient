/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["knex", "mysql2"],
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
