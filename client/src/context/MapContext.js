import React, { createContext, useState } from 'react';

export const MapContext = createContext();

const MapContextProvider = (props) => {
  
  const [bounds, setBounds] = useState([])

  const [size, setSize] = useState(1)

  const [page, setPage] = useState(0)

  const [shapes, setShapes] = useState()

  const [view, setView] = useState()

  const [color, setColor] = useState('')

  return (
    <MapContext.Provider value={{ bounds, setBounds, size, setSize, page, setPage,
                                  shapes, setShapes, view, setView, color, setColor }}>
      {props.children}
    </MapContext.Provider>
  )
}

export default MapContextProvider;