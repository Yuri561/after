/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DropZone from "./DropZone";
import TransferQueue from "./TransferQueue";
import Ai from "./Ai";
import WatcherMode from "./WatcherMode";
import SystemMetrics from "./SystemMetrics";
import StorageMap from "./StorageMap";
import { Upload } from "lucide-react";


const STORAGE_KEY = "AFTER_APP_QUEUE_v1";

const MainGrid: React.FC<{ loading: boolean }> = () => {
  const [transferQueue, setTransferQueue] = useState<any[]>([]);


  // restore previous queue
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hydrated = parsed.map((t) => ({
            ...t,
            icon: <Upload size={14} />,
          }));
          setTransferQueue(hydrated);
        }
      }
    } catch (err) {
      console.error("Error loading queue:", err);
    }
  }, []);

  // save current queue
  useEffect(() => {
    if (transferQueue.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const stripped = transferQueue.map(({ icon, ...rest }) => rest);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stripped));
    }
  }, [transferQueue]);

  // main file/folder handler
  const handleFileQue = async (files: (File | string)[]) => {
    if (!files || files.length === 0) return;

    //  File object OR folder path string
    const folderPath =
      typeof files[0] === "string"
        ? files[0]
        : (files[0] as any).path || files[0].name;

    // scan the folder 
    // const scannedFiles = await scanFolder(folderPath);

    // map the results into TransferQueue items
    const newTransfers = {
      name: folderPath.split("/").pop() || folderPath,
      path: folderPath,
      progress: 0,
      icon: <Upload size={14}/>,
    };

    // update the queue
    setTransferQueue((prev) => [...prev, newTransfers]);
  };


  return (
    <section className="flex-1 grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2 grid-rows-3 gap-3 p-2 sm:p-6">
      <DropZone onFilesQueued={handleFileQue}/>
      <TransferQueue transfers={transferQueue} setTransfers={setTransferQueue}/>
      <SystemMetrics/>
      <StorageMap/>
      <Ai/>
      <WatcherMode/>
    </section>
  );
};

export default MainGrid;
