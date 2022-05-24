export type SwaggerComponentRef = { $ref: string };

export type SwaggerValue = {
  description?: string;
  default?: string;
  nullable?: boolean;
};

export type SwaggerArray = SwaggerValue & {
  items: SwaggerType;
};

export type SwaggerPrimitive = SwaggerValue & {
  format?: string;
};

export type SwaggerComponent = SwaggerValue & {
  properties: Record<string, SwaggerType>;
  additionalProperties: false | SwaggerType;
};

export type SwaggerType =
  | ({ type: null | undefined } & SwaggerComponentRef)
  | ({ type: 'object' } & SwaggerComponent)
  | ({ type: 'array' } & SwaggerArray)
  | ({ type: 'string' | 'integer' } & SwaggerPrimitive);

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
    string,
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
