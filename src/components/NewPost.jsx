import React from "react";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getAllTopics } from "../services/TopicService";
import { getSubjectsByTopicId } from "../services/SubjectService";
import {createPost} from "../services/PostService"
import { useNavigate } from "react-router-dom";

function NewPost()
{
  
  const navigate= useNavigate()
  const [topics, setTopics] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedTopic, setSelectedTopic] = React.useState(undefined);
  const [selectedSubject, setSelectedSubject] = React.useState(undefined);
  const [files, setFiles] = React.useState( [] );
  const [title, setTitle] = React.useState( "" )
  const [content, setContent] = React.useState("");
  
  const isNewPost = true;

  React.useEffect(() => {
    setLoading(true);
    getAllTopics()
      .then((data) => {
        setTopics(data);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    getSubjectsByTopicId(selectedTopic)
      .then((data) => {
        setSubjects(data);
        setSelectedSubject(undefined);
      })
      .catch((err) => console.log(err));
  }, [selectedTopic]);

  const handleImageUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const items = e.target.files;
    setFiles(files.concat([...items]));
  };

  const handleSavePost = (e) =>
  {
    e.preventDefault();
    createPost( { title, content, image: "hdjfh", subjectId: selectedSubject, topicId: selectedTopic, userId: "7begC0zuZY0c8Qd2GIRm" } )
      .then( data => console.log( data ) )
      .catch( ( error ) => { console.error( error ) } )
      .finally( () =>
      {
        navigate("/")
      
    })
  }

  return (
    <div className="p-8 bg-white rounded-sm m-8">
      <form>
        <div className="mb-8">
          <textarea
            id="message"
            rows="1"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập tiêu đề bài viết"
            required
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <textarea
              id="editor"
              rows="8"
              className="block w-full px-0 text-sm text-gray-800 focus:outline-none bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Nhập suy nghĩ của bạn"
              required
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <ImageList
              sx={{ width: "full" }}
              variant="quilted"
              cols={5}
              rowHeight={180}
            >
              {files?.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                  sx={{ padding: 1 }}
                >
                  <img
                    src={URL.createObjectURL(item)}
                    width={100}
                    height="auto"
                    alt={item.title}
                    loading="lazy"
                  />
                  <button
                    onClick={() => {
                      setFiles(files.filter((f) => f.name !== item.name));
                    }}
                  >
                    xx
                  </button>
                </ImageListItem>
              ))}
            </ImageList>
          </div>
          <div className="flex items-center w-full justify-between px-3 py-2 border-b dark:border-gray-600">
            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
              <div className="flex">
                <Button
                  component="label"
                  startIcon={<UploadFileIcon />}
                  sx={{ margin: 0, padding: 0 }}
                >
                  <input
                    type="file"
                    accept=".jpg"
                    multiple
                    hidden
                    onChange={handleImageUpload}
                  />
                </Button>
                <button
                  type="button"
                  className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                  </svg>
                  <span className="sr-only">Add emoji</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div>
            <select
              id="topic"
              placeholder="Chọn chủ đề"
              onChange={(e) => {
                setSelectedTopic(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected={selectedTopic === undefined}>
                Chọn chủ đề
              </option>
              {topics.map((one) => (
                <option
                  key={one?.id}
                  value={one?.id}
                  selected={selectedTopic === one.id}
                >
                  {one?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              onChange={(e) => {
                setSelectedSubject(e.target.value);
              }}
              id="subject"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected={selectedSubject === undefined}>
                Chọn môn học
              </option>
              {subjects.map((one) => (
                <option
                  key={one?.id}
                  value={one?.id}
                  selected={selectedSubject === one.id}
                >
                  {one?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSavePost}
          className="inline-flex items-center px-5 py-2.5  bg-add text-sm font-medium text-center text-white text-whiterounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          {isNewPost ? "Đăng bài" : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}

export default NewPost;
