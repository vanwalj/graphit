import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLError,
  GraphQLNonNull
} from "graphql";
import { v1, v4 } from "uuid";

import GraphitGUID from "./guid";

test("GUID as a nullable return type and a null return", async () => {
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hello: {
          type: GraphitGUID(),
          resolve: () => null
        }
      }
    })
  });

  const requestString = `{ hello }`;

  const { data, errors } = await graphql(schema, requestString);

  expect(data).toBeDefined();
  expect(data!.hello).toBe(null);
  expect(errors).toBeFalsy();
});

test("GUID as a nullable return type with an invalid GUID returned", async () => {
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hello: {
          type: GraphitGUID(),
          resolve: () => "yolo"
        }
      }
    })
  });

  const requestString = `{ hello }`;

  const { data, errors } = await graphql(schema, requestString);

  expect(data).toBeDefined();
  expect(data!.hello).toBe(null);
  expect(errors).toBeInstanceOf(Array);
  expect(errors!.length).toBeGreaterThan(0);
  expect(errors![0]).toBeInstanceOf(GraphQLError);
  expect(errors![0].message).toBe("yolo is not a valid GUID");
});

test("GUID as a nullable return type with a valid uuid v1 returned", async () => {
  const uuid = v1();

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hello: {
          type: GraphitGUID(),
          resolve: () => uuid
        }
      }
    })
  });

  const requestString = `{ hello }`;

  const { data, errors } = await graphql(schema, requestString);

  expect(data).toBeDefined();
  expect(data!.hello).toBe(uuid);
  expect(errors).toBeFalsy();
});

test("GUID as a nullable return type with a valid uuid v4 returned", async () => {
  const uuid = v4();

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hello: {
          type: GraphitGUID(),
          resolve: () => uuid
        }
      }
    })
  });

  const requestString = `{ hello }`;

  const { data, errors } = await graphql(schema, requestString);

  expect(data).toBeDefined();
  expect(data!.hello).toBe(uuid);
  expect(errors).toBeFalsy();
});

test("GUID as a non nullable return type and a null return", async () => {
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hello: {
          type: new GraphQLNonNull(GraphitGUID()),
          resolve: () => null
        }
      }
    })
  });

  const requestString = `{ hello }`;

  const { data, errors } = await graphql(schema, requestString);

  expect(data).toBeDefined();
  expect(data).toBe(null);
  expect(errors).toBeInstanceOf(Array);
  expect(errors!.length).toBeGreaterThan(0);
  expect(errors![0]).toBeInstanceOf(GraphQLError);
  expect(errors![0].message).toBe(
    "Cannot return null for non-nullable field RootQueryType.hello."
  );
});

test("GUID as a nullable return type with an invalid GUID returned", async () => {
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hello: {
          type: new GraphQLNonNull(GraphitGUID()),
          resolve: () => "yolo"
        }
      }
    })
  });

  const requestString = `{ hello }`;

  const { data, errors } = await graphql(schema, requestString);

  expect(data).toBeDefined();
  expect(data).toBe(null);
  expect(errors).toBeInstanceOf(Array);
  expect(errors!.length).toBeGreaterThan(0);
  expect(errors![0]).toBeInstanceOf(GraphQLError);
  expect(errors![0].message).toBe("yolo is not a valid GUID");
});

test("GUID as a nullable return type with a valid uuid v1 returned", async () => {
  const uuid = v1();

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hello: {
          type: new GraphQLNonNull(GraphitGUID()),
          resolve: () => uuid
        }
      }
    })
  });

  const requestString = `{ hello }`;

  const { data, errors } = await graphql(schema, requestString);

  expect(data).toBeDefined();
  expect(data!.hello).toBe(uuid);
  expect(errors).toBeFalsy();
});

test("GUID as a nullable return type with a valid uuid v4 returned", async () => {
  const uuid = v4();

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hello: {
          type: new GraphQLNonNull(GraphitGUID()),
          resolve: () => uuid
        }
      }
    })
  });

  const requestString = `{ hello }`;

  const { data, errors } = await graphql(schema, requestString);

  expect(data).toBeDefined();
  expect(data!.hello).toBe(uuid);
  expect(errors).toBeFalsy();
});
