import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import {
  PhoneNumberFormat,
  PhoneNumberUtil,
  PhoneNumberType
} from "google-libphonenumber";

export { PhoneNumberFormat, PhoneNumberType };

const phoneUtil = PhoneNumberUtil.getInstance();

const isValidNumberForTypes = (
  phoneNumber: libphonenumber.PhoneNumber,
  types: PhoneNumberType[]
) => {
  for (const type of types) {
    if (phoneUtil.isPossibleNumberForType(phoneNumber, type)) {
      return true;
    }
  }
  return false;
};

const isValidNumberForRegions = (
  phoneNumber: libphonenumber.PhoneNumber,
  regions: string[]
) => {
  for (const region of regions) {
    if (phoneUtil.isValidNumberForRegion(phoneNumber, region)) {
      return true;
    }
  }
  return false;
};

interface ICoercePhoneNumberOptions {
  format?: PhoneNumberFormat;
  allowedRegions?: string[];
  allowedPhoneNumberTypes?: PhoneNumberType[];
}

const coercePhoneNumber = (
  {
    format,
    allowedRegions,
    allowedPhoneNumberTypes
  }: ICoercePhoneNumberOptions = {}
) => (value: any) => {
  if (typeof value !== "string") {
    throw new TypeError(`Not a string`);
  }
  const phoneNumber = phoneUtil.parse(value);
  if (phoneUtil.isValidNumber(phoneNumber) === false) {
    throw new TypeError(`${phoneNumber} is not a valid phone number`);
  }
  if (allowedRegions) {
    if (isValidNumberForRegions(phoneNumber, allowedRegions) === false) {
      throw new TypeError(
        `${phoneNumber} is not a valid phone number for allowed regions`
      );
    }
  }
  if (allowedPhoneNumberTypes) {
    if (isValidNumberForTypes(phoneNumber, allowedPhoneNumberTypes) === false) {
      throw new TypeError(
        `${phoneNumber} is not a valid phone number for allowed types`
      );
    }
  }
  if (format) {
    return phoneUtil.format(phoneNumber, format);
  }
  return value;
};

export interface IGraphitPhoneNumberOptions {
  name?: string;
  format?: PhoneNumberFormat;
  allowedRegions?: string[];
  allowedPhoneNumberTypes?: PhoneNumberType[];
}

export default (
  {
    name = "GraphitPhoneNumber",
    format,
    allowedRegions,
    allowedPhoneNumberTypes
  }: IGraphitPhoneNumberOptions = {}
) => {
  const coercePhoneNumberFunc = coercePhoneNumber({
    format,
    allowedPhoneNumberTypes,
    allowedRegions
  });

  return new GraphQLScalarType({
    name,
    description: "Validate a phone number",
    serialize: coercePhoneNumberFunc,
    parseValue: coercePhoneNumberFunc,
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ast.value;
      }
      return null;
    }
  });
};
