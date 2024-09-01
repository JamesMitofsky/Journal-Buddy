"use client"

import React from "react"

import "@mdxeditor/editor/style.css"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { saveAs } from "file-saver"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import useLocalStorageState from "use-local-storage-state"

import { LocationType } from "@/types/LocationType"
import { JournalMarkdownType } from "@/types/MetadataType"

import { ForwardRefEditor } from "./markdown-editor/ForwardRefEditor"
import { Combobox } from "./ui/Combobox"
import { Option } from "./ui/MultipleSelector"
import TagsSelector from "./ui/TagsSelector"
import { Button } from "./ui/button"
import { CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"

type FormData = Pick<
  JournalMarkdownType["metadata"],
  "date" | "time" | "page"
> & {
  title: string
  location?: LocationType
  tags?: Option[]
  content?: string
}

export const MetadataForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const markdownRef = React.useRef<MDXEditorMethods>(null)
  const { toast } = useToast()
  const [journalNumber] = useLocalStorageState<number>("journalNumber")

  const onSubmit: SubmitHandler<FormData> = async ({
    title,
    date,
    time,
    location,
    page,
    tags,
    content,
  }) => {
    if (!journalNumber) {
      toast({
        title: "Error",
        description:
          "Open the settings and indicate which journal number you are using.",
        variant: "error",
      })
      throw new Error("Journal number not set")
    }

    const tagsAsArrayOfValues = tags?.map((tag) => tag.value)
    const tagsArrayAsString = JSON.stringify(tagsAsArrayOfValues)

    const formattedDate = date.split("T")[0]
    const formattedTime = time ? time.replace(":", "h") : ""

    const metaData = `---
Date: ${formattedDate}
Time: ${formattedTime}
Location: ${location?.label ? location.label : ""}
Location Category: ${location?.category ? location.category : ""}
Latitude, Longitude: ${location?.latLongAddress ? location.latLongAddress : ""}
Page: ${page}
Tags: ${tagsArrayAsString}
Journal Number: ${journalNumber}
Schema Version: 1
---
${content ? content : ""}
`

    try {
      const blob = new Blob([metaData], { type: "text/markdown;charset=utf-8" })
      saveAs(blob, `${title}.md`)
      toast({
        title: "Success",
        description: "Metadata saved to file",
        variant: "success",
      })

      // reset state
      reset({
        title: "",
        date: "",
        time: "",
        location: undefined,
        page: null as any, // force react hook form to reset the value to undefined
        tags: [],
        content: "",
      })
      markdownRef.current?.setMarkdown("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save metadata to file",
        variant: "error",
      })
    }
  }

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-1 block">
              Title*
            </Label>
            <Input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="w-full"
            />
            {errors.title && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <Label htmlFor="date" className="mb-1 block">
              Date*
            </Label>
            <Input
              type="date"
              id="date"
              {...register("date", { required: true })}
              className="w-full"
            />
            {errors.date && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <Label htmlFor="time" className="mb-1 block">
              Time
            </Label>
            <Input
              type="time"
              id="time"
              {...register("time")}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="location" className="mb-1 block">
              Location
            </Label>
            <Controller
              name="location"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Combobox onChange={onChange} selectedItem={value} />
              )}
            />
          </div>

          <div>
            <Label htmlFor="pageNumber" className="mb-1 block">
              Page Number:
            </Label>
            <Input
              type="number"
              id="pageNumber"
              {...register("page", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full"
            />
            {errors.page && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <Label className="mb-1 block">Tags</Label>
            <Controller
              name="tags"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TagsSelector selectedOptions={value} onChange={onChange} />
              )}
            />
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ForwardRefEditor
                markdown={value || ""}
                ref={markdownRef}
                onChange={onChange}
              />
            )}
          />

          <Button type="submit" className="mt-4 w-full">
            Save to file!
          </Button>
        </form>
      </CardContent>
    </>
  )
}
