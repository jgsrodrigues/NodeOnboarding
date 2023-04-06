import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form'
import { useUserData, UpdateProfile } from '../lib/queryWraper';
import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react';
import config from '../config';

const Profile = () => {
  const { register, handleSubmit, formState } = useForm();
  const [binFile, setBinFile] = useState<any>();

  const onDrop = useCallback((files: any) => {
    setBinFile(files[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
    },
    maxFiles: 1,
  })

  const { data, isLoading } = useUserData()

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <Box sx={{ mt: 1 }}>
      <p>Current name: {data?.name}</p>
      <TextField
        id="name"
        label="Name"
        variant="standard"
        required
        fullWidth
        margin="normal"

        {...register('name', { required: "name required", })}
        error={formState.errors.name ? true : false}
      />
      <p>Current picture:</p>
      <img src={`${config.API}/${data?.picture}`} alt='' />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <Button
        onClick={handleSubmit((data) => {
          const formData = new FormData()
          if (binFile) {
            formData.append("image", binFile, binFile.name);
          }
          formData.append("name", data.name)

          UpdateProfile(formData);
        })}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Update
      </Button>
    </Box>
  );
};

export default Profile
