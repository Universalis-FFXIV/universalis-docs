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
  componentBox: {
    backgroundColor: theme.colorScheme === 'dark' ? undefined : theme.white,
  },
}));
