import { Title, Text, Container, Space, Input, Group, SimpleGrid } from '@mantine/core';
import { ChevronDownIcon } from '@modulz/radix-icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { SwaggerSchema } from '../../data/swagger/types';
import { RestComponent } from '../RestComponent/RestComponent';
import { RestWelcome } from '../RestWelcome/RestWelcome';
import { RestEndpoint } from '../RestEndpoint/RestEndpoint';
import useStyles from './RestDocumentation.styles';

export function RestDocumentation() {
  const { classes } = useStyles();

  const [schemaVersion, setSchemaVersion] = useState<string>('v1');

  const [schema, setSchema] = useState<SwaggerSchema>();
  useEffect(() => {
    fetch(`/api/schema/${schemaVersion}`)
      .then((res) => res.json())
      .then(setSchema);
  }, [schemaVersion]);

  if (schema == null) {
    return <div />;
  }

  return (
    <Container>
      <SimpleGrid cols={2}>
        <Title id="rest-api">{schema.info.title} REST API</Title>
        <Group position="right">
          <Text size="lg">Version</Text>
          <Input
            component="select"
            rightSection={<ChevronDownIcon />}
            sx={{ width: 200 }}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSchemaVersion(e.target.value)}
          >
            <option value="v1">v1</option>
            <option value="v2">v2</option>
          </Input>
        </Group>
      </SimpleGrid>
      <RestWelcome />
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
      <Space h="xl" />
      <Title id="rest-api-schemas" className={classes.schemasHeader}>
        Schemas
      </Title>
      {Object.keys(schema.components.schemas)
        .map((name) => ({ name, component: schema.components.schemas[name] }))
        .map(({ name, component }) => (
          <div key={name}>
            <RestComponent name={name} component={component} />
          </div>
        ))}
    </Container>
  );
}
