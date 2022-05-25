import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  sectionHeader: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: -1,
  },
}));
