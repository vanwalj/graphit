# Graphit
## Introduction
## How to use

### As an output
```js
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType
} from "graphql";
import { GraphitGUID } from "graphit";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphitGUID(),
        resolve: () => 'uuid'
      }
    }
  })
});
```

### As an intput
```js
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType
} from "graphql";
import { GraphitGUID } from "graphit";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        args: {
          id: { type: GraphitGUID() } 
        }
        type: GraphQLBoolean(),
        resolve: () => true'
      }
    }
  })
});
```

## Documentation