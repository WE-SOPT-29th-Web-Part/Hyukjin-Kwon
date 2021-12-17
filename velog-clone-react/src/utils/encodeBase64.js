const encodeFileToBase64 = (fileBlob, onLoad) => {
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);
  return new Promise((resolve) => {
    reader.onload = () => {
      onLoad(reader.result);
      resolve();
    };
  });
};

export default encodeFileToBase64;
