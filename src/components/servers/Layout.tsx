'use client'

import type { McpServerItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { type FC, useMemo, useState } from 'react'
import { Label } from '../ui/label'

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
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const onSearchKeyChange = (val: string) => {
    setSearchKey(val)
    setSelectedLanguage('')
    setSelectedTag('')
  }

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

      if (selectedLanguage && server.language !== selectedLanguage) {
        return false
      }

      if (selectedTag && !server.tags.includes(selectedTag)) {
        return false
      }

      return true
    })
  }, [servers, searchKey, selectedLanguage, selectedTag])

  return (
    <div className="flex gap-20">
      <div>
        <div>
          <label>Languages</label>
          <RadioGroup className="flex flex-col mt-2 flex-wrap gap-2" value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="language-all" value=""></RadioGroupItem>
              <Label htmlFor="language-all">All</Label>
            </div>
            {languages.map(language => (
              <div key={language} className="flex items-center gap-2">
                <RadioGroupItem id={`language-${language}`} value={language}></RadioGroupItem>
                <Label htmlFor={`language-${language}`}>{language}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="mt-4">
          <label>Tags</label>
          <RadioGroup className="flex flex-col flex-wrap gap-2 mt-2" value={selectedTag} onValueChange={setSelectedTag}>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="tag-all" value=""></RadioGroupItem>
              <Label htmlFor="tag-all">All</Label>
            </div>
            {tags.map(tag => (
              <div key={tag} className="flex items-center gap-2">
                <RadioGroupItem id={`tag-${tag}`} value={tag}></RadioGroupItem>
                <Label htmlFor={`tag-${tag}`}>{tag}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-4">
        <div className="w-full max-w-80 flex items-center gap-2">
          <Input placeholder="Search MCP server by name" value={searchKey} onChange={e => onSearchKeyChange(e.target.value)} />
          <Link href="https://github.com/aimcp/awesome-mcp/issues/new?template=add-mcp-server.md" target="_blank">
            <Button>Add</Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {serversFiltered.map(server => (
            <Card key={server.repo_url} className="group gap-4">
              <CardHeader className="gap-0">
                <CardTitle className="flex h-8 justify-between items-center gap-2">
                  {server.name}
                  <Link href={server.repo_url} target="_blank">
                    <Button className="size-8 transition-transform scale-0 group-hover:scale-100" variant="ghost" size="icon">
                      <ExternalLink size={16} />
                    </Button>
                  </Link>
                </CardTitle>
                <div className="flex items-center gap-1">
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
    </div>
  )
}

export default McpServersLayout
