import { Table } from '@mantine/core';
import { SwaggerEndpoint } from '../../data/swagger/types';

export function RestResponsesTable({
  path,
  method,
  endpoint,
}: {
  path: string;
  method: string;
  endpoint: SwaggerEndpoint;
}) {
  const responses = Object.keys(endpoint.responses)
    .map((status) => ({
      status,
      ...endpoint.responses[status],
    }))
    .map((x) => (
      <tr key={path + method + x.status}>
        <td>{x.status}</td>
        <td>{x.description}</td>
      </tr>
    ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>{responses}</tbody>
    </Table>
  );
}
