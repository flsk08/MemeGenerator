export default function UploadImage({
  selectedImage,
  setSelectedImage,
  userImg,
  setUserInput
}) {
  return (
    <div>
      {userImg && (
        <input
          type="file"
          onChange={(event) => {
            // console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      )}
      <br />
      {selectedImage && (
        <div>
          <img
            alt=""
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button
            onClick={() => {
              setSelectedImage(null);
              setUserInput({ top: "", bottom: "" });
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
