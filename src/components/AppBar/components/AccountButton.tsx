import { Button } from '@/components/ui/button'
import { useAuth, useLogoutUser } from '@/services/auth'
import { User, ChevronDown } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

function AccountButton() {
  const { auth } = useAuth()
  const { mutate: logoutUser } = useLogoutUser()

  const handleLogoutUser = () => {
    logoutUser()
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant={'outline'} className=" h-[35px] px-2 py-1 text-[#888]">
          <User /> <span className="px-2">{auth?.displayName}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5}>
          <div className="mr-2 overflow-hidden rounded-lg bg-gray-100 py-2">
            <DropdownMenu.Group>
              <DropdownMenuItem>
                <span> My Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span> My Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span> My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span> My Messages</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span> My Preferecences</span>
              </DropdownMenuItem>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              className=" cursor-pointer px-4 py-1 hover:bg-orange-500"
              onClick={handleLogoutUser}
            >
              Logout
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default AccountButton
function useLogout(): { mutate: any } {
  throw new Error('Function not implemented.')
}

function DropdownMenuItem({ children }) {
  return (
    <DropdownMenu.Item className="px-4 py-1 hover:bg-orange-500">
      {children}
    </DropdownMenu.Item>
  )
}
