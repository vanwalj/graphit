import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const guidRegexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const coerceGuid = (value: any) => {
  if (typeof value !== "string") {
    throw new TypeError(`Not a string`);
  }
  if (guidRegexp.test(value) === false) {
    throw new TypeError(`${value} is not a valid GUID`);
  }
  return value;
};

export interface IGraphitGuidOptions {
  name?: string;
}

export default ({ name = "GraphitGUID" }: IGraphitGuidOptions = {}) =>
  new GraphQLScalarType({
    name,
    description: "https://wikipedia.org/wiki/Universally_unique_identifier",
    serialize: coerceGuid,
    parseValue: coerceGuid,
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ast.value;
      }
      return null;
    }
  });
