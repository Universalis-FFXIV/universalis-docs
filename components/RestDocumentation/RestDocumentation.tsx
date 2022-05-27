import { Title, Container, Space } from '@mantine/core';
import { SwaggerSchema } from '../../data/swagger/types';
import { RestComponent } from '../RestComponent/RestComponent';
import { RestWelcome } from '../RestWelcome/RestWelcome';
import { RestEndpoint } from '../RestEndpoint/RestEndpoint';
import useStyles from './RestDocumentation.styles';
import { LoadingDocumentation } from '../LoadingDocumentation/LoadingDocumentation';
import { RestTableOfContents } from '../RestTableOfContents/RestTableOfContents';

export function RestDocumentation({ schema }: { schema?: SwaggerSchema }) {
  const { classes } = useStyles();

  if (schema == null) {
    return <LoadingDocumentation />;
  }

  const simpleSchema = Object.keys(schema.paths).flatMap((path) =>
    Object.keys(schema.paths[path]).map((method) => ({
      path,
      method,
      endpoint: schema.paths[path][method],
    }))
  );

  return (
    <Container>
      <Title id="rest-api">{schema.info.title} REST API</Title>
      <RestWelcome />
      <Space h="md" />
      <RestTableOfContents schema={schema} />
      <Space h="xl" />
      <Title id="rest-api-endpoints" className={classes.sectionHeader} mb={16}>
        Endpoints
      </Title>
      {simpleSchema.map(({ path, method, endpoint }) => (
        <div key={path + method}>
          <RestEndpoint path={path} method={method} endpoint={endpoint} />
        </div>
      ))}
      <Space h="xl" />
      <Title id="rest-api-schemas" className={classes.sectionHeader} mb={16}>
        Entities
      </Title>
      {Object.keys(schema.components.schemas)
        .map((name) => ({ name, component: schema.components.schemas[name] }))
        .map(({ name, component }) => (
          <div key={name}>
            <RestComponent name={name} component={component} />
          </div>
        ))}
      <Space mt={200} />
    </Container>
  );
}
