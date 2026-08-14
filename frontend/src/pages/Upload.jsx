import { useEffect, useState } from "react";
import UploadBox from "../components/upload/UploadBox";
import SupportedFormats from "../components/upload/SupportedFormats";
import ProgressBar from "../components/upload/ProgressBar";
import FileCard from "../components/upload/FileCard";
import { getFiles } from "../api/uploadApi";

function Upload() {

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
   loadFiles();
}, []);

  const loadFiles = async () => {
   try {
    const data = await getFiles();
    setFiles(data);
  } catch (error) {
    console.error(error);
  }
};
console.log(progress);
  return (
    <div className="space-y-8">

      <UploadBox
  onUploadSuccess={loadFiles}
  setProgress={setProgress}
/>

      <SupportedFormats />

     <ProgressBar progress={progress} />

      <div className="space-y-4">

        <h2 className="text-2xl font-bold">
          Selected Files
        </h2>

        {files.map((file, index) => (
          <FileCard
            key={index}
            name={file.name}
            size={file.size}
          />
        ))}

      </div>

    </div>
  );
}

export default Upload;