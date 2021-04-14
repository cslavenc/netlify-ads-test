import React from 'react'
import AdSense from '../components/adsense/AdSense'

export default () => {
  return (
    <>
      <AdSense
        client={process.env.ADSENSE_ID}
        style={process.env.ADSENSE_SLOT_SIDEBAR_ID}
      />
      <AdSense
        client={process.env.ADSENSE_ID}
        style={process.env.ADSENSE_SLOT_ARTICLE_ID}
      />
    </>
  )
}
