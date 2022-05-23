import { Space, Text, Title, Divider } from '@mantine/core';
import { SwaggerEndpoint } from '../../data/swagger/types';
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
      <Title className={classes.title} id={tagToId(endpoint.tags[0])}>
        {endpoint.tags[0]}
      </Title>
      <Divider />
      <div>
        <div>
          <span className={classes.method}>{method}</span> -{' '}
          <span className={classes.path}>{path}</span>
        </div>
        <Text>{endpoint.summary}</Text>
      </div>
    </div>
  );
}
