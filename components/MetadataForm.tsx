'use client'

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from './ui/label';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from './ui/card';

type FormData = {
  date: string;
  title: string;
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
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formattedTags = data.tags.split(",").map((tag) => tag.trim());

    const metaData = `
---
date: ${data.date}
title: "${data.title}"
location_title: "${data.locationTitle}"
location_3_words: "${data.locationWords}"
page_number: ${data.pageNumber}
tags: [${formattedTags.map((tag) => `"${tag}"`).join(", ")}]
journal_number: ${data.journalNumber}
schema_version: ${data.schemaVersion}
---
`;
    alert(metaData);
  };

  return (
    <div className="mx-auto my-8 max-w-lg p-4">
      <h2 className="mb-4 text-2xl font-bold">Journal Metadata Form</h2>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="date" className="mb-1 block">
                Date:
              </Label>
              <Input
                type="datetime-local"
                id="date"
                {...register("date", { required: true })}
                className="w-full"
              />
              {errors.date && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <Label htmlFor="title" className="mb-1 block">
                Title:
              </Label>
              <Input
                type="text"
                id="title"
                {...register("title", { required: true })}
                className="w-full"
              />
              {errors.title && <span className="text-red-500">This field is required</span>}
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
                Location 3 Words:
              </Label>
              <Input
                type="text"
                id="locationWords"
                {...register("locationWords", { required: true })}
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
                {...register("tags", { required: true })}
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
              Generate Meta Data
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
