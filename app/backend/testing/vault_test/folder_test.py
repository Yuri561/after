import os

def transfered_folder(path):
    if not os.path.isdir(path):
        return False
    img_ext = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
    img_files = []
    doc_ext = ['.pdf', '.docx', '.txt', '.xlsx', '.pptx']
    doc_files = []
    vid_ext = ['.mp4', '.avi', '.mov', '.mkv']
    vid_files = []
    audio_ext = ['.mp3', '.wav', '.aac', '.flac']
    audio_files = []
    other_files = []
    
    for dirpath, dirnames, filenames in os.walk(path):
        if filenames:
            for file in filenames:
                file_ext = os.path.splitext(file)[1].lower()
                if file_ext in img_ext:
                    img_files.append(os.path.join(dirpath, file))
                elif file_ext in doc_ext:
                    doc_files.append(os.path.join(dirpath, file))
                elif file_ext in vid_ext:
                    vid_files.append(os.path.join(dirpath, file))
                elif file_ext in audio_ext:
                    audio_files.append(os.path.join(dirpath, file))
                else:
                    other_files.append(os.path.join(dirpath, file))
            # print(f"\n📂 Directory: {dirpath}")
            # print(f"   Subfolders: {dirnames}")
            # print(f"   Files: {filenames}\n")       
        print("\n================= SCAN RESULTS =================\n")

        def print_section(title, emoji, items):
            print(f"{emoji} {title}")
            print("---------------------------------")
            if items:
                for f in items:
                    print(f"- {f}")
            else:
                print("(none)")
            print("")  # blank line after each section

        print_section("Image Files", "📁", img_files)
        print_section("Document Files", "📄", doc_files)
        print_section("Video Files", "🎥", vid_files)
        print_section("Audio Files", "🎵", audio_files)
        print_section("Other Files", "📦", other_files)

        print("===============================================\n")
    return True



if __name__ == "__main__":
    path = "C:/Users/hoube/OneDrive/Documents/"
    print(transfered_folder(path))