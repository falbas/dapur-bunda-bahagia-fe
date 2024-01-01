import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import classes from './StatsGrid.module.css'

export function StatsGrid({ data }) {
  const stats = data.map((stat) => {
    const Icon = stat.icon

    return (
      <Paper
        withBorder
        p="md"
        radius="md"
        key={stat.title}
        style={
          stat.color && { borderColor: `var(--mantine-color-${stat.color}-5)` }
        }
      >
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>
      </Paper>
    )
  })
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  )
}
