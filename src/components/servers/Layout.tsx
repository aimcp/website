'use client'

import type { McpServerItem } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { type FC, useMemo, useState } from 'react'
import { Button } from '../ui/button'

interface McpServersLayoutProps {
  servers: McpServerItem[]
}

export function getGithubId(url: string) {
  const match = url.match(/https:\/\/github.com\/([^/]+)\/([^/?#]+)/)
  if (match) {
    return `${match[1]}/${match[2]}`
  }

  return null
}

const McpServersLayout: FC<McpServersLayoutProps> = ({ servers }) => {
  const [searchKey, setSearchKey] = useState<string>('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [languages, tags] = useMemo(() => {
    const languages = new Set<string>()
    const tags = new Set<string>()

    servers.forEach((server) => {
      languages.add(server.language)
      server.tags.forEach(tag => tags.add(tag))
    })

    return [Array.from(languages), Array.from(tags).sort((a, b) => {
      if (a === 'official') {
        return -1
      }
      if (b === 'official') {
        return 1
      }

      return a > b ? 1 : -1
    })]
  }, [servers])

  const serversFiltered = useMemo(() => {
    return servers.filter((server) => {
      if (searchKey.trim() && !server.name.toLocaleLowerCase().includes(searchKey.trim().toLocaleLowerCase())) {
        return false
      }

      if (selectedLanguages.length && !selectedLanguages.includes(server.language)) {
        return false
      }

      if (selectedTags.length && !server.tags.some(tag => selectedTags.includes(tag))) {
        return false
      }

      return true
    })
  }, [servers, searchKey, selectedLanguages, selectedTags])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-80">
        <Input placeholder="Search MCP server by name" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
      </div>
      <div>
        <ToggleGroup className="flex items-center flex-wrap gap-2" value={selectedLanguages} type="multiple" size="sm" onValueChange={setSelectedLanguages}>
          {languages.map(language => <ToggleGroupItem key={language} value={language} aria-label={language}>{language}</ToggleGroupItem>)}
        </ToggleGroup>
        <ToggleGroup className="flex items-center flex-wrap gap-2 mt-2" value={selectedTags} type="multiple" size="sm" onValueChange={setSelectedTags}>
          {tags.map(tag => <ToggleGroupItem key={tag} value={tag} aria-label={tag}>{tag}</ToggleGroupItem>)}
        </ToggleGroup>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {serversFiltered.map(server => (
          <Card key={server.repo_url} className="group">
            <CardHeader>
              <CardTitle className="flex h-8 justify-between items-center gap-2">
                {server.name}
                <Link href={server.repo_url} target="_blank">
                  <Button className="size-8 transition-transform scale-0 group-hover:scale-100" variant="ghost" size="icon">
                    <ExternalLink />
                  </Button>
                </Link>
              </CardTitle>
              <div className="flex items-center gap-1 mt-1">
                <img alt="GitHub License" src={`https://img.shields.io/github/license/${getGithubId(server.repo_url)}?style=plastic`} />
                <img alt="GitHub License" src={`https://img.shields.io/github/stars/${getGithubId(server.repo_url)}?style=plastic`} />
                <img alt="GitHub License" src={`https://img.shields.io/github/last-commit/${getGithubId(server.repo_url)}?style=plastic`} />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{server.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default McpServersLayout
