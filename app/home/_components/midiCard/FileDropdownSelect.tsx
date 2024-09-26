"use client"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export const FileDropdownSelect = ({ filenames, fileformat, searchParam }: { filenames: string[], fileformat: string, searchParam: string }) => {
  const router = useRouter()

  const handleChange = (value: string) => {
    router.push(`/home/?${fileformat}=${value}`)
  }
  return (
    <div>
      <Select defaultValue={searchParam} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a file" />
        </SelectTrigger>
        <SelectContent>
          {filenames.map(filename => {
            return (<SelectItem key={filename} value={filename}>{filename}</SelectItem>)
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
