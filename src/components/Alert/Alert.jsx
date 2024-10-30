// eslint-disable-next-line react/prop-types
export const Alert = ({children}) => {
  return (
    <div className="text-center my-2 bg-red-500 text-white font-bold p-3 uppercase rounded-lg">
      {children}
    </div>
  )
}
