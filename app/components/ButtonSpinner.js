const ButtonSpinner = () => {
  return (
    <div className="h-4 w-4 relative">
      <div className="h-4 w-4 absolute border-2 border-t-transparent border-l-transparent border-b-transparent border-white border-solid rounded-full animate-spin"></div>
      <div className="h-4 w-4 absolute border-2  border-white/25 border-solid rounded-full"></div>
    </div>
  )
}

export default ButtonSpinner;