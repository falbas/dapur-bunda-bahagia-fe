import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import { IconReceipt2, IconCoin, IconShoppingCart } from '@tabler/icons-react'
import classes from './StatsGrid.module.css'
import { currencyFormat } from '@/helpers/utils'

const icons = {
  receipt: IconReceipt2,
  coin: IconCoin,
  cart: IconShoppingCart,
}

export function StatsGrid({ reportData }) {
  const data = [
    {
      title: 'Jumlah Transaksi',
      icon: 'receipt',
      value: reportData.transaction_count,
      color: 'red',
    },
    {
      title: 'Total Transaksi',
      icon: 'coin',
      value: currencyFormat(reportData.transaction_total),
      color: 'green',
    },
    {
      title: 'Produk Terjual',
      icon: 'cart',
      value: reportData.product_sold,
      color: 'blue',
    },
  ]

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon]

    return (
      <Paper
        withBorder
        p="md"
        radius="md"
        key={stat.title}
        style={{ borderColor: `var(--mantine-color-${stat.color}-5)` }}
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
