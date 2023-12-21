import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../redux/user/useUser";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

function Profile() {
  const {
    currentUser,
    loading,
    error,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
  } = useUser();
  const [image, setImage] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState({});
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileRef = useRef(false);

  //actions

  const handleUpload = useCallback(async (image) => {
    const storage = getStorage(app);
    const fileName = Date.now() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        const err = { isError: true, errorMsg: error.message };
        setUploadError(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((formData) => ({
            ...formData,
            profilePicture: downloadURL,
          }));
        });
      }
    );
  }, []);

  useEffect(() => {
    if (image) {
      handleUpload(image);
    }
  }, [image, handleUpload]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) return;
    try {
      updateUserStart();
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Fetching error!");
      const data = await res.json();
      const updatedUser = data?.user || data;
      updateUserSuccess(updatedUser);
      setUpdateSuccess(true);
    } catch (error) {
      const errorObj = {
        isError: true,
        errorMsg: error.message,
      };
      updateUserFailure(errorObj);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile pic"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current?.click()}
        />
        <p className="text-center">
          {uploadError?.isError && (
            <span className="text-red-700">
              {uploadError?.errorMsg || "Problem while uploading!"}
            </span>
          )}
          {uploadProgress > 0 && uploadProgress < 100 ? (
            <span className="text-slate-700">{`Uploading : ${uploadProgress}%`}</span>
          ) : uploadProgress === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
        {error.isError && <p>{error.errorMsg}</p>}
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      {updateSuccess && (
        <p className="text-green-700 mt-3">User updated successfully</p>
      )}
    </div>
  );
}

export default Profile;
