// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ApolloServer, gql } = require("apollo-server");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { employees } = require("./data/employees.json");

const typeDefs = gql`
  type Query {
    employees: [Employee]
  }
  type Employee {
    id: ID!
    firstName: String
    lastName: String
    designation: String
    department: String
    nearestCity: String
  }
`;

const resolvers = {
  Query: {
    employees: () => {
      return employees;
    },
  },
};

const gqlServer = new ApolloServer({ typeDefs, resolvers });

gqlServer
  .listen({ port: process.env.port || 3000 })
  .then(({ url }) => console.log(`GraphQL server started on ${url}`));
