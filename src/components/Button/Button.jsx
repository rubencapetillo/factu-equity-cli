export const Button = ({content, onClick}) => {
  return (
    <div className="flex items-center gap-4 border w-full p-3 hover:bg-cyan-600 hover:text-white cursor-pointer font-bold truncate font-lato">
      <button onClick>{content}</button>
    </div>
  )
}
