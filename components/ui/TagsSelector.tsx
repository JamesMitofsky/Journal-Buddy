"use client"

import { useEffect } from "react"
import useLocalStorageState from "use-local-storage-state"

import MultipleSelector, { Option } from "./MultipleSelector"

type TagsSelectorProps = {
  selectedOptions: Option[] | undefined
  onChange: (value: Option[]) => void
}

const TagsSelector = ({ selectedOptions, onChange }: TagsSelectorProps) => {
  // const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const [tagOptions, setTagOptions] = useLocalStorageState<Option[]>(
    "tagOptions",
    {
      defaultValue: [],
    }
  )

  useEffect(() => {
    if (!selectedOptions) return
    const newOptions = selectedOptions.filter(
      (selected) =>
        !tagOptions.some((option) => option.value === selected.value)
    )

    if (newOptions.length > 0) {
      setTagOptions((prevOptions) => [...prevOptions, ...newOptions])
    }
  }, [selectedOptions, tagOptions, setTagOptions])

  const handleChange = (newOptions: Option[]) => {
    const formattedOptions = newOptions.map((option) => ({
      label: option.label.toLowerCase().replace(/\s+/g, "-"),
      value: option.value.toLowerCase().replace(/\s+/g, "-"),
    }))
    onChange(formattedOptions)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      defaultOptions={tagOptions}
      options={tagOptions}
      creatable
      placeholder="Select tags..."
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          Start typing to create a tag.
        </p>
      }
    />
  )
}

export default TagsSelector
