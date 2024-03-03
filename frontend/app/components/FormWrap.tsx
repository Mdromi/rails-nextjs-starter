const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-fit h-full flex items-center pb-12 pt-24">
      <div className="max-w-[600px] mx-auto text-black w-full flex flex-col gap-6 items-center border border-gray-700 rounded-lg rounded-md p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
