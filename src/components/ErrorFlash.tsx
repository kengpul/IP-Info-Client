interface Props {
  message: string;
}

const ErrorFlash = ({ message }: Props) => {
  return <p className="bg-red-600 text-white p-3 mt-5 rounded-md">{message}</p>;
};

export default ErrorFlash;
