import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  parameterName: {
    fontWeight: 600,
  },
  parameterType: {
    color: 'grey',
  },
  response: {
    maxHeight: '700px',
    overflowY: 'scroll',
  },
}));
