import React, { useEffect, useState } from "react";
import styled from "styled-components";

// components
import { Navbar } from "../components/Navbar";
import { VideoThumbnail } from "../components/VideoThumbnail";
// utils
import { theme } from "../utils/theme";
// API actions
import { createVideo, listVideos, deleteVideo } from "../actions/Video";
import { storage } from "../firebase";

export const Home = () => {

  const FILE_SIZE_LIMIT = 1024*1024;

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSource, setFileSource] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blockActions, setBlockActions] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (file.size/FILE_SIZE_LIMIT > 200) {
      alert("File size cannot be greater than 200MB");
      return;
    }
    setFile(file);
    setFileSource(URL.createObjectURL(file));
    setFileType(file.type);
    setFileName(file.name);
  }


  const uploadToDB = async () => {
    setLoading(true);
    const storageRef = storage.ref(`lectures/${fileName}`);
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();
    const { success } = await createVideo({
      title: fileName,
      storage_url: url,
      content_type: fileType,
    });
    success && alert('Video uploaded successfully!');
    if (videos.length > 0) {
      setFileName(videos[0].title);
      setFileSource(videos[0].storage_url);
      setBlockActions(true);
    }
    setLoading(false);
    setBlockActions(false);
  }

  const handleVideoDelete = async (id) => {
    setLoading(true);
    const { success } = await deleteVideo(id);
    success && alert("Video deleted successfully!");
    handleClear();
    setLoading(false);
  };

  const handleVideoClick = (title, url, type) => {
    setFileName(title);
    setFileSource(url);
    setFileType(type);
  }

  const handleClear = () => {
    setFileName('');
    setFileSource(null);
    setFileType(null);
  };

  const fireApis = async () => {
    const { success, data } = await listVideos();
    if (success) { 
      setVideos(data);
      setFileName(videos[0] && videos[0].title);
      setFileSource(videos[0] && videos[0].storage_url);
    }
  };

  useEffect(() => {
    fireApis();
  }, [loading]);

  return (
    <div>
      <Navbar />
      <InputArea>
        <StyledInput value={fileName} onChange={e => setFileName(e.target.value)} />
        <>
          <input type="file" id="actual-btn" accept="video/*" onChange={handleFileUpload} hidden/>
          {!fileSource
            ? <StyledLabel for="actual-btn">Upload Lecture</StyledLabel>
            : (
              <>
                <UploadButton onClick={uploadToDB} disabled={loading || blockActions} >
                  {loading ? 'Uploading...' : 'Upload to DB'}
                </UploadButton>
                <ClearButton onClick={handleClear} disabled={loading || blockActions}>
                  Clear
                </ClearButton>
              </>
            )
          }
        </>
      </InputArea>
      {fileSource
      && (
        <VideoArea>
          <video width={800} height={500} controls>
            <source src={fileSource} type={fileType} />
          </video>
        </VideoArea>
      )}
      <VideoListArea>
        {videos.length > 0
          ? videos.map(({ _id, title, storage_url, content_type }) => (
              <VideoThumbnail
                key={_id}
                title={title}
                deleteAction={() => handleVideoDelete(_id)}
                onClick={() => handleVideoClick(title, storage_url, content_type)}
              />
            )
          )
          : <Empty>No videos to display</Empty>
        }
      </VideoListArea>
    </div>
  );
}

const InputArea = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 50%;
  height: 60px;
  border: 1px solid ${theme.background};
  border-radius: 10px;
  padidng: 30px;
  font-size: 26px;
  font-weight: 600;
  color: #666;

  &:focus {
    border-width: 0px;
    border: none;
  }
`;

const StyledLabel = styled.label`
  background-color: ${theme.background};
  color: white;
  padding: 14px 30px;
  font-size: 30px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 15px;
`;

const VideoArea = styled.div` 
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const VideoListArea = styled.div` 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 67%;
  margin: 0 auto;
`;

const UploadButton = styled.a`
  padding: 14px 30px;
  margin-left: 15px;
  border-radius: 5px;
  font-size: 30px;
  background-color: ${theme.background};
  color: white;
  cursor: pointer;
`;

const ClearButton = styled.a`
  margin-left: 15px;
  border-radius: 5px;
  font-size: 30px;
  cursor: ${({ disabled }) => disabled ? "not-allowed": "pointer"};
`;

const Empty = styled.p`
  text-align: center;
  font-size: 30px;
  width: 100%;
`;
