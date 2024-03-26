import { InfoIcon, Trash2Icon, Undo2Icon } from 'lucide-react'
import { ReactNode, memo, useCallback, useEffect, useState } from 'react'

interface IFeatureInputFieldBase {
  label: string
  isDeleteButtonVisible: boolean
  children: ReactNode
  onDelete: () => void
  inputValue: string | undefined
}

const styles = {
  borderColor: `border-gray-300`
}

function FeatureInputFieldBase({
  label,
  children,
  onDelete,
  isDeleteButtonVisible
}: IFeatureInputFieldBase) {
  // const [showDeleteButton, setShowDeleteButton] = useState(false)

  const handleOnDelete = useCallback(() => {
    onDelete && onDelete()
    // setShowDeleteButton(false)
  }, [onDelete])
  const handleOnUndo = () => {
    onDelete && onDelete()
  }
  const handleOnReferenceCheck = () => {}

  // useEffect(() => {
  //   if (inputValue && inputValue != '') {
  //     setShowDeleteButton(true)
  //   }
  // }, [inputValue])

  return (
    <div
      className={` mb-4 rounded-md border ${styles.borderColor} overflow-hidden font-[Roboto]`}
    >
      <div className={`flex border-b bg-gray-100 ${styles.borderColor}`}>
        <label
          htmlFor="input"
          className={`grow border-r align-middle ${styles.borderColor}  pb-[4px] pl-3 pt-[7px]`}
        >
          <span className={` align-middle text-[13px] font-medium`}>
            {label}
          </span>
        </label>
        <DeleteButton
          onDelete={handleOnDelete}
          isVisible={isDeleteButtonVisible}
        />
        <UndoButton onUndo={handleOnUndo} />
        <InfoButton onReferenceCheck={handleOnReferenceCheck} />
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}

interface IIconButton {
  children: ReactNode
  borderRight?: boolean
  onClick: () => void
}

function IconButton({ children, borderRight, onClick }: IIconButton) {
  return (
    <button
      className={`p-2 text-gray-500 hover:bg-gray-200 ${
        borderRight && `border-r  ${styles.borderColor}`
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function InfoButton({ onReferenceCheck }: { onReferenceCheck: () => void }) {
  return (
    <IconButton onClick={onReferenceCheck}>
      <InfoIcon size={18} />
    </IconButton>
  )
}

function UndoButton({ onUndo }: { onUndo: () => void }) {
  return (
    <IconButton borderRight={true} onClick={onUndo}>
      <Undo2Icon size={18} />
    </IconButton>
  )
}

const DeleteButton = memo(function DeleteButton({
  onDelete,
  isVisible
}: {
  onDelete: () => void
  isVisible: boolean
}) {
  if (!isVisible) return
  console.log('Delete button rendered')

  return (
    <IconButton borderRight={true} onClick={onDelete}>
      <Trash2Icon size={18} />
    </IconButton>
  )
})

export default FeatureInputFieldBase
