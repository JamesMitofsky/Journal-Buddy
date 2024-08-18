import { EntryFileType } from "@/types/EntryFileType"

export const getMarkdownData = async (
  directoryHandle: FileSystemDirectoryHandle
): Promise<{ content: string; name: string }[]> => {
  const files: EntryFileType[] = []

  for await (const entry of directoryHandle.values()) {
    if (entry.kind === "file" && entry.name.endsWith(".md")) {
      const file = await entry.getFile()
      const content = await file.text()
      files.push({ content, name: entry.name }) // Store content and name
    } else if (entry.kind === "directory") {
      // Recursively gather files from subdirectories
      const subFiles = await getMarkdownData(entry as FileSystemDirectoryHandle)
      files.push(...subFiles)
    }
  }

  return files
}
