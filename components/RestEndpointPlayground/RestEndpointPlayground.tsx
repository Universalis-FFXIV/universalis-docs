import {
  Button,
  Code,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Prism } from '@mantine/prism';
import { TrashIcon } from '@modulz/radix-icons';
import beautify from 'json-beautify';
import { useState } from 'react';
import { buildUrl } from '../../data/api/universalis';
import { SwaggerEndpoint } from '../../data/swagger/types';
import useStyles from './RestEndpointPlayground.styles';

function getParameters(p: Record<string, string>, pt: Record<string, string>) {
  return Object.keys(p)
    .filter((k) => pt[k] === 'path')
    .reduce<Record<string, string>>((agg, k) => {
      const aggNext = agg;
      aggNext[k] = p[k];
      return aggNext;
    }, {});
}

function getQueryParameters(p: Record<string, string>, pt: Record<string, string>) {
  return Object.keys(p)
    .filter((k) => pt[k] === 'query')
    .filter((k) => p[k] !== '')
    .reduce<Record<string, string>>((agg, k) => {
      const aggNext = agg;
      aggNext[k] = p[k];
      return aggNext;
    }, {});
}

function injectPath(
  path: string,
  values: Record<string, string>,
  parametersIn: Record<string, string>
): string {
  const pathValues = getParameters(values, parametersIn);
  const queryValues = getQueryParameters(values, parametersIn);

  const injectedPath = Object.keys(pathValues).reduce(
    (agg, k) => agg.replace(`{${k}}`, pathValues[k]),
    path
  );
  const query =
    Object.keys(queryValues).length === 0 ? undefined : new URLSearchParams(queryValues);

  return buildUrl(injectedPath, query);
}

function executeRequest(
  method: string,
  path: string,
  values: Record<string, string>,
  parametersIn: Record<string, string>
): Promise<any> {
  return fetch(injectPath(path, values, parametersIn), { method }).then((res) => res.json());
}

export function RestEndpointPlayground({
  path,
  method,
  endpoint,
}: {
  path: string;
  method: string;
  endpoint: SwaggerEndpoint;
}) {
  const { classes } = useStyles();

  const [executing, setExecuting] = useState(false);
  const [apiResponse, setApiResponse] = useState();

  const parameters = endpoint.parameters ?? [];
  const parametersIn = parameters
    .filter((param) => param.schema.type != null)
    .map((param) => ({ name: param.name, type: param.in }))
    .reduce<Record<string, string>>((agg, next) => {
      const aggNext = agg;
      aggNext[next.name] = next.type;
      return aggNext;
    }, {});

  const form = useForm({
    initialValues: parameters.reduce<Record<string, string>>((agg, next) => {
      const aggNext = agg;
      aggNext[next.name] = next.schema.type != null ? next.schema.default ?? '' : '';
      return aggNext;
    }, {}),
  });

  return (
    <div>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setExecuting(true);
          const res = await executeRequest(method, path, values, parametersIn);
          setApiResponse(res);
          setExecuting(false);
        })}
      >
        {parameters.map((param) => (
          <div key={path + method + param.name}>
            <TextInput
              size="md"
              mt="sm"
              label={<span className={classes.parameterName}>{param.name}</span>}
              required={param.required ?? false}
              {...form.getInputProps(param.name)}
            />
            <Text size="md">
              <Code>{param.schema.type != null ? param.schema.type : param.schema.$ref}</Code>{' '}
              <em className={classes.parameterType}>({param.in})</em> {param.description}
            </Text>
          </div>
        ))}
        <Text mt={16}>{injectPath(path, form.values, parametersIn)}</Text>
        <Group position="right" mt="md">
          <Button type="submit" loading={executing}>
            Execute
          </Button>
        </Group>
      </form>
      {(() => {
        if (apiResponse != null) {
          return (
            <div>
              <Space h="lg" />
              <Divider />
              <Space h="lg" />
              <SimpleGrid cols={2}>
                <Text size="lg">Response</Text>
                <Group position="right">
                  <Button
                    color="red"
                    leftIcon={<TrashIcon />}
                    onClick={() => setApiResponse(undefined)}
                  >
                    Clear
                  </Button>
                </Group>
              </SimpleGrid>
              <Space h="sm" />
              <Paper className={classes.response}>
                <Prism language="javascript">
                  {beautify(apiResponse, null as unknown as object, 2, 80)}
                </Prism>
              </Paper>
            </div>
          );
        }

        return <div />;
      })()}
    </div>
  );
}
