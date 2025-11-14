'use client'

import * as MaxUI from '@maxhub/max-ui'

export default function MaxUIComponents() {
  console.log('Available MaxUI components:', Object.keys(MaxUI))
  return (
    <div>
      <h1>Available MaxUI Components:</h1>
      <pre>{JSON.stringify(Object.keys(MaxUI), null, 2)}</pre>
    </div>
  )
}