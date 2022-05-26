import { Box, List, Text } from '@mantine/core';
import Link from 'next/link';
import { SwaggerSchema } from '../../data/swagger/types';

function nameToId(name: string): string {
  return `schema-${name.toLowerCase()}`;
}

function tagToId(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

export function RestTableOfContents({ schema }: { schema: SwaggerSchema }) {
  const simpleSchema = Object.keys(schema.paths).flatMap((path) =>
    Object.keys(schema.paths[path]).map((method) => ({
      path,
      method,
      endpoint: schema.paths[path][method],
    }))
  );

  const endpointHeaders = simpleSchema.map(({ endpoint }) => endpoint.tags[0]);
  const endpointIds = endpointHeaders.map(tagToId);

  const components = Object.keys(schema.components.schemas).map((name) => ({
    name,
    component: schema.components.schemas[name],
  }));

  const componentHeaders = components.map(({ name }) => name);
  const componentIds = componentHeaders.map(nameToId);

  return (
    <Box
      sx={(theme) => ({
        width: 400,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        padding: 8,
      })}
    >
      <Text size="xl">Table of contents</Text>
      <Text size="lg">Endpoints</Text>
      <List type="ordered">
        {endpointHeaders.map((h, i) => (
          <List.Item key={`toc${h}`}>
            <Link href={`#${endpointIds[i]}`}>{h}</Link>
          </List.Item>
        ))}
      </List>
      <Text size="lg">Entities</Text>
      <List type="ordered">
        {componentHeaders.map((h, i) => (
          <List.Item key={`toc${h}`}>
            <Link href={`#${componentIds[i]}`}>{h}</Link>
          </List.Item>
        ))}
      </List>
    </Box>
  );
}
