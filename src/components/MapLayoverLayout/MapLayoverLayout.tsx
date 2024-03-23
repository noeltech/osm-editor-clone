import React, { ReactNode, createContext, useContext, useState } from 'react'

const MapLayoverLayoutContext = createContext<boolean>(true)
const MapLayoverLayoutContextAction = createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined)

function MapLayoverLayout({ children }: { children: ReactNode }) {
  return (
    <MapLayoverLayoutProvider>
      <div className="flex h-full w-full flex-wrap">{children}</div>
    </MapLayoverLayoutProvider>
  )
}

//

function SidePanel({ children }: { children: ReactNode }) {
  const isSidePanelOpen = useContext(MapLayoverLayoutContext)
  return (
    <div
      className={`z-50 h-full  max-w-[20%]  shrink bg-white ${
        isSidePanelOpen
          ? '  min-w-[340px] grow duration-700 ease-in'
          : ' grow-0 duration-300 ease-out'
      } overflow-hidden`}
    >
      {isSidePanelOpen && children}
    </div>
  )
}

function MainPanel({ children }: { children: ReactNode }) {
  return <div className={`h-full grow `}>{children}</div>
}

function MapLayoverLayoutProvider({ children }: { children: ReactNode }) {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)

  return (
    <MapLayoverLayoutContext.Provider value={isSidePanelOpen}>
      <MapLayoverLayoutContextAction.Provider value={setIsSidePanelOpen}>
        {children}
      </MapLayoverLayoutContextAction.Provider>
    </MapLayoverLayoutContext.Provider>
  )
}

function useSidePanelToggle() {
  const context = useContext(MapLayoverLayoutContextAction)
  if (!context) {
    throw new Error(
      'useSidePanelToggle must be used inside a MapLayoverlayoutProvider'
    )
  }
  return context
}

export { SidePanel, MainPanel, MapLayoverLayout, useSidePanelToggle }
