function Footer() {
    return (
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="" className="flex items-center">
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Welcome to the BlogApp</span> */}
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6"> {/* Adjust grid layout */}
              <div> {/* Remove text-center class to align "Legal" section to the left */}
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 Chaymae Farkouchi™. All Rights Reserved.
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  