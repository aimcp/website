import type { McpServerItem } from '@/types'
import McpServersLayout from '@/components/servers/Layout'

const dataUrl = 'https://raw.githubusercontent.com/aimcp/awesome-mcp/refs/heads/main/data/servers/list.json'

export default async function McpServers() {
  const response = await (await fetch(dataUrl)).json()
  const data: McpServerItem[] = response?.servers ?? []

  return (
    <div className="p-6">
      <McpServersLayout servers={data} />
    </div>
  )
}
