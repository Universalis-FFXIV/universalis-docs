import {
  Title,
  Text,
  AppShell,
  Header,
  Navbar,
  Divider,
  UnstyledButton,
  Group,
  Container,
  Space,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import useStyles from './Documentation.styles';

const schemaUrl = 'https://localhost:5001/docs/swagger/v1/swagger.json';

type SwaggerType =
  | { $ref: string }
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

interface SwaggerSchema {
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
    [key: string]: {
      [key: string]: {
        tags: string[];
        summary: string;
        parameters: {
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
      };
    };
  };
  components: {
    schemas: {
      [key: string]: SwaggerType;
    };
  };
}

function tagToId(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

export function Documentation() {
  const { classes } = useStyles();

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
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section>
            <Title className={classes.title}>{schema.info.title}</Title>
          </Navbar.Section>
          <Divider my="sm" />
          <Navbar.Section grow mt="md">
            <UnstyledButton>
              <Group>
                <Text>REST API</Text>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <div />
          <ColorSchemeToggle />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Container>
        <Title id="rest-api">{schema.info.title} REST API</Title>
        <Text dangerouslySetInnerHTML={{ __html: schema.info.description }} />
        <Space h="xl" />
        {Object.keys(schema.paths).flatMap((path) =>
          Object.keys(schema.paths[path])
            .map((method) => ({ method, endpoint: schema.paths[path][method] }))
            .map(({ method, endpoint }) => (
              <div>
                <Space h="lg" />
                <Title className={classes.endpointTitle} id={tagToId(endpoint.tags[0])}>
                  {endpoint.tags[0]}
                </Title>
                <Divider />
                <div>
                  <div>
                    <span className={classes.endpointMethod}>{method}</span> -{' '}
                    <span className={classes.endpointPath}>{path}</span>
                  </div>
                  <Text>{endpoint.summary}</Text>
                </div>
              </div>
            ))
        )}
      </Container>
    </AppShell>
  );
}
