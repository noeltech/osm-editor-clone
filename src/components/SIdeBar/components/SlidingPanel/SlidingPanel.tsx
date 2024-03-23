import { Button } from '@/components/ui/button'
import {
  ArrowBigLeftIcon,
  ArrowBigRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon
} from 'lucide-react'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

interface ISlidingPanel {
  startPosition?: 'left' | 'right' | undefined
  children: ReactNode
  onClose?: () => void
}

enum startPositionValue {
  left = 'translate-x-[0]',
  right = 'translate-x-[-50%]'
}

interface ISlidingPanelContext {
  slideNext: () => void
  slidePrevious: () => void
  onClose?: () => void | null
}

const SlidingPanelContext = createContext<ISlidingPanelContext | undefined>(
  undefined
)

function SlidingPanel({
  startPosition = 'right',
  children,
  ...props
}: ISlidingPanel) {
  const [translateValue, setTranslateValue] = useState(startPositionValue.right)

  console.log(translateValue)
  const slideNext = () => {
    console.log('slide to left')
    setTranslateValue(startPositionValue.right)
  }
  const slidePrevious = () => {
    console.log('slide to right')
    setTranslateValue(startPositionValue.left)
  }

  const onClose = props.onClose ? props.onClose : () => {}

  const value = { slideNext, slidePrevious, onClose }
  const memoizeChidlren = useMemo(() => children, [children])
  return (
    <div className="h-full">
      <SlidingPanelContext.Provider value={value}>
        <div
          className={`relative flex h-full w-[200%] ${translateValue} ease  transition-transform duration-300`}
        >
          {memoizeChidlren}
        </div>
      </SlidingPanelContext.Provider>
    </div>
  )
}

function useSlidingPanel() {
  const context = useContext(SlidingPanelContext)
  if (context === undefined) {
    throw new Error(
      'useSlidingPanel must be used within a SlidingPanelProvider'
    )
  }
  return context
}

interface IPanel {
  children: ReactNode
}
function Panel(props: IPanel) {
  return (
    <div className="flex h-full w-[50%] flex-col flex-nowrap ">
      {props.children}
    </div>
  )
}
interface IPanelHeader {
  children: ReactNode
}
function PanelHeader(props: IPanelHeader) {
  return (
    <div className=" flex h-[60px] grow-0 items-center">{props.children}</div>
  )
}
interface IPanelHeaderTitle {
  children: ReactNode
}
function PanelHeaderTitle(props: IPanelHeaderTitle) {
  return (
    <h2 className="grow p-4 text-center text-lg font-semibold text-gray-700">
      {props.children}
    </h2>
  )
}
interface IPanelButton {
  onClick: () => void
  children: ReactNode
}

function PanelHeaderButton(props: IPanelButton) {
  return (
    <div className="flex h-full items-stretch">
      <Button
        className="h-full rounded-none px-2 hover:bg-gray-200"
        variant="ghost"
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </div>
  )
}

interface IPanelContent {
  children: ReactNode
}
// PANEL CONTENT
function PanelContent(props: IPanelContent) {
  return (
    <div className=" shrink grow overflow-auto border-t border-gray-300 bg-gray-100 p-4 pt-5">
      {props.children}
    </div>
  )
}

function NextPanelButton() {
  const { slideNext } = useSlidingPanel()
  return (
    <PanelHeaderButton onClick={slideNext}>
      <ChevronRightIcon />
    </PanelHeaderButton>
  )
}

function PrevPanelButton() {
  const { slidePrevious } = useSlidingPanel()
  return (
    <PanelHeaderButton onClick={slidePrevious}>
      <ChevronLeftIcon />
    </PanelHeaderButton>
  )
}

function CloseButton() {
  const { onClose } = useSlidingPanel()

  return (
    <PanelHeaderButton onClick={onClose}>
      <XIcon />
    </PanelHeaderButton>
  )
}

export {
  SlidingPanel,
  Panel,
  PanelHeader,
  PanelHeaderTitle,
  NextPanelButton,
  PrevPanelButton,
  CloseButton,
  PanelContent
}

// SlidingPanel.defaultProps = {
//   startPosition: 'right'
// }
