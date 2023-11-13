export const isFileExtValid = (ref, isNew) => {
  // Update with no image return : true
  if (!isNew && ref.current.files[0] === undefined) return true;

  // New with no image return : false
  if (isNew && ref.current.files[0] === undefined) return false;

  // test extention
  const ext = ref.current.files[0].name.split(".").slice(-1)[0];
  const extAccepted = ["jpg", "gif", "png", "jpeg", "svg", "webp"];
  return extAccepted.includes(ext.toLowerCase());
};

export const isFileToBig = (ref, limit, isNew) => {
  // Update with no image : return true
  if (!isNew && ref.current.files[0] === undefined) return true;

  // New with no image : return false
  if (isNew && ref.current.files[0] === undefined) return false;

  // test size
  const size = ref.current.files[0].size;
  return size < limit;
};
