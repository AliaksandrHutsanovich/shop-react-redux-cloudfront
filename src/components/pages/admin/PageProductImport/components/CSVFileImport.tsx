import React from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Box from "@mui/material/Box";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async (f: File) => {
    console.log("uploadFile to", url);

    // Get the presigned URL
    const response = await axios({
      method: "GET",
      url,
      params: {
        name: encodeURIComponent(f.name),
      },
    });
    console.log("File to upload: ", f.name);
    console.log("Uploading to: ", response.data);
    console.log(f);
    try {
      const result = await fetch(response.data, {
        method: "PUT",
        body: f,
      });
      console.log("Result: ", result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button
            onClick={() => {
              uploadFile(file);
              setFile(undefined);
            }}
          >
            Upload file
          </button>
        </div>
      )}
    </Box>
  );
}
