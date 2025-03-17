import { Input } from "./Input";
import { Button } from "./button";
import { CrossIcon } from "./icons";
import { TypeInput } from "./TypeInput";
import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Type } from "../pages/dashboard";
import { ObjectId } from "mongodb";

export function AddContentModal({ 
    setOpen, 
    setContent 
}: { 
    setOpen: (prop: boolean) => void, 
    setContent: Dispatch<SetStateAction<{ title: string; link: string; type: Type; _id: ObjectId }[]>>
}) {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const typeRef = useRef<HTMLSelectElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        setSelectedType(typeRef.current?.value || "");
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    async function submit() {
        let fileUrl = linkRef.current?.value || "";

        if (selectedType === "document" && file) {
            const formData = new FormData();
            formData.append("pdf", file);

            setUploading(true);
            try {
                const uploadRes = await axios.post(`${BACKEND_URL}/api/v1/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("token"),
                    },
                });

                fileUrl = uploadRes.data.url; // ✅ Use backend response URL
            } catch (error) {
                console.error("Upload failed", error);
                alert("Failed to upload PDF.");
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        // Save Content (PDF or Link)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
                title: titleRef.current?.value || file?.name,
                link: fileUrl,
                type: selectedType
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            setContent(prev => [...prev, response.data.content]); // ✅ Update content correctly
            setOpen(false);
        } catch (error) {
            console.error("Error saving content", error);
            alert("Failed to save content.");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
            <div className="bg-white h-auto w-2/5 border-2 rounded-lg p-6 flex flex-col gap-6 items-center shadow-lg">
                <div className="place-self-end w-fit">
                    <CrossIcon onClick={() => setOpen(false)} />
                </div>
                <div className="w-full flex justify-center items-center text-2xl font-semibold">
                    Add Content
                </div>
                <div className="w-full flex flex-col gap-4">
                    <Input reference={titleRef} placeholder="Add title" title="Title : " />
                    <Input reference={linkRef} placeholder="Add link (or leave empty for PDF upload)" title="Link : " />

                    {/* Type Selection */}
                    <TypeInput 
                        reference={typeRef} 
                        onChange={(e) => setSelectedType(e.target.value)} 
                    /> 

                    {/* Show file input only if type is "document" */}
                    {selectedType === "document" && (
                        <div className="w-full">
                            <label className="text-gray-600 font-medium">Upload PDF:</label>
                            <input 
                                type="file" 
                                accept="application/pdf"
                                className="border p-2 w-full rounded-md"
                                onChange={handleFileChange} 
                            />
                        </div>
                    )}
                </div>
                <Button 
                    title={uploading ? "Uploading..." : "Submit"} 
                    variant="primary" 
                    size="lg" 
                    onClick={submit} 
                    disabled={uploading}
                />
            </div>
        </div>
    );
}
