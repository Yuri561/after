import os

def transfered_folder(path:str):
    if not os.path.isdir(path):
        return False
    img_ext = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
    images = []
    doc_ext = ['.pdf', '.docx', '.txt', '.xlsx', '.pptx']
    documents = []
    vid_ext = ['.mp4', '.avi', '.mov', '.mkv']
    videos = []
    audio_ext = ['.mp3', '.wav', '.aac', '.flac']
    audios = []
    others = []    
    for dirpath, _, filenames in os.walk(path):
        if filenames:
            for file in filenames:
                file_ext = os.path.splitext(file)[1].lower()
                if file_ext in img_ext:
                    images.append(os.path.join(dirpath, file))
                elif file_ext in doc_ext:
                    documents.append(os.path.join(dirpath, file))
                elif file_ext in vid_ext:
                    videos.append(os.path.join(dirpath, file))
                elif file_ext in audio_ext:
                    audios.append(os.path.join(dirpath, file))
                else:
                    others.append(os.path.join(dirpath, file))  
    #we want to return a dictionary with the categorized files
    return {
        "source_path": path,
        "total_files": len(images + documents + videos + audios + others),
        "images": images,
        "documents": documents,
        "videos": videos,
        "audios": audios,
        "others": others,
    }

if __name__ == "__main__":
    path = "C:/Users/hoube/OneDrive/Documents/"
    result = transfered_folder(path)
    print(result)


