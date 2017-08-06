import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export interface ICoerceStringOptions {
  regexp?: RegExp;
  minLength?: number;
  maxLength?: number;
  length?: number;
}

const coerceString = (
  { regexp, minLength, maxLength, length }: ICoerceStringOptions = {}
) => (value: any) => {
  if (typeof value !== "string") {
    throw new TypeError(`Not a string`);
  }
  if (regexp && regexp.test(value) === false) {
    throw new TypeError(`Expected ${value} to match ${regexp}`);
  }
  if (typeof minLength === "number" && value.length < minLength) {
    throw new TypeError(`Expected ${value} to have minLength ${minLength}`);
  }
  if (typeof maxLength === "number" && value.length > maxLength) {
    throw new TypeError(`Expected ${value} to have maxLength ${maxLength}`);
  }
  if (typeof length === "number" && value.length !== length) {
    throw new TypeError(`Expected ${value} to have length ${length}`);
  }
  return value;
};

export interface IGraphitStringOptions {
  name?: string;
  regexp?: RegExp;
  minLength?: number;
  maxLength?: number;
  length?: number;
}

export default (
  {
    name = "GraphitString",
    regexp,
    minLength,
    maxLength,
    length
  }: IGraphitStringOptions = {}
) => {
  const coerceStringFunc = coerceString({
    regexp,
    minLength,
    maxLength,
    length
  });

  return new GraphQLScalarType({
    name,
    description: "Validate a string",
    serialize: coerceStringFunc,
    parseValue: coerceStringFunc,
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ast.value;
      }
      return null;
    }
  });
};
