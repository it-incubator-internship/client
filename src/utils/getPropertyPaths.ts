import { ZodSchema } from 'zod'
// get zod object keys recursively
export function getZodSchemaFieldsShallow(schema: ZodSchema) {
  const fields: Record<string, true> = {}
  const proxy = new Proxy(fields, {
    get(_, key) {
      if (key === 'then' || typeof key !== 'string') {
        return
      }
      fields[key] = true
    },
  })

  schema.safeParse(proxy)

  return Object.keys(fields).join(' | ')
}
