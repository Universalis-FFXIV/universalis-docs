export type SwaggerType =
  | { type: null | undefined; $ref: string }
  | {
      type: string;
      description?: string;
      format?: string;
      default?: string;
      properties?: Record<string, SwaggerType>;
      additionalProperties?: boolean;
      nullable?: boolean;
    };

export interface SwaggerEndpoint {
  tags: string[];
  summary: string;
  parameters?: {
    name: string;
    in: string;
    description: string;
    required?: boolean;
    schema: SwaggerType;
  }[];
  responses: Record<
    number,
    {
      description: string;
      content: Record<
        string,
        {
          schema: SwaggerType;
        }
      >;
    }
  >;
}

export interface SwaggerSchema {
  openapi: string;
  info: {
    title: string;
    description: string;
    license: {
      name: string;
      url: string;
    };
    version: string;
  };
  paths: Record<string, Record<string, SwaggerEndpoint>>;
  components: {
    schemas: Record<string, SwaggerType>;
  };
}
