import React, { createContext, useState } from 'react';

export const MapContext = createContext();

const MapContextProvider = (props) => {
  
  const [bounds, setBounds] = useState([])

  const [size, setSize] = useState(1)

  const [page, setPage] = useState(0)

  return (
    <MapContext.Provider value={{ bounds, setBounds, size, setSize, page, setPage }}>
      {props.children}
    </MapContext.Provider>
  )
}

export default MapContextProvider;