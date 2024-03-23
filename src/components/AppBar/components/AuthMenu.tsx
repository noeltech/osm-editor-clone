import { NavLink, Link } from 'react-router-dom'

export default function AuthMenu() {
  return (
    <menu className="flex h-[35px] items-center overflow-hidden  rounded-md border border-gray-400 text-sm text-[#888]">
      <li className="">
        <Link
          to="login"
          className="inline-block  px-4 py-2 hover:bg-gray-400 hover:text-white"
        >
          Log In
        </Link>
      </li>
      <div className="h-full border-l border-gray-400"></div>
      <li className="">
        <Link
          to="signup"
          className="inline-block px-4 py-2 hover:bg-gray-400 hover:text-white"
        >
          Sign Up
        </Link>
      </li>
    </menu>
  )
}
