const fastify = require("fastify");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  getGraphQLParameters,
  processRequest,
  sendResult,
  shouldRenderGraphiQL,
  renderGraphiQL,
} = require("graphql-helix");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = fastify();

server.route({
  method: ["GET", "POST"],
  url: "/",
  handler: async (req, reply) => {
    const request = {
      headers: req.headers,
      method: req.method,
      query: req.query,
      body: req.body,
    };

    if (shouldRenderGraphiQL(req)) {
      reply.raw.end(
        renderGraphiQL({
          endpoint: "/",
        })
      );

      return;
    }

    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      request,
      schema,
      operationName,
      query,
      variables,
    });

    sendResult(result, reply.raw);
  },
});

const start = async () => {
  try {
    await server.listen(3000);
    console.log(`Server is running on http://localhost:3000/`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
