export type SwaggerType =
  | { type: null | undefined; $ref: string }
  | {
      type: string;
      description?: string;
      format?: string;
      default?: string;
      properties?: {
        [key: string]: SwaggerType;
      };
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
    required: boolean;
    schema: SwaggerType;
  }[];
  responses: {
    [key: number]: {
      description: string;
      content: {
        [key: string]: {
          schema: SwaggerType;
        };
      };
    };
  };
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
  paths: {
    [path: string]: {
      [method: string]: SwaggerEndpoint;
    };
  };
  components: {
    schemas: {
      [schema: string]: SwaggerType;
    };
  };
}
