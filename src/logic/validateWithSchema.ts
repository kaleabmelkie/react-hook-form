import {
  FieldValues,
  FieldErrors,
  ValidationReturn,
  SchemaValidateOptions,
} from '../types';

export function parseErrorSchema(error: FieldValues): FieldErrors {
  return error.inner.reduce(
    (previous: FieldValues, { path, message, type }: FieldValues): FieldErrors => ({
      ...previous,
      [path]: { message, ref: {}, type },
    }),
    {},
  );
}

export default async function validateWithSchema(
  validationSchema: any,
  validationSchemaOption: SchemaValidateOptions,
  data: FieldValues,
): Promise<ValidationReturn> {
  try {
    return {
      result: await validationSchema.validate(data, validationSchemaOption),
      fieldErrors: {},
    };
  } catch (e) {
    return {
      fieldErrors: parseErrorSchema(e),
      result: {},
    };
  }
}
