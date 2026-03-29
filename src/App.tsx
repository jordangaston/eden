import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AppCarousel from './components/AppCarousel'
import Pricing from './components/Pricing'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import RequestAccessModal from './components/RequestAccessModal'
import type { TierName } from './data'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<TierName | undefined>()

  const openModal = useCallback((tier?: TierName) => {
    setSelectedTier(tier)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-eden-bg">
      <Navbar onRequestAccess={() => openModal()} />
      <Hero onRequestAccess={() => openModal()} />
      <AppCarousel />
      <Pricing onGetStarted={(tier) => openModal(tier)} />
      <CallToAction onRequestAccess={() => openModal()} />
      <Footer />
      <RequestAccessModal
        open={modalOpen}
        defaultTier={selectedTier}
        onClose={closeModal}
      />
    </div>
  )
}
