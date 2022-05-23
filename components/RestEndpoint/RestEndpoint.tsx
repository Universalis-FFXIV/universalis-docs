import { Space, Text, Title, Divider, Group, Button, TextInput, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
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

  const form = useForm({
    initialValues: {
      test: '',
    },
  });

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
        <Container sx={{ maxWidth: 700 }} mt="md">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            {(() => {
              if (endpoint.parameters != null) {
                return endpoint.parameters.map((param) => (
                  <div>
                    <TextInput
                      size="md"
                      mt="sm"
                      label={<span className={classes.parameterName}>{param.name}</span>}
                      required={param.required ?? false}
                      defaultValue={
                        param.schema.type != null ? param.schema.default ?? '' : undefined
                      }
                      {...form.getInputProps('test')}
                    />
                    <Text size="md">
                      <code>
                        {param.schema.type != null ? param.schema.type : param.schema.$ref}
                      </code>{' '}
                      <em className={classes.parameterType}>({param.in})</em> {param.description}
                    </Text>
                  </div>
                ));
              }

              return <div />;
            })()}
            <Group position="right" mt="md">
              <Button type="submit">Execute</Button>
            </Group>
          </form>
        </Container>
      </div>
    </div>
  );
}
