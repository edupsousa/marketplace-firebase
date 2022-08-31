import { useState } from "react";
import { Button, Stack, Image } from "react-bootstrap";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { BsFillTrashFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";

type FotoProps = {
  index: number;
  image?: ImageType;
  onRemove: (index: number) => void;
  onUpload: () => void;
};

function Foto({ index, image, onRemove, onUpload }: FotoProps) {
  return (
    <div
      key={index}
      className="h-100 border position-relative"
      style={{ aspectRatio: "4/3" }}
    >
      {image ? (
        <>
          <Image
            src={image.dataURL}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
          <Button
            className="position-absolute top-0 end-0 me-1 mt-1"
            variant="danger"
            onClick={() => onRemove(index)}
          >
            <BsFillTrashFill />
          </Button>
        </>
      ) : (
        <Button
          variant="primary"
          onClick={() => onUpload()}
          className="position-absolute top-50 start-50 translate-middle fs-4"
        >
          <BiImageAdd />
        </Button>
      )}
    </div>
  );
}

export default function EnviarFotos() {
  const [images, setImages] = useState([]);
  const maxNumber = 4;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({ imageList, onImageUpload, onImageRemove }) => (
          <Stack
            direction="horizontal"
            className="my-1 p-1 rounded align-items-stretch justify-content-around"
            style={{ aspectRatio: "16/3" }}
          >
            {[0, 1, 2, 3].map((index) => (
              <Foto
                key={index}
                image={imageList[index]}
                index={index}
                onRemove={onImageRemove}
                onUpload={onImageUpload}
              />
            ))}
          </Stack>
        )}
      </ImageUploading>
    </div>
  );
}
