import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { uploadFile } from "../../api/uploadApi";

function UploadBox({onUploadSuccess,setProgress}) {
  const fileInputRef = useRef(null);

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async(e) => {
    const file = e.target.files[0];

    if (!file) return; 
    try{
      const result =  await uploadFile(file,(progress) =>{
         setProgress(progress);
      });
     console.log("Upload Successful", result);
alert("File uploaded successfully");

setTimeout(async () => {

  if (onUploadSuccess) {
    await onUploadSuccess();
  }

  setProgress(0);

}, 1000);

    } catch(error){
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="border-2 border-dashed border-blue-400 rounded-2xl p-12 text-center bg-white">
      <UploadCloud
        size={70}
        className="mx-auto text-blue-600"
      />

      <h2 className="text-2xl font-bold mt-4">
        Drag Drop Files Here
      </h2>

      <p className="text-gray-500 mt-2">
        or click the button below to browse
      </p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      <button
        onClick={handleBrowse}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Browse Files
      </button>
    </div>
  );
}

export default UploadBox;