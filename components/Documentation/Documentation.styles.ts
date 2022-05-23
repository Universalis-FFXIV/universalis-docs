import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 36,
    fontWeight: 900,
    letterSpacing: -1,
  },
  endpointTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: -1,
  },
  endpointMethod: {
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  endpointPath: {
    fontWeight: 600,
  },
}));
