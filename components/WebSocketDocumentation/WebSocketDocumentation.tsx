import { Container, Text, Title } from '@mantine/core';
import { SwaggerSchema } from '../../data/swagger/types';
import { LoadingDocumentation } from '../LoadingDocumentation/LoadingDocumentation';

export function WebSocketDocumentation({ schema }: { schema?: SwaggerSchema }) {
  if (schema == null) {
    return <LoadingDocumentation />;
  }

  return (
    <Container>
      <Title id="ws-api">{schema.info.title} WebSocket API</Title>
      <Text mt={16}>
        Universalis offers a WebSocket API for retrieving some types of data in real time. When
        using the WebSocket API, the client is expected to perform all data processing itself;
        precalculated fields such as averages and minimum/maximum prices will not be provided.
        WebSocket data is binary-serialized using BSON. Most programming languages should have a
        BSON library available online for use in deserializing data.
      </Text>
      <Text mt={16}>
        The WebSocket API is likely not suited to spreadsheet-based applications such as Google
        Sheets or Microsoft Excel.
      </Text>
      <Text mt={16}>
        This page gives demonstrations on how to use the WebSocket API. A full API reference is not
        currently available.
      </Text>
      <Title id="getting-started" mt={32}>
        Getting started
      </Title>
    </Container>
  );
}
