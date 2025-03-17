function Bars({ setOpen, open }) {
    return (
      <div
        className="absolute top-0 left-0 m-2 z-50 cursor-pointer"
        onClick={() => setOpen((open) => !open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`text-black-500 size-5 cursor-pointer ${
            open ? 'sm:text-black-500 dark:text-white-500' : 'sm:text-white-200 sm:dark:text-black-100 dark:text-white-500'
          }`}
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 10.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }
  
  export default Bars;