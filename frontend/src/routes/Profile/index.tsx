import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import API from '../../services/backend';

const Profile = () => {
  const { register, handleSubmit, formState } = useForm();
  let { id } = useParams();

  console.log (id);
  const { isLoading, isError, data, error } = useQuery<{ user: { _id: string, email: string }}, { message: string }>(['profile', id], () => API.getProfile(id))

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div>
        <p>{data?.user._id}</p>
        <p>{data?.user.email}</p>
      </div>

      <form onSubmit={handleSubmit(data => {
        console.log(data);
      })}>
        <input {...register('username', { required: "Username required", })} placeholder="Username" />
        <p>{formState.errors.username?.message?.toString()}</p>
        <input {...register('password', { required: "Password required", })} placeholder="Password" />
        <p>{formState.errors.password?.message?.toString()}</p>
        <input {...register('name', { required: "Name required", })} placeholder="Name" />
        <p>{formState.errors.name?.message?.toString()}</p>
        <input {...register('email', { required: "Email required", })} placeholder="Email" />
        <p>{formState.errors.email?.message?.toString()}</p>
        <input type="submit" />
      </form>
    </>
  );
};

export default Profile
