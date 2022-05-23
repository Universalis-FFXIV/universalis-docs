import { Title, Text, Container, Space } from '@mantine/core';
import { useEffect, useState } from 'react';
import { SwaggerSchema } from '../../data/swagger/types';
import { RestEndpoint } from '../RestEndpoint/RestEndpoint';

const schemaUrl = 'https://localhost:5001/docs/swagger/v1/swagger.json';

export function RestDocumentation() {
  const [schema, setSchema] = useState<SwaggerSchema>();
  useEffect(() => {
    fetch(schemaUrl)
      .then((res) => res.json())
      .then(setSchema);
  }, []);

  if (schema == null) {
    return <div />;
  }

  return (
    <Container>
      <Title id="rest-api">{schema.info.title} REST API</Title>
      <Text dangerouslySetInnerHTML={{ __html: schema.info.description }} />
      <Space h="xl" />
      {Object.keys(schema.paths).flatMap((path) =>
        Object.keys(schema.paths[path])
          .map((method) => ({ method, endpoint: schema.paths[path][method] }))
          .map(({ method, endpoint }) => (
            <div key={path + method}>
              <RestEndpoint path={path} method={method} endpoint={endpoint} />
            </div>
          ))
      )}
    </Container>
  );
}
