import React from 'react'
interface Props {
  metadata: any
  children: React.ReactNode
}

const MatterPage: React.FC<Props> = (props) => {
  const { metadata, children } = props
  console.log({ keys: Object.keys(props) })
  return (
    <div>
      <h1>{metadata.title}</h1>
      <div className="prose">{children}</div>
    </div>
  )
}

export { MatterPage }
