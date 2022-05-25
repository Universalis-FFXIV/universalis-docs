import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: -1,
  },
  anchor: {
    paddingTop: 60,
    marginTop: -60,
  },
  method: {
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  path: {
    fontWeight: 600,
  },
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
