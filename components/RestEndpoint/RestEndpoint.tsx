import { Space, Text, Title, Divider, Container } from '@mantine/core';
import { SwaggerEndpoint } from '../../data/swagger/types';
import { RestEndpointPlayground } from '../RestEndpointPlayground/RestEndpointPlayground';
import { RestResponsesTable } from '../RestResponsesTable/RestResponsesTable';
import useStyles from './RestEndpoint.styles';

function tagToId(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

export function RestEndpoint({
  path,
  method,
  endpoint,
}: {
  path: string;
  method: string;
  endpoint: SwaggerEndpoint;
}) {
  const { classes } = useStyles();

  return (
    <div>
      <Space h="lg" />
      <Title className={`${classes.title} ${classes.anchor}`} id={tagToId(endpoint.tags[0])}>
        {endpoint.tags[0]}
      </Title>
      <Divider />
      <div>
        <div>
          <span className={classes.method}>{method}</span> -{' '}
          <span className={classes.path}>{path}</span>
        </div>
        <Text>{endpoint.summary}</Text>
        <Space h="xl" />
        <Text size="lg">Responses</Text>
        <RestResponsesTable path={path} method={method} endpoint={endpoint} />
        <Container sx={{ maxWidth: 700 }} mt="md">
          <RestEndpointPlayground path={path} method={method} endpoint={endpoint} />
        </Container>
      </div>
    </div>
  );
}
