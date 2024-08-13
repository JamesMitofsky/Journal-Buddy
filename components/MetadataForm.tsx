'use client'

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from './ui/label';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CardContent } from './ui/card';
import { useToast } from "./ui/use-toast";

type FormData = {
  date: string;
  time?: string;
  locationTitle: string;
  locationWords: string;
  pageNumber: number;
  tags: string;
  journalNumber: number;
  schemaVersion: number;
};

export const MetadataForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      journalNumber: 2,
      schemaVersion: 1,
    }
  });

  const { toast } = useToast()

  const onSubmit: SubmitHandler<FormData> = async ({ date, time, locationTitle, locationWords, pageNumber, journalNumber, schemaVersion, tags }) => {
    const locationWordsPattern = /^[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/;
    if (locationWords && !locationWordsPattern.test(locationWords)) {
        toast({
            title: 'Invalid 3 Words Address',
            description: 'This address must follow the pattern of three words, each separated by a period.',
        });
        throw new Error('Invalid Location Words pattern');
    }

    const formattedTags = tags.split(",").map((tag) => tag.trim());
    const formattedDate = date.split('T')[0];
    const formattedTime = time ? time.replace(':',"h") : '';

const metaData = `---
Date: ${formattedDate}
Time: ${formattedTime}
Location: ${locationTitle}
What3words: ${locationWords}
Page: ${pageNumber}
Tags: [${formattedTags}]
Journal Number: ${journalNumber}
Schema Version: ${schemaVersion}
---
`;

    try {
          await navigator.clipboard.writeText(metaData);
          toast({
              title: 'Success',
              description: 'Metadata copied to clipboard',
          });
        } catch (error) {
          toast({
              title: 'Error',
              description: 'Failed to copy metadata to clipboard',
          });
        }
  };

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="date" className="mb-1 block">
              Date:
            </Label>
            <Input
              type="date"
              id="date"
              {...register("date", { required: true })}
              className="w-full"
            />
            {errors.date && <span className="text-red-500">This field is required</span>}
          </div>

          <div>
            <Label htmlFor="time" className="mb-1 block">
              Time (optional):
            </Label>
            <Input
              type="time"
              id="time"
              {...register("time")}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="locationTitle" className="mb-1 block">
              Location Title:
            </Label>
            <Input
              type="text"
              id="locationTitle"
              {...register("locationTitle", { required: true })}
              className="w-full"
            />
            {errors.locationTitle && <span className="text-red-500">This field is required</span>}
          </div>

          <div>
            <Label htmlFor="locationWords" className="mb-1 block">
              What3words:
            </Label>
            <Input
              type="text"
              id="locationWords"
              {...register("locationWords")}
              className="w-full"
            />
            {errors.locationWords && <span className="text-red-500">This field is required</span>}
          </div>

          <div>
            <Label htmlFor="pageNumber" className="mb-1 block">
              Page Number:
            </Label>
            <Input
              type="number"
              id="pageNumber"
              {...register("pageNumber", { required: true, valueAsNumber: true })}
              className="w-full"
            />
            {errors.pageNumber && <span className="text-red-500">This field is required</span>}
          </div>

          <div>
            <Label htmlFor="tags" className="mb-1 block">
              Tags (comma separated):
            </Label>
            <Input
              type="text"
              id="tags"
              {...register("tags")}
              className="w-full"
            />
            {errors.tags && <span className="text-red-500">This field is required</span>}
          </div>

          <div>
            <Label htmlFor="journalNumber" className="mb-1 block">
              Journal Number:
            </Label>
            <Input
              type="number"
              id="journalNumber"
              {...register("journalNumber", { required: true, valueAsNumber: true })}
              className="w-full"
            />
            {errors.journalNumber && <span className="text-red-500">This field is required</span>}
          </div>

          <div>
            <Label htmlFor="schemaVersion" className="mb-1 block">
              Schema Version:
            </Label>
            <Input
              type="number"
              id="schemaVersion"
              {...register("schemaVersion", { required: true, valueAsNumber: true })}
              className="w-full"
            />
            {errors.schemaVersion && <span className="text-red-500">This field is required</span>}
          </div>

          <Button type="submit" className="mt-4 w-full">
            Copy to clipboard!
          </Button>
        </form>
      </CardContent>
    </>
  );
};
