import React, { FunctionComponent, ReactText } from 'react'

export type SessionProps = {
  name: ReactText,
  start?: ReactText,
  end?: ReactText,
}

const Session:FunctionComponent<SessionProps> = ({
  name,
  start,
  end,
}) => (
  <div>
    <h2>{name}</h2>
    <p>
      {start} &ndash; {end}
    </p>
  </div>
)

export default Session
