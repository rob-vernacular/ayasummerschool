import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getActiveProfileId } from './lib/session'
import OfflineBanner from './components/ui/OfflineBanner'

import ProfileSelection from './pages/ProfileSelection'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import RewardsRoom from './pages/RewardsRoom'
import ParentDashboard from './pages/ParentDashboard'

import PhonicsModule from './modules/phonics/PhonicsModule'
import SightWordsModule from './modules/sightwords/SightWordsModule'
import ReadingModule from './modules/reading/ReadingModule'
import WritingModule from './modules/writing/WritingModule'
import MathModule from './modules/math/MathModule'

function RequireProfile({ children }) {
  const id = getActiveProfileId()
  if (!id) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <HashRouter>
      <OfflineBanner />
      <Routes>
        {/* Entry point — always shown if no active profile */}
        <Route path="/" element={<ProfileSelection />} />

        {/* Protected routes */}
        <Route path="/onboarding" element={<RequireProfile><Onboarding /></RequireProfile>} />
        <Route path="/home" element={<RequireProfile><Home /></RequireProfile>} />
        <Route path="/rewards" element={<RequireProfile><RewardsRoom /></RequireProfile>} />
        <Route path="/parent" element={<ParentDashboard />} />

        {/* Learning modules */}
        <Route path="/learn/phonics" element={<RequireProfile><PhonicsModule /></RequireProfile>} />
        <Route path="/learn/sight-words" element={<RequireProfile><SightWordsModule /></RequireProfile>} />
        <Route path="/learn/reading" element={<RequireProfile><ReadingModule /></RequireProfile>} />
        <Route path="/learn/writing" element={<RequireProfile><WritingModule /></RequireProfile>} />
        <Route path="/learn/math" element={<RequireProfile><MathModule /></RequireProfile>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
