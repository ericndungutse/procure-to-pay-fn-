function Input({ register, type, placeholder, isDisabled, value }) {
  return (
    <input
      disabled={isDisabled}
      className='border border-gray-300  rounded-md  px-2 py-1.5 shadow-sm bg-white w-full disabled:opacity-40 focus:border-[#b07c19] hover:border-[#b07c19] outline-none'
      type={type}
      defaultValue={value}
      {...register}
      placeholder={placeholder}
    />
  );
}

export default Input;
