import { Button } from '../ui/button'
import AccountButton from './components/AccountButton'
import SecondaryNavigation from './components/SecondaryNavigation'
import { ChevronDownIcon } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'

import Logo from './components/Logo'
import AuthMenu from './components/AuthMenu'
import { useAuth } from '@/services/auth'

function AppBar() {
  const { auth } = useAuth()
  return (
    <header className="">
      <div className="mx-4 flex items-center justify-between">
        <div className=" flex gap-4">
          <div className="flex items-center">
            <Logo />
            <NavLink to="/">
              <h1 className="align-middle text-lg font-semibold text-slate-800">
                OpenStreetMapClone
              </h1>
            </NavLink>
          </div>

          <div className="my-3 ml-5">
            <PrimaryNavigation />
          </div>
        </div>
        <div className="flex h-[35px] gap-1">
          <SecondaryNavigation />
          {auth ? <AccountButton /> : <AuthMenu />}
        </div>
      </div>
    </header>
  )
}

export default AppBar

const primaryNavigation = [
  { withIcon: false, label: 'Edit', id: 'edit', href: '#' },
  { withIcon: true, label: '', id: '12adasda', href: '#' },
  { withIcon: false, label: 'History', id: 'history', href: '#' },
  { withIcon: false, label: 'Export', id: 'export', href: '#' }
]
function PrimaryNavigation() {
  const navigationCount = primaryNavigation.length
  const urlLocation = 'edit'
  return (
    <div>
      <nav className="flex h-[38px] items-stretch rounded-md border border-orange-500 ">
        {primaryNavigation.map((item, index) => {
          return (
            <Button
              className={`h-full rounded-none border-orange-500 hover:bg-orange-500 ${
                index != navigationCount - 1 ? 'border-r' : ''
              } ${urlLocation === item.id ? 'border-b-2' : ''} ${
                item.withIcon && 'p-2'
              }`}
              key={item.id}
              variant="ghost"
            >
              {item.withIcon ? (
                <ChevronDownIcon size={18} strokeWidth={3} />
              ) : (
                item.label
              )}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
