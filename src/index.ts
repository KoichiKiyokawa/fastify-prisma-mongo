import fastify from 'fastify'

const isProd = process.env.NODE_ENV === 'production'
const app = fastify({logger: {prettyPrint: isProd }})

