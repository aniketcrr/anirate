import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

import tinymce from "tinymce/tinymce";
tinymce.baseURL = "/tinymce";

import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Editor
            apiKey="no-api-key" 
            value={field.value}
            onEditorChange={(content) => field.onChange(content)}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table help wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image | code | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
}
