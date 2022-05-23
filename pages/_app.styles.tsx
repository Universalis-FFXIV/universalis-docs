import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 36,
    fontWeight: 900,
    letterSpacing: -1,
  },
}));
